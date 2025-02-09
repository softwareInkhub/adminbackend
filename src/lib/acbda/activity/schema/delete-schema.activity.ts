import { SchemaController } from '../../controller/schema.controller';
import { Logger } from '../../utils/logger';

export interface DeleteSchemaResponse {
    success: boolean;
    message: string;
}

export class DeleteSchemaActivity {
    private readonly COMPONENT = 'DeleteSchemaActivity';

    constructor(private schemaController: SchemaController) {
        Logger.log(this.COMPONENT, 'constructor', 'Initializing DeleteSchemaActivity');
    }

    async execute(schemaId: string): Promise<DeleteSchemaResponse> {
        try {
            Logger.log(this.COMPONENT, 'execute', 'Starting schema deletion', { schemaId });

            if (!schemaId) {
                Logger.error(this.COMPONENT, 'execute', 'Schema ID is required');
                throw new Error('Schema ID is required');
            }

            Logger.log(this.COMPONENT, 'execute', 'Calling schema controller to delete schema', { schemaId });
            await this.schemaController.deleteSchema(schemaId);
            
            const response = {
                success: true,
                message: `Schema ${schemaId} deleted successfully`
            };
            
            Logger.log(this.COMPONENT, 'execute', 'Schema deletion completed successfully', response);
            return response;
        } catch (error) {
            Logger.error(this.COMPONENT, 'execute', `Failed to delete schema: ${error}`);
            throw error;
        }
    }
} 