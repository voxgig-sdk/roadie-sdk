<?php
declare(strict_types=1);

// Roadie SDK utility: result_headers

class RoadieResultHeaders
{
    public static function call(RoadieContext $ctx): ?RoadieResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
