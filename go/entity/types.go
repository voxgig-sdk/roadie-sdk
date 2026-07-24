// Typed models for the Roadie SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Entity is the typed data model for the entity entity.
type Entity struct {
	ApiVersion string `json:"api_version"`
	EntityRef *string `json:"entity_ref,omitempty"`
	Id string `json:"id"`
	Kind string `json:"kind"`
	Metadata map[string]any `json:"metadata"`
	RawData *map[string]any `json:"raw_data,omitempty"`
	Relation *[]any `json:"relation,omitempty"`
	Set *string `json:"set,omitempty"`
	Source *string `json:"source,omitempty"`
	Spec *map[string]any `json:"spec,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UpdatedBy *string `json:"updated_by,omitempty"`
}

// EntityLoadMatch is the typed request payload for Entity.LoadTyped.
type EntityLoadMatch struct {
	Id string `json:"id"`
}

// EntityListMatch is the typed request payload for Entity.ListTyped.
type EntityListMatch struct {
	ApiVersion *string `json:"api_version,omitempty"`
	EntityRef *string `json:"entity_ref,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	RawData *map[string]any `json:"raw_data,omitempty"`
	Relation *[]any `json:"relation,omitempty"`
	Set *string `json:"set,omitempty"`
	Source *string `json:"source,omitempty"`
	Spec *map[string]any `json:"spec,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UpdatedBy *string `json:"updated_by,omitempty"`
}

// EntityCreateData is the typed request payload for Entity.CreateTyped.
type EntityCreateData struct {
	ApiVersion string `json:"api_version"`
	EntityRef *string `json:"entity_ref,omitempty"`
	Id string `json:"id"`
	Kind string `json:"kind"`
	Metadata map[string]any `json:"metadata"`
	RawData *map[string]any `json:"raw_data,omitempty"`
	Relation *[]any `json:"relation,omitempty"`
	Set *string `json:"set,omitempty"`
	Source *string `json:"source,omitempty"`
	Spec *map[string]any `json:"spec,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	UpdatedBy *string `json:"updated_by,omitempty"`
}

// EntityRemoveMatch is the typed request payload for Entity.RemoveTyped.
type EntityRemoveMatch struct {
	Id string `json:"id"`
}

// EntitySet is the typed data model for the entity_set entity.
type EntitySet struct {
	Name *string `json:"name,omitempty"`
}

// EntitySetListMatch is the typed request payload for EntitySet.ListTyped.
type EntitySetListMatch struct {
	Name *string `json:"name,omitempty"`
}

// EntitySetPush is the typed data model for the entity_set_push entity.
type EntitySetPush struct {
	Item *[]any `json:"item,omitempty"`
	Set *string `json:"set,omitempty"`
}

// EntitySetPushUpdateData is the typed request payload for EntitySetPush.UpdateTyped.
type EntitySetPushUpdateData struct {
	SetId string `json:"set_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
