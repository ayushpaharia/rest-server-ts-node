"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("./logger"));
var connect_1 = __importDefault(require("./db/connect"));
require("./routes.ts");
var routes_1 = __importDefault(require("./routes"));
var port = config_1.default.get("port");
var host = config_1.default.get("host");
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
var name = "my" + "name";
app.listen(port, host, function () {
  logger_1.default.info("Server listing at http://" + host + ":" + port + "/");
  connect_1.default();
  routes_1.default(app);
});
//# sourceMappingURL=index.js.map
