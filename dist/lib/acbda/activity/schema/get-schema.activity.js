export class GetSchemaActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
    }
    async execute(id) {
        try {
            return await this.schemaController.getSchema(id);
        }
        catch (error) {
            throw new Error(`Failed to get schema: ${error}`);
        }
    }
}
