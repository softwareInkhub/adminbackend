export interface SchemaField {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'enum';
    required?: boolean;
    enum?: string[];
    defaultValue?: any;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        custom?: (value: any) => boolean;
    };
}

export interface Schema {
    id?: string;
    name: string;
    fields: SchemaField[];
    status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
    metadata: SchemaMetadata;
}

export interface SchemaMetadata {
    createdAt: Date;
    updatedAt: Date;
}

// Request/Response models for different operations
export interface CreateSchemaRequest {
    name: string;
    description?: string;
    fields: SchemaField[];
    status: Schema['status'];
    tags: string[];
}

export interface UpdateSchemaRequest {
    id: string;
    name?: string;
    description?: string;
    fields?: SchemaField[];
    status?: Schema['status'];
    tags?: string[];
}

export interface SchemaResponse {
    success: boolean;
    message: string;
    data?: Schema;
}