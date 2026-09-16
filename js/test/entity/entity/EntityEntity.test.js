
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


describe('EntityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ROADIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RoadieSDK.test()
    const ent = testsdk.Entity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"apiVersion","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"entityRef","req":false,"type":"`$STRING`","index$":1},{"active":true,"format":"uuid","name":"id","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"kind","req":true,"short":"Entity kind (Component, API, Resource, System, Group, User, ...).","type":"`$STRING`","index$":3},{"active":true,"name":"metadata","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"name":"rawData","req":false,"type":"`$OBJECT`","index$":5},{"active":true,"name":"relations","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"name":"set","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"source","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"spec","req":false,"short":"Kind-specific fields.","type":"`$OBJECT`","index$":9},{"active":true,"format":"date-time","name":"updatedAt","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"updatedBy","req":false,"type":"`$STRING`","index$":11}],"id":{"field":"id","name":"id"},"name":"entity","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/catalog/roadie-entities/entities","json":"{\"operationId\":\"createEntity\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Backstage-style catalog entity.\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"kind\":{\"description\":\"Entity kind (Component, API, Resource, System, Group, User, ...).\",\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"spec\":{\"additionalProperties\":true,\"description\":\"Kind-specific fields. Common ones shown; other properties allowed.\",\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Backstage entity as stored by Roadie, augmented in place with Roadie provenance metadata (id, entityRef, set, source). The entity's own fields sit at the top level - Roadie does not wrap them, it adds to them.\\n\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"entityRef\":{\"example\":\"resource:default/my-resource\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"kind\":{\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"rawData\":{\"additionalProperties\":true,\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"set\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"spec\":{\"additionalProperties\":true,\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"updatedBy\":{\"type\":\"string\"}},\"required\":[\"id\",\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"}}},\"description\":\"The stored entity.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/catalog/roadie-entities/entities","segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"entities"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"set","orig":"set","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/catalog/roadie-entities/entities","json":"{\"operationId\":\"listEntities\",\"parameters\":[{\"in\":\"query\",\"name\":\"set\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"A Backstage entity as stored by Roadie, augmented in place with Roadie provenance metadata (id, entityRef, set, source). The entity's own fields sit at the top level - Roadie does not wrap them, it adds to them.\\n\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"entityRef\":{\"example\":\"resource:default/my-resource\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"kind\":{\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"rawData\":{\"additionalProperties\":true,\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"set\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"spec\":{\"additionalProperties\":true,\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"updatedBy\":{\"type\":\"string\"}},\"required\":[\"id\",\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"The stored entities in the given set.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/catalog/roadie-entities/entities","segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"entities"}],"select":{"exist":["set"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /api/catalog/entities","json":"{\"operationId\":\"listCatalogEntities\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"A Backstage-style catalog entity.\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"kind\":{\"description\":\"Entity kind (Component, API, Resource, System, Group, User, ...).\",\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"spec\":{\"additionalProperties\":true,\"description\":\"Kind-specific fields. Common ones shown; other properties allowed.\",\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"All entities in the Backstage software catalog.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/catalog/entities","segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"entities"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"entity_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/catalog/roadie-entities/entities/{entityId}","json":"{\"operationId\":\"getEntity\",\"parameters\":[{\"in\":\"path\",\"name\":\"entityId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Backstage entity as stored by Roadie, augmented in place with Roadie provenance metadata (id, entityRef, set, source). The entity's own fields sit at the top level - Roadie does not wrap them, it adds to them.\\n\",\"properties\":{\"apiVersion\":{\"example\":\"backstage.io/v1alpha1\",\"type\":\"string\"},\"entityRef\":{\"example\":\"resource:default/my-resource\",\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"kind\":{\"example\":\"Resource\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"annotations\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"description\":{\"type\":\"string\"},\"labels\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"namespace\":{\"default\":\"default\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"rawData\":{\"additionalProperties\":true,\"type\":\"object\"},\"relations\":{\"items\":{\"properties\":{\"targetRef\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"set\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"spec\":{\"additionalProperties\":true,\"properties\":{\"owner\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"updatedBy\":{\"type\":\"string\"}},\"required\":[\"id\",\"apiVersion\",\"kind\",\"metadata\"],\"type\":\"object\"}}},\"description\":\"The stored entity.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/catalog/roadie-entities/entities/{entityId}","rename":{"param":{"entityId":"id"}},"segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"entities"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"entity_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/catalog/roadie-entities/entities/{entityId}","json":"{\"operationId\":\"deleteEntity\",\"parameters\":[{\"in\":\"path\",\"name\":\"entityId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API token.\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Roadie API token, sent as 'Authorization: bearer <token>'. User tokens and service tokens work identically.\\n\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/catalog/roadie-entities/entities/{entityId}","rename":{"param":{"entityId":"id"}},"segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"entities"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"entity","name__orig":"entity","Name":"Entity","name_":"entity","name-":"entity","NAME":"ENTITY","index$":0}, {"active":true,"entity":"entity","key$":"BasicEntityFlow","kind":"basic","name":"BasicEntityFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"entity_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"entity_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"entity_ref01","srcdatavar":"entity_ref01_data","suffix":"_dt0"},"match":{"id":"entity01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entity_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"entity_ref01","suffix":"_rm0"},"match":{"id":"entity01"},"op":"remove","spec":[],"valid":[],"index$":3},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"entity_ref01"}}],"index$":4}]}, 'Entity')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const entity_ref01_ent = client.Entity()
    let entity_ref01_data = setup.data.new.entity['entity_ref01']

    entity_ref01_data = (await entity_ref01_ent.create(entity_ref01_data)).data()
    assert(null != entity_ref01_data.id)


    // LIST
    const entity_ref01_match = {}

    const entity_ref01_list = (await entity_ref01_ent.list(entity_ref01_match)).map((e) => e.data())

    assert(!isempty(select(entity_ref01_list, { id: entity_ref01_data.id })))


    // LOAD
    const entity_ref01_match_dt0 = {}
    entity_ref01_match_dt0.id = entity_ref01_data.id
    const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data()
    assert(entity_ref01_data_dt0.id === entity_ref01_data.id)


    // REMOVE
    const entity_ref01_match_rm0 = {}
    entity_ref01_match_rm0.id = entity_ref01_data.id
    await entity_ref01_ent.remove(entity_ref01_match_rm0)
  

    // LIST
    const entity_ref01_match_rt0 = {}

    const entity_ref01_list_rt0 = (await entity_ref01_ent.list(entity_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(entity_ref01_list_rt0, { id: entity_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/entity/EntityTestData.json')

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
    ['entity01','entity02','entity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ROADIE_TEST_ENTITY_ENTID': idmap,
    'ROADIE_TEST_LIVE': 'FALSE',
    'ROADIE_TEST_EXPLAIN': 'FALSE',
    'ROADIE_APIKEY': '',
  })

  idmap = env['ROADIE_TEST_ENTITY_ENTID']

  const live = 'TRUE' === env.ROADIE_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ROADIE_TEST_ENTITY_ENTID']
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
  
