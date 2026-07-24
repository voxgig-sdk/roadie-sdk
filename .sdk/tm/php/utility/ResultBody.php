<?php
declare(strict_types=1);

// Roadie SDK utility: result_body

class RoadieResultBody
{
    public static function call(RoadieContext $ctx): ?RoadieResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
