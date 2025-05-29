"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadUser = void 0;
var getPayloadUser = function (_a) {
    var id = _a.id, name = _a.name, role_id = _a.role_id;
    return ({
        id: id,
        name: name,
        role_id: role_id,
    });
};
exports.getPayloadUser = getPayloadUser;
//# sourceMappingURL=user.dto.js.map