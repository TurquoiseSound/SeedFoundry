import { mockGoals } from '../../lib/mockData';
import { Goal } from '../../types';

export const fetchGoals = async (): Promise<Goal[]> => {
  return mockGoals;
};
