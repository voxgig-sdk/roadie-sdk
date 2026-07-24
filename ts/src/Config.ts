
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


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.roadie.so',

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
          "active": true,
          "name": "api_version",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "entity",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "entity_ref",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "kind",
          "req": true,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "metadata",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 5
        },
        {
          "active": true,
          "name": "raw_data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 6
        },
        {
          "active": true,
          "name": "relation",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "set",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "spec",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 10
        },
        {
          "active": true,
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "updated_by",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        }
      ],
      "name": "entity",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
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
                "res": "`body.entity`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "set",
                    "orig": "set",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
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
              },
              "index$": 1
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "entity_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
                "res": "`body.entity`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "entity_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "entity_set": {
      "fields": [
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        }
      ],
      "name": "entity_set",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "entity_set_push": {
      "fields": [
        {
          "active": true,
          "name": "item",
          "op": {
            "update": {
              "req": true,
              "type": "`$ARRAY`"
            }
          },
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "set",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "entity_set_push",
      "op": {
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "set_id",
                    "orig": "set_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "update"
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

