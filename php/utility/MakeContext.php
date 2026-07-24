<?php
declare(strict_types=1);

// Roadie SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RoadieMakeContext
{
    public static function call(array $ctxmap, ?RoadieContext $basectx): RoadieContext
    {
        return new RoadieContext($ctxmap, $basectx);
    }
}
