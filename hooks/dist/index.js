"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
(0, dotenv_1.configDotenv)();
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT;
// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:zapId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    // store in db a new trigger
    yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const run = yield tx.zapRun.create({
            data: {
                zapId: zapId,
                userId: parseInt(userId, 10),
                metadata: body,
            },
        });
        yield tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            },
        });
    }));
    res.status(200).json({
        message: "Webhook received",
    });
}));
app.use("/", (req, res) => {
    res.send("<h1>Hello from the hooks server!</h1>");
});
app.listen(PORT, () => {
    console.log(`Webhook server is running on ${PORT}.`);
});
