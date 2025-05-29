"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var role_controller_1 = require("./role.controller");
var check_action_role_1 = __importDefault(require("../../middleware/check-action-role"));
var router = (0, express_1.Router)();
var queryId = (0, express_validator_1.param)('id').isInt({ min: 1 });
var bodyName = (0, express_validator_1.body)('name', '').isString().isLength({ min: 2, max: 50 });
router.get('/roles/', [(0, check_action_role_1.default)(['auth-token', 'token'])], role_controller_1.getRoles);
router.get('/roles/:id', [queryId, (0, check_action_role_1.default)(['auth-token', 'token'])], role_controller_1.getRole);
router.post('/roles/', [bodyName, (0, check_action_role_1.default)(['auth-token', 'token'])], role_controller_1.postRole);
router.patch('/roles/:id', [queryId, bodyName, (0, check_action_role_1.default)(['auth-token', 'token'])], role_controller_1.patchRole);
router.delete('/roles/:id', [queryId, (0, check_action_role_1.default)(['auth-token', 'token'])], role_controller_1.deleteRole);
exports.default = router;
//# sourceMappingURL=role.router.js.map