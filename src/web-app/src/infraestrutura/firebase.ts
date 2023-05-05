import { initializeApp } from "firebase/app";
import { UserCredential, getAuth, signInAnonymously } from "firebase/auth";
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
export const getAuthAnonimo = async (): Promise<UserCredential> => {
  const auth = getAuth();
  const response = await signInAnonymously(auth);

  if (response) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = response.user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }

  return response;
}