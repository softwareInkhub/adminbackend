import { SchemaController } from '../../controller/schema.controller';
import { Schema } from '../../model/schema.model';

export class GetSchemaActivity {
    constructor(private schemaController: SchemaController) {}

    async execute(id: string): Promise<Schema> {
        try {
            return await this.schemaController.getSchema(id);
        } catch (error) {
            throw new Error(`Failed to get schema: ${error}`);
        }
    }
} 