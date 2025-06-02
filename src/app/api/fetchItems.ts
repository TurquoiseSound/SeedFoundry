import { trim } from 'lodash';
import { cache } from 'react';
import { Item } from '../../types';
import { supabase } from '../../lib/supabase';

export const fetchItem = cache(async (id: string): Promise<Item> => {
  const { data: item, error } = await supabase
    .from('items')
    .select(`
      id,
      name,
      description,
      advantages,
      disadvantages,
      examples,
      resources,
      entity_types (id, name),
      business_models (id, name),
      funding_options (id, name),
      goals_items (goal_id, rating)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  if (!item) {
    throw new Error('Item not found');
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    advantages: parseAdvantages(item.advantages),
    disadvantages: parseAdvantages(item.disadvantages),
    examples: item.examples,
    resources: item.resources,
    entityTypes: item.entity_types,
    businessModels: item.business_models,
    fundingOptions: item.funding_options,
    relatedGoals: item.goals_items.reduce((acc: { [key: string]: number }, curr: any) => {
      acc[curr.goal_id] = curr.rating;
      return acc;
    }, {})
  };
});

export const fetchItems = cache(async (type: string): Promise<Item[]> => {
  const table = getTableName(type);
  
  const { data, error } = await supabase
    .from(table)
    .select(`
      id,
      name,
      description,
      advantages,
      disadvantages,
      examples,
      resources,
      entity_types (id, name),
      business_models (id, name),
      funding_options (id, name),
      goals_items (goal_id, rating)
    `)
    .eq('status', 'Done')
    .order('name');

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    advantages: parseAdvantages(item.advantages),
    disadvantages: parseAdvantages(item.disadvantages),
    examples: item.examples,
    resources: item.resources,
    entityTypes: item.entity_types,
    businessModels: item.business_models,
    fundingOptions: item.funding_options,
    relatedGoals: item.goals_items.reduce((acc: { [key: string]: number }, curr: any) => {
      acc[curr.goal_id] = curr.rating;
      return acc;
    }, {})
  }));
});

const getTableName = (type: string): string => {
  switch (type) {
    case 'entity-types':
      return 'entity_types';
    case 'business-models':
      return 'business_models';
    case 'funding-options':
      return 'funding_options';
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const parseAdvantages = (text: string) => {
  if (!text) return [];
  
  return text.split('\n').map(line => {
    const parts = splitOnFirstCharacter(line, ':');
    return {
      title: trim(parts[0]),
      description: trim(parts[1] || '')
    };
  }).filter(ad => ad.title !== '');
};

const splitOnFirstCharacter = (str: string, character: string) => {
  const index = str.indexOf(character);
  if (index === -1) return [str];
  
  const firstPart = str.substring(0, index);
  const secondPart = str.substring(index + 1);
  
  return [firstPart, secondPart];
};