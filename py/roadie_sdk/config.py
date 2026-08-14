# Roadie SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "entityRef",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "kind",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "rawData",
            "type": "`$OBJECT`",
          },
          {
            "name": "relations",
            "type": "`$ARRAY`",
          },
          {
            "name": "set",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "spec",
            "type": "`$OBJECT`",
          },
          {
            "name": "updatedAt",
            "type": "`$STRING`",
          },
          {
            "name": "updatedBy",
            "type": "`$STRING`",
          },
        ],
        "name": "entity",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/catalog/roadie-entities/entities",
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "set",
                      "orig": "set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/entities",
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "entities",
                ],
                "select": {
                  "exist": [
                    "set",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/entities",
                "parts": [
                  "api",
                  "catalog",
                  "entities",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entity_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/entities/{entityId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entity_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/api/catalog/roadie-entities/entities/{entityId}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/catalog/roadie-entities/sets",
                "parts": [
                  "api",
                  "catalog",
                  "roadie-entities",
                  "sets",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "op": {
              "update": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
            "type": "`$ARRAY`",
          },
          {
            "name": "set",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "set_id",
                      "orig": "set_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/api/catalog/roadie-entities/sets/{setId}",
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
                "select": {
                  "exist": [
                    "set_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "set",
            ],
          ],
        },
      },
    },
    }
