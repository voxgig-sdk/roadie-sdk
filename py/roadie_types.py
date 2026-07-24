# Typed models for the Roadie SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EntityRequired(TypedDict):
    api_version: str
    entity: dict
    kind: str
    metadata: dict


class Entity(EntityRequired, total=False):
    entity_ref: str
    id: str
    raw_data: dict
    relation: list
    set: str
    source: str
    spec: dict
    updated_at: str
    updated_by: str


class EntityLoadMatch(TypedDict):
    id: str


class EntityListMatch(TypedDict, total=False):
    api_version: str
    entity: dict
    entity_ref: str
    id: str
    kind: str
    metadata: dict
    raw_data: dict
    relation: list
    set: str
    source: str
    spec: dict
    updated_at: str
    updated_by: str


class EntityCreateDataRequired(TypedDict):
    api_version: str
    entity: dict
    kind: str
    metadata: dict


class EntityCreateData(EntityCreateDataRequired, total=False):
    entity_ref: str
    id: str
    raw_data: dict
    relation: list
    set: str
    source: str
    spec: dict
    updated_at: str
    updated_by: str


class EntityRemoveMatch(TypedDict):
    id: str


class EntitySet(TypedDict, total=False):
    name: str


class EntitySetListMatch(TypedDict, total=False):
    name: str


class EntitySetPush(TypedDict, total=False):
    item: list
    set: str


class EntitySetPushUpdateData(TypedDict):
    set_id: str
