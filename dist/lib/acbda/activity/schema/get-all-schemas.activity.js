"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSchemasActivity = void 0;
class GetAllSchemasActivity {
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
exports.GetAllSchemasActivity = GetAllSchemasActivity;
