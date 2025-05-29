"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorsRequest = {
    '23505': function (res, e) {
        res.status(400).json({ message: 'duplicate key', errors: e });
    },
    default: function (res, e) {
        res.status(500).json({ message: 'Что пошло не так', errors: e });
    },
};
exports.default = errorsRequest;
//# sourceMappingURL=errors-request.js.map