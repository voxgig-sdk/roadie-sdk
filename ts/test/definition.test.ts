import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "create",
    "method": "POST",
    "path": "/api/catalog/roadie-entities/entities",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "apiVersion": "backstage.io/v1alpha1",
      "kind": "Resource",
      "metadata": {
        "name": "x",
        "namespace": "x",
        "title": "x",
        "description": "x",
        "labels": {},
        "annotations": {},
        "tags": [
          "x"
        ]
      },
      "spec": {
        "owner": "x",
        "type": "x"
      },
      "relations": [
        {
          "type": "x",
          "targetRef": "x"
        }
      ],
      "entityRef": "resource:default/my-resource",
      "rawData": {},
      "set": "x",
      "updatedBy": "x",
      "source": "x",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "list",
    "method": "GET",
    "path": "/api/catalog/roadie-entities/entities",
    "args": [],
    "select": {
      "set": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "set"
    ],
    "queryArgs": [
      {
        "name": "set",
        "wire": "set"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "apiVersion": "backstage.io/v1alpha1",
        "kind": "Resource",
        "metadata": {
          "name": "x",
          "namespace": "x",
          "title": "x",
          "description": "x",
          "labels": {},
          "annotations": {},
          "tags": [
            "x"
          ]
        },
        "spec": {
          "owner": "x",
          "type": "x"
        },
        "relations": [
          {
            "type": "x",
            "targetRef": "x"
          }
        ],
        "entityRef": "resource:default/my-resource",
        "rawData": {},
        "set": "x",
        "updatedBy": "x",
        "source": "x",
        "updatedAt": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "list",
    "method": "GET",
    "path": "/api/catalog/entities",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "apiVersion": "backstage.io/v1alpha1",
        "kind": "Resource",
        "metadata": {
          "name": "x",
          "namespace": "x",
          "title": "x",
          "description": "x",
          "labels": {},
          "annotations": {},
          "tags": [
            "x"
          ]
        },
        "spec": {
          "owner": "x",
          "type": "x"
        },
        "relations": [
          {
            "type": "x",
            "targetRef": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "load",
    "method": "GET",
    "path": "/api/catalog/roadie-entities/entities/{entityId}",
    "args": [
      {
        "name": "id",
        "wire": "entityId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "apiVersion": "backstage.io/v1alpha1",
      "kind": "Resource",
      "metadata": {
        "name": "x",
        "namespace": "x",
        "title": "x",
        "description": "x",
        "labels": {},
        "annotations": {},
        "tags": [
          "x"
        ]
      },
      "spec": {
        "owner": "x",
        "type": "x"
      },
      "relations": [
        {
          "type": "x",
          "targetRef": "x"
        }
      ],
      "entityRef": "resource:default/my-resource",
      "rawData": {},
      "set": "x",
      "updatedBy": "x",
      "source": "x",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "entity",
    "accessor": "Entity",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/catalog/roadie-entities/entities/{entityId}",
    "args": [
      {
        "name": "id",
        "wire": "entityId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "entity_set",
    "accessor": "EntitySet",
    "op": "list",
    "method": "GET",
    "path": "/api/catalog/roadie-entities/sets",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "name": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "entity_set",
    "accessor": "EntitySet",
    "op": "update",
    "method": "PUT",
    "path": "/api/catalog/roadie-entities/sets/{setId}",
    "args": [
      {
        "name": "set_id",
        "wire": "setId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "set": "x",
      "items": [
        {
          "id": "x",
          "apiVersion": "backstage.io/v1alpha1",
          "kind": "Resource",
          "metadata": {
            "name": "x",
            "namespace": "x",
            "title": "x",
            "description": "x",
            "labels": {},
            "annotations": {},
            "tags": [
              "x"
            ]
          },
          "spec": {
            "owner": "x",
            "type": "x"
          },
          "relations": [
            {
              "type": "x",
              "targetRef": "x"
            }
          ],
          "entityRef": "resource:default/my-resource",
          "rawData": {},
          "set": "x",
          "updatedBy": "x",
          "source": "x",
          "updatedAt": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
