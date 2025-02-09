export class UpdateSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
    }
    async execute(request) {
        try {
            const schema = await this.schemaController.updateSchema(request);
            return {
                success: true,
                message: 'Schema updated successfully',
                data: schema
            };
        }
        catch (error) {
            throw new Error(`Failed to update schema: ${error}`);
        }
    }
}
