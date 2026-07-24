// Typed models for the Roadie SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Entity
 * @property {string} api_version
 * @property {string} [entity_ref]
 * @property {string} id
 * @property {string} kind
 * @property {Object} metadata
 * @property {Object} [raw_data]
 * @property {Array} [relation]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updated_at]
 * @property {string} [updated_by]
 */

/**
 * @typedef {Object} EntityLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EntityListMatch
 * @property {string} [api_version]
 * @property {string} [entity_ref]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {Object} [metadata]
 * @property {Object} [raw_data]
 * @property {Array} [relation]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updated_at]
 * @property {string} [updated_by]
 */

/**
 * @typedef {Object} EntityCreateData
 * @property {string} api_version
 * @property {string} [entity_ref]
 * @property {string} id
 * @property {string} kind
 * @property {Object} metadata
 * @property {Object} [raw_data]
 * @property {Array} [relation]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updated_at]
 * @property {string} [updated_by]
 */

/**
 * @typedef {Object} EntityRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EntitySet
 * @property {string} [name]
 */

/**
 * @typedef {Object} EntitySetListMatch
 * @property {string} [name]
 */

/**
 * @typedef {Object} EntitySetPush
 * @property {Array} [item]
 * @property {string} [set]
 */

/**
 * @typedef {Object} EntitySetPushUpdateData
 * @property {string} set_id
 */

