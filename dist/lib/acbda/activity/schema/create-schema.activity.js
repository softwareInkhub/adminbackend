import { Logger } from '../../utils/logger.js';
export class CreateSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
        this.COMPONENT = 'CreateSchemaActivity';
    }
    async execute(request) {
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
        }
        catch (error) {
            Logger.error(this.COMPONENT, 'execute', error);
            throw new Error(`Failed to create schema: ${error}`);
        }
    }
    validateRequest(request) {
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
