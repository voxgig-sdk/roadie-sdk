<?php
declare(strict_types=1);

// Entity entity test

require_once __DIR__ . '/../roadie_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EntityEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RoadieSDK::test(null, null);
        $ent = $testsdk->Entity(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "entity" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = RoadieSDK::test($seed, null);
        $seen = iterator_to_array($base->Entity(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = RoadieConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = RoadieSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Entity(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = entity_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "entity." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $entity_ref01_ent = $client->Entity(null);
        $entity_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.entity"), "entity_ref01"));

        $entity_ref01_data_result = $entity_ref01_ent->create($entity_ref01_data, null);
        $entity_ref01_data = Helpers::to_map($entity_ref01_data_result);
        $this->assertNotNull($entity_ref01_data);
        $this->assertNotNull($entity_ref01_data["id"]);

        // LIST
        $entity_ref01_match = [];

        $entity_ref01_list_result = $entity_ref01_ent->list($entity_ref01_match, null);
        $this->assertIsArray($entity_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($entity_ref01_list_result),
            ["id" => $entity_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $entity_ref01_match_dt0 = [
            "id" => $entity_ref01_data["id"],
        ];
        $entity_ref01_data_dt0_loaded = $entity_ref01_ent->load($entity_ref01_match_dt0, null);
        $entity_ref01_data_dt0_load_result = Helpers::to_map($entity_ref01_data_dt0_loaded);
        $this->assertNotNull($entity_ref01_data_dt0_load_result);
        $this->assertEquals($entity_ref01_data_dt0_load_result["id"], $entity_ref01_data["id"]);

        // REMOVE
        $entity_ref01_match_rm0 = [
            "id" => $entity_ref01_data["id"],
        ];
        $entity_ref01_ent->remove($entity_ref01_match_rm0, null);

        // LIST
        $entity_ref01_match_rt0 = [];

        $entity_ref01_list_rt0_result = $entity_ref01_ent->list($entity_ref01_match_rt0, null);
        $this->assertIsArray($entity_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($entity_ref01_list_rt0_result),
            ["id" => $entity_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function entity_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/entity/EntityTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RoadieSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["entity01", "entity02", "entity03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ROADIE_TEST_ENTITY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ROADIE_TEST_ENTITY_ENTID" => $idmap,
        "ROADIE_TEST_LIVE" => "FALSE",
        "ROADIE_TEST_EXPLAIN" => "FALSE",
        "ROADIE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ROADIE_TEST_ENTITY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ROADIE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ROADIE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new RoadieSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ROADIE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ROADIE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
