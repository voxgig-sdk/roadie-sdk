
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { RoadieSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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

    const live = 'TRUE' === process.env.ROADIE_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'entity.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_ENTID JSON to run live')
      return
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
    const entity_ref01_match: any = {}

    const entity_ref01_list = (await entity_ref01_ent.list(entity_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(entity_ref01_list, { id: entity_ref01_data.id })))


    // LOAD
    const entity_ref01_match_dt0: any = {}
    entity_ref01_match_dt0.id = entity_ref01_data.id
    const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data()
    assert(entity_ref01_data_dt0.id === entity_ref01_data.id)


    // REMOVE
    const entity_ref01_match_rm0: any = { id: entity_ref01_data.id }
    await entity_ref01_ent.remove(entity_ref01_match_rm0)
  

    // LIST
    const entity_ref01_match_rt0: any = {}

    const entity_ref01_list_rt0 = (await entity_ref01_ent.list(entity_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(entity_ref01_list_rt0, { id: entity_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['ROADIE_TEST_ENTITY_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ROADIE_TEST_ENTITY_ENTID': idmap,
    'ROADIE_TEST_LIVE': 'FALSE',
    'ROADIE_TEST_EXPLAIN': 'FALSE',
    'ROADIE_APIKEY': 'NONE',
  })

  idmap = env['ROADIE_TEST_ENTITY_ENTID']

  const live = 'TRUE' === env.ROADIE_TEST_LIVE

  if (live) {
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
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
