import { Logger } from '../utils/logger';
export class SchemaController {
    constructor(schemaBuilder) {
        this.schemaBuilder = schemaBuilder;
        this.COMPONENT = 'SchemaController';
    }
    async createSchema(request) {
        try {
            Logger.log(this.COMPONENT, 'createSchema', 'Processing create request', request);
            const schemaWithSystemFields = this.addSystemFields(request);
            Logger.log(this.COMPONENT, 'createSchema', 'Added system fields', schemaWithSystemFields);
            const result = await this.schemaBuilder.createSchema(schemaWithSystemFields);
            Logger.log(this.COMPONENT, 'createSchema', 'Schema created successfully', result);
            return result;
        }
        catch (error) {
            Logger.error(this.COMPONENT, 'createSchema', error);
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
        await this.schemaBuilder.deleteSchema(id);
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
