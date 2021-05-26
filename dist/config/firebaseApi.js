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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApi = void 0;
const api_json_1 = __importDefault(require("./api.json"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
//# sourceMappingURL=firebaseApi.js.map