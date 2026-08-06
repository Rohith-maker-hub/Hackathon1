import { Request, Response, NextFunction } from 'express';
import { SupabaseRepository } from '../repositories/supabase.repository';
import { AuthRequest } from '../middleware/auth';

const taskRepo = new SupabaseRepository('tasks');

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskRepo.findMany({ user_id: req.user?.userId });
    res.status(200).json({ status: 'success', data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payload = { ...req.body, user_id: req.user?.userId };
    const task = await taskRepo.create(payload);
    res.status(201).json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskRepo.update(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await taskRepo.delete(req.params.id as string);
    res.status(200).json({ status: 'success', message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
