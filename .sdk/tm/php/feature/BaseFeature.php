<?php
declare(strict_types=1);

// Roadie SDK base feature

class RoadieBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RoadieContext $ctx, array $options): void {}
    public function PostConstruct(RoadieContext $ctx): void {}
    public function PostConstructEntity(RoadieContext $ctx): void {}
    public function SetData(RoadieContext $ctx): void {}
    public function GetData(RoadieContext $ctx): void {}
    public function GetMatch(RoadieContext $ctx): void {}
    public function SetMatch(RoadieContext $ctx): void {}
    public function PrePoint(RoadieContext $ctx): void {}
    public function PreSpec(RoadieContext $ctx): void {}
    public function PreRequest(RoadieContext $ctx): void {}
    public function PreResponse(RoadieContext $ctx): void {}
    public function PreResult(RoadieContext $ctx): void {}
    public function PreDone(RoadieContext $ctx): void {}
    public function PreUnexpected(RoadieContext $ctx): void {}
}
