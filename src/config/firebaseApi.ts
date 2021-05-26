import serviceAccount from "./api.json";
import * as dotenv from "dotenv";
dotenv.config();
export const firebaseApi = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: process.env.FIREBASE_KEY_ID,
  privateKey: process.env.FIREBASE_KEY,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};
