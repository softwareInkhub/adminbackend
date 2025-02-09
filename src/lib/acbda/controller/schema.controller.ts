import { SchemaBuilder } from '../builder/schema.builder';
import { Schema, CreateSchemaRequest, UpdateSchemaRequest, SchemaField } from '../model/schema.model';
import { Logger } from '../utils/logger';

export class SchemaController {
  private readonly COMPONENT = 'SchemaController';

  constructor(private schemaBuilder: SchemaBuilder) {}

  async createSchema(request: CreateSchemaRequest): Promise<Schema> {
    try {
      Logger.log(this.COMPONENT, 'createSchema', 'Processing create request', request);
      const schemaWithSystemFields = this.addSystemFields(request);
      Logger.log(this.COMPONENT, 'createSchema', 'Added system fields', schemaWithSystemFields);
      const result = await this.schemaBuilder.createSchema(schemaWithSystemFields);
      Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
      return result;
    } catch (error) {
      Logger.error(this.COMPONENT, 'createSchema', error);
      throw error;
    }
  }

  async getSchema(id: string): Promise<Schema> {
    return await this.schemaBuilder.getSchema(id);
  }

  async getAllSchemas(): Promise<Schema[]> {
    return await this.schemaBuilder.getAllSchemas();
  }

  async updateSchema(request: UpdateSchemaRequest): Promise<Schema> {
    return await this.schemaBuilder.updateSchema(request);
  }

  async deleteSchema(id: string): Promise<void> {
    try {
      Logger.log('SchemaController', 'deleteSchema', `Deleting schema: ${id}`);
      await this.schemaBuilder.deleteSchema(id);
      Logger.log('SchemaController', 'deleteSchema', 'Schema deleted successfully');
    } catch (error) {
      Logger.error('SchemaController', 'deleteSchema', `Delete operation failed: ${error}`);
      throw error;
    }
  }

  private addSystemFields(request: CreateSchemaRequest) {
    const systemFields: SchemaField[] = [
      {
        name: 'id',
        type: 'string',
        required: true,
        validation: {
          pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
        }
      },
      {
        name: 'status',
        type: 'enum',
        required: true,
        enum: ['ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED', 'DELETED']
      },
      {
        name: 'tags',
        type: 'array',
        required: false
      },
      {
        name: 'createdTime',
        type: 'date',
        required: true
      },
      {
        name: 'lastUpdateTime',
        type: 'date',
        required: true
      }
    ];

    return {
      ...request,
      fields: [...systemFields, ...request.fields]
    };
  }
} 