package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Roadie",
			"slug": "roadie",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.roadie.so",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"entity": map[string]any{},
				"entity_set": map[string]any{},
				"entity_set_push": map[string]any{},
			},
		},
		"entity": map[string]any{
			"entity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "apiVersion",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "entityRef",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"req": true,
						"short": "Entity kind (Component, API, Resource, System, Group, User, ...).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rawData",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "relations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "spec",
						"short": "Kind-specific fields.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedBy",
						"type": "`$STRING`",
					},
				},
				"name": "entity",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/catalog/roadie-entities/entities",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"entities",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "set",
											"orig": "set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/catalog/roadie-entities/entities",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"entities",
								},
								"select": map[string]any{
									"exist": []any{
										"set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/catalog/entities",
								"parts": []any{
									"api",
									"catalog",
									"entities",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "entity_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/catalog/roadie-entities/entities/{entityId}",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"entities",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"entityId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "entity_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/api/catalog/roadie-entities/entities/{entityId}",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"entities",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"entityId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entity_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"name": "entity_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/catalog/roadie-entities/sets",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"sets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"entity_set_push": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "items",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"short": "The full set of entities.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "set",
						"type": "`$STRING`",
					},
				},
				"name": "entity_set_push",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "set_id",
											"orig": "set_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/api/catalog/roadie-entities/sets/{setId}",
								"parts": []any{
									"api",
									"catalog",
									"roadie-entities",
									"sets",
									"{set_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"setId": "set_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"set_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"set",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
