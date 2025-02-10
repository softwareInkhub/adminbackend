import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  DocumentData,
  getFirestore
} from 'firebase/firestore';
import { FirebaseAccessor } from '../accessor/firebase.accessor';
import { Schema } from '../model/schema.model';
import { Logger } from '../utils/logger';
import { Firestore } from 'firebase/firestore';

export class FirebaseDataAccessor {
  private firebaseAccessor: FirebaseAccessor;
  private readonly COMPONENT = 'FirebaseDataAccessor';
  private readonly COLLECTION = 'schemas';
  private db: Firestore;
  
  constructor() {
    this.firebaseAccessor = new FirebaseAccessor();
    this.db = getFirestore();
  }

  /**
   * Create a new document in a collection
   */
  async create(collectionName: string, data: any): Promise<string> {
    try {
      Logger.log(this.COMPONENT, 'create', `Creating document in ${collectionName}`, data);
      const docRef = await addDoc(collection(this.firebaseAccessor.db, collectionName), data);
      Logger.log(this.COMPONENT, 'create', 'Document created successfully', docRef.id);
      return docRef.id;
    } catch (error) {
      Logger.error(this.COMPONENT, 'create', error);
      throw error;
    }
  }

  /**
   * Get a document by ID
   */
  async get(collectionName: string, id?: string, constraints: QueryConstraint[] = []): Promise<Schema | Schema[]> {
    try {
      Logger.log(this.COMPONENT, 'get', `Fetching from ${collectionName}`, { id, constraints });
      if (id) {
        const docRef = doc(this.firebaseAccessor.db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error('Document not found');
        const result = { 
          id: docSnap.id,  // Firebase document ID
          ...docSnap.data() 
        } as Schema;
        Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
        return result;
      }

      const collectionRef = collection(this.firebaseAccessor.db, collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => ({ 
        id: doc.id,  // Firebase document ID
        ...doc.data() 
      } as Schema));
      Logger.log(this.COMPONENT, 'get', 'Fetch successful', result);
      return result;
    } catch (error) {
      Logger.error(this.COMPONENT, 'get', error);
      throw error;
    }
  }

  /**
   * Update a document by ID
   */
  async update(collectionName: string, id: string, data: Partial<Schema>): Promise<Schema> {
    const docRef = doc(this.firebaseAccessor.db, collectionName, id);
    await updateDoc(docRef, data);
    return this.get(collectionName, id) as Promise<Schema>;
  }

  /**
   * Delete a document by ID
   */
  async delete(collectionName: string, id: string): Promise<void> {
    await deleteDoc(doc(this.firebaseAccessor.db, collectionName, id));
  }

  /**
   * Query documents by field
   */
  async queryByField(collectionName: string, field: string, value: any) {
    try {
      const collectionRef = collection(this.firebaseAccessor.db, collectionName);
      const q = query(collectionRef, where(field, '==', value));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Error querying documents: ${error}`);
    }
  }

  async getAll(collectionName: string): Promise<Schema[]> {
    return this.get(collectionName) as Promise<Schema[]>;
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      Logger.log(this.COMPONENT, 'deleteDocument', `Deleting document with ID: ${id}`);
      const docRef = doc(this.firebaseAccessor.db, this.COLLECTION, id);
      Logger.log(this.COMPONENT, 'deleteDocument', 'Document reference created', { path: docRef.path });
      
      await deleteDoc(docRef);
      Logger.log(this.COMPONENT, 'deleteDocument', `Document deleted successfully: ${id}`);
    } catch (error) {
      Logger.error(this.COMPONENT, 'deleteDocument', `Failed to delete document: ${error}`);
      throw error;
    }
  }

  async createDocument<T extends DocumentData>(
    collectionName: string, 
    data: T
  ): Promise<string> {
    const docRef = await addDoc(collection(this.db, collectionName), data);
    return docRef.id;
  }

  async queryDocuments<T extends DocumentData>(
    collectionName: string, 
    queryParams: QueryParams
  ): Promise<T[]> {
    const collectionRef = collection(this.db, collectionName);
    const q = query(collectionRef, where(queryParams.field, queryParams.operator as any, queryParams.value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as unknown as T);
  }
}

interface QueryParams {
  field: string;
  operator: string;
  value: unknown;
} 