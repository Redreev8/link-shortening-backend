"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prosgres_1 = __importDefault(require("../config/prosgres"));
var createTable_1 = require("./createTable");
var createUsersTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sqlsKeyReverse;
    return __generator(this, function (_a) {
        sqlsKeyReverse = Object.keys(createTable_1.sqls).reverse();
        prosgres_1.default.query('SELECT NOW()', function (err, res) { return __awaiter(void 0, void 0, void 0, function () {
            var sqlsKeyReverse_1, sqlsKeyReverse_1_1, key, res_1, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (err) {
                            console.error('Error connecting to the database', err.stack);
                            return [2 /*return*/];
                        }
                        console.log('Connected to the database:', res.rows);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        sqlsKeyReverse_1 = __values(sqlsKeyReverse), sqlsKeyReverse_1_1 = sqlsKeyReverse_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!sqlsKeyReverse_1_1.done) return [3 /*break*/, 6];
                        key = sqlsKeyReverse_1_1.value;
                        return [4 /*yield*/, prosgres_1.default.query("\n                select exists (select *\n                from information_schema.tables\n                where table_name = '".concat(key, "' \n                    and table_schema = 'public')::int as \"column\"\n            "))];
                    case 3:
                        res_1 = _b.sent();
                        if (res_1.rows[0].column === 0)
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, prosgres_1.default.query("DROP TABLE ".concat(key))];
                    case 4:
                        _b.sent();
                        console.log("drop ".concat(key));
                        _b.label = 5;
                    case 5:
                        sqlsKeyReverse_1_1 = sqlsKeyReverse_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (sqlsKeyReverse_1_1 && !sqlsKeyReverse_1_1.done && (_a = sqlsKeyReverse_1.return)) _a.call(sqlsKeyReverse_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
createUsersTable();
//# sourceMappingURL=dropTable.js.map