import { EntityEntity } from './entity/EntityEntity';
import { EntitySetPushEntity } from './entity/EntitySetPushEntity';
export type * from './RoadieTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RoadieEntityBase } from './RoadieEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
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
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Entity(entopts?: Record<string, any>): EntityEntity;
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
export type { DirectResult };
