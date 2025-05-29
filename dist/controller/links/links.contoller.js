"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteLinks = exports.patchLinks = exports.postLinks = exports.getLink = exports.getLinks = exports.redirect = void 0;
var express_validator_1 = require("express-validator");
var links_model_1 = require("./links.model");
var get_token_to_user_data_1 = __importDefault(require("./helper/get-token-to-user-data"));
var links_dto_1 = __importDefault(require("./links.dto"));
var errors_request_1 = __importDefault(require("../../helper/errors-request"));
var redirect = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, idUser, customUrl, link, e_1, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                _a = req.params, idUser = _a.idUser, customUrl = _a.customUrl;
                return [4 /*yield*/, (0, links_model_1.findLink)(customUrl, +idUser)];
            case 1:
                link = _b.sent();
                if (!link) {
                    res.status(404).json({});
                    return [2 /*return*/];
                }
                res.writeHead(302, {
                    Location: link.url,
                });
                res.end();
                return [2 /*return*/];
            case 2:
                e_1 = _b.sent();
                error = e_1;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.redirect = redirect;
var getLinks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, links, e_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, get_token_to_user_data_1.default)(req, res)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, links_model_1.findLinks)(user.id)];
            case 2:
                links = _a.sent();
                res.json(links.map(function (l) { return (0, links_dto_1.default)(l); }));
                return [2 /*return*/];
            case 3:
                e_2 = _a.sent();
                error = e_2;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLinks = getLinks;
var getLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, customUrl, user, link, e_3, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                customUrl = req.params.customUrl;
                return [4 /*yield*/, (0, get_token_to_user_data_1.default)(req, res)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, links_model_1.findLink)(customUrl, user.id)];
            case 2:
                link = _a.sent();
                if (!link) {
                    res.status(404).json({});
                    return [2 /*return*/];
                }
                res.json((0, links_dto_1.default)(link));
                return [2 /*return*/];
            case 3:
                e_3 = _a.sent();
                error = e_3;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLink = getLink;
var postLinks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, description, url, customUrl, user, link, e_4, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                _a = req.body, description = _a.description, url = _a.url, customUrl = _a.customUrl;
                return [4 /*yield*/, (0, get_token_to_user_data_1.default)(req, res)];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, links_model_1.createLinks)({
                        description: description,
                        url: url,
                        customUrl: customUrl,
                        user_id: user.id,
                    })];
            case 2:
                link = _b.sent();
                res.json((0, links_dto_1.default)(link));
                return [2 /*return*/];
            case 3:
                e_4 = _b.sent();
                error = e_4;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postLinks = postLinks;
var patchLinks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, customUrl, _a, description, url, newCustomUrl, user, link, e_5, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                customUrl = req.params.customUrl;
                _a = req.body, description = _a.description, url = _a.url, newCustomUrl = _a.newCustomUrl;
                return [4 /*yield*/, (0, get_token_to_user_data_1.default)(req, res)];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, links_model_1.changeLink)({
                        user_id: user.id,
                        customUrl: customUrl,
                        description: description,
                        url: url,
                        newCustomUrl: newCustomUrl,
                    })];
            case 2:
                link = _b.sent();
                if (!link) {
                    res.status(404).json({});
                    return [2 /*return*/];
                }
                res.json((0, links_dto_1.default)(link));
                return [2 /*return*/];
            case 3:
                e_5 = _b.sent();
                error = e_5;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.patchLinks = patchLinks;
var deleteLinks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, customUrl, user, link, e_6, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                customUrl = req.params.customUrl;
                return [4 /*yield*/, (0, get_token_to_user_data_1.default)(req, res)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, links_model_1.removeLink)(customUrl, user.id)];
            case 2:
                link = _a.sent();
                if (!link) {
                    res.status(404).json({});
                    return [2 /*return*/];
                }
                res.json((0, links_dto_1.default)(link));
                return [2 /*return*/];
            case 3:
                e_6 = _a.sent();
                error = e_6;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteLinks = deleteLinks;
//# sourceMappingURL=links.contoller.js.map