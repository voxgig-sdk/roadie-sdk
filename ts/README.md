# Roadie TypeScript SDK



The TypeScript SDK for the Roadie API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Entity()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/roadie-sdk/releases](https://github.com/voxgig-sdk/roadie-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { RoadieSDK } from '@voxgig-sdk/roadie'

const client = new RoadieSDK({
  apikey: process.env.ROADIE_APIKEY,
})
```

### 2. List entity records

`list()` resolves to an array of Entity ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const entitys = await client.Entity().list()

for (const entity of entitys) {
  console.log(entity)
}
```

### 3. Load an entity

`load()` returns the entity directly and throws on failure:

```ts
try {
  const entity = await client.Entity().load({ id: 'example_id' })
  console.log(entity)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Entity ENTITY (.data() for the record)
const created = await client.Entity().create({
  apiVersion: 'example_apiVersion',
  id: 'example_id',
  kind: 'example_kind',
  metadata: {},
})

// Remove
await client.Entity().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const entitys = await client.Entity().list()
  console.log(entitys)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = RoadieSDK.test()

const entity = await client.Entity().list()
// entity is the entity, populated with mock response data
// — call entity.data() for the record itself
console.log(entity)
```

You can also use the instance method:

```ts
const client = new RoadieSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Entity()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new RoadieSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ROADIE_TEST_LIVE=TRUE
ROADIE_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### RoadieSDK

#### Constructor

```ts
new RoadieSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Entity(data?)` | `EntityEntity` | Create an Entity entity instance. |
| `EntitySet(data?)` | `EntitySetEntity` | Create an EntitySet entity instance. |
| `EntitySetPush(data?)` | `EntitySetPushEntity` | Create an EntitySetPush entity instance. |
| `tester(testopts?, sdkopts?)` | `RoadieSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `RoadieSDK.test(testopts?, sdkopts?)` | `RoadieSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): RoadieSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Entity

| Field | Description |
| --- | --- |
| `apiVersion` |  |
| `entityRef` |  |
| `id` |  |
| `kind` | Entity kind (Component, API, Resource, System, Group, User, ...). |
| `metadata` |  |
| `rawData` |  |
| `relations` |  |
| `set` |  |
| `source` |  |
| `spec` | Kind-specific fields. |
| `updatedAt` |  |
| `updatedBy` |  |

Operations: create, list, load, remove.

API path: `/api/catalog/roadie-entities/entities`

#### EntitySet

| Field | Description |
| --- | --- |
| `name` |  |

Operations: list.

API path: `/api/catalog/roadie-entities/sets`

#### EntitySetPush

| Field | Description |
| --- | --- |
| `items` | The full set of entities. |
| `set` |  |

Operations: update.

API path: `/api/catalog/roadie-entities/sets/{setId}`



## Entities


### Entity

Create an instance: `const entity = client.Entity()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apiVersion` | `string` |  |
| `entityRef` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` | Entity kind (Component, API, Resource, System, Group, User, ...). |
| `metadata` | `Record<string, any>` |  |
| `rawData` | `Record<string, any>` |  |
| `relations` | `any[]` |  |
| `set` | `string` |  |
| `source` | `string` |  |
| `spec` | `Record<string, any>` | Kind-specific fields. |
| `updatedAt` | `string` |  |
| `updatedBy` | `string` |  |

#### Example: Load

```ts
const entity = await client.Entity().load({ id: 'entity_id' })
```

#### Example: List

```ts
const entitys = await client.Entity().list()
```

#### Example: Create

```ts
const entity = await client.Entity().create({
  apiVersion: 'example_apiVersion',
  id: 'example_id',
  kind: 'example_kind',
  metadata: {},
})
```


### EntitySet

Create an instance: `const entity_set = client.EntitySet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```ts
const entity_sets = await client.EntitySet().list()
```


### EntitySetPush

Create an instance: `const entity_set_push = client.EntitySetPush()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `any[]` | The full set of entities. |
| `set` | `string` |  |


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
roadie/
├── src/
│   ├── RoadieSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { RoadieSDK } from '@voxgig-sdk/roadie'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const entity = client.Entity()
await entity.list()

// entity.data() now returns the entity data from the last `list`
// entity.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
