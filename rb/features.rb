# Roadie SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RoadieFeatures
  def self.make_feature(name)
    case name
    when "base"
      RoadieBaseFeature.new
    when "debug"
      RoadieDebugFeature.new
    when "idempotency"
      RoadieIdempotencyFeature.new
    when "metrics"
      RoadieMetricsFeature.new
    when "paging"
      RoadiePagingFeature.new
    when "ratelimit"
      RoadieRatelimitFeature.new
    when "retry"
      RoadieRetryFeature.new
    when "test"
      RoadieTestFeature.new
    when "timeout"
      RoadieTimeoutFeature.new
    else
      RoadieBaseFeature.new
    end
  end
end
