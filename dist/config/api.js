"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApi = void 0;
const api_json_1 = __importDefault(require("../api.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.firebaseApi = {
    type: api_json_1.default.type,
    projectId: api_json_1.default.project_id,
    privateKeyId: process.env.FIREBASE_KEY_ID,
    privateKey: process.env.FIREBASE_KEY,
    clientEmail: api_json_1.default.client_email,
    clientId: api_json_1.default.client_id,
    authUri: api_json_1.default.auth_uri,
    tokenUri: api_json_1.default.token_uri,
    authProviderX509CertUrl: api_json_1.default.auth_provider_x509_cert_url,
    clientC509CertUrl: api_json_1.default.client_x509_cert_url,
};
//# sourceMappingURL=api.js.map