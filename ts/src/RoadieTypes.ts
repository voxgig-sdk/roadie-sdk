// Typed models for the Roadie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Entity {
  api_version: string
  entity: Record<string, any>
  entity_ref?: string
  id?: string
  kind: string
  metadata: Record<string, any>
  raw_data?: Record<string, any>
  relation?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updated_at?: string
  updated_by?: string
}

export interface EntityLoadMatch {
  id: string
}

export interface EntityListMatch {
  api_version?: string
  entity?: Record<string, any>
  entity_ref?: string
  id?: string
  kind?: string
  metadata?: Record<string, any>
  raw_data?: Record<string, any>
  relation?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updated_at?: string
  updated_by?: string
}

export interface EntityCreateData {
  api_version: string
  entity: Record<string, any>
  entity_ref?: string
  id?: string
  kind: string
  metadata: Record<string, any>
  raw_data?: Record<string, any>
  relation?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updated_at?: string
  updated_by?: string
}

export interface EntityRemoveMatch {
  id: string
}

export interface EntitySet {
  name?: string
}

export interface EntitySetListMatch {
  name?: string
}

export interface EntitySetPush {
  item?: any[]
  set?: string
}

export interface EntitySetPushUpdateData {
  set_id: string
}

