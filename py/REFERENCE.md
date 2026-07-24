# Roadie Python SDK Reference

Complete API reference for the Roadie Python SDK.


## RoadieSDK

### Constructor

```python
from roadie_sdk import RoadieSDK

client = RoadieSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RoadieSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = RoadieSDK.test()
```


### Instance Methods

#### `Entity(data=None)`

Create a new `EntityEntity` instance. Pass `None` for no initial data.

#### `EntitySet(data=None)`

Create a new `EntitySetEntity` instance. Pass `None` for no initial data.

#### `EntitySetPush(data=None)`

Create a new `EntitySetPushEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EntityEntity

```python
entity = client.Entity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `str` | Yes |  |
| `entity_ref` | `str` | No |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes |  |
| `metadata` | `dict` | Yes |  |
| `raw_data` | `dict` | No |  |
| `relation` | `list` | No |  |
| `set` | `str` | No |  |
| `source` | `str` | No |  |
| `spec` | `dict` | No |  |
| `updated_at` | `str` | No |  |
| `updated_by` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Entity().create({
    "api_version": "example_api_version",  # str
    "id": "example_id",  # str
    "kind": "example_kind",  # str
    "metadata": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Entity().list()
for entity in results:
    print(entity)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Entity().load({"id": "entity_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Entity().remove({"id": "entity_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EntitySetEntity

```python
entity_set = client.EntitySet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EntitySet().list()
for entity_set in results:
    print(entity_set)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntitySetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EntitySetPushEntity

```python
entity_set_push = client.EntitySetPush()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `list` | No |  |
| `set` | `str` | No |  |

### Field Usage by Operation

| Field | update |
| --- | --- |
| `item` | Yes |
| `set` | - |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.EntitySetPush().update({
    "set_id": "set_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntitySetPushEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = RoadieSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

