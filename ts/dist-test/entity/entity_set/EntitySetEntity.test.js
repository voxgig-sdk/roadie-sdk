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
(0, node_test_1.describe)('EntitySetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ROADIE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RoadieSDK.test();
        const ent = testsdk.EntitySet();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('entity_set hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.RoadieSDK.test(offline).EntitySet().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.RoadieSDK.test(offline).EntitySet()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.RoadieSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.EntitySet().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.RoadieSDK.test().EntitySet().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.RoadieSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.EntitySet().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.EntitySet().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.RoadieSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EntitySet().list({ "name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ROADIE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entity_set.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "items": { "a": true, "h": "Items", "n": "items", "op": { "update": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "The full set of entities.", "t": "`$ARRAY`", "key$": "items", "index$": 0 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 1 }, "set": { "a": true, "h": "Set", "n": "set", "r": false, "t": "`$STRING`", "key$": "set", "index$": 2 } }, "name": "entity_set", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/catalog/roadie-entities/sets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/catalog/roadie-entities/sets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "sets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["items"], "co": { "id": "PUT /api/catalog/roadie-entities/sets/{setId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "set_id", "or": "setId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/catalog/roadie-entities/sets/{setId}", "q": { "exist": ["set_id"] }, "r": { "param": { "setId": "set_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "roadie-entities" }, { "lit": "sets" }, { "var": "set_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "entity_set", "name__orig": "entity_set", "Name": "EntitySet", "name_": "entity_set", "name-": "entity-set", "NAME": "ENTITY_SET", "index$": 1 }, { "active": true, "entity": "entity_set", "key$": "BasicEntitySetFlow", "kind": "basic", "name": "BasicEntitySetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "entity_set_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "entity_set_ref01", "srcdatavar": "entity_set_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-entity_set_ref01" } }], "v": [], "unreachable": true }] }, 'EntitySet', { "GET /api/catalog/roadie-entities/sets": { "protocol": "http", "parameters": [] }, "PUT /api/catalog/roadie-entities/sets/{setId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["items"], "properties": { "items": { "type": "array", "description": "The full set of entities. This is a full mutation - the set is replaced.", "items": { "type": "object", "description": "A Backstage-style catalog entity.", "required": ["apiVersion", "kind", "metadata"], "properties": { "apiVersion": { "type": "string", "example": "backstage.io/v1alpha1", "key$": "apiVersion" }, "kind": { "type": "string", "description": "Entity kind (Component, API, Resource, System, Group, User, ...).", "example": "Resource", "key$": "kind" }, "metadata": { "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/EntityMetadata", "key$": "metadata" }, "spec": { "type": "object", "description": "Kind-specific fields. Common ones shown; other properties allowed.", "additionalProperties": true, "properties": {}, "key$": "spec" }, "relations": { "type": "array", "items": {}, "key$": "relations" } }, "x-ref": "#/components/schemas/Entity" }, "key$": "items" } }, "x-ref": "#/components/schemas/EntitySetPushRequest", "index$": 1 } } } }, "parameters": [{ "name": "setId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let entity_set_ref01_data = Object.values(setup.data.existing.entity_set)[0];
        // LIST
        const entity_set_ref01_ent = client.EntitySet();
        const entity_set_ref01_match = {};
        const entity_set_ref01_list = (await entity_set_ref01_ent.list(entity_set_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entity_set/EntitySetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RoadieSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entity_set01', 'entity_set02', 'entity_set03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ROADIE_TEST_ENTITY_SET_ENTID': idmap,
        'ROADIE_TEST_LIVE': 'FALSE',
        'ROADIE_TEST_EXPLAIN': 'FALSE',
        'ROADIE_APIKEY': '',
    });
    idmap = env['ROADIE_TEST_ENTITY_SET_ENTID'];
    const live = 'TRUE' === env.ROADIE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ROADIE_TEST_ENTITY_SET_ENTID'];
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
//# sourceMappingURL=EntitySetEntity.test.js.map