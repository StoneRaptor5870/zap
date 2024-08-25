"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./router/user");
const zap_1 = require("./router/zap");
const trigger_1 = require("./router/trigger");
const action_1 = require("./router/action");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT;
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/zap", zap_1.zapRouter);
app.use("/api/v1/trigger", trigger_1.triggerRouter);
app.use("/api/v1/action", action_1.actionRouter);
app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}.`);
});
