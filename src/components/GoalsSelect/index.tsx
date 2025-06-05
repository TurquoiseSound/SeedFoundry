import React, { Suspense } from 'react';

import { fetchGoals } from '../../app/api/fetchGoals';
import { default as GoalsSelectInternal } from './GoalsSelect';

export default async function GoalsSelect() {
  const goals = await fetchGoals();
  return <GoalsSelectInternal goals={goals} />;
}