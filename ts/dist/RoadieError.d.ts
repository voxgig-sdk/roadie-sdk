import { Context } from './Context';
declare class RoadieError extends Error {
    isRoadieError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { RoadieError };
