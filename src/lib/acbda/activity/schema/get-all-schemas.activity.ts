import { SchemaController } from '../../controller/schema.controller';
import { Schema } from '../../model/schema.model';

export class GetAllSchemasActivity {
    constructor(private schemaController: SchemaController) {}

    async execute(): Promise<Schema[]> {
        try {
            return await this.schemaController.getAllSchemas();
        } catch (error) {
            throw new Error(`Failed to get schemas: ${error}`);
        }
    }
} 