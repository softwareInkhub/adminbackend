import { Router } from 'express';
import { FirebaseDataAccessor } from '../../lib/acbda/dataaccessor/firebase.dataaccessor';
import { SchemaBuilder } from '../../lib/acbda/builder/schema.builder';
import { SchemaController } from '../../lib/acbda/controller/schema.controller';
import { CreateSchemaActivity } from '../../lib/acbda/activity/schema/create-schema.activity';
import { Logger } from '../../lib/acbda/utils/logger';

const router = Router();
const COMPONENT = 'SchemaRoutes';

// Initialize dependencies after environment variables are loaded
const initializeDependencies = () => {
    const dataAccessor = new FirebaseDataAccessor();
    const schemaBuilder = new SchemaBuilder(dataAccessor);
    return new SchemaController(schemaBuilder);
};

const schemaController = initializeDependencies();

// Get all schemas
router.get('/schemas', async (req, res) => {
    try {
        const schemas = await schemaController.getAllSchemas();
        // Ensure tags is always an array
        const normalizedSchemas = schemas.map(schema => ({
            ...schema,
            tags: schema.tags || []  // Use optional chaining
        }));
        res.json(normalizedSchemas);
    } catch (error) {
        Logger.error(COMPONENT, 'GET /schemas', error);
        res.status(500).json({ error: 'Failed to fetch schemas' });
    }
});

// Get schema by ID
router.get('/schemas/:id', async (req, res) => {
    try {
        const schema = await schemaController.getSchema(req.params.id);
        // Always normalize tags to be an array
        const normalizedSchema = {
            ...schema,
            tags: Array.isArray(schema.tags) ? schema.tags : []
        };
        res.json(normalizedSchema);
    } catch (error) {
        Logger.error(COMPONENT, 'GET /schemas/:id', error);
        res.status(500).json({ error: 'Failed to fetch schema' });
    }
});

// Create new schema
router.post('/schemas', async (req, res) => {
    try {
        const activity = new CreateSchemaActivity(schemaController);
        const result = await activity.execute(req.body);
        res.json(result);
    } catch (error) {
        Logger.error(COMPONENT, 'POST /schemas', error);
        res.status(500).json({ error: 'Failed to create schema' });
    }
});

// Delete schema
router.delete('/schemas/:id', async (req, res) => {
    try {
        await schemaController.deleteSchema(req.params.id);
        res.json({ success: true, message: 'Schema deleted successfully' });
    } catch (error) {
        Logger.error(COMPONENT, 'DELETE /schemas/:id', error);
        res.status(500).json({ error: 'Failed to delete schema' });
    }
});

// Add PUT route for updating schemas
router.put('/schemas/:id', async (req, res) => {
    try {
        const updatedSchema = await schemaController.updateSchema({
            id: req.params.id,
            ...req.body,
            // Ensure tags is an array
            tags: Array.isArray(req.body.tags) ? req.body.tags : []
        });
        
        // Normalize response
        const normalizedSchema = {
            ...updatedSchema,
            tags: Array.isArray(updatedSchema.tags) ? updatedSchema.tags : []
        };
        
        res.json(normalizedSchema);
    } catch (error) {
        Logger.error(COMPONENT, 'PUT /schemas/:id', error);
        res.status(500).json({ error: 'Failed to update schema' });
    }
});

export default router; 