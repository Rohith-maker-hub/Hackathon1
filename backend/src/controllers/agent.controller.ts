import { Request, Response, NextFunction } from 'express';
import { SupabaseRepository } from '../repositories/supabase.repository';

const agentRepo = new SupabaseRepository('agents');

export const getAgents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agents = await agentRepo.findMany();
    res.status(200).json({ status: 'success', data: agents });
  } catch (error) {
    next(error);
  }
};

export const getAgentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await agentRepo.findById(req.params.id as string);
    res.status(200).json({ status: 'success', data: agent });
  } catch (error) {
    next(error);
  }
};

export const createAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await agentRepo.create(req.body);
    res.status(201).json({ status: 'success', data: agent });
  } catch (error) {
    next(error);
  }
};

export const updateAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await agentRepo.update(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: agent });
  } catch (error) {
    next(error);
  }
};

export const deleteAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await agentRepo.delete(req.params.id as string);
    res.status(200).json({ status: 'success', message: 'Agent deleted successfully' });
  } catch (error) {
    next(error);
  }
};
