
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { RoadieSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EntitySetPushEntity', async () => {

  test('instance', async () => {
    const testsdk = RoadieSDK.test()
    const ent = testsdk.EntitySetPush()
    assert(null != ent)
  })


  // Feature #4: the entity `stream(action, ...)` method runs the op pipeline
  // and returns an async iterator over result items. With the streaming
  // feature active it yields the feature's incremental output; otherwise it
  // falls back to the materialised list so `stream` always yields.
  test('stream', async () => {
    const seed = {
      entity: {
        entity_set_push: { s1: { id: 's1' }, s2: { id: 's2' }, s3: { id: 's3' } }
      }
    }

    // Fallback: streaming inactive -> yields the materialised list items.
    const base = RoadieSDK.test(seed)
    const seen = []
    for await (const item of base.EntitySetPush().stream('list')) {
      seen.push(item)
    }
    assert.equal(seen.length, 3)

    // Inbound: streaming active -> yields each item from the feature iterator.
    if (config.feature && config.feature.streaming) {
      const sdk = RoadieSDK.test(seed, { feature: { streaming: { active: true } } })
      const got = []
      for await (const item of sdk.EntitySetPush().stream('list')) {
        if (Array.isArray(item)) { got.push(...item) } else { got.push(item) }
      }
      assert.equal(got.length, 3)
    }
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entity_set_push_ref01_data = Object.values(setup.data.existing.entity_set_push)[0]

    // UPDATE
    const entity_set_push_ref01_ent = client.EntitySetPush()
    const entity_set_push_ref01_data_up0 = {}

    const entity_set_push_ref01_markdef_up0 = { name: 'set', value: 'Mark01-entity_set_push_ref01_' + setup.now }
    entity_set_push_ref01_data_up0 [entity_set_push_ref01_markdef_up0.name] = entity_set_push_ref01_markdef_up0.value

    const entity_set_push_ref01_resdata_up0 = await entity_set_push_ref01_ent.update(entity_set_push_ref01_data_up0)
    assert(null != entity_set_push_ref01_resdata_up0)

    assert(entity_set_push_ref01_resdata_up0[entity_set_push_ref01_markdef_up0.name] === entity_set_push_ref01_markdef_up0.value)


  })
})



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
    ['entity_set_push01','entity_set_push02','entity_set_push03','set01','set02','set03'],
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
    'ROADIE_APIKEY': 'NONE',
  })

  idmap = env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID']

  if ('TRUE' === env.ROADIE_TEST_LIVE) {
    client = new RoadieSDK(merge([
      {
        apikey: env.ROADIE_APIKEY,
      },
      extra
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
    now: Date.now(),
  }

  return setup
}
  
