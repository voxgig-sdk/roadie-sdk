
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


describe('EntityEntity', async () => {

  test('instance', async () => {
    const testsdk = RoadieSDK.test()
    const ent = testsdk.Entity()
    assert(null != ent)
  })


  // Feature #4: the entity `stream(action, ...)` method runs the op pipeline
  // and returns an async iterator over result items. With the streaming
  // feature active it yields the feature's incremental output; otherwise it
  // falls back to the materialised list so `stream` always yields.
  test('stream', async () => {
    const seed = {
      entity: {
        entity: { s1: { id: 's1' }, s2: { id: 's2' }, s3: { id: 's3' } }
      }
    }

    // Fallback: streaming inactive -> yields the materialised list items.
    const base = RoadieSDK.test(seed)
    const seen = []
    for await (const item of base.Entity().stream('list')) {
      seen.push(item)
    }
    assert.equal(seen.length, 3)

    // Inbound: streaming active -> yields each item from the feature iterator.
    if (config.feature && config.feature.streaming) {
      const sdk = RoadieSDK.test(seed, { feature: { streaming: { active: true } } })
      const got = []
      for await (const item of sdk.Entity().stream('list')) {
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


    // CREATE
    const entity_ref01_ent = client.Entity()
    let entity_ref01_data = setup.data.new.entity['entity_ref01']

    entity_ref01_data = await entity_ref01_ent.create(entity_ref01_data)
    assert(null != entity_ref01_data.id)


    // LIST
    const entity_ref01_match = {}

    const entity_ref01_list = await entity_ref01_ent.list(entity_ref01_match)

    assert(!isempty(select(entity_ref01_list, { id: entity_ref01_data.id })))


    // LOAD
    const entity_ref01_match_dt0 = {}
    entity_ref01_match_dt0.id = entity_ref01_data.id
    const entity_ref01_data_dt0 = await entity_ref01_ent.load(entity_ref01_match_dt0)
    assert(entity_ref01_data_dt0.id === entity_ref01_data.id)


    // REMOVE
    const entity_ref01_match_rm0 = {}
    entity_ref01_match_rm0.id = entity_ref01_data.id
    await entity_ref01_ent.remove(entity_ref01_match_rm0)
  

    // LIST
    const entity_ref01_match_rt0 = {}

    const entity_ref01_list_rt0 = await entity_ref01_ent.list(entity_ref01_match_rt0)

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
    'ROADIE_APIKEY': 'NONE',
  })

  idmap = env['ROADIE_TEST_ENTITY_ENTID']

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
  
