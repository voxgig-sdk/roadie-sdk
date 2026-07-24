# Roadie Lua SDK Reference

Complete API reference for the Roadie Lua SDK.


## RoadieSDK

### Constructor

```lua
local sdk = require("roadie_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Entity(data)`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `EntitySet(data)`

Create a new `EntitySet` entity instance. Pass `nil` for no initial data.

#### `EntitySetPush(data)`

Create a new `EntitySetPush` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## EntityEntity

```lua
local entity = client:Entity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `string` | Yes |  |
| `entity` | `table` | Yes |  |
| `entity_ref` | `string` | No |  |
| `id` | `string` | No |  |
| `kind` | `string` | Yes |  |
| `metadata` | `table` | Yes |  |
| `raw_data` | `table` | No |  |
| `relation` | `table` | No |  |
| `set` | `string` | No |  |
| `source` | `string` | No |  |
| `spec` | `table` | No |  |
| `updated_at` | `string` | No |  |
| `updated_by` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Entity():create({
  api_version = --[[ string ]],
  entity = --[[ table ]],
  kind = --[[ string ]],
  metadata = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Entity():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Entity():load({ id = "entity_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Entity():remove({ id = "entity_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EntitySetEntity

```lua
local entity_set = client:EntitySet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EntitySet():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntitySetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EntitySetPushEntity

```lua
local entity_set_push = client:EntitySetPush(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `table` | No |  |
| `set` | `string` | No |  |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `item` | Yes |
| `set` | - |

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:EntitySetPush():update({
  set_id = "set_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntitySetPushEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

