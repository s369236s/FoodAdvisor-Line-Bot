"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhook_1 = require("./webhook/webhook");
const firebaseConfig_1 = require("./config/firebaseConfig");
if (firebaseConfig_1.db) {
    const PORT = process.env.PORT || 3000;
    const app = express_1.default();
    (async function () {
        await firebaseConfig_1.db
            .collection("restaurants")
            .where("type", "==", "燒臘")
            .orderBy("review", "desc")
            .limit(5)
            .get();
    })();
    app.get("/", async (_, res) => {
        return res.status(200).json({
            status: "success",
            message: "Connected successfully!",
        });
    });
    app.use("/api", webhook_1.WebhookRouter);
    app.listen(PORT, () => {
        console.log(`Application is live and listening on port ${PORT}`);
    });
}
else {
    console.log("failed to connect db and server didn't start");
}
//# sourceMappingURL=index.js.map