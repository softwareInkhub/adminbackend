"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSchemaActivity = void 0;
const logger_1 = require("../../utils/logger");
class DeleteSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
        this.COMPONENT = 'DeleteSchemaActivity';
        logger_1.Logger.log(this.COMPONENT, 'constructor', 'Initializing DeleteSchemaActivity');
    }
    async execute(schemaId) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'execute', 'Starting schema deletion', { schemaId });
            if (!schemaId) {
                logger_1.Logger.error(this.COMPONENT, 'execute', 'Schema ID is required');
                throw new Error('Schema ID is required');
            }
            logger_1.Logger.log(this.COMPONENT, 'execute', 'Calling schema controller to delete schema', { schemaId });
            await this.schemaController.deleteSchema(schemaId);
            const response = {
                success: true,
                message: `Schema ${schemaId} deleted successfully`
            };
            logger_1.Logger.log(this.COMPONENT, 'execute', 'Schema deletion completed successfully', response);
            return response;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'execute', `Failed to delete schema: ${error}`);
            throw error;
        }
    }
}
exports.DeleteSchemaActivity = DeleteSchemaActivity;
