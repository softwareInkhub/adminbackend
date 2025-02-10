import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import express from 'express';
import cors from 'cors';
import path from 'path';
import schemaRoutes from './routes/schema.routes';

// Debug: Log environment variables
console.log('Environment Check:', {
  apiKey: process.env.FIREBASE_API_KEY ? 'Set' : 'Not Set',
  projectId: process.env.FIREBASE_PROJECT_ID
});

const app = express();
const PORT = process.env.PORT || 3001;  // Changed to 3001

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// HTML Routes
app.get('/test', (req, res, next) => {
    const filePath = path.join(process.cwd(), 'public', 'test.html');
    res.sendFile(filePath, (err) => {
        if (err) next(err);
    });
});

app.get('/test/activity', (req, res, next) => {
    const filePath = path.join(process.cwd(), 'public', 'ActivityTester.html');
    res.sendFile(filePath, (err) => {
        if (err) next(err);
    });
});

app.get('/test/schema-service', (req, res, next) => {
    const filePath = path.join(process.cwd(), 'public', 'SchemaServiceTest.html');
    res.sendFile(filePath, (err) => {
        if (err) next(err);
    });
});

// API routes
app.use('/api', schemaRoutes);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- Test UI: http://localhost:3001/test');
    console.log('- Schema Service: http://localhost:3001/test/schema-service');
    console.log('- Activity Tester: http://localhost:3001/test/activity');
});

export default app; 