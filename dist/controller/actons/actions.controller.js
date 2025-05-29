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
exports.deleteAction = exports.patchAction = exports.postAction = exports.getAction = exports.getActions = void 0;
var express_validator_1 = require("express-validator");
var actons_model_1 = require("./actons.model");
var errors_request_1 = __importDefault(require("../../helper/errors-request"));
var getActions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, result, e_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, actons_model_1.findActions)()];
            case 1:
                result = _a.sent();
                res.json(result);
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
exports.getActions = getActions;
var getAction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, result, e_2, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                id = req.params.id;
                return [4 /*yield*/, (0, actons_model_1.findAction)(id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
            case 2:
                e_2 = _a.sent();
                error = e_2;
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
exports.getAction = getAction;
var postAction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, action, result, e_3, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                action = req.body.action;
                return [4 /*yield*/, (0, actons_model_1.createAction)(action)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
            case 2:
                e_3 = _a.sent();
                error = e_3;
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
exports.postAction = postAction;
var patchAction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, action, result, e_4, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                id = req.params.id;
                action = req.body.action;
                return [4 /*yield*/, (0, actons_model_1.changeAction)(id, action)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
            case 2:
                e_4 = _a.sent();
                error = e_4;
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
exports.patchAction = patchAction;
var deleteAction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, result, e_5, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json(__assign({ message: 'Не валидные даные' }, errors));
                    return [2 /*return*/];
                }
                id = req.params.id;
                return [4 /*yield*/, (0, actons_model_1.removeAction)(id)];
            case 1:
                result = _a.sent();
                res.json(result);
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
exports.deleteAction = deleteAction;
//# sourceMappingURL=actions.controller.js.map