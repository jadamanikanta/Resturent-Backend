"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const helmet_1 = __importDefault(require("helmet"));
const dbconfig_1 = __importDefault(require("./src/dbconfig"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
(0, dbconfig_1.default)();
app.use((0, cors_1.default)());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use(express_1.default.json());
app.use('/api/restaurants', routes_1.default);
const handler = (0, serverless_http_1.default)(app);
module.exports.handler = handler;
