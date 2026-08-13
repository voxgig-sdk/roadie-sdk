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
    apiVersion: str
    id: str
    kind: str
    metadata: dict


class Entity(EntityRequired, total=False):
    entityRef: str
    rawData: dict
    relations: list
    set: str
    source: str
    spec: dict
    updatedAt: str
    updatedBy: str


class EntityLoadMatch(TypedDict):
    id: str


class EntityListMatch(TypedDict, total=False):
    apiVersion: str
    entityRef: str
    id: str
    kind: str
    metadata: dict
    rawData: dict
    relations: list
    set: str
    source: str
    spec: dict
    updatedAt: str
    updatedBy: str


class EntityCreateDataRequired(TypedDict):
    apiVersion: str
    id: str
    kind: str
    metadata: dict


class EntityCreateData(EntityCreateDataRequired, total=False):
    entityRef: str
    rawData: dict
    relations: list
    set: str
    source: str
    spec: dict
    updatedAt: str
    updatedBy: str


class EntityRemoveMatch(TypedDict):
    id: str


class EntitySet(TypedDict, total=False):
    name: str


class EntitySetListMatch(TypedDict, total=False):
    name: str


class EntitySetPush(TypedDict, total=False):
    items: list
    set: str


class EntitySetPushUpdateDataRequired(TypedDict):
    set_id: str


class EntitySetPushUpdateData(EntitySetPushUpdateDataRequired, total=False):
    items: list
    set: str
