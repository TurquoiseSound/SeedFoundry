'use client';

import { createContext, useState } from 'react';
import { type Goal } from '@/types';

export const GoalsContext = createContext<{ selectedGoals: Goal[]; setSelectedGoals: Function }>({
  selectedGoals: [],
  setSelectedGoals: () => {},
});

export default function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  return (
    <GoalsContext.Provider value={{ selectedGoals, setSelectedGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}
