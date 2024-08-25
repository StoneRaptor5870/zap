"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).send({ message: "You are Unauthorized" });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD, (err, data) => {
            if (err) {
                return res.status(401).send({ message: "You are Unauthorized" });
            }
            req.id = data.id;
            next();
        });
    }
    catch (e) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
}
