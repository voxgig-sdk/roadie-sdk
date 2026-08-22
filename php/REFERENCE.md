# Roadie PHP SDK Reference

Complete API reference for the Roadie PHP SDK.


## RoadieSDK

### Constructor

```php
require_once __DIR__ . '/roadie_sdk.php';

$client = new RoadieSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RoadieSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = RoadieSDK::test();
```


### Instance Methods

#### `Entity($data = null)`

Create a new `EntityEntity` instance. Pass `null` for no initial data.

#### `EntitySet($data = null)`

Create a new `EntitySetEntity` instance. Pass `null` for no initial data.

#### `EntitySetPush($data = null)`

Create a new `EntitySetPushEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): RoadieUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EntityEntity

```php
$entity = $client->Entity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apiVersion` | `string` | Yes |  |
| `entityRef` | `string` | No |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | Entity kind (Component, API, Resource, System, Group, User, ...). |
| `metadata` | `array` | Yes |  |
| `rawData` | `array` | No |  |
| `relations` | `array` | No |  |
| `set` | `string` | No |  |
| `source` | `string` | No |  |
| `spec` | `array` | No | Kind-specific fields. |
| `updatedAt` | `string` | No |  |
| `updatedBy` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Entity()->create([
  "apiVersion" => null, // string
  "id" => null, // string
  "kind" => null, // string
  "metadata" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Entity()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Entity()->load(["id" => "entity_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Entity()->remove(["id" => "entity_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntityEntity`

Create a new `EntityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EntitySetEntity

```php
$entity_set = $client->EntitySet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EntitySet()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntitySetEntity`

Create a new `EntitySetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EntitySetPushEntity

```php
$entity_set_push = $client->EntitySetPush();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `array` | No | The full set of entities. |
| `set` | `string` | No |  |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `items` | Yes |
| `set` | - |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->EntitySetPush()->update([
  "set_id" => "set_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntitySetPushEntity`

Create a new `EntitySetPushEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new RoadieSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

