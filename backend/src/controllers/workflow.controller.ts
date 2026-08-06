import { Request, Response, NextFunction } from 'express';
import { SupabaseRepository } from '../repositories/supabase.repository';
import { AuthRequest } from '../middleware/auth';
import { runWorkflow } from '../workflows/engine';

const workflowRepo = new SupabaseRepository('workflows');

export const getWorkflows = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const workflows = await workflowRepo.findMany({ user_id: req.user?.userId });
    res.status(200).json({ status: 'success', data: workflows });
  } catch (error) {
    next(error);
  }
};

export const createWorkflow = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payload = { ...req.body, user_id: req.user?.userId };
    const workflow = await workflowRepo.create(payload);
    res.status(201).json({ status: 'success', data: workflow });
  } catch (error) {
    next(error);
  }
};

export const updateWorkflow = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const workflow = await workflowRepo.update(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: workflow });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkflow = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await workflowRepo.delete(req.params.id as string);
    res.status(200).json({ status: 'success', message: 'Workflow deleted' });
  } catch (error) {
    next(error);
  }
};

export const executeWorkflow = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const workflowId = req.params.id as string;
    // Update status to running
    await workflowRepo.update(workflowId, { status: 'running' });
    
    // We execute the workflow asynchronously so we don't block the request if it takes long
    runWorkflow(workflowId).catch(err => console.error(`Workflow ${workflowId} failed:`, err));

    res.status(202).json({ status: 'success', message: 'Workflow execution started' });
  } catch (error) {
    next(error);
  }
};
