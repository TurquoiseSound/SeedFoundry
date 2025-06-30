import { fetchEntityTypes, fetchBusinessModels, fetchFundingOptions } from '../../lib/supabaseData';
import { Item } from '../../types';

export const fetchItem = async (id: string): Promise<Item> => {
  // Fetch all items from all categories
  const [entityTypes, businessModels, fundingOptions] = await Promise.all([
    fetchEntityTypes(),
    fetchBusinessModels(),
    fetchFundingOptions(),
  ]);

  const allItems = [...entityTypes, ...businessModels, ...fundingOptions];
  const item = allItems.find((item) => item.id === id);

  if (!item) {
    throw new Error('Item not found');
  }
  return item;
};

export const fetchItems = async (): Promise<Item[]> => {
  // Fetch all items from Supabase
  const [entityTypes, businessModels, fundingOptions] = await Promise.all([
    fetchEntityTypes(),
    fetchBusinessModels(),
    fetchFundingOptions(),
  ]);

  return [...entityTypes, ...businessModels, ...fundingOptions];
};
