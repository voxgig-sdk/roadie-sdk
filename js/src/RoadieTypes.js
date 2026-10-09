// Typed models for the Roadie SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Entity
 * @property {string} apiVersion
 * @property {string} [entityRef]
 * @property {string} id
 * @property {string} kind
 * @property {Object} metadata
 * @property {Object} [rawData]
 * @property {Array} [relations]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updatedAt]
 * @property {string} [updatedBy]
 */

/**
 * @typedef {Object} EntityLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EntityListMatch
 * @property {string} [apiVersion]
 * @property {string} [entityRef]
 * @property {string} [id]
 * @property {string} [kind]
 * @property {Object} [metadata]
 * @property {Object} [rawData]
 * @property {Array} [relations]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updatedAt]
 * @property {string} [updatedBy]
 */

/**
 * @typedef {Object} EntityCreateData
 * @property {string} apiVersion
 * @property {string} [entityRef]
 * @property {string} id
 * @property {string} kind
 * @property {Object} metadata
 * @property {Object} [rawData]
 * @property {Array} [relations]
 * @property {string} [set]
 * @property {string} [source]
 * @property {Object} [spec]
 * @property {string} [updatedAt]
 * @property {string} [updatedBy]
 */

/**
 * @typedef {Object} EntityRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} EntitySet
 * @property {Array} [items]
 * @property {string} [name]
 * @property {string} [set]
 */

/**
 * @typedef {Object} EntitySetListMatch
 * @property {Array} [items]
 * @property {string} [name]
 * @property {string} [set]
 */

/**
 * @typedef {Object} EntitySetUpdateData
 * @property {string} set_id
 * @property {Array} [items]
 * @property {string} [name]
 * @property {string} [set]
 */

