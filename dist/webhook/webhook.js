"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bot_sdk_1 = require("@line/bot-sdk");
const client_1 = require("../client");
const lineConfig_1 = require("../config/lineConfig");
const replyHandler_1 = require("../handler/replyHandler");
const router = express_1.default.Router();
router.post("/webhook", bot_sdk_1.middleware(lineConfig_1.middlewareConfig), async (req, res) => {
    const events = req.body.events;
    const results = await Promise.all(events.map(async (event) => {
        try {
            await replyHandler_1.replyHandler(event, client_1.client);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
            return res.status(500).json({
                status: "error",
            });
        }
    }));
    return res.status(200).json({
        status: "success",
        results,
    });
});
exports.WebhookRouter = router;
//# sourceMappingURL=webhook.js.map