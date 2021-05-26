"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textEventHandler = void 0;
require("@line/bot-sdk");
const createFlex_1 = require("./createFlex");
const firebaseConfig_1 = require("../config/firebaseConfig");
const textEventHandler = async (event, client) => {
    if (event.type !== "message" || event.message.type !== "text") {
        return;
    }
    const { replyToken } = event;
    const { text: userText } = event.message;
    const snapshot = await firebaseConfig_1.db
        .collection("restaurants")
        .where("name", "==", userText)
        .get();
    if (snapshot.empty) {
        const failMsg = {
            type: "text",
            text: "查不到",
        };
        await client
            .replyMessage(replyToken, failMsg)
            .then()
            .catch((err) => console.log("\x1b[33m%s\x1b[0m", err));
        return;
    }
    const arr = [];
    const messages = [];
    snapshot.forEach((doc) => {
        const { name, address, phone, url, review } = doc.data();
        arr.push({ name, address, phone, url, review });
    });
    messages.push(createFlex_1.createFlex(arr));
    await client
        .replyMessage(replyToken, messages)
        .then()
        .catch((err) => console.log("\x1b[33m%s\x1b[0m", err));
};
exports.textEventHandler = textEventHandler;
//# sourceMappingURL=textHandler.js.map