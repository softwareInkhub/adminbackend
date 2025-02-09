import express from 'express';
import cors from 'cors';
import path from 'path';
import schemaRoutes from './server/routes/schema.routes';
import testRoutes from './server/routes/test.routes';

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// Serve static files from public directory - use absolute path
app.use(express.static(path.join(process.cwd(), 'public')));

// API routes
app.use('/api', schemaRoutes);
// Test UI route
app.use('/test-schema', testRoutes);
// Student profile route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test UI available at: http://localhost:${PORT}/test-schema`);
    console.log(`Student Schema UI available at: http://localhost:${PORT}/student-schema`);
});

export default app; 