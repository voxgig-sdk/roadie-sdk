
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { RoadieSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RoadieSDK.test()
    equal(null !== testsdk, true)
  })

})
