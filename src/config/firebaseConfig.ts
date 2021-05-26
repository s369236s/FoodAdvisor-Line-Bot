import admin from "firebase-admin";
import { firebaseApi } from "./firebaseApi";
admin.initializeApp({
  credential: admin.credential.cert(firebaseApi),
});
export const db = admin.firestore();
