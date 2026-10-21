# frozen_string_literal: true

# Typed models for the Roadie SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Entity entity data model.
#
# @!attribute [rw] apiVersion
#   @return [String]
#
# @!attribute [rw] entityRef
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] rawData
#   @return [Hash, nil]
#
# @!attribute [rw] relations
#   @return [Array, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] spec
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] updatedBy
#   @return [String, nil]
Entity = Struct.new(
  :apiVersion,
  :entityRef,
  :id,
  :kind,
  :metadata,
  :rawData,
  :relations,
  :set,
  :source,
  :spec,
  :updatedAt,
  :updatedBy,
  keyword_init: true
)

# Request payload for Entity#load.
#
# @!attribute [rw] id
#   @return [String]
EntityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Entity#list.
#
# @!attribute [rw] apiVersion
#   @return [String, nil]
#
# @!attribute [rw] entityRef
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] rawData
#   @return [Hash, nil]
#
# @!attribute [rw] relations
#   @return [Array, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] spec
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] updatedBy
#   @return [String, nil]
EntityListMatch = Struct.new(
  :apiVersion,
  :entityRef,
  :id,
  :kind,
  :metadata,
  :rawData,
  :relations,
  :set,
  :source,
  :spec,
  :updatedAt,
  :updatedBy,
  keyword_init: true
)

# Request payload for Entity#create.
#
# @!attribute [rw] apiVersion
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] relations
#   @return [Array, nil]
#
# @!attribute [rw] spec
#   @return [Hash, nil]
EntityCreateData = Struct.new(
  :apiVersion,
  :kind,
  :metadata,
  :relations,
  :spec,
  keyword_init: true
)

# Request payload for Entity#remove.
#
# @!attribute [rw] id
#   @return [String]
EntityRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# EntitySet entity data model.
#
# @!attribute [rw] items
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
EntitySet = Struct.new(
  :items,
  :name,
  :set,
  keyword_init: true
)

# Request payload for EntitySet#list.
#
# @!attribute [rw] items
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
EntitySetListMatch = Struct.new(
  :items,
  :name,
  :set,
  keyword_init: true
)

# Request payload for EntitySet#update.
#
# @!attribute [rw] set_id
#   @return [String]
#
# @!attribute [rw] items
#   @return [Array, nil]
EntitySetUpdateData = Struct.new(
  :set_id,
  :items,
  keyword_init: true
)

