"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bot_sdk_1 = require("@line/bot-sdk");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const createFlex_1 = require("./createFlex");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = __importStar(require("api/foodadvisor-line-bot-firebase-adminsdk-qmrjr-0f826a0fa5.json"));
dotenv_1.default.config();
firebase_admin_1.default.initializeApp();
const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
};
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(params),
});
const db = firebase_admin_1.default.firestore();
console.log(db);
const clientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET,
};
const middlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET || "",
};
const PORT = process.env.PORT || 3000;
const client = new bot_sdk_1.Client(clientConfig);
const app = express_1.default();
const textEventHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.type !== "message" || event.message.type !== "text") {
        return;
    }
    const { replyToken } = event;
    const { text } = event.message;
    const sticker = {
        packageId: "1",
        stickerId: "1",
    };
    console.log(replyToken);
    const obj = createFlex_1.createFlex(text);
    const response = [
        Object.assign({ type: "sticker" }, sticker),
        obj,
    ];
    yield client.replyMessage(replyToken, response);
});
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        status: "success",
        message: "Connected successfully!",
    });
}));
app.post("/webhook", bot_sdk_1.middleware(middlewareConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = req.body.events;
    const results = yield Promise.all(events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield textEventHandler(event);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
            return res.status(500).json({
                status: "error",
            });
        }
    })));
    return res.status(200).json({
        status: "success",
        results,
    });
}));
app.listen(PORT, () => {
    console.log(`Application is live and listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map