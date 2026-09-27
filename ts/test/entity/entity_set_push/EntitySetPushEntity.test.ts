

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RoadieSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EntitySetPushEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ROADIE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ROADIE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RoadieSDK.test()
    const ent = testsdk.EntitySetPush()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ROADIE_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entity_set_push.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"items":{"a":true,"h":"Items","n":"items","op":{"update":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"The full set of entities.","t":"`$ARRAY`","key$":"items","index$":0},"set":{"a":true,"h":"Set","n":"set","r":false,"t":"`$STRING`","key$":"set","index$":1}},"name":"entity_set_push","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/catalog/roadie-entities/sets/{setId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"set_id","or":"set_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/catalog/roadie-entities/sets/{setId}","q":{"exist":["set_id"]},"r":{"param":{"setId":"set_id"}},"s":[{"lit":"api"},{"lit":"catalog"},{"lit":"roadie-entities"},{"lit":"sets"},{"var":"set_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"entity_set_push","name__orig":"entity_set_push","Name":"EntitySetPush","name_":"entity_set_push","name-":"entity-set-push","NAME":"ENTITY_SET_PUSH","index$":2}, {"active":true,"entity":"entity_set_push","key$":"BasicEntitySetPushFlow","kind":"basic","name":"BasicEntitySetPushFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"entity_set_push_ref01","srcdatavar":"entity_set_push_ref01_data","suffix":"_up0","textfield":"set"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entity_set_push_ref01"}}],"v":[],"index$":0}]}, 'EntitySetPush', {"PUT /api/catalog/roadie-entities/sets/{setId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["items"],"properties":{"items":{"type":"array","description":"The full set of entities. This is a full mutation - the set is replaced.","items":{"type":"object","description":"A Backstage-style catalog entity.","required":["apiVersion","kind","metadata"],"properties":{"apiVersion":{"type":"string","example":"backstage.io/v1alpha1","key$":"apiVersion"},"kind":{"type":"string","description":"Entity kind (Component, API, Resource, System, Group, User, ...).","example":"Resource","key$":"kind"},"metadata":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/EntityMetadata","key$":"metadata"},"spec":{"type":"object","description":"Kind-specific fields. Common ones shown; other properties allowed.","additionalProperties":true,"properties":{},"key$":"spec"},"relations":{"type":"array","items":{},"key$":"relations"}},"x-ref":"#/components/schemas/Entity"},"key$":"items"}},"x-ref":"#/components/schemas/EntitySetPushRequest","index$":1}}}},"parameters":[{"name":"setId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entity_set_push_ref01_data = Object.values(setup.data.existing.entity_set_push)[0] as any

    // UPDATE
    const entity_set_push_ref01_ent = client.EntitySetPush()
    const entity_set_push_ref01_data_up0: any = {}

    const entity_set_push_ref01_markdef_up0 = { name: 'set', value: 'Mark01-entity_set_push_ref01_' + setup.now }
    ;(entity_set_push_ref01_data_up0 as any)[entity_set_push_ref01_markdef_up0.name] = entity_set_push_ref01_markdef_up0.value

    const entity_set_push_ref01_resdata_up0 = (await entity_set_push_ref01_ent.update(entity_set_push_ref01_data_up0)).data()
    assert(null != entity_set_push_ref01_resdata_up0)

    assert((entity_set_push_ref01_resdata_up0 as any)[entity_set_push_ref01_markdef_up0.name] === entity_set_push_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
