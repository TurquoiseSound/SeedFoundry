'use client';

import React from 'react';

import { Goal } from '../../types';

import { default as GoalsSelectInternal } from './GoalsSelect';

export default function GoalsSelect() {
  const [goals, setGoals] = React.useState<Goal[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadGoals = async () => {
      try {
        const response = await fetch('/api/goals');
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        const fetchedGoals = await response.json();
        setGoals(fetchedGoals);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  if (loading) {
    return <div className="h-14 skeleton rounded-lg"></div>;
  }

  return <GoalsSelectInternal goals={goals} />;
}