"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("./controller/user.controller");
var session_controller_1 = require("./controller/session.controller");
var user_schema_1 = require("./schema/user.schema");
var validateRequest_1 = require("./middleware/validateRequest");
function default_1(app) {
    app.get("/healthcheck", function (req, res) {
        return res.status(200).json({ message: "API works fine" });
    });
    /**
     * @route   POST /api/users
     * @desc    Registers user
     */
    app.post("/api/users", validateRequest_1.validate(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    /**
     * @route   GET /api/users
     * @desc    Gets a list of users
     */
    app.get("/api/users", user_controller_1.getUserHandler);
    /**
     * @route   POST /api/sessions
     * @desc    Login
     */
    app.post("/api/sessions", validateRequest_1.validate(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    /**
     * @route   GET /api/sessions
     * @desc    Get the user's sessions
     */
    /**
     * @route   DELETE /api/sessions
     * @desc    Logout
     */
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map