import { isEmpty } from 'lodash';
import { cache } from 'react';
import { Goal } from '../../types';
import { supabase } from '../../lib/supabase';

export const fetchGoals = cache(async (): Promise<Goal[]> => {
  const { data, error } = await supabase
    .from('goals')
    .select('id, name')
    .order('name');

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const items = data.map(goal => ({
    id: goal.id,
    value: goal.id,
    label: goal.name
  })).filter(item => !isEmpty(item));

  return items;
});