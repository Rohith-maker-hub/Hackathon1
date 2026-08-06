import { Router } from 'express';
import { getWorkflows, createWorkflow, updateWorkflow, deleteWorkflow, executeWorkflow } from '../controllers/workflow.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getWorkflows);
router.post('/', createWorkflow);
router.put('/:id', updateWorkflow);
router.delete('/:id', deleteWorkflow);
router.post('/:id/run', executeWorkflow);

export default router;
