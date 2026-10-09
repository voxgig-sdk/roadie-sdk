"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Roadie',
        slug: "roadie",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.roadie.so",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            entity: {},
            entity_set: {},
        }
    };
    entity = {
        "entity": {
            "fields": [
                {
                    "name": "apiVersion",
                    "title": "Api Version",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "entityRef",
                    "title": "Entity Ref",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "uuid"
                },
                {
                    "name": "kind",
                    "title": "Kind",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Entity kind (Component, API, Resource, System, Group, User, ...)."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "rawData",
                    "title": "Raw Data",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "relations",
                    "title": "Relations",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "set",
                    "title": "Set",
                    "type": "`$STRING`"
                },
                {
                    "name": "source",
                    "title": "Source",
                    "type": "`$STRING`"
                },
                {
                    "name": "spec",
                    "title": "Spec",
                    "type": "`$OBJECT`",
                    "short": "Kind-specific fields."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "updatedBy",
                    "title": "Updated By",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "entities"
                                }
                            ],
                            "parts": [
                                "api",
                                "catalog",
                                "roadie-entities",
                                "entities"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "entities"
                                }
                            ],
                            "parts": [
                                "api",
                                "catalog",
                                "roadie-entities",
                                "entities"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "set",
                                        "orig": "set",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "set"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/catalog/entities",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "entities"
                                }
                            ],
                            "parts": [
                                "api",
                                "catalog",
                                "entities"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "entities"
                                },
                                {
                                    "var": "id"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "entityId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "entities"
                                },
                                {
                                    "var": "id"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "entityId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
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
                    "name": "items",
                    "title": "Items",
                    "type": "`$ARRAY`",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "The full set of entities."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "set",
                    "title": "Set",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/catalog/roadie-entities/sets",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "sets"
                                }
                            ],
                            "parts": [
                                "api",
                                "catalog",
                                "roadie-entities",
                                "sets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
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
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalog"
                                },
                                {
                                    "lit": "roadie-entities"
                                },
                                {
                                    "lit": "sets"
                                },
                                {
                                    "var": "set_id"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "set_id",
                                        "orig": "setId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "set_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map