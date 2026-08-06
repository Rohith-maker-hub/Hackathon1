import { supabase } from '../database/supabase';

export class SupabaseRepository {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from(this.tableName).select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  async findMany(query: any = {}) {
    let queryBuilder = supabase.from(this.tableName).select('*');
    for (const [key, value] of Object.entries(query)) {
      queryBuilder = queryBuilder.eq(key, value);
    }
    const { data, error } = await queryBuilder;
    if (error) throw new Error(error.message);
    return data;
  }

  async create(payload: any) {
    const { data, error } = await supabase.from(this.tableName).insert(payload).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, payload: any) {
    const { data, error } = await supabase.from(this.tableName).update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase.from(this.tableName).delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
}
