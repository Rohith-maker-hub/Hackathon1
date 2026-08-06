import { Router } from 'express';
import { getAgents, getAgentById, createAgent, updateAgent, deleteAgent } from '../controllers/agent.controller';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticate); // Require authentication for all agent routes

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', requireRole(['admin']), createAgent);
router.put('/:id', requireRole(['admin']), updateAgent);
router.delete('/:id', requireRole(['admin']), deleteAgent);

export default router;
