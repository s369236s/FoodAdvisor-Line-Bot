"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceAccount = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.serviceAccount = {
    type: "service_account",
    project_id: "foodadvisor-line-bot",
    private_key_id: process.env.FIREBASE_KEY_ID,
    private_key: process.env.FIREBASE_KEY,
    client_email: "firebase-adminsdk-qmrjr@foodadvisor-line-bot.iam.gserviceaccount.com",
    client_id: "106640312738376997207",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qmrjr%40foodadvisor-line-bot.iam.gserviceaccount.com",
};
//# sourceMappingURL=getAPI.js.map