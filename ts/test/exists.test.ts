
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RoadieSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RoadieSDK.test()
    equal(null !== testsdk, true)
  })

})
