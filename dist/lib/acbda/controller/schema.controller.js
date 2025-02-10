"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaController = void 0;
const logger_1 = require("../utils/logger");
class SchemaController {
    constructor(schemaBuilder) {
        this.schemaBuilder = schemaBuilder;
        this.COMPONENT = 'SchemaController';
    }
    async createSchema(request) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'createSchema', 'Processing create request', request);
            const schemaWithSystemFields = this.addSystemFields(request);
            logger_1.Logger.log(this.COMPONENT, 'createSchema', 'Added system fields', schemaWithSystemFields);
            const result = await this.schemaBuilder.createSchema(schemaWithSystemFields);
            logger_1.Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
            return result;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'createSchema', error);
            throw error;
        }
    }
    async getSchema(id) {
        return await this.schemaBuilder.getSchema(id);
    }
    async getAllSchemas() {
        return await this.schemaBuilder.getAllSchemas();
    }
    async updateSchema(request) {
        return await this.schemaBuilder.updateSchema(request);
    }
    async deleteSchema(id) {
        try {
            logger_1.Logger.log('SchemaController', 'deleteSchema', `Deleting schema: ${id}`);
            await this.schemaBuilder.deleteSchema(id);
            logger_1.Logger.log('SchemaController', 'deleteSchema', 'Schema deleted successfully');
        }
        catch (error) {
            logger_1.Logger.error('SchemaController', 'deleteSchema', `Delete operation failed: ${error}`);
            throw error;
        }
    }
    addSystemFields(request) {
        const systemFields = [
            {
                name: 'id',
                type: 'string',
                required: true,
                validation: {
                    pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
                }
            },
            {
                name: 'status',
                type: 'enum',
                required: true,
                enum: ['ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED', 'DELETED']
            },
            {
                name: 'tags',
                type: 'array',
                required: false
            },
            {
                name: 'createdTime',
                type: 'date',
                required: true
            },
            {
                name: 'lastUpdateTime',
                type: 'date',
                required: true
            }
        ];
        return {
            ...request,
            fields: [...systemFields, ...request.fields]
        };
    }
}
exports.SchemaController = SchemaController;
