
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
      if (maybeSkipControl(t, 'entityOp', 'entity_set_push.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ROADIE_TEST_ENTITY_SET_PUSH_ENTID JSON to run live')
      return
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
    ['entity_set_push01','entity_set_push02','entity_set_push03','set01','set02','set03'],
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
  const idmapEnvVal = process.env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ROADIE_TEST_ENTITY_SET_PUSH_ENTID': idmap,
    'ROADIE_TEST_LIVE': 'FALSE',
    'ROADIE_TEST_EXPLAIN': 'FALSE',
    'ROADIE_APIKEY': 'NONE',
  })

  idmap = env['ROADIE_TEST_ENTITY_SET_PUSH_ENTID']

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
  
