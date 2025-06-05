import React, { Suspense } from 'react';
import { default as GoalsSelectInternal } from './GoalsSelect';
import { fetchGoals } from '../../app/api/fetchGoals';

export default async function GoalsSelect() {
  const goals = await fetchGoals();

  return <GoalsSelectInternal goals={goals} />;
}
