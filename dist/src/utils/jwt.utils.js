"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var privateKey = config_1.default.get("jwt_secret");
function sign(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, options);
}
exports.default = sign;
//# sourceMappingURL=jwt.utils.js.map