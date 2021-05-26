"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const bot_sdk_1 = require("@line/bot-sdk");
const lineConfig_1 = require("./config/lineConfig");
const client = new bot_sdk_1.Client(lineConfig_1.clientConfig);
exports.client = client;
//# sourceMappingURL=client.js.map