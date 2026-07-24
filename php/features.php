<?php
declare(strict_types=1);

// Roadie SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RoadieFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RoadieBaseFeature();
            case "test":
                return new RoadieTestFeature();
            default:
                return new RoadieBaseFeature();
        }
    }
}
