// Typed models for the Roadie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Entity {
  apiVersion: string
  entityRef?: string
  id: string
  kind: string
  metadata: Record<string, any>
  rawData?: Record<string, any>
  relations?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updatedAt?: string
  updatedBy?: string
}

export interface EntityLoadMatch {
  id: string
}

export interface EntityListMatch {
  apiVersion?: string
  entityRef?: string
  id?: string
  kind?: string
  metadata?: Record<string, any>
  rawData?: Record<string, any>
  relations?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updatedAt?: string
  updatedBy?: string
}

export interface EntityCreateData {
  apiVersion: string
  entityRef?: string
  id: string
  kind: string
  metadata: Record<string, any>
  rawData?: Record<string, any>
  relations?: any[]
  set?: string
  source?: string
  spec?: Record<string, any>
  updatedAt?: string
  updatedBy?: string
}

export interface EntityRemoveMatch {
  id: string
}

export interface EntitySet {
  items?: any[]
  name?: string
  set?: string
}

export interface EntitySetListMatch {
  items?: any[]
  name?: string
  set?: string
}

export interface EntitySetUpdateData {
  set_id: string
  items?: any[]
  name?: string
  set?: string
}

