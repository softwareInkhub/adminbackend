import express from 'express';
import cors from 'cors';
import path from 'path';
import schemaRoutes from './server/routes/schema.routes.js';
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Debug middleware
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});
// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
// API routes
app.use('/api', schemaRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test UI available at: http://localhost:${PORT}/test-schema`);
    console.log(`Student Schema UI available at: http://localhost:${PORT}/student-schema`);
});
export default app;
