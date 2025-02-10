"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Load environment variables first
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const schema_routes_1 = __importDefault(require("./routes/schema.routes"));
// Debug: Log environment variables
console.log('Environment Check:', {
    apiKey: process.env.FIREBASE_API_KEY ? 'Set' : 'Not Set',
    projectId: process.env.FIREBASE_PROJECT_ID
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001; // Changed to 3001
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Serve static files from public directory
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
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
    res.sendFile(path_1.default.join(process.cwd(), 'public', 'test.html'));
});
app.get('/schema-service', (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), 'public', 'SchemaServiceTest.html'));
});
app.get('/activity', (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), 'public', 'ActivityTester.html'));
});
// API routes
app.use('/api', schema_routes_1.default);
// Error handler
app.use((err, req, res, next) => {
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
exports.default = app;
