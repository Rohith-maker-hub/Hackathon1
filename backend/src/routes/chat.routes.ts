import { Router } from 'express';
import { chat, chatStream } from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', chat);
router.post('/stream', chatStream);

export default router;
