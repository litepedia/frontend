

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.G_API_KEY,
  authDomain: process.env.G_AUTH_DOMAIN,
  projectId: process.env.G_PROJECT_ID,
  storageBucket: process.env.G_STORAGE_BUCKET,
  messagingSenderId: process.env.G_MSG_SENDER_ID,
  appId: process.env.G_APP_ID
};


class Term {
  title: string;
  description: string;
  constructor (title: string, description: string) {
      this.title = title;
      this.description = description;
  }
  toString() {
      return this.title +', ' + this.description;
  }
}

const termConverter = {
  toFirestore: (term: Term) => {
      return {
          title: term.title,
          description: term.description,
          };
  },
  fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      return new Term(data.title, data.description);
  }
};


// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);

const COLLECTION = 'summary_v1';

export async function initCache() {
    // if (!redisClient.isReady) {
    //     await redisClient.connect();
    // }
    return Promise.resolve();
}

export async function getCachedContent(key: string): Promise<Term>{
    
    let docRef = await doc(db, COLLECTION, key).withConverter(termConverter);
    let docSnap = await getDoc(docRef);  
    console.log({docSnap : docSnap.data()});
    
    if (docSnap && docSnap.exists()) {
        console.log(`cache hit ${key}`);
        return docSnap.data();
    } else {
      //@ts-ignore
        return null;
    }
}

export async function setCachedContent(key: string, document: { title: string, description: string }) {
    return setDoc(doc(db, COLLECTION, key),{
      title: document.title,
      description: document.description
    });
}