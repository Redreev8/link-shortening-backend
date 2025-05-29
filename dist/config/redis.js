"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
exports.default = redis;
//# sourceMappingURL=redis.js.map