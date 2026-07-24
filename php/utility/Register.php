<?php
declare(strict_types=1);

// Roadie SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

RoadieUtility::setRegistrar(function (RoadieUtility $u): void {
    $u->clean = [RoadieClean::class, 'call'];
    $u->done = [RoadieDone::class, 'call'];
    $u->make_error = [RoadieMakeError::class, 'call'];
    $u->feature_add = [RoadieFeatureAdd::class, 'call'];
    $u->feature_hook = [RoadieFeatureHook::class, 'call'];
    $u->feature_init = [RoadieFeatureInit::class, 'call'];
    $u->fetcher = [RoadieFetcher::class, 'call'];
    $u->make_fetch_def = [RoadieMakeFetchDef::class, 'call'];
    $u->make_context = [RoadieMakeContext::class, 'call'];
    $u->make_options = [RoadieMakeOptions::class, 'call'];
    $u->make_request = [RoadieMakeRequest::class, 'call'];
    $u->make_response = [RoadieMakeResponse::class, 'call'];
    $u->make_result = [RoadieMakeResult::class, 'call'];
    $u->make_point = [RoadieMakePoint::class, 'call'];
    $u->make_spec = [RoadieMakeSpec::class, 'call'];
    $u->make_url = [RoadieMakeUrl::class, 'call'];
    $u->param = [RoadieParam::class, 'call'];
    $u->prepare_auth = [RoadiePrepareAuth::class, 'call'];
    $u->prepare_body = [RoadiePrepareBody::class, 'call'];
    $u->prepare_headers = [RoadiePrepareHeaders::class, 'call'];
    $u->prepare_method = [RoadiePrepareMethod::class, 'call'];
    $u->prepare_params = [RoadiePrepareParams::class, 'call'];
    $u->prepare_path = [RoadiePreparePath::class, 'call'];
    $u->prepare_query = [RoadiePrepareQuery::class, 'call'];
    $u->result_basic = [RoadieResultBasic::class, 'call'];
    $u->result_body = [RoadieResultBody::class, 'call'];
    $u->result_headers = [RoadieResultHeaders::class, 'call'];
    $u->transform_request = [RoadieTransformRequest::class, 'call'];
    $u->transform_response = [RoadieTransformResponse::class, 'call'];
});
