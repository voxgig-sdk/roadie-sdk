# Roadie Golang SDK Reference

Complete API reference for the Roadie Golang SDK.


## RoadieSDK

### Constructor

```go
func NewRoadieSDK(options map[string]any) *RoadieSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *RoadieSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *RoadieSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Entity(data map[string]any) RoadieEntity`

Create a new `Entity` entity instance. Pass `nil` for no initial data.

#### `EntitySet(data map[string]any) RoadieEntity`

Create a new `EntitySet` entity instance. Pass `nil` for no initial data.

#### `EntitySetPush(data map[string]any) RoadieEntity`

Create a new `EntitySetPush` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## EntityEntity

```go
entity := client.Entity(nil)
fmt.Println(entity.GetName()) // "entity"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `string` | Yes |  |
| `entity` | `map[string]any` | Yes |  |
| `entity_ref` | `string` | No |  |
| `id` | `string` | No |  |
| `kind` | `string` | Yes |  |
| `metadata` | `map[string]any` | Yes |  |
| `raw_data` | `map[string]any` | No |  |
| `relation` | `[]any` | No |  |
| `set` | `string` | No |  |
| `source` | `string` | No |  |
| `spec` | `map[string]any` | No |  |
| `updated_at` | `string` | No |  |
| `updated_by` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Entity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Entity(nil).Load(map[string]any{"id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Entity(nil).Create(map[string]any{
    "api_version": "example_api_version",
    "entity": map[string]any{},
    "kind": "example_kind",
    "metadata": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Entity(nil).Remove(map[string]any{"id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EntityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EntitySetEntity

```go
entitySet := client.EntitySet(nil)
fmt.Println(entitySet.GetName()) // "entity_set"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EntitySet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EntitySetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EntitySetPushEntity

```go
entitySetPush := client.EntitySetPush(nil)
fmt.Println(entitySetPush.GetName()) // "entity_set_push"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `[]any` | No |  |
| `set` | `string` | No |  |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `item` | Yes |
| `set` | - |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.EntitySetPush(nil).Update(map[string]any{
    "set_id": "set_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EntitySetPushEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewRoadieSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

