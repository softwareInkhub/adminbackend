import { SchemaController } from '../../controller/schema.controller';
import { SchemaBuilder } from '../../builder/schema.builder';
import { FirebaseDataAccessor } from '../../dataaccessor/firebase.dataaccessor';
import { Logger } from '../../utils/logger';

export interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'enum';
  required?: boolean;
  enum?: string[];
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean;
  };
}

export interface CreateSchemaRequest {
  name: string;
  description?: string;
  fields: SchemaField[];
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  tags: string[];
}

export interface CreateSchemaResponse {
  id: string;
  success: boolean;
  message: string;
}

export class CreateSchemaActivity {
  private readonly COMPONENT = 'CreateSchemaActivity';

  constructor(private schemaController: SchemaController) {}

  async execute(request: CreateSchemaRequest): Promise<CreateSchemaResponse> {
    try {
      Logger.log(this.COMPONENT, 'execute', 'Starting schema creation', request);
      // Validate request
      this.validateRequest(request);

      // Execute controller
      const result = await this.schemaController.createSchema(request);

      const response = {
        id: result.id,
        success: true,
        message: 'Schema created successfully',
        data: result
      };
      Logger.log(this.COMPONENT, 'execute', 'Schema creation completed', response);
      return response;
    } catch (error) {
      Logger.error(this.COMPONENT, 'execute', error);
      throw new Error(`Failed to create schema: ${error}`);
    }
  }

  private validateRequest(request: CreateSchemaRequest): void {
    if (!request.name) {
      throw new Error('Schema name is required');
    }

    if (!request.fields || request.fields.length === 0) {
      throw new Error('At least one field is required');
    }

    // Validate each field
    request.fields.forEach(field => {
      if (!field.name || !field.type) {
        throw new Error('Field name and type are required');
      }

      if (field.type === 'enum' && (!field.enum || field.enum.length === 0)) {
        throw new Error('Enum fields must have at least one value');
      }
    });
  }
} 