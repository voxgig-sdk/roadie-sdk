package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/roadie-sdk/go"
	"github.com/voxgig-sdk/roadie-sdk/go/core"

	vs "github.com/voxgig-sdk/roadie-sdk/go/utility/struct"
)

func TestEntitySetPushEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EntitySetPush(nil)
		if ent == nil {
			t.Fatal("expected non-nil EntitySetPushEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := entity_set_pushBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "entity_set_push." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_SET_PUSH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		entitySetPushRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.entity_set_push", setup.data)))
		var entitySetPushRef01Data map[string]any
		if len(entitySetPushRef01DataRaw) > 0 {
			entitySetPushRef01Data = core.ToMapAny(entitySetPushRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = entitySetPushRef01Data

		// UPDATE
		entitySetPushRef01Ent := client.EntitySetPush(nil)
		entitySetPushRef01DataUp0Up := map[string]any{
		}

		entitySetPushRef01MarkdefUp0Name := "set"
		entitySetPushRef01MarkdefUp0Value := fmt.Sprintf("Mark01-entity_set_push_ref01_%d", setup.now)
		entitySetPushRef01DataUp0Up[entitySetPushRef01MarkdefUp0Name] = entitySetPushRef01MarkdefUp0Value

		entitySetPushRef01ResdataUp0Result, err := entitySetPushRef01Ent.Update(entitySetPushRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		entitySetPushRef01ResdataUp0 := core.ToMapAny(entitySetPushRef01ResdataUp0Result)
		if entitySetPushRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if entitySetPushRef01ResdataUp0[entitySetPushRef01MarkdefUp0Name] != entitySetPushRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", entitySetPushRef01MarkdefUp0Name, entitySetPushRef01ResdataUp0[entitySetPushRef01MarkdefUp0Name])
		}

	})
}

func entity_set_pushBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "entity_set_push", "EntitySetPushTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read entity_set_push test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse entity_set_push test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"entity_set_push01", "entity_set_push02", "entity_set_push03", "set01", "set02", "set03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ROADIE_TEST_ENTITY_SET_PUSH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ROADIE_TEST_ENTITY_SET_PUSH_ENTID": idmap,
		"ROADIE_TEST_LIVE":      "FALSE",
		"ROADIE_TEST_EXPLAIN":   "FALSE",
		"ROADIE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ROADIE_TEST_ENTITY_SET_PUSH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ROADIE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ROADIE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewRoadieSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ROADIE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ROADIE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
