"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadieError = void 0;
class RoadieError extends Error {
    isRoadieError = true;
    sdk = 'Roadie';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RoadieError = RoadieError;
//# sourceMappingURL=RoadieError.js.map