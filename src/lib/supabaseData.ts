import { Goal, Item } from '../types';

import { supabase } from './supabase';

// Fetch goals from Supabase
export async function fetchGoals(): Promise<Goal[]> {
  try {
    const { data, error } = await supabase.from('goals').select('*').order('created_at');

    if (error) throw error;

    return data.map((goal) => ({
      id: goal.id,
      value: goal.id,
      label: goal.name,
    }));
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
}

// Fetch entity types with goal relationships
export async function fetchEntityTypes(): Promise<Item[]> {
  try {
    const { data, error } = await supabase
      .from('entity_types')
      .select(
        `
        *,
        goals_items(goal_id, rating)
      `
      )
      .eq('status', 'Done');

    if (error) throw error;

    return data.map((entity) => ({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      advantages: entity.advantages ? JSON.parse(entity.advantages) : [],
      disadvantages: entity.disadvantages ? JSON.parse(entity.disadvantages) : [],
      examples: entity.examples,
      resources: entity.resources,
      entityTypes: [],
      businessModels: [],
      fundingOptions: [],
      relatedGoals: entity.goals_items
        ? entity.goals_items.reduce(
            (acc: Record<string, number>, item: { goal_id: string; rating: number }) => {
              acc[item.goal_id] = item.rating;
              return acc;
            },
            {}
          )
        : {},
    }));
  } catch (error) {
    console.error('Error fetching entity types:', error);
    return [];
  }
}

// Fetch business models with goal relationships
export async function fetchBusinessModels(): Promise<Item[]> {
  try {
    const { data, error } = await supabase
      .from('business_models')
      .select(
        `
        *,
        goals_items(goal_id, rating)
      `
      )
      .eq('status', 'Done');

    if (error) throw error;

    return data.map((model) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      advantages: model.advantages ? JSON.parse(model.advantages) : [],
      disadvantages: model.disadvantages ? JSON.parse(model.disadvantages) : [],
      examples: model.examples,
      resources: model.resources,
      entityTypes: [],
      businessModels: [],
      fundingOptions: [],
      relatedGoals: model.goals_items
        ? model.goals_items.reduce(
            (acc: Record<string, number>, item: { goal_id: string; rating: number }) => {
              acc[item.goal_id] = item.rating;
              return acc;
            },
            {}
          )
        : {},
    }));
  } catch (error) {
    console.error('Error fetching business models:', error);
    return [];
  }
}

// Fetch funding options with goal relationships
export async function fetchFundingOptions(): Promise<Item[]> {
  try {
    const { data, error } = await supabase
      .from('funding_options')
      .select(
        `
        *,
        goals_items(goal_id, rating)
      `
      )
      .eq('status', 'Done');

    if (error) throw error;

    return data.map((funding) => ({
      id: funding.id,
      name: funding.name,
      description: funding.description,
      advantages: funding.advantages ? JSON.parse(funding.advantages) : [],
      disadvantages: funding.disadvantages ? JSON.parse(funding.disadvantages) : [],
      examples: funding.examples,
      resources: funding.resources,
      entityTypes: [],
      businessModels: [],
      fundingOptions: [],
      relatedGoals: funding.goals_items
        ? funding.goals_items.reduce(
            (acc: Record<string, number>, item: { goal_id: string; rating: number }) => {
              acc[item.goal_id] = item.rating;
              return acc;
            },
            {}
          )
        : {},
    }));
  } catch (error) {
    console.error('Error fetching funding options:', error);
    return [];
  }
}
