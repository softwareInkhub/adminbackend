import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirebaseAccessor } from '../accessor/firebase.accessor';
import { Logger } from '../utils/logger';
export class FirebaseDataAccessor {
    constructor() {
        this.COMPONENT = 'FirebaseDataAccessor';
        this.firebaseAccessor = new FirebaseAccessor();
    }
    /**
     * Create a new document in a collection
     */
    async create(collectionName, data) {
        try {
            Logger.log(this.COMPONENT, 'create', `Creating document in ${collectionName}`, data);
            const docRef = await addDoc(collection(this.firebaseAccessor.db, collectionName), data);
            Logger.log(this.COMPONENT, 'create', 'Document created successfully', docRef.id);
            return docRef.id;
        }
        catch (error) {
            Logger.error(this.COMPONENT, 'create', error);
            throw error;
        }
    }
    /**
     * Get a document by ID
     */
    async get(collectionName, id, constraints = []) {
        try {
            Logger.log(this.COMPONENT, 'get', `Fetching from ${collectionName}`, { id, constraints });
            if (id) {
                const docRef = doc(this.firebaseAccessor.db, collectionName, id);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists())
                    throw new Error('Document not found');
                const result = { id: docSnap.id, ...docSnap.data() };
                Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
                return result;
            }
            const collectionRef = collection(this.firebaseAccessor.db, collectionName);
            const q = query(collectionRef, ...constraints);
            const querySnapshot = await getDocs(q);
            const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
            return result;
        }
        catch (error) {
            Logger.error(this.COMPONENT, 'get', error);
            throw error;
        }
    }
    /**
     * Update a document by ID
     */
    async update(collectionName, id, data) {
        const docRef = doc(this.firebaseAccessor.db, collectionName, id);
        await updateDoc(docRef, data);
        return this.get(collectionName, id);
    }
    /**
     * Delete a document by ID
     */
    async delete(collectionName, id) {
        await deleteDoc(doc(this.firebaseAccessor.db, collectionName, id));
    }
    /**
     * Query documents by field
     */
    async queryByField(collectionName, field, value) {
        try {
            const collectionRef = collection(this.firebaseAccessor.db, collectionName);
            const q = query(collectionRef, where(field, '==', value));
            const querySnapshot = await getDocs(q);
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
}
