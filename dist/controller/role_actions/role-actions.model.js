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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRoleActions = exports.findActionsRole = exports.nameTableRoleActions = void 0;
var prosgres_1 = __importDefault(require("../../config/prosgres"));
var createTable_1 = require("../../migrations/createTable");
var role_model_1 = require("../role/role.model");
exports.nameTableRoleActions = createTable_1.sqlsKey['role_actions'];
var findActionsRole = function (idRole) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("SELECT\n            a.action\n        FROM ".concat(exports.nameTableRoleActions, " ra\n        LEFT JOIN ").concat(role_model_1.nameTableRole, " as r ON ra.role_id = r.id\n        LEFT JOIN actions a ON ra.action_id = a.id\n        WHERE role_id = $1"), [idRole])];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows.map(function (r) { return r.action; })];
        }
    });
}); };
exports.findActionsRole = findActionsRole;
var changeRoleActions = function (id, actions) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("INSERT INTO ".concat(exports.nameTableRoleActions, " (action_id, role_id)\n        SELECT t1.keyword, ").concat(id, "\n        FROM (SELECT UNNEST(ARRAY[").concat(actions.join(','), "]::int[]) as keyword) as t1\n            LEFT JOIN actions as a ON a.id = t1.keyword\n            LEFT JOIN role_actions as ra ON ra.action_id = t1.keyword AND ra.role_id = ").concat(id, "\n            WHERE ra.action_id IS NULL AND a.id IS NOT NULL;\n        "))];
            case 1:
                _a.sent();
                return [4 /*yield*/, prosgres_1.default.query("DELETE FROM ".concat(exports.nameTableRoleActions, "\n    WHERE action_id NOT IN (").concat(actions.join(','), ") AND role_id=").concat(id, ";"))];
            case 2:
                _a.sent();
                return [2 /*return*/, ''];
        }
    });
}); };
exports.changeRoleActions = changeRoleActions;
//# sourceMappingURL=role-actions.model.js.map