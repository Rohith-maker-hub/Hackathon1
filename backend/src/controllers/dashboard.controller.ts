import { Request, Response, NextFunction } from 'express';
import { SupabaseRepository } from '../repositories/supabase.repository';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../database/supabase';

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    
    // Fetch counts
    const [tasksRes, workflowsRes, agentsRes] = await Promise.all([
      supabase.from('tasks').select('id', { count: 'exact' }).eq('user_id', userId),
      supabase.from('workflows').select('id', { count: 'exact' }).eq('user_id', userId),
      supabase.from('agents').select('id', { count: 'exact' }),
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        totalTasks: tasksRes.count || 0,
        totalWorkflows: workflowsRes.count || 0,
        totalAgents: agentsRes.count || 0,
      }
    });
  } catch (error) {
    next(error);
  }
};
