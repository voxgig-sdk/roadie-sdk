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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
        ["entity_set_push"] = {},
      },
    },
    entity = {
      ["entity"] = {
        ["fields"] = {
          {
            ["name"] = "apiVersion",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "entityRef",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uuid",
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kind",
            ["req"] = true,
            ["short"] = "Entity kind (Component, API, Resource, System, Group, User, ...).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "metadata",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "rawData",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "relations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "set",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "spec",
            ["short"] = "Kind-specific fields.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updatedAt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updatedBy",
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
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "set",
                      ["orig"] = "set",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "set",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                },
              },
              {
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "entities",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entity_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/roadie-entities/entities/{entityId}",
                ["rename"] = {
                  ["param"] = {
                    ["entityId"] = "id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entity_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/api/catalog/roadie-entities/entities/{entityId}",
                ["rename"] = {
                  ["param"] = {
                    ["entityId"] = "id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
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
            ["name"] = "name",
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
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["entity_set_push"] = {
        ["fields"] = {
          {
            ["name"] = "items",
            ["op"] = {
              ["update"] = {
                ["req"] = true,
                ["type"] = "`$ARRAY`",
              },
            },
            ["short"] = "The full set of entities.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "set",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "entity_set_push",
        ["op"] = {
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "set_id",
                      ["orig"] = "set_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/api/catalog/roadie-entities/sets/{setId}",
                ["rename"] = {
                  ["param"] = {
                    ["setId"] = "set_id",
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "set_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                  "{set_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "set",
            },
          },
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
