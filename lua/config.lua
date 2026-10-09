-- Roadie SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Roadie",
      slug = "roadie",
      version = "0.1.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.roadie.so",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["entity"] = {},
        ["entity_set"] = {},
      },
    },
    entity = {
      ["entity"] = {
        ["fields"] = {
          {
            ["name"] = "apiVersion",
            ["title"] = "Api Version",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "entityRef",
            ["title"] = "Entity Ref",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["format"] = "uuid",
          },
          {
            ["name"] = "kind",
            ["title"] = "Kind",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Entity kind (Component, API, Resource, System, Group, User, ...).",
          },
          {
            ["name"] = "metadata",
            ["title"] = "Metadata",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "rawData",
            ["title"] = "Raw Data",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "relations",
            ["title"] = "Relations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "set",
            ["title"] = "Set",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["title"] = "Source",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "spec",
            ["title"] = "Spec",
            ["type"] = "`$OBJECT`",
            ["short"] = "Kind-specific fields.",
          },
          {
            ["name"] = "updatedAt",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "updatedBy",
            ["title"] = "Updated By",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "entity",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/catalog/roadie-entities/entities",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "entities",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/roadie-entities/entities",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "entities",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "set",
                      ["orig"] = "set",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "set",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/entities",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "entities",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "entities",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/roadie-entities/entities/{entityId}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "entities",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["entityId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "entityId",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/catalog/roadie-entities/entities/{entityId}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "entities",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["entityId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "entityId",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["entity_set"] = {
        ["fields"] = {
          {
            ["name"] = "items",
            ["title"] = "Items",
            ["type"] = "`$ARRAY`",
            ["op"] = {
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$ARRAY`",
              },
            },
            ["short"] = "The full set of entities.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "set",
            ["title"] = "Set",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "entity_set",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/roadie-entities/sets",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "sets",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/catalog/roadie-entities/sets/{setId}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "roadie-entities",
                  },
                  {
                    ["lit"] = "sets",
                  },
                  {
                    ["var"] = "set_id",
                  },
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                  "{set_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["setId"] = "set_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "set_id",
                      ["orig"] = "setId",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "set_id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
