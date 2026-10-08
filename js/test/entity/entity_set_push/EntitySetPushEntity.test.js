
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { RoadieSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EntitySetPushEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ROADIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RoadieSDK.test()
    const ent = testsdk.EntitySetPush()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    constructor() {
      super()
      this.name = 'failhook'
      this.version = '0.0.1'
      this.active = true
      this.unexpected = 0
    }
    init() { }
    PreSpec() { throw new Error('entity_set_push hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of RoadieSDK.test(offline).EntitySetPush().stream('list')) { }
    }, /offline/)

    for await (const _item of RoadieSDK.test(offline).EntitySetPush()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != config.feature?.rbac) {
      const denied = RoadieSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.EntitySetPush().stream('list')) { }
      }, (err) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain = {}
    const ctrl = { explain }
    for await (const _item of RoadieSDK.test().EntitySetPush().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new RoadieSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.EntitySetPush().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.EntitySetPush().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == config.feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = RoadieSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EntitySetPush().list({"name":1}),
      (err) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"items":{"a":true,"h":"Items","n":"items","op":{"update":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"The full set of entities.","t":"`$ARRAY`","key$":"items","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":1},"set":{"a":true,"h":"Set","n":"set","r":false,"t":"`$STRING`","key$":"set","index$":2}},"name":"entity_set_push","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/catalog/roadie-entities/sets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/catalog/roadie-entities/sets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"sets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["items"],"co":{"id":"PUT /api/catalog/roadie-entities/sets/{setId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"set_id","or":"setId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/catalog/roadie-entities/sets/{setId}","q":{"exist":["set_id"]},"r":{"param":{"setId":"set_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"sets"},{"var":"set_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"entity_set_push","name__orig":"entity_set_push","Name":"EntitySetPush","name_":"entity_set_push","name-":"entity-set-push","NAME":"ENTITY_SET_PUSH","index$":1}, {"active":true,"entity":"entity_set_push","key$":"BasicEntitySetPushFlow","kind":"basic","name":"BasicEntitySetPushFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"entity_set_push_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"entity_set_push_ref01","srcdatavar":"entity_set_push_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entity_set_push_ref01"}}],"v":[],"unreachable":true}]}, 'EntitySetPush', {"GET /api/catalog/roadie-entities/sets":{"protocol":"http","parameters":[]},"PUT /api/catalog/roadie-entities/sets/{setId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["items"],"properties":{"items":{"type":"array","description":"The full set of entities. This is a full mutation - the set is replaced.","items":{"type":"object","description":"A Backstage-style catalog entity.","required":["apiVersion","kind","metadata"],"properties":{"apiVersion":{"type":"string","example":"backstage.io/v1alpha1","key$":"apiVersion"},"kind":{"type":"string","description":"Entity kind (Component, API, Resource, System, Group, User, ...).","example":"Resource","key$":"kind"},"metadata":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/EntityMetadata","key$":"metadata"},"spec":{"type":"object","description":"Kind-specific fields. Common ones shown; other properties allowed.","additionalProperties":true,"properties":{},"key$":"spec"},"relations":{"type":"array","items":{},"key$":"relations"}},"x-ref":"#/components/schemas/Entity"},"key$":"items"}},"x-ref":"#/components/schemas/EntitySetPushRequest","index$":1}}}},"parameters":[{"name":"setId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entity_set_push_ref01_data = Object.values(setup.data.existing.entity_set_push)[0]

    // LIST
    const entity_set_push_ref01_ent = client.EntitySetPush()
    const entity_set_push_ref01_match = {}

    const entity_set_push_ref01_list = (await entity_set_push_ref01_ent.list(entity_set_push_ref01_match)).map((e) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/entity_set_push/EntitySetPushTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RoadieSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['entity_set_push01','entity_set_push02','entity_set_push03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ROADIE_TEST_ENTITY_SET_PUSH_ENTID': idmap,
    'ROADIE_TEST_LIVE': 'FALSE',
    'ROADIE_TEST_EXPLAIN': 'FALSE',
    'ROADIE_APIKEY': '',
  })

  idmap = env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID']

  const live = 'TRUE' === env.ROADIE_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RoadieSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.ROADIE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
