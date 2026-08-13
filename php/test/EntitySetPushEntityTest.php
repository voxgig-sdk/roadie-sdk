<?php
declare(strict_types=1);

// EntitySetPush entity test

require_once __DIR__ . '/../roadie_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EntitySetPushEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RoadieSDK::test(null, null);
        $ent = $testsdk->EntitySetPush(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = entity_set_push_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "entity_set_push." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_SET_PUSH_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $entity_set_push_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.entity_set_push")));
        $entity_set_push_ref01_data = null;
        if (count($entity_set_push_ref01_data_raw) > 0) {
            $entity_set_push_ref01_data = Helpers::to_map($entity_set_push_ref01_data_raw[0][1]);
        }

        // UPDATE
        $entity_set_push_ref01_ent = $client->EntitySetPush(null);
        $entity_set_push_ref01_data_up0_up = [
        ];

        $entity_set_push_ref01_markdef_up0_name = "set";
        $entity_set_push_ref01_markdef_up0_value = "Mark01-entity_set_push_ref01_" . $setup["now"];
        $entity_set_push_ref01_data_up0_up[$entity_set_push_ref01_markdef_up0_name] = $entity_set_push_ref01_markdef_up0_value;

        $entity_set_push_ref01_resdata_up0_result = $entity_set_push_ref01_ent->update($entity_set_push_ref01_data_up0_up, null);
        $entity_set_push_ref01_resdata_up0 = Helpers::to_map(is_object($entity_set_push_ref01_resdata_up0_result) && method_exists($entity_set_push_ref01_resdata_up0_result, 'data_get') ? $entity_set_push_ref01_resdata_up0_result->data_get() : $entity_set_push_ref01_resdata_up0_result);
        $this->assertNotNull($entity_set_push_ref01_resdata_up0);
        $this->assertEquals($entity_set_push_ref01_resdata_up0[$entity_set_push_ref01_markdef_up0_name], $entity_set_push_ref01_markdef_up0_value);

    }
}

function entity_set_push_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/entity_set_push/EntitySetPushTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RoadieSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["entity_set_push01", "entity_set_push02", "entity_set_push03", "set01", "set02", "set03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ROADIE_TEST_ENTITY_SET_PUSH_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ROADIE_TEST_ENTITY_SET_PUSH_ENTID" => $idmap,
        "ROADIE_TEST_LIVE" => "FALSE",
        "ROADIE_TEST_EXPLAIN" => "FALSE",
        "ROADIE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ROADIE_TEST_ENTITY_SET_PUSH_ENTID"]);
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
