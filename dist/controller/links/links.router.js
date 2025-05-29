"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var links_contoller_1 = require("./links.contoller");
var check_action_role_1 = __importDefault(require("../../middleware/check-action-role"));
var router = (0, express_1.Router)();
var queryIdUser = (0, express_validator_1.param)('idUser').isInt({ min: 1 });
var queryCustomUrl = (0, express_validator_1.param)('customUrl')
    .isString()
    .isLength({ min: 1, max: 50 });
var bodyDescription = (0, express_validator_1.body)('description').isString();
var bodyUrl = (0, express_validator_1.body)('url').isURL();
var bodyCustomUrl = (0, express_validator_1.body)('customUrl').isString().isLength({ min: 1, max: 50 });
var bodyNewCustomUrl = (0, express_validator_1.body)('newCustomUrl')
    .isString()
    .isLength({ min: 1, max: 50 });
router.get('/l/:idUser/:customUrl', [queryIdUser, queryCustomUrl], links_contoller_1.redirect);
router.get('/api/links/', [(0, check_action_role_1.default)(['auth-token', 'token'])], links_contoller_1.getLinks);
router.get('/api/links/:customUrl', [queryCustomUrl, (0, check_action_role_1.default)(['auth-token', 'token'])], links_contoller_1.getLink);
router.post('/api/links/', [
    (0, check_action_role_1.default)(['auth-token', 'token']),
    bodyDescription,
    bodyUrl,
    bodyCustomUrl,
], links_contoller_1.postLinks);
router.put('/api/links/:customUrl', [
    queryCustomUrl,
    bodyDescription,
    bodyUrl,
    bodyNewCustomUrl,
    (0, check_action_role_1.default)(['auth-token', 'token']),
], links_contoller_1.patchLinks);
router.delete('/api/links/:customUrl', [queryCustomUrl, (0, check_action_role_1.default)(['auth-token', 'token'])], links_contoller_1.deleteLinks);
exports.default = router;
//# sourceMappingURL=links.router.js.map