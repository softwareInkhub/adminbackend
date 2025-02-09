export class DeleteSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
    }
    async execute(id) {
        try {
            await this.schemaController.deleteSchema(id);
            return {
                success: true,
                message: 'Schema deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete schema: ${error}`);
        }
    }
}
