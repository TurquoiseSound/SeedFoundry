import { Goal } from '../../types';
import { mockGoals } from '../../lib/mockData';

export const fetchGoals = async (): Promise<Goal[]> => {
  return mockGoals;
};
