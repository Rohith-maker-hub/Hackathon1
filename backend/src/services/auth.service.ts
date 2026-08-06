import { SupabaseRepository } from '../repositories/supabase.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { supabase } from '../database/supabase';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  private userRepo = new SupabaseRepository('users');
  private sessionRepo = new SupabaseRepository('sessions');

  async signup(data: any) {
    const { email, password, full_name } = data;
    
    // Check if user exists
    const existing = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existing.data) {
      throw new BadRequestError('Email already in use');
    }

    const password_hash = await hashPassword(password);
    
    const newUser = await this.userRepo.create({
      email,
      password_hash,
      full_name,
      role: 'user'
    });

    const token = generateToken(newUser.id, newUser.role);
    
    return { user: { id: newUser.id, email: newUser.email, full_name: newUser.full_name, role: newUser.role }, token };
  }

  async login(data: any) {
    const { email, password } = data;
    
    const user = await supabase.from('users').select('*').eq('email', email).maybeSingle();
    if (!user.data) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.data.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken(user.data.id, user.data.role);

    // Save session
    await this.sessionRepo.create({
      user_id: user.data.id,
      token,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    });

    return { user: { id: user.data.id, email: user.data.email, full_name: user.data.full_name, role: user.data.role }, token };
  }

  async logout(token: string) {
    if (!token) return;
    await supabase.from('sessions').delete().eq('token', token);
  }
}

export const authService = new AuthService();
