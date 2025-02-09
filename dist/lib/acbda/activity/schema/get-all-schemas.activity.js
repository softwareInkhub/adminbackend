export class GetAllSchemasActivity {
    constructor(schemaController) {
        this.schemaController = schemaController;
    }
    async execute() {
        try {
            return await this.schemaController.getAllSchemas();
        }
        catch (error) {
            throw new Error(`Failed to get schemas: ${error}`);
        }
    }
}
