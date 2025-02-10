"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
class SchemaBuilder {
    constructor(dataAccessor) {
        this.dataAccessor = dataAccessor;
        this.COLLECTION_NAME = 'schemas';
        this.COMPONENT = 'SchemaBuilder';
    }
    async createSchema(schema) {
        try {
            logger_1.Logger.log(this.COMPONENT, 'createSchema', 'Creating schema', schema);
            const schemaData = {
                uuid: (0, uuid_1.v4)(),
                name: schema.name,
                description: schema.description,
                fields: schema.fields,
                status: schema.status,
                tags: Array.isArray(schema.tags) ? schema.tags : [],
                createdTime: new Date(),
                lastUpdateTime: new Date(),
                metadata: {
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            };
            const docId = await this.dataAccessor.create(this.COLLECTION_NAME, schemaData);
            const result = {
                id: docId,
                name: schemaData.name,
                fields: schemaData.fields,
                status: schemaData.status,
                tags: schemaData.tags,
                metadata: schemaData.metadata
            };
            logger_1.Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
            return result;
        }
        catch (error) {
            logger_1.Logger.error(this.COMPONENT, 'createSchema', error);
            throw error;
        }
    }
    async getSchema(id) {
        const result = await this.dataAccessor.get(this.COLLECTION_NAME, id);
        if (Array.isArray(result))
            throw new Error('Unexpected result type');
        return result;
    }
    async getAllSchemas() {
        const result = await this.dataAccessor.get(this.COLLECTION_NAME);
        if (!Array.isArray(result))
            throw new Error('Unexpected result type');
        return result;
    }
    async updateSchema(request) {
        const result = await this.dataAccessor.update(this.COLLECTION_NAME, request.id, request);
        return result;
    }
    async deleteSchema(id) {
        try {
            logger_1.Logger.log('SchemaBuilder', 'deleteSchema', `Deleting schema with ID: ${id}`);
            await this.dataAccessor.delete(this.COLLECTION_NAME, id);
            logger_1.Logger.log('SchemaBuilder', 'deleteSchema', 'Schema deleted successfully');
        }
        catch (error) {
            logger_1.Logger.error('SchemaBuilder', 'deleteSchema', `Failed to delete schema: ${error}`);
            throw error;
        }
    }
}
exports.SchemaBuilder = SchemaBuilder;
