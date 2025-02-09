import { Router } from 'express';
import path from 'path';
import { Logger } from '../../lib/acbda/utils/logger';

const router = Router();
const COMPONENT = 'TestRoutes';

router.get('/schema', (req, res) => {
    try {
        Logger.log(COMPONENT, 'GET /', 'Serving test UI');
        res.sendFile(path.join(process.cwd(), 'public', 'test.html'));
    } catch (error) {
        Logger.error(COMPONENT, 'GET /', error);
        res.status(500).send('Error serving test UI');
    }
});

router.get('/SchemaServiceTest', (req, res) => {
    try {
        Logger.log(COMPONENT, 'GET /', 'Serving test UI');
        res.sendFile(path.join(process.cwd(), 'public', 'SchemaServiceTest.html'));
    } catch (error) {
        Logger.error(COMPONENT, 'GET /', error);
        res.status(500).send('Error serving test UI');
    }
});

router.get('/ActivityTester', (req, res) => {
    try {
        Logger.log(COMPONENT, 'GET /', 'Serving test UI');
        res.sendFile(path.join(process.cwd(), 'public', 'ActivityTester.html'));
    } catch (error) {
        Logger.error(COMPONENT, 'GET /', error);
        res.status(500).send('Error serving test UI');
    }
});

export default router; 