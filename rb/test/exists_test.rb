# Roadie SDK exists test

require "minitest/autorun"
require_relative "../Roadie_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RoadieSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
