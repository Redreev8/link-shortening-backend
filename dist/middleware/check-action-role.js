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
Object.defineProperty(exports, "__esModule", { value: true });
var token_model_1 = require("../controller/token/token.model");
var role_actions_model_1 = require("../controller/role_actions/role-actions.model");
var checkTokenAction = function (payload, url) { return __awaiter(void 0, void 0, void 0, function () {
    var actions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!payload.role_id)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, role_actions_model_1.findActionsRole)(payload.role_id)];
            case 1:
                actions = _a.sent();
                return [2 /*return*/, actions.includes(url) || actions.includes('ALL')];
        }
    });
}); };
var checkActionRole = function (nameTokens) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var request, i, token, isTokenRedis, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = "".concat(req.method, " ").concat(req.path);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < nameTokens.length)) return [3 /*break*/, 6];
                    token = req.get(nameTokens[i]);
                    if (!token)
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, token_model_1.findToken)(token)];
                case 2:
                    isTokenRedis = _a.sent();
                    if (!isTokenRedis)
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, token_model_1.findPayloadToken)(token)];
                case 3:
                    payload = _a.sent();
                    if (!payload)
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, checkTokenAction(payload, request)];
                case 4:
                    if (_a.sent()) {
                        next();
                        return [2 /*return*/];
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    res.status(400).json({ message: 'Ошибка токена' });
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.default = checkActionRole;
//# sourceMappingURL=check-action-role.js.map