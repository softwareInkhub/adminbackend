import { v4 as uuidv4 } from 'uuid';
import { FirebaseDataAccessor } from '../dataaccessor/firebase.dataaccessor';
import { Schema, CreateSchemaRequest, UpdateSchemaRequest } from '../model/schema.model';
import { Logger } from '../utils/logger';

export class SchemaBuilder {
  private readonly COLLECTION_NAME = 'schemas';
  private readonly COMPONENT = 'SchemaBuilder';

  constructor(private dataAccessor: FirebaseDataAccessor) {}

  async createSchema(schema: CreateSchemaRequest): Promise<Schema> {
    try {
      Logger.log(this.COMPONENT, 'createSchema', 'Creating schema', schema);
      const schemaData = {
        uuid: uuidv4(),
        name: schema.name,
        description: schema.description,
        fields: schema.fields,
        status: schema.status,
        tags: Array.isArray(schema.tags) ? schema.tags : [],
        createdTime: new Date(),
        lastUpdateTime: new Date(),
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };

      const docId = await this.dataAccessor.create(this.COLLECTION_NAME, schemaData);
      const result: Schema = {
        id: docId,
        name: schemaData.name,
        fields: schemaData.fields,
        status: schemaData.status,
        tags: schemaData.tags,
        metadata: schemaData.metadata
      };
      Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
      return result;
    } catch (error) {
      Logger.error(this.COMPONENT, 'createSchema', error);
      throw error;
    }
  }

  async getSchema(id: string): Promise<Schema> {
    const result = await this.dataAccessor.get(this.COLLECTION_NAME, id);
    if (Array.isArray(result)) throw new Error('Unexpected result type');
    return result;
  }

  async getAllSchemas(): Promise<Schema[]> {
    const result = await this.dataAccessor.get(this.COLLECTION_NAME);
    if (!Array.isArray(result)) throw new Error('Unexpected result type');
    return result;
  }

  async updateSchema(request: UpdateSchemaRequest): Promise<Schema> {
    const result = await this.dataAccessor.update(this.COLLECTION_NAME, request.id, request);
    return result;
  }

  async deleteSchema(id: string): Promise<void> {
    try {
      Logger.log('SchemaBuilder', 'deleteSchema', `Deleting schema with ID: ${id}`);
      await this.dataAccessor.delete(this.COLLECTION_NAME, id);
      Logger.log('SchemaBuilder', 'deleteSchema', 'Schema deleted successfully');
    } catch (error) {
      Logger.error('SchemaBuilder', 'deleteSchema', `Failed to delete schema: ${error}`);
      throw error;
    }
  }
} 