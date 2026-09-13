
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


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


  test('basic', async () => {

    const setup = basicSetup()
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

  if ('TRUE' === env.ROADIE_TEST_LIVE) {
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
      extra || {}
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
  
