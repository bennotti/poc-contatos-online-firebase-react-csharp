import { initializeApp } from "firebase/app";
import { UserCredential, getAuth, signInAnonymously } from "firebase/auth";
import "firebase/database";
import { DataSnapshot, child, get, getDatabase, query, ref, remove, set, update } from "firebase/database";
import { env } from "./env";
import { AnyObject } from "./types";

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
    console.log('UID', uid);
    // ...
  } else {
    // User is signed out
    // ...
  }

  return response;
}

export class FirebaseDatabase {
  private static instance: FirebaseDatabase;
  public static getInstance(): FirebaseDatabase {
    if (!FirebaseDatabase.instance) {
      FirebaseDatabase.instance = new FirebaseDatabase();
    }

    return FirebaseDatabase.instance;
  }
  private constructor() {
    getAuthAnonimo().catch(console.error);
  }

  obter = async (path: string): Promise<DataSnapshot> => {
    const dbRef = ref(db);
    return get(child(dbRef, path))
  } 

  criar = async (path: string, payload: AnyObject | unknown): Promise<DataSnapshot> => {
    await set(ref(db, path), payload);
    return this.obter(path);
  }

  remover = async (path: string) => {
    await remove(ref(db, path));
  }

  atualizar = async (path: string, payload: AnyObject): Promise<DataSnapshot> => {
    await update(ref(db, path), payload);
    return this.obter(path);
  }
}