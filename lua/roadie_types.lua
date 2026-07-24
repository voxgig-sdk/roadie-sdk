-- Typed models for the Roadie SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entity
---@field api_version string
---@field entity table
---@field entity_ref? string
---@field id? string
---@field kind string
---@field metadata table
---@field raw_data? table
---@field relation? table
---@field set? string
---@field source? string
---@field spec? table
---@field updated_at? string
---@field updated_by? string

---@class EntityLoadMatch
---@field id string

---@class EntityListMatch
---@field api_version? string
---@field entity? table
---@field entity_ref? string
---@field id? string
---@field kind? string
---@field metadata? table
---@field raw_data? table
---@field relation? table
---@field set? string
---@field source? string
---@field spec? table
---@field updated_at? string
---@field updated_by? string

---@class EntityCreateData
---@field api_version string
---@field entity table
---@field entity_ref? string
---@field id? string
---@field kind string
---@field metadata table
---@field raw_data? table
---@field relation? table
---@field set? string
---@field source? string
---@field spec? table
---@field updated_at? string
---@field updated_by? string

---@class EntityRemoveMatch
---@field id string

---@class EntitySet
---@field name? string

---@class EntitySetListMatch
---@field name? string

---@class EntitySetPush
---@field item? table
---@field set? string

---@class EntitySetPushUpdateData
---@field set_id string

local M = {}

return M
