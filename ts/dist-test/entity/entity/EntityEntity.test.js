"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EntityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ROADIE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RoadieSDK.test();
        const ent = testsdk.Entity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ROADIE_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "apiVersion": { "a": true, "h": "Api Version", "n": "apiVersion", "r": true, "t": "`$STRING`", "key$": "apiVersion", "index$": 0 }, "entityRef": { "a": true, "h": "Entity Ref", "n": "entityRef", "r": false, "t": "`$STRING`", "key$": "entityRef", "index$": 1 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 2 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "sh": "Entity kind (Component, API, Resource, System, Group, User, ...).", "t": "`$STRING`", "key$": "kind", "index$": 3 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "t": "`$OBJECT`", "key$": "metadata", "index$": 4 }, "rawData": { "a": true, "h": "Raw Data", "n": "rawData", "r": false, "t": "`$OBJECT`", "key$": "rawData", "index$": 5 }, "relations": { "a": true, "h": "Relations", "n": "relations", "r": false, "t": "`$ARRAY`", "key$": "relations", "index$": 6 }, "set": { "a": true, "h": "Set", "n": "set", "r": false, "t": "`$STRING`", "key$": "set", "index$": 7 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "t": "`$STRING`", "key$": "source", "index$": 8 }, "spec": { "a": true, "h": "Spec", "n": "spec", "r": false, "sh": "Kind-specific fields.", "t": "`$OBJECT`", "key$": "spec", "index$": 9 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "t": "`$STRING`", "key$": "updatedAt", "index$": 10 }, "updatedBy": { "a": true, "h": "Updated By", "n": "updatedBy", "r": false, "t": "`$STRING`", "key$": "updatedBy", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "entity", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/catalog/roadie-entities/entities", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/catalog/roadie-entities/entities", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "entities" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/catalog/roadie-entities/entities", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "set", "or": "set", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/catalog/roadie-entities/entities", "q": { "exist": ["set"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "entities" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/catalog/entities", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/catalog/entities", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "entities" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/catalog/roadie-entities/entities/{entityId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "entity_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/catalog/roadie-entities/entities/{entityId}", "q": { "exist": ["id"] }, "r": { "param": { "entityId": "id" } }, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "entities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/catalog/roadie-entities/entities/{entityId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "entity_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/catalog/roadie-entities/entities/{entityId}", "q": { "exist": ["id"] }, "r": { "param": { "entityId": "id" } }, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "entities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "entity", "name__orig": "entity", "Name": "Entity", "name_": "entity", "name-": "entity", "NAME": "ENTITY", "index$": 0 }, { "active": true, "entity": "entity", "key$": "BasicEntityFlow", "kind": "basic", "name": "BasicEntityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "entity_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "entity_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "entity_ref01", "srcdatavar": "entity_ref01_data", "suffix": "_dt0" }, "m": { "id": "entity01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-entity_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "entity_ref01", "suffix": "_rm0" }, "m": { "id": "entity01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "entity_ref01" } }], "index$": 4 }] }, 'Entity', { "POST /api/catalog/roadie-entities/entities": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "A Backstage-style catalog entity.", "required": ["apiVersion", "kind", "metadata"], "properties": { "apiVersion": { "type": "string", "example": "backstage.io/v1alpha1", "key$": "apiVersion" }, "kind": { "type": "string", "description": "Entity kind (Component, API, Resource, System, Group, User, ...).", "example": "Resource", "key$": "kind" }, "metadata": { "type": "object", "required": ["name"], "properties": { "name": { "type": "string" }, "namespace": { "type": "string", "default": "default" }, "title": { "type": "string" }, "description": { "type": "string" }, "labels": { "type": "object", "additionalProperties": { "type": "string" } }, "annotations": { "type": "object", "additionalProperties": { "type": "string" } }, "tags": { "type": "array", "items": { "type": "string" } } }, "x-ref": "#/components/schemas/EntityMetadata", "key$": "metadata" }, "spec": { "type": "object", "description": "Kind-specific fields. Common ones shown; other properties allowed.", "additionalProperties": true, "properties": { "owner": { "type": "string" }, "type": { "type": "string" } }, "key$": "spec" }, "relations": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string" }, "targetRef": { "type": "string" } }, "x-ref": "#/components/schemas/Relation" }, "key$": "relations" } }, "x-ref": "#/components/schemas/Entity", "index$": 1 } } } }, "parameters": [] }, "GET /api/catalog/roadie-entities/entities": { "protocol": "http", "parameters": [{ "name": "set", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/catalog/entities": { "protocol": "http", "parameters": [] }, "GET /api/catalog/roadie-entities/entities/{entityId}": { "protocol": "http", "parameters": [{ "name": "entityId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] }, "DELETE /api/catalog/roadie-entities/entities/{entityId}": { "protocol": "http", "parameters": [{ "name": "entityId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const entity_ref01_ent = client.Entity();
        let entity_ref01_data = setup.data.new.entity['entity_ref01'];
        entity_ref01_data = (await entity_ref01_ent.create(entity_ref01_data)).data();
        (0, node_assert_1.default)(null != entity_ref01_data.id);
        // LIST
        const entity_ref01_match = {};
        const entity_ref01_list = (await entity_ref01_ent.list(entity_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(entity_ref01_list, { id: entity_ref01_data.id })));
        // LOAD
        const entity_ref01_match_dt0 = {};
        entity_ref01_match_dt0.id = entity_ref01_data.id;
        const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data();
        (0, node_assert_1.default)(entity_ref01_data_dt0.id === entity_ref01_data.id);
        // REMOVE
        const entity_ref01_match_rm0 = { id: entity_ref01_data.id };
        await entity_ref01_ent.remove(entity_ref01_match_rm0);
        // LIST
        const entity_ref01_match_rt0 = {};
        const entity_ref01_list_rt0 = (await entity_ref01_ent.list(entity_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(entity_ref01_list_rt0, { id: entity_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entity/EntityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RoadieSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entity01', 'entity02', 'entity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ROADIE_TEST_ENTITY_ENTID': idmap,
        'ROADIE_TEST_LIVE': 'FALSE',
        'ROADIE_TEST_EXPLAIN': 'FALSE',
        'ROADIE_APIKEY': '',
    });
    idmap = env['ROADIE_TEST_ENTITY_ENTID'];
    const live = 'TRUE' === env.ROADIE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ROADIE_TEST_ENTITY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RoadieSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ROADIE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ROADIE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EntityEntity.test.js.map