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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EntitySetPushEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ROADIE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RoadieSDK.test();
        const ent = testsdk.EntitySetPush();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ROADIE_TEST_LIVE;
        for (const op of ['update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entity_set_push.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "items", "op": { "update": { "req": true, "type": "`$ARRAY`" } }, "req": false, "short": "The full set of entities.", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "set", "req": false, "type": "`$STRING`", "index$": 1 }], "name": "entity_set_push", "op": { "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "set_id", "orig": "set_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PUT /api/catalog/roadie-entities/sets/{setId}", "json": "{\"operationId\":\"pushEntitySet\",\"parameters\":[{\"in\":\"path\",\"name\":\"setId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"description\":\"The full set of entities. This is a full mutation - the set is replaced.\",\"items\":{\"description\":\"A Backstage-style catalog entity.\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"kind\":{\"description\":\"Entity kind (Component, API, Resource, System, Group, User, ...).\",\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"spec\":{\"additionalProperties\":true,\"description\":\"Kind-specific fields. Common ones shown; other properties allowed.\",\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"items\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"description\":\"A Backstage entity as stored by Roadie, augmented in place with Roadie provenance metadata (id, entityRef, set, source). The entity's own fields sit at the top level - Roadie does not wrap them, it adds to them.\\n\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"entityRef\":{\"example\":\"resource:default/my-resource\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"kind\":{\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"rawData\":{\"additionalProperties\":true,\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"set\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"spec\":{\"additionalProperties\":true,\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"updatedBy\":{\"type\":\"string\"}},\"required\":[\"id\",\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"},\"type\":\"array\"},\"set\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The stored entities for the set.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/api/catalog/roadie-entities/sets/{setId}", "rename": { "param": { "setId": "set_id" } }, "segments": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "sets" }, { "var": "set_id" }], "select": { "exist": ["set_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["set"]] }, "key$": "entity_set_push", "name__orig": "entity_set_push", "Name": "EntitySetPush", "name_": "entity_set_push", "name-": "entity-set-push", "NAME": "ENTITY_SET_PUSH", "index$": 2 }, { "active": true, "entity": "entity_set_push", "key$": "BasicEntitySetPushFlow", "kind": "basic", "name": "BasicEntitySetPushFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "entity_set_push_ref01", "srcdatavar": "entity_set_push_ref01_data", "suffix": "_up0", "textfield": "set" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-entity_set_push_ref01" } }], "valid": [], "index$": 0 }] }, 'EntitySetPush');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let entity_set_push_ref01_data = Object.values(setup.data.existing.entity_set_push)[0];
        // UPDATE
        const entity_set_push_ref01_ent = client.EntitySetPush();
        const entity_set_push_ref01_data_up0 = {};
        const entity_set_push_ref01_markdef_up0 = { name: 'set', value: 'Mark01-entity_set_push_ref01_' + setup.now };
        entity_set_push_ref01_data_up0[entity_set_push_ref01_markdef_up0.name] = entity_set_push_ref01_markdef_up0.value;
        const entity_set_push_ref01_resdata_up0 = (await entity_set_push_ref01_ent.update(entity_set_push_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != entity_set_push_ref01_resdata_up0);
        (0, node_assert_1.default)(entity_set_push_ref01_resdata_up0[entity_set_push_ref01_markdef_up0.name] === entity_set_push_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entity_set_push/EntitySetPushTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RoadieSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entity_set_push01', 'entity_set_push02', 'entity_set_push03', 'set01', 'set02', 'set03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ROADIE_TEST_ENTITY_SET_PUSH_ENTID': idmap,
        'ROADIE_TEST_LIVE': 'FALSE',
        'ROADIE_TEST_EXPLAIN': 'FALSE',
        'ROADIE_APIKEY': '',
    });
    idmap = env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID'];
    const live = 'TRUE' === env.ROADIE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID'];
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
//# sourceMappingURL=EntitySetPushEntity.test.js.map