"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyHandler = void 0;
require("@line/bot-sdk");
const createFlexMessage_1 = require("./createFlexMessage");
const textDetector_1 = require("./textDetector");
const replyHandler = async (event, client) => {
    if (event.type !== "message" || event.message.type !== "text") {
        return;
    }
    const { replyToken } = event;
    const { text: userText } = event.message;
    const textCheck = await textDetector_1.textDetector(userText);
    let message;
    if (!textCheck.ok) {
        if (!textCheck.errMessage)
            textCheck.errMessage = "";
        message = {
            type: "text",
            text: textCheck === null || textCheck === void 0 ? void 0 : textCheck.errMessage,
        };
    }
    else {
        const arr = [];
        if (!textCheck.foundData) {
            message = {
                type: "text",
                text: "看不懂",
            };
        }
        else {
            if (textCheck.type === "restaurant") {
                textCheck.foundData.forEach((data) => {
                    const { name, review, address, phone, url: imageUrl } = data.data();
                    arr.push({ name, review, address, phone, imageUrl });
                });
            }
            if (textCheck.type === "meal") {
                textCheck.foundData.forEach((data) => {
                    const { name, price, url: imageUrl } = data.data();
                    arr.push({ name, price, imageUrl });
                });
            }
        }
        message = createFlexMessage_1.createFlexMessage(textCheck.type, arr);
    }
    await client
        .replyMessage(replyToken, message)
        .then()
        .catch((err) => console.log("\x1b[33m%s\x1b[0m", err));
};
exports.replyHandler = replyHandler;
//# sourceMappingURL=replyHandler.js.map