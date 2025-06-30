import { fetchGoals as fetchGoalsFromSupabase } from '../../lib/supabaseData';
import { Goal } from '../../types';

export const fetchGoals = async (): Promise<Goal[]> => {
  return await fetchGoalsFromSupabase();
};
