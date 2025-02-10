"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSchemaActivity = void 0;
class GetSchemaActivity {
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
exports.GetSchemaActivity = GetSchemaActivity;
