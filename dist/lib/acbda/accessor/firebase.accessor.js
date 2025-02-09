import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
export class FirebaseAccessor {
    constructor() {
        this.firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        };
        // Debug log to verify config
        console.log('Firebase Config:', {
            apiKey: process.env.FIREBASE_API_KEY,
            projectId: process.env.FIREBASE_PROJECT_ID
        });
        const app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(app);
        this.auth = getAuth(app);
        this.storage = getStorage(app);
    }
    static getInstance() {
        if (!FirebaseAccessor.instance) {
            FirebaseAccessor.instance = new FirebaseAccessor();
        }
        return FirebaseAccessor.instance;
    }
}
