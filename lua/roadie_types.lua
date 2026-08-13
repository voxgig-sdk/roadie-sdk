-- Typed models for the Roadie SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entity
---@field apiVersion string
---@field entityRef? string
---@field id string
---@field kind string
---@field metadata table
---@field rawData? table
---@field relations? table
---@field set? string
---@field source? string
---@field spec? table
---@field updatedAt? string
---@field updatedBy? string

---@class EntityLoadMatch
---@field id string

---@class EntityListMatch
---@field apiVersion? string
---@field entityRef? string
---@field id? string
---@field kind? string
---@field metadata? table
---@field rawData? table
---@field relations? table
---@field set? string
---@field source? string
---@field spec? table
---@field updatedAt? string
---@field updatedBy? string

---@class EntityCreateData
---@field apiVersion string
---@field entityRef? string
---@field id string
---@field kind string
---@field metadata table
---@field rawData? table
---@field relations? table
---@field set? string
---@field source? string
---@field spec? table
---@field updatedAt? string
---@field updatedBy? string

---@class EntityRemoveMatch
---@field id string

---@class EntitySet
---@field name? string

---@class EntitySetListMatch
---@field name? string

---@class EntitySetPush
---@field items? table
---@field set? string

---@class EntitySetPushUpdateData
---@field set_id string
---@field items? table
---@field set? string

local M = {}

return M
