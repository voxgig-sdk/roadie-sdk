-- EntitySetPush entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("roadie_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EntitySetPushEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EntitySetPush(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = entity_set_push_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "entity_set_push." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_SET_PUSH_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local entity_set_push_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.entity_set_push")))
    local entity_set_push_ref01_data = nil
    if #entity_set_push_ref01_data_raw > 0 then
      entity_set_push_ref01_data = helpers.to_map(entity_set_push_ref01_data_raw[1][2])
    end

    -- UPDATE
    local entity_set_push_ref01_ent = client:EntitySetPush(nil)
    local entity_set_push_ref01_data_up0_up = {
    }

    local entity_set_push_ref01_markdef_up0_name = "set"
    local entity_set_push_ref01_markdef_up0_value = "Mark01-entity_set_push_ref01_" .. tostring(setup.now)
    entity_set_push_ref01_data_up0_up[entity_set_push_ref01_markdef_up0_name] = entity_set_push_ref01_markdef_up0_value

    local entity_set_push_ref01_resdata_up0_result, err = entity_set_push_ref01_ent:update(entity_set_push_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local entity_set_push_ref01_resdata_up0 = helpers.to_map(entity_set_push_ref01_resdata_up0_result)
    assert.is_not_nil(entity_set_push_ref01_resdata_up0)
    assert.are.equal(entity_set_push_ref01_resdata_up0[entity_set_push_ref01_markdef_up0_name], entity_set_push_ref01_markdef_up0_value)

  end)
end)

function entity_set_push_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/entity_set_push/EntitySetPushTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read entity_set_push test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "entity_set_push01", "entity_set_push02", "entity_set_push03", "set01", "set02", "set03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("ROADIE_TEST_ENTITY_SET_PUSH_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["ROADIE_TEST_ENTITY_SET_PUSH_ENTID"] = idmap,
    ["ROADIE_TEST_LIVE"] = "FALSE",
    ["ROADIE_TEST_EXPLAIN"] = "FALSE",
    ["ROADIE_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["ROADIE_TEST_ENTITY_SET_PUSH_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["ROADIE_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["ROADIE_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["ROADIE_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["ROADIE_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
