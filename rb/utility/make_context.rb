# Roadie SDK utility: make_context
require_relative '../core/context'
module RoadieUtilities
  MakeContext = ->(ctxmap, basectx) {
    RoadieContext.new(ctxmap, basectx)
  }
end
