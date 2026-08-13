// Typed models for the Roadie SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
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
 * @property {string} [name]
 */

/**
 * @typedef {Object} EntitySetListMatch
 * @property {string} [name]
 */

/**
 * @typedef {Object} EntitySetPush
 * @property {Array} [items]
 * @property {string} [set]
 */

/**
 * @typedef {Object} EntitySetPushUpdateData
 * @property {string} set_id
 * @property {Array} [items]
 * @property {string} [set]
 */

