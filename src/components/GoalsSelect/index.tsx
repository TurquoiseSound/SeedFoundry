'use client';

import React from 'react';

import { type Goal } from '@/types';

import { default as GoalsSelectInternal } from './GoalsSelect';

export default function GoalsSelect() {
  const [goals, setGoals] = React.useState<Goal[]>([]);

  React.useEffect(() => {
    const fetchGoalsData = async () => {
      const response = await fetch('/api/fetchGoals');
      const data = await response.json();
      setGoals(data);
    };
    
    fetchGoalsData();
  }, []);

  return <GoalsSelectInternal goals={goals} />;
}