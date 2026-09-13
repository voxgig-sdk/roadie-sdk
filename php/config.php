<?php
declare(strict_types=1);

// Roadie SDK configuration

class RoadieConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Roadie",
                "slug" => "roadie",
                "version" => "0.1.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.roadie.so",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "entity" => [],
                    "entity_set" => [],
                    "entity_set_push" => [],
                ],
            ],
            "entity" => [
        'entity' => [
          'fields' => [
            [
              'name' => 'apiVersion',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'entityRef',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uuid',
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'kind',
              'req' => true,
              'short' => 'Entity kind (Component, API, Resource, System, Group, User, ...).',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'metadata',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'rawData',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'relations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'set',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'spec',
              'short' => 'Kind-specific fields.',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updatedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedBy',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'entity',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/catalog/roadie-entities/entities',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'entities',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'entities',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'set',
                        'orig' => 'set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/catalog/roadie-entities/entities',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'entities',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'entities',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/catalog/entities',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'entities',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'entities',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'entity_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/catalog/roadie-entities/entities/{entityId}',
                  'rename' => [
                    'param' => [
                      'entityId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'entities',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'entities',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'entity_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/api/catalog/roadie-entities/entities/{entityId}',
                  'rename' => [
                    'param' => [
                      'entityId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'entities',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'entities',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'entity_set' => [
          'fields' => [
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'entity_set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/catalog/roadie-entities/sets',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'sets',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'sets',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'entity_set_push' => [
          'fields' => [
            [
              'name' => 'items',
              'op' => [
                'update' => [
                  'req' => true,
                  'type' => '`$ARRAY`',
                ],
              ],
              'short' => 'The full set of entities.',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'set',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'entity_set_push',
          'op' => [
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'set_id',
                        'orig' => 'set_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/api/catalog/roadie-entities/sets/{setId}',
                  'rename' => [
                    'param' => [
                      'setId' => 'set_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalog',
                    ],
                    [
                      'lit' => 'roadie-entities',
                    ],
                    [
                      'lit' => 'sets',
                    ],
                    [
                      'var' => 'set_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'set_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'catalog',
                    'roadie-entities',
                    'sets',
                    '{set_id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'set',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RoadieFeatures::make_feature($name);
    }
}
