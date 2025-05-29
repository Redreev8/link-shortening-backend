"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerToken = void 0;
var express_1 = require("express");
var token_controller_1 = require("./token.controller");
var express_validator_1 = require("express-validator");
var check_action_role_1 = __importDefault(require("../../middleware/check-action-role"));
var router = (0, express_1.Router)();
exports.headerToken = (0, express_validator_1.header)('token').isString().isLength({ min: 70 });
router.get('/check-token/', [exports.headerToken], token_controller_1.getCheckToken);
router.get('/token-payload/', [exports.headerToken, (0, check_action_role_1.default)(['auth-token', 'token'])], token_controller_1.getPayloadToken);
router.post('/token/', [(0, check_action_role_1.default)(['auth-token']), (0, express_validator_1.body)('actions').isArray({ min: 1 })], token_controller_1.postCreateToken);
exports.default = router;
//# sourceMappingURL=token.router.js.map