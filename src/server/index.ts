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

// Root route - serve index page with links
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Schema Management</title>
                <style>
                    body { font-family: Arial; margin: 40px; }
                    h1 { color: #333; }
                    .links { margin-top: 20px; }
                    a { 
                        display: block;
                        margin: 10px 0;
                        padding: 10px;
                        background: #f0f0f0;
                        text-decoration: none;
                        color: #333;
                        border-radius: 4px;
                    }
                    a:hover { background: #e0e0e0; }
                </style>
            </head>
            <body>
                <h1>Schema Management System</h1>
                <div class="links">
                    <a href="/test.html">Schema Management</a>
                    <a href="/SchemaServiceTest.html">Schema Service Test</a>
                    <a href="/ActivityTester.html">Activity Tester</a>
                </div>
            </body>
        </html>
    `);
});

// HTML Routes
app.get('/test', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'test.html'));
});

app.get('/schema-service', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'SchemaServiceTest.html'));
});

app.get('/activity', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'ActivityTester.html'));
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
    console.log('- Home: http://localhost:3001/');
    console.log('- Schema Management: http://localhost:3001/test.html');
    console.log('- Schema Service: http://localhost:3001/SchemaServiceTest.html');
    console.log('- Activity Tester: http://localhost:3001/ActivityTester.html');
});

export default app; 