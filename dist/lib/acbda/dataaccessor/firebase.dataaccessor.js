"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDataAccessor = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_accessor_1 = require("../accessor/firebase.accessor");
const logger_1 = require("../utils/logger");
class FirebaseDataAccessor {
    constructor() {
        this.COMPONENT = 'FirebaseDataAccessor';
        this.COLLECTION = 'schemas';
        this.firebaseAccessor = new firebase_accessor_1.FirebaseAccessor();
        this.db = (0, firestore_1.getFirestore)();
    }
    /**
     * Create a new document in a collection
     */
    async create(collectionName, data) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'create', `Creating document in ${collectionName}`, data);
            const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(this.firebaseAccessor.db, collectionName), data);
            logger_1.Logger.log(this.COMPONENT, 'create', 'Document created successfully', docRef.id);
            return docRef.id;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'create', error);
            throw error;
        }
    }
    /**
     * Get a document by ID
     */
    async get(collectionName, id, constraints = []) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'get', `Fetching from ${collectionName}`, { id, constraints });
            if (id) {
                const docRef = (0, firestore_1.doc)(this.firebaseAccessor.db, collectionName, id);
                const docSnap = await (0, firestore_1.getDoc)(docRef);
                if (!docSnap.exists())
                    throw new Error('Document not found');
                const result = {
                    id: docSnap.id, // Firebase document ID
                    ...docSnap.data()
                };
                logger_1.Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
                return result;
            }
            const collectionRef = (0, firestore_1.collection)(this.firebaseAccessor.db, collectionName);
            const q = (0, firestore_1.query)(collectionRef, ...constraints);
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const result = querySnapshot.docs.map(doc => ({
                id: doc.id, // Firebase document ID
                ...doc.data()
            }));
            logger_1.Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
            return result;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'get', error);
            throw error;
        }
    }
    /**
     * Update a document by ID
     */
    async update(collectionName, id, data) {
        const docRef = (0, firestore_1.doc)(this.firebaseAccessor.db, collectionName, id);
        await (0, firestore_1.updateDoc)(docRef, data);
        return this.get(collectionName, id);
    }
    /**
     * Delete a document by ID
     */
    async delete(collectionName, id) {
        await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(this.firebaseAccessor.db, collectionName, id));
    }
    /**
     * Query documents by field
     */
    async queryByField(collectionName, field, value) {
        try {
            const collectionRef = (0, firestore_1.collection)(this.firebaseAccessor.db, collectionName);
            const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)(field, '==', value));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            throw new Error(`Error querying documents: ${error}`);
        }
    }
    async getAll(collectionName) {
        return this.get(collectionName);
    }
    async deleteDocument(id) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'deleteDocument', `Deleting document with ID: ${id}`);
            const docRef = (0, firestore_1.doc)(this.firebaseAccessor.db, this.COLLECTION, id);
            logger_1.Logger.log(this.COMPONENT, 'deleteDocument', 'Document reference created', { path: docRef.path });
            await (0, firestore_1.deleteDoc)(docRef);
            logger_1.Logger.log(this.COMPONENT, 'deleteDocument', `Document deleted successfully: ${id}`);
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'deleteDocument', `Failed to delete document: ${error}`);
            throw error;
        }
    }
    async createDocument(collectionName, data) {
        const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(this.db, collectionName), data);
        return docRef.id;
    }
    async queryDocuments(collectionName, queryParams) {
        const collectionRef = (0, firestore_1.collection)(this.db, collectionName);
        const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.where)(queryParams.field, queryParams.operator, queryParams.value));
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
}
exports.FirebaseDataAccessor = FirebaseDataAccessor;
