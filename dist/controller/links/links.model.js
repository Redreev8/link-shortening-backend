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
exports.removeLink = exports.changeLink = exports.createLinks = exports.findLink = exports.findLinks = exports.nameTableLinks = void 0;
var prosgres_1 = __importDefault(require("../../config/prosgres"));
var createTable_1 = require("../../migrations/createTable");
exports.nameTableLinks = createTable_1.sqlsKey.links;
var findLinks = function (idUser) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("SELECT * FROM ".concat(exports.nameTableLinks, " l WHERE user_id = $1"), [idUser])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows];
        }
    });
}); };
exports.findLinks = findLinks;
var findLink = function (customUrl, idUser) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("SELECT * FROM ".concat(exports.nameTableLinks, " \n        WHERE user_id=$1 AND customUrl = $2"), [idUser, customUrl])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.findLink = findLink;
var createLinks = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var result;
    var description = _b.description, url = _b.url, customUrl = _b.customUrl, user_id = _b.user_id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("INSERT INTO ".concat(exports.nameTableLinks, "(description, url, customUrl, user_id) \n        VALUES ($1, $2, $3, $4) RETURNING *"), [description, url, customUrl, user_id])];
            case 1:
                result = _c.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.createLinks = createLinks;
var changeLink = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var result;
    var description = _b.description, url = _b.url, customUrl = _b.customUrl, newCustomUrl = _b.newCustomUrl, user_id = _b.user_id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log({ description: description, url: url, customUrl: customUrl, newCustomUrl: newCustomUrl, user_id: user_id });
                return [4 /*yield*/, prosgres_1.default.query("UPDATE ".concat(exports.nameTableLinks, "\n        SET description = $1, url = $2, customUrl = $4\n        WHERE user_id = $5 AND customUrl = $3\n        RETURNING *"), [description, url, customUrl, newCustomUrl, user_id])];
            case 1:
                result = _c.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.changeLink = changeLink;
var removeLink = function (customUrl, idUser) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prosgres_1.default.query("DELETE FROM ".concat(exports.nameTableLinks, " \n        WHERE customUrl = $1 AND user_id = $2 \n        RETURNING *"), [customUrl, idUser])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.removeLink = removeLink;
//# sourceMappingURL=links.model.js.map