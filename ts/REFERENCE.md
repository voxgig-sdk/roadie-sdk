# Roadie TypeScript SDK Reference

Complete API reference for the Roadie TypeScript SDK.


## RoadieSDK

### Constructor

```ts
new RoadieSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RoadieSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = RoadieSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `RoadieSDK` instance in test mode.


### Instance Methods

#### `Entity(data?: object)`

Create a new `Entity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntityEntity` instance.

#### `EntitySet(data?: object)`

Create a new `EntitySet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntitySetEntity` instance.

#### `EntitySetPush(data?: object)`

Create a new `EntitySetPush` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntitySetPushEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RoadieSDK.test()`.

**Returns:** `RoadieSDK` instance in test mode.


---

## EntityEntity

```ts
const entity = client.Entity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `string` | Yes |  |
| `entity` | `Record<string, any>` | Yes |  |
| `entity_ref` | `string` | No |  |
| `id` | `string` | No |  |
| `kind` | `string` | Yes |  |
| `metadata` | `Record<string, any>` | Yes |  |
| `raw_data` | `Record<string, any>` | No |  |
| `relation` | `any[]` | No |  |
| `set` | `string` | No |  |
| `source` | `string` | No |  |
| `spec` | `Record<string, any>` | No |  |
| `updated_at` | `string` | No |  |
| `updated_by` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Entity().create({
  api_version: 'example_api_version',
  entity: {},
  kind: 'example_kind',
  metadata: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Entity().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Entity().load({ id: 'entity_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Entity().remove({ id: 'entity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntityEntity` instance with the same client and
options.

#### `client()`

Return the parent `RoadieSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EntitySetEntity

```ts
const entity_set = client.EntitySet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EntitySet().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntitySetEntity` instance with the same client and
options.

#### `client()`

Return the parent `RoadieSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EntitySetPushEntity

```ts
const entity_set_push = client.EntitySetPush()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `any[]` | No |  |
| `set` | `string` | No |  |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `item` | Yes |
| `set` | - |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.EntitySetPush().update({
  set_id: 'set_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntitySetPushEntity` instance with the same client and
options.

#### `client()`

Return the parent `RoadieSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new RoadieSDK({
  feature: {
    test: { active: true },
  }
})
```

