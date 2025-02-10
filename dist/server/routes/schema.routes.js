"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_dataaccessor_1 = require("../../lib/acbda/dataaccessor/firebase.dataaccessor");
const schema_builder_1 = require("../../lib/acbda/builder/schema.builder");
const schema_controller_1 = require("../../lib/acbda/controller/schema.controller");
const create_schema_activity_1 = require("../../lib/acbda/activity/schema/create-schema.activity");
const logger_1 = require("../../lib/acbda/utils/logger");
const router = (0, express_1.Router)();
const COMPONENT = 'SchemaRoutes';
// Initialize dependencies after environment variables are loaded
const initializeDependencies = () => {
    const dataAccessor = new firebase_dataaccessor_1.FirebaseDataAccessor();
    const schemaBuilder = new schema_builder_1.SchemaBuilder(dataAccessor);
    return new schema_controller_1.SchemaController(schemaBuilder);
};
const schemaController = initializeDependencies();
// Get all schemas
router.get('/schemas', async (req, res) => {
    try {
        const schemas = await schemaController.getAllSchemas();
        // Ensure tags is always an array
        const normalizedSchemas = schemas.map(schema => ({
            ...schema,
            tags: schema.tags || [] // Use optional chaining
        }));
        res.json(normalizedSchemas);
    }
    catch (error) {
        logger_1.Logger.error(COMPONENT, 'GET /schemas', error);
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
    }
    catch (error) {
        logger_1.Logger.error(COMPONENT, 'GET /schemas/:id', error);
        res.status(500).json({ error: 'Failed to fetch schema' });
    }
});
// Create new schema
router.post('/schemas', async (req, res) => {
    try {
        const activity = new create_schema_activity_1.CreateSchemaActivity(schemaController);
        const result = await activity.execute(req.body);
        res.json(result);
    }
    catch (error) {
        logger_1.Logger.error(COMPONENT, 'POST /schemas', error);
        res.status(500).json({ error: 'Failed to create schema' });
    }
});
// Delete schema
router.delete('/schemas/:id', async (req, res) => {
    try {
        await schemaController.deleteSchema(req.params.id);
        res.json({ success: true, message: 'Schema deleted successfully' });
    }
    catch (error) {
        logger_1.Logger.error(COMPONENT, 'DELETE /schemas/:id', error);
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
    }
    catch (error) {
        logger_1.Logger.error(COMPONENT, 'PUT /schemas/:id', error);
        res.status(500).json({ error: 'Failed to update schema' });
    }
});
exports.default = router;
