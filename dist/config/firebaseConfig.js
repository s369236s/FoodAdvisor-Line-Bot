"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebaseApi_1 = require("./firebaseApi");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseApi_1.firebaseApi),
});
const db = firebase_admin_1.default.firestore();
exports.db = db;
//# sourceMappingURL=firebaseConfig.js.map