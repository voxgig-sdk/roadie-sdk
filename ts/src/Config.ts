
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Roadie',
        slug: "roadie",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.roadie.so",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      entity: {
      },

      entity_set: {
      },

      entity_set_push: {
      },

    }
  }


  entity = {
    "entity": {
      "fields": [
        {
          "name": "apiVersion",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "entityRef",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "kind",
          "req": true,
          "short": "Entity kind (Component, API, Resource, System, Group, User, ...).",
          "type": "`$STRING`"
        },
        {
          "name": "metadata",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "rawData",
          "type": "`$OBJECT`"
        },
        {
          "name": "relations",
          "type": "`$ARRAY`"
        },
        {
          "name": "set",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "spec",
          "short": "Kind-specific fields.",
          "type": "`$OBJECT`"
        },
        {
          "name": "updatedAt",
          "type": "`$STRING`"
        },
        {
          "name": "updatedBy",
          "type": "`$STRING`"
        }
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
                "entities"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/catalog/roadie-entities/entities",
              "parts": [
                "api",
                "catalog",
                "roadie-entities",
                "entities"
              ],
              "select": {
                "exist": [
                  "set"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/catalog/entities",
              "parts": [
                "api",
                "catalog",
                "entities"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/catalog/roadie-entities/entities/{entityId}",
              "parts": [
                "api",
                "catalog",
                "roadie-entities",
                "entities",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entityId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/catalog/roadie-entities/entities/{entityId}",
              "parts": [
                "api",
                "catalog",
                "roadie-entities",
                "entities",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entityId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "entity_set": {
      "fields": [
        {
          "name": "name",
          "type": "`$STRING`"
        }
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
                "sets"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "entity_set_push": {
      "fields": [
        {
          "name": "items",
          "op": {
            "update": {
              "req": true,
              "type": "`$ARRAY`"
            }
          },
          "short": "The full set of entities.",
          "type": "`$ARRAY`"
        },
        {
          "name": "set",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/api/catalog/roadie-entities/sets/{setId}",
              "parts": [
                "api",
                "catalog",
                "roadie-entities",
                "sets",
                "{set_id}"
              ],
              "rename": {
                "param": {
                  "setId": "set_id"
                }
              },
              "select": {
                "exist": [
                  "set_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "set"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

