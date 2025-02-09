import dotenv from 'dotenv';
// Load env variables first
dotenv.config({ path: '.env.local' });
import app from '../app.js';
const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test UI available at: http://localhost:${PORT}/test.html`);
});
export default app;
