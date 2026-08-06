import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.signup(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      await authService.logout(token);
    }
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// Mock implementations for forgot/reset password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', message: 'Password reset link sent' });
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', message: 'Password reset successfully' });
};
