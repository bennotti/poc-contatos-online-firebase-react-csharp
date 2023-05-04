import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";
import { env } from "./env";

const firebaseConfig = {
  apiKey: env.FIREBASE.API_KEY,
  authDomain: env.FIREBASE.AUTH_DOMAIN,
  databaseURL: env.FIREBASE.DATABASE_URL,
  projectId: env.FIREBASE.PROJECT_ID,
  storageBucket: env.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
  appId: env.FIREBASE.APP_ID,
  measurementId: env.FIREBASE.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);