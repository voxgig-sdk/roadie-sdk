import { EntityEntity } from './entity/EntityEntity';
import { EntitySetEntity } from './entity/EntitySetEntity';
import { EntitySetPushEntity } from './entity/EntitySetPushEntity';
export type * from './RoadieTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RoadieEntityBase } from './RoadieEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class RoadieSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    Entity(entopts?: Record<string, any>): EntityEntity;
    EntitySet(entopts?: Record<string, any>): EntitySetEntity;
    EntitySetPush(entopts?: Record<string, any>): EntitySetPushEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): RoadieSDK;
    tester(testopts?: any, sdkopts?: any): RoadieSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof RoadieSDK;
export { stdutil, config, BaseFeature, RoadieEntityBase, RoadieSDK, SDK, };
