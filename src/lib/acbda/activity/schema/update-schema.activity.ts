import { SchemaController } from '../../controller/schema.controller';
import { SchemaResponse, UpdateSchemaRequest } from '../../model/schema.model';

export class UpdateSchemaActivity {
    private schemaController: SchemaController;

    constructor(schemaController: SchemaController) {
        this.schemaController = schemaController;
    }

    async execute(request: UpdateSchemaRequest): Promise<SchemaResponse> {
        try {
            const schema = await this.schemaController.updateSchema(request);
            return {
                success: true,
                message: 'Schema updated successfully',
                data: schema
            };
        } catch (error) {
            throw new Error(`Failed to update schema: ${error}`);
        }
    }
} 