import { Router } from 'express';
import { getAnalytics } from '../controllers/analytics.controller';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', requireRole(['admin']), getAnalytics);
export default router;
