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
exports.logut = exports.putChangeRoleUser = exports.login = exports.register = exports.getUserData = void 0;
var users_model_1 = require("./users.model");
var express_validator_1 = require("express-validator");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var token_model_1 = require("../token/token.model");
var user_dto_1 = require("./user.dto");
var errors_request_1 = __importDefault(require("../../helper/errors-request"));
var getUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, token, payload, e_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign(__assign({ message: 'Имя или пороль не валидны' }, errors), { body: req.body }));
                    return [2 /*return*/];
                }
                token = req.get('auth-token');
                return [4 /*yield*/, (0, token_model_1.findPayloadToken)(token)];
            case 1:
                payload = (_a.sent());
                res.json({ name: payload.name, id: payload.id });
                return [2 /*return*/];
            case 2:
                e_1 = _a.sent();
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
exports.getUserData = getUserData;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, name_1, password, userCheck, salt, hasPassword, user, token, e_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign(__assign({ message: 'Имя или пороль не валидны' }, errors), { body: req.body }));
                    return [2 /*return*/];
                }
                _a = req.body, name_1 = _a.name, password = _a.password;
                return [4 /*yield*/, (0, users_model_1.findUser)(name_1)];
            case 1:
                userCheck = _b.sent();
                if (userCheck) {
                    res.status(400).json('Имя занято');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 3:
                hasPassword = _b.sent();
                return [4 /*yield*/, (0, users_model_1.createUsers)(name_1, hasPassword)];
            case 4:
                user = _b.sent();
                return [4 /*yield*/, (0, token_model_1.createToken)((0, user_dto_1.getPayloadUser)(user), user.id)];
            case 5:
                token = _b.sent();
                res.json(token);
                return [2 /*return*/];
            case 6:
                e_2 = _b.sent();
                error = e_2;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, name_2, password, user, validPass, token, e_3, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign(__assign({ message: 'Имя или пороль не валидны' }, errors), { body: req.body }));
                    return [2 /*return*/];
                }
                _a = req.body, name_2 = _a.name, password = _a.password;
                return [4 /*yield*/, (0, users_model_1.findUser)(name_2)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401).json('Имя или пороль не верны');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                validPass = _b.sent();
                if (!validPass) {
                    res.status(401).json('Имя или пороль не верны');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, token_model_1.createToken)((0, user_dto_1.getPayloadUser)(user), user.id)];
            case 3:
                token = _b.sent();
                res.json(token);
                return [2 /*return*/];
            case 4:
                e_3 = _b.sent();
                error = e_3;
                console.error(error);
                if (!(error === null || error === void 0 ? void 0 : error.code) || !errors_request_1.default[error.code]) {
                    errors_request_1.default.default(res, error);
                    return [2 /*return*/];
                }
                errors_request_1.default[error.code](res, error);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var putChangeRoleUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, idUser, newRoleId, tokens, e_4, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign(__assign({ message: 'Имя или пороль не валидны' }, errors), { body: req.body }));
                    return [2 /*return*/];
                }
                _a = req.body, idUser = _a.idUser, newRoleId = _a.newRoleId;
                return [4 /*yield*/, (0, users_model_1.changeRoleUser)(idUser, newRoleId)];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, token_model_1.findTokensValue)(idUser)];
            case 2:
                tokens = _b.sent();
                tokens.forEach(function (token) { return (0, token_model_1.removeToken)(token); });
                res.json(newRoleId);
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
exports.putChangeRoleUser = putChangeRoleUser;
var logut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, token, user, e_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не передан токен' }, errors));
                    return [2 /*return*/];
                }
                token = req.get('auth-token');
                user = jsonwebtoken_1.default.decode(token);
                if (!user) {
                    res.status(400).json(__assign({ message: 'Не неверный токен' }, errors));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, token_model_1.removeToken)(token)];
            case 1:
                _a.sent();
                res.json();
                return [2 /*return*/];
            case 2:
                e_5 = _a.sent();
                error = e_5;
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
exports.logut = logut;
//# sourceMappingURL=users.controller.js.map