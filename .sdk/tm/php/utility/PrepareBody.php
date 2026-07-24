<?php
declare(strict_types=1);

// Roadie SDK utility: prepare_body

class RoadiePrepareBody
{
    public static function call(RoadieContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
