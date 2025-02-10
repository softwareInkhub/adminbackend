"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchemaActivity = void 0;
const logger_1 = require("../../utils/logger");
class CreateSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
        this.COMPONENT = 'CreateSchemaActivity';
    }
    async execute(request) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'execute', 'Starting schema creation', request);
            // Validate request
            this.validateRequest(request);
            // Execute controller
            const result = await this.schemaController.createSchema(request);
            const response = {
                id: result.id || '', // Provide empty string as fallback
                success: true,
                message: 'Schema created successfully'
            };
            logger_1.Logger.log(this.COMPONENT, 'execute', 'Schema creation completed', response);
            return response;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'execute', error);
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
exports.CreateSchemaActivity = CreateSchemaActivity;
