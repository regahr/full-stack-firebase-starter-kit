import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.FB_PROJECT_ID) {
  throw new Error('Firebase project ID is not defined');
}

if (!process.env.FB_CLIENT_EMAIL) {
  throw new Error('Firebase client email is not defined');
}

if (!process.env.FB_PRIVATE_KEY) {
  throw new Error('Firebase private key is not defined');
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY
  }),
});

const db = admin.firestore();
export default db;
