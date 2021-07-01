"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("../logger"));
function connect() {
    var mongo_uri = config_1.default.get("mongo_uri");
    return mongoose_1.default
        .connect(mongo_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
        .then(function () { return logger_1.default.info("Database connected!"); })
        .catch(function (err) {
        logger_1.default.error("dberror", err);
        process.exit(1);
    });
}
exports.default = connect;
//# sourceMappingURL=connect.js.map