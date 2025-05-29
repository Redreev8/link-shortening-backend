"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var dotenv_1 = __importDefault(require("dotenv"));
var Pool = pg_1.default.Pool;
dotenv_1.default.config();
var config = {
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
exports.default = new Pool(config);
//# sourceMappingURL=prosgres.js.map