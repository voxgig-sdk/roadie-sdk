-- Roadie SDK error

local RoadieError = {}
RoadieError.__index = RoadieError


function RoadieError.new(code, msg, ctx)
  local self = setmetatable({}, RoadieError)
  self.is_sdk_error = true
  self.sdk = "Roadie"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RoadieError:error()
  return self.msg
end


function RoadieError:__tostring()
  return self.msg
end


return RoadieError
