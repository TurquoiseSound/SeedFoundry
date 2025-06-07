import React from 'react';

import { fetchGoals } from '../../app/api/fetchGoals';

import { default as GoalsSelectInternal } from './GoalsSelect';

export default function GoalsSelect() {
  const [goals, setGoals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadGoals = async () => {
      try {
        const fetchedGoals = await fetchGoals();
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