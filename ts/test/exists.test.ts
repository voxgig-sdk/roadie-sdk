
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RoadieSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RoadieSDK.test()
    equal(testsdk instanceof RoadieSDK, true,
      'RoadieSDK.test() must return a client synchronously')
  })

})
