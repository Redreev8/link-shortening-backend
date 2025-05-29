"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerToken = void 0;
var express_1 = require("express");
var users_controller_1 = require("./users.controller");
var express_validator_1 = require("express-validator");
var check_action_role_1 = __importDefault(require("../../middleware/check-action-role"));
var router = (0, express_1.Router)();
exports.headerToken = (0, express_validator_1.header)('auth-token').isString().isLength({ min: 70 });
router.get('/user/', [exports.headerToken, (0, check_action_role_1.default)(['auth-token'])], users_controller_1.getUserData);
router.post('/register/', [
    (0, express_validator_1.body)('name', '').isString().isLength({ min: 2, max: 50 }),
    (0, express_validator_1.body)('password', '').isString().isLength({ min: 2, max: 255 }),
], users_controller_1.register);
router.post('/login/', [
    (0, express_validator_1.body)('name', '').isString().isLength({ min: 2, max: 50 }),
    (0, express_validator_1.body)('password', '').isString().isLength({ min: 2, max: 255 }),
], users_controller_1.login);
router.put('/user/change-role/', [
    (0, express_validator_1.body)('idUser').isInt(),
    (0, express_validator_1.body)('newRoleId').isInt(),
    (0, check_action_role_1.default)(['auth-token']),
], users_controller_1.putChangeRoleUser);
router.post('/logut/', [(0, check_action_role_1.default)(['auth-token'])], users_controller_1.logut);
exports.default = router;
//# sourceMappingURL=users.router.js.map