import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/logger';
export class SchemaBuilder {
    constructor(dataAccessor) {
        this.dataAccessor = dataAccessor;
        this.COLLECTION_NAME = 'schemas';
        this.COMPONENT = 'SchemaBuilder';
    }
    async createSchema(schema) {
        try {
            Logger.log(this.COMPONENT, 'createSchema', 'Creating schema', schema);
            const schemaData = {
                id: uuidv4(),
                name: schema.name,
                description: schema.description,
                fields: schema.fields,
                status: schema.status,
                tags: schema.tags,
                createdTime: new Date(),
                lastUpdateTime: new Date()
            };
            const id = await this.dataAccessor.create(this.COLLECTION_NAME, schemaData);
            const result = { ...schemaData, id };
            Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
            return result;
        }
        catch (error) {
            Logger.error(this.COMPONENT, 'createSchema', error);
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
        await this.dataAccessor.delete(this.COLLECTION_NAME, id);
    }
}
