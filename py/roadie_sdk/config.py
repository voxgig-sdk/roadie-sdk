# Roadie SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Roadie",
            "slug": "roadie",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.roadie.so",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "entity": {},
                "entity_set": {},
                "entity_set_push": {},
            },
        },
        "entity": {
      "entity": {
        "fields": [
          {
            "name": "apiVersion",
            "title": "Api Version",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "entityRef",
            "title": "Entity Ref",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "format": "uuid",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "Entity kind (Component, API, Resource, System, Group, User, ...).",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "rawData",
            "title": "Raw Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "relations",
            "title": "Relations",
            "type": "`$ARRAY`",
          },
          {
            "name": "set",
            "title": "Set",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
          },
          {
            "name": "spec",
            "title": "Spec",
            "type": "`$OBJECT`",
            "short": "Kind-specific fields.",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "updatedBy",
            "title": "Updated By",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "entity",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/catalog/roadie-entities/entities",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "entities",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/entities",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "entities",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "set",
                      "orig": "set",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "set",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/entities",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "entities",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "entities",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/entities/{entityId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "entities",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entityId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "entity_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/catalog/roadie-entities/entities/{entityId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "entities",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entityId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "entity_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "entity_set": {
        "fields": [
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
        ],
        "name": "entity_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/sets",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "sets",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "entity_set_push": {
        "fields": [
          {
            "name": "items",
            "title": "Items",
            "type": "`$ARRAY`",
            "op": {
              "update": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
            "short": "The full set of entities.",
          },
          {
            "name": "set",
            "title": "Set",
            "type": "`$STRING`",
          },
        ],
        "name": "entity_set_push",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/api/catalog/roadie-entities/sets/{setId}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalog",
                  },
                  {
                    "lit": "roadie-entities",
                  },
                  {
                    "lit": "sets",
                  },
                  {
                    "var": "set_id",
                  },
                ],
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                  "{set_id}",
                ],
                "rename": {
                  "param": {
                    "setId": "set_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "set_id",
                      "orig": "set_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "set_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
