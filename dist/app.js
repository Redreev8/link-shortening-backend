"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var users_router_1 = __importDefault(require("./controller/users/users.router"));
var token_router_1 = __importDefault(require("./controller/token/token.router"));
var role_router_1 = __importDefault(require("./controller/role/role.router"));
var actons_router_1 = __importDefault(require("./controller/actons/actons.router"));
var role_actions_router_1 = __importDefault(require("./controller/role_actions/role_actions.router"));
var links_router_1 = __importDefault(require("./controller/links/links.router"));
var prosgres_1 = __importDefault(require("./config/prosgres"));
var redis_1 = __importDefault(require("./config/redis"));
var connection_check_pg_1 = __importDefault(require("./helper/connection-check-pg"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', users_router_1.default);
app.use('/api', token_router_1.default);
app.use('/api', role_router_1.default);
app.use('/api', actons_router_1.default);
app.use('/api', role_actions_router_1.default);
app.use('/', links_router_1.default);
prosgres_1.default.query('SELECT NOW()', connection_check_pg_1.default);
redis_1.default.on('error', function (err) { return console.log('Redis Client Error', err); });
redis_1.default.on('connect', function () { return console.log('Redis Client Connected'); });
redis_1.default.connect();
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map