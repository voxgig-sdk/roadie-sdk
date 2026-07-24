-- Roadie SDK exists test

local sdk = require("roadie_sdk")

describe("RoadieSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
