import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Logger } from '../utils/logger';

export class FirebaseAccessor {
  private static instance: FirebaseAccessor;
  private firebaseConfig;
  public db;
  public auth;
  public storage;

  constructor() {
    // Validate environment variables
    if (!process.env.FIREBASE_API_KEY) {
      throw new Error('FIREBASE_API_KEY is not defined in environment variables');
    }

    this.firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    };

    // Log config for debugging (remove in production)
    console.log('Firebase Config:', {
      apiKey: '***',
      projectId: this.firebaseConfig.projectId,
      authDomain: this.firebaseConfig.authDomain
    });

    try {
      const app = initializeApp(this.firebaseConfig);
      this.db = getFirestore(app);
      this.auth = getAuth(app);
      this.storage = getStorage(app);
      Logger.log('FirebaseAccessor', 'constructor', 'Firebase initialized successfully');
    } catch (error) {
      Logger.error('FirebaseAccessor', 'constructor', error);
      throw new Error(`Failed to initialize Firebase: ${error}`);
    }
  }

  public static getInstance(): FirebaseAccessor {
    if (!FirebaseAccessor.instance) {
      FirebaseAccessor.instance = new FirebaseAccessor();
    }
    return FirebaseAccessor.instance;
  }
} 