# Roadie SDK utility: prepare_body
require_relative 'media'
module RoadieUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return RoadieUtilities.raw_body(ctx.reqdata) if RoadieUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
