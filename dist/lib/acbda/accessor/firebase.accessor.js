"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAccessor = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
const storage_1 = require("firebase/storage");
const logger_1 = require("../utils/logger");
class FirebaseAccessor {
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
            const app = (0, app_1.initializeApp)(this.firebaseConfig);
            this.db = (0, firestore_1.getFirestore)(app);
            this.auth = (0, auth_1.getAuth)(app);
            this.storage = (0, storage_1.getStorage)(app);
            logger_1.Logger.log('FirebaseAccessor', 'constructor', 'Firebase initialized successfully');
        }
        catch (error) {
            logger_1.Logger.error('FirebaseAccessor', 'constructor', error);
            throw new Error(`Failed to initialize Firebase: ${error}`);
        }
    }
    static getInstance() {
        if (!FirebaseAccessor.instance) {
            FirebaseAccessor.instance = new FirebaseAccessor();
        }
        return FirebaseAccessor.instance;
    }
}
exports.FirebaseAccessor = FirebaseAccessor;
