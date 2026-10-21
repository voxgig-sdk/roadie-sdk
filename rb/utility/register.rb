# Roadie SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RoadieUtility.registrar = ->(u) {
  u.clean = RoadieUtilities::Clean
  u.clean_add = RoadieUtilities::CleanAdd
  u.clean_explain = RoadieUtilities::CleanExplain
  u.done = RoadieUtilities::Done
  u.make_error = RoadieUtilities::MakeError
  u.feature_add = RoadieUtilities::FeatureAdd
  u.feature_hook = RoadieUtilities::FeatureHook
  u.feature_init = RoadieUtilities::FeatureInit
  u.fetcher = RoadieUtilities::Fetcher
  u.make_fetch_def = RoadieUtilities::MakeFetchDef
  u.make_context = RoadieUtilities::MakeContext
  u.make_options = RoadieUtilities::MakeOptions
  u.make_request = RoadieUtilities::MakeRequest
  u.make_response = RoadieUtilities::MakeResponse
  u.make_result = RoadieUtilities::MakeResult
  u.make_point = RoadieUtilities::MakePoint
  u.make_spec = RoadieUtilities::MakeSpec
  u.make_url = RoadieUtilities::MakeUrl
  u.param = RoadieUtilities::Param
  u.prepare_auth = RoadieUtilities::PrepareAuth
  u.prepare_body = RoadieUtilities::PrepareBody
  u.prepare_headers = RoadieUtilities::PrepareHeaders
  u.prepare_method = RoadieUtilities::PrepareMethod
  u.prepare_params = RoadieUtilities::PrepareParams
  u.prepare_path = RoadieUtilities::PreparePath
  u.prepare_query = RoadieUtilities::PrepareQuery
  u.graphql_body = RoadieUtilities::GraphqlBody
  u.graphql_errors = RoadieUtilities::GraphqlErrors
  u.result_basic = RoadieUtilities::ResultBasic
  u.result_body = RoadieUtilities::ResultBody
  u.result_headers = RoadieUtilities::ResultHeaders
  u.transform_request = RoadieUtilities::TransformRequest
  u.transform_response = RoadieUtilities::TransformResponse
}
