import React from 'react';

import { mockGoals } from '@/lib/mockData';
import { type Goal } from '@/types';

import { default as GoalsSelectInternal } from './GoalsSelect';

export default function GoalsSelect() {
  return <GoalsSelectInternal goals={mockGoals} />;
}