<?php
declare(strict_types=1);

// Typed models for the Roadie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Entity entity data model. */
class Entity
{
    public string $api_version;
    public ?string $entity_ref = null;
    public string $id;
    public string $kind;
    public array $metadata;
    public ?array $raw_data = null;
    public ?array $relation = null;
    public ?string $set = null;
    public ?string $source = null;
    public ?array $spec = null;
    public ?string $updated_at = null;
    public ?string $updated_by = null;
}

/** Request payload for Entity#load. */
class EntityLoadMatch
{
    public string $id;
}

/** Request payload for Entity#list. */
class EntityListMatch
{
    public ?string $api_version = null;
    public ?string $entity_ref = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?array $metadata = null;
    public ?array $raw_data = null;
    public ?array $relation = null;
    public ?string $set = null;
    public ?string $source = null;
    public ?array $spec = null;
    public ?string $updated_at = null;
    public ?string $updated_by = null;
}

/** Request payload for Entity#create. */
class EntityCreateData
{
    public string $api_version;
    public ?string $entity_ref = null;
    public string $id;
    public string $kind;
    public array $metadata;
    public ?array $raw_data = null;
    public ?array $relation = null;
    public ?string $set = null;
    public ?string $source = null;
    public ?array $spec = null;
    public ?string $updated_at = null;
    public ?string $updated_by = null;
}

/** Request payload for Entity#remove. */
class EntityRemoveMatch
{
    public string $id;
}

/** EntitySet entity data model. */
class EntitySet
{
    public ?string $name = null;
}

/** Request payload for EntitySet#list. */
class EntitySetListMatch
{
    public ?string $name = null;
}

/** EntitySetPush entity data model. */
class EntitySetPush
{
    public ?array $item = null;
    public ?string $set = null;
}

/** Request payload for EntitySetPush#update. */
class EntitySetPushUpdateData
{
    public string $set_id;
}

