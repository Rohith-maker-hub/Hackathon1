import { Request, Response, NextFunction } from 'express';
import { SupabaseRepository } from '../repositories/supabase.repository';

const analyticsRepo = new SupabaseRepository('analytics');

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await analyticsRepo.findMany();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};
