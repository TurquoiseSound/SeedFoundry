import { Item } from '../../types';
import { mockItems } from '../../lib/mockData';

export const fetchItem = async (id: string): Promise<Item> => {
  const item = mockItems.find((item) => item.id === id);
  if (!item) {
    throw new Error('Item not found');
  }
  return item;
};

export const fetchItems = async (type: string): Promise<Item[]> => {
  return mockItems;
};
