import { Router } from 'express';
import { CreateSchemaActivity, GetSchemaActivity, GetAllSchemasActivity, UpdateSchemaActivity, DeleteSchemaActivity, Logger, SchemaController, SchemaBuilder, FirebaseDataAccessor } from '../../lib/acbda/index.js';
const router = Router();
const COMPONENT = 'SchemaRoutes';
// Initialize dependencies
const dataAccessor = new FirebaseDataAccessor();
const schemaBuilder = new SchemaBuilder(dataAccessor);
const schemaController = new SchemaController(schemaBuilder);
// Create Schema
router.post('/schemas', async (req, res) => {
    try {
        Logger.log(COMPONENT, 'POST /schemas', 'Creating schema', req.body);
        const activity = new CreateSchemaActivity(schemaController);
        const result = await activity.execute(req.body);
        Logger.log(COMPONENT, 'POST /schemas', 'Schema created', result);
        res.status(201).json(result);
    }
    catch (error) {
        Logger.error(COMPONENT, 'POST /schemas', error);
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Get All Schemas
router.get('/schemas', async (req, res) => {
    try {
        Logger.log(COMPONENT, 'GET /schemas', 'Fetching all schemas');
        const activity = new GetAllSchemasActivity(schemaController);
        const result = await activity.execute();
        Logger.log(COMPONENT, 'GET /schemas', 'Schemas fetched', result);
        res.json(result);
    }
    catch (error) {
        Logger.error(COMPONENT, 'GET /schemas', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Get Schema by ID
router.get('/schemas/:id', async (req, res) => {
    try {
        Logger.log(COMPONENT, 'GET /schemas/:id', 'Fetching schema', { id: req.params.id });
        const activity = new GetSchemaActivity(schemaController);
        const result = await activity.execute(req.params.id);
        Logger.log(COMPONENT, 'GET /schemas/:id', 'Schema fetched', result);
        res.json(result);
    }
    catch (error) {
        Logger.error(COMPONENT, 'GET /schemas/:id', error);
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Update Schema
router.put('/schemas/:id', async (req, res) => {
    try {
        const updateData = { id: req.params.id, ...req.body };
        Logger.log(COMPONENT, 'PUT /schemas/:id', 'Updating schema', updateData);
        const activity = new UpdateSchemaActivity(schemaController);
        const result = await activity.execute(updateData);
        Logger.log(COMPONENT, 'PUT /schemas/:id', 'Schema updated', result);
        res.json(result);
    }
    catch (error) {
        Logger.error(COMPONENT, 'PUT /schemas/:id', error);
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Delete Schema
router.delete('/schemas/:id', async (req, res) => {
    try {
        Logger.log(COMPONENT, 'DELETE /schemas/:id', 'Deleting schema', { id: req.params.id });
        const activity = new DeleteSchemaActivity(schemaController);
        const result = await activity.execute(req.params.id);
        Logger.log(COMPONENT, 'DELETE /schemas/:id', 'Schema deleted', result);
        res.json(result);
    }
    catch (error) {
        Logger.error(COMPONENT, 'DELETE /schemas/:id', error);
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
export default router;
