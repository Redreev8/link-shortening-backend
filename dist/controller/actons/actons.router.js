"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var actions_controller_1 = require("./actions.controller");
var check_action_role_1 = __importDefault(require("../../middleware/check-action-role"));
var router = (0, express_1.Router)();
var queryId = (0, express_validator_1.param)('id').isInt({ min: 1 });
var bodyAction = (0, express_validator_1.body)('action', '').isString().isLength({ min: 2, max: 100 });
router.get('/actions/', actions_controller_1.getActions);
router.get('/actions/:id', [queryId, (0, check_action_role_1.default)(['auth-token', 'token'])], actions_controller_1.getAction);
router.post('/actions/', [bodyAction, (0, check_action_role_1.default)(['auth-token', 'token'])], actions_controller_1.postAction);
router.patch('/actions/:id', [queryId, bodyAction, (0, check_action_role_1.default)(['auth-token', 'token'])], actions_controller_1.patchAction);
router.delete('/actions/:id', [queryId, (0, check_action_role_1.default)(['auth-token', 'token'])], actions_controller_1.deleteAction);
exports.default = router;
//# sourceMappingURL=actons.router.js.map