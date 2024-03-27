import { trim } from 'lodash';
import { Client } from '@notionhq/client';
import { cache } from 'react'
import { Item } from '../../types';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databases: { [key: string]: string | undefined } = {
  'entity-types': process.env.NOTION_ENTITY_DATABASE,
  'business-models': process.env.NOTION_BUSINESS_MODEL_DATABASE,
  'funding-options': process.env.NOTION_FUNDING_OPTION_DATABASE
};

export const fetchItem = cache(async (page_id: string): Promise<Item> => {
  const response = await notion.pages.retrieve({ page_id });
  return convertPagetoItem(response);
})

export const fetchItems = cache(async (type: string): Promise<Item[]> => {
  const databaseId = databases[type];

  if (!databaseId) {
    throw new Error('Database ID is not set');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        "property": "title",
        "direction": "ascending"
      }
    ]
  });

  const items = Promise.all(response.results.map(async (page) => {
    // Assuming each property is a rich_text or title for simplicity
    // Adjust according to your actual data structure in Notion
    return convertPagetoItem(page);
  }));

  return items;
})

const convertPagetoItem = async (page: any): Promise<Item> => {
  let properties = page.properties as any; // Cast to any for simplicity; consider defining a more precise type

  const nameKey = Object.keys(properties).find(key => properties[key].id === 'title') || 'title'
  const name = properties[nameKey].title[0]?.plain_text || 'No Name';
  const description = properties.Description.rich_text[0]?.plain_text || 'No Description';

  const advantages = (properties.Advantages.rich_text as Array<any>).reduce<string>((full_text: string, rt: any) => {
    return full_text + rt.plain_text
  }, '').split(/\r?\n/).map((ad: string) => {
    const parts = splitOnFirstCharacter(ad, ':');
    return { title: parts[0], description: parts[1] }
  }).filter((ad: any) => trim(ad.title) !== '');

  const disadvantages = (properties.Disadvantages.rich_text as Array<any>).reduce<string>((full_text: string, rt: any) => {
    return full_text + rt.plain_text
  }, '').split(/\r?\n/).map((ad: string) => {
    const parts = splitOnFirstCharacter(ad, ':');
    return { title: parts[0], description: parts[1] }
  }).filter((ad: any) => trim(ad.title) !== '');

  const examples = properties.Examples.rich_text.map((rt: any) => rt.plain_text) || [];
  const links = properties.Links.rich_text.map((rt: any) => rt.plain_text) || [];

  const entityTypes =  []
  for (const et of properties['Entity Types'].relation) {
    const response = await notion.pages.retrieve({ page_id: et.id });
    entityTypes.push({ id: et.id, name: response.properties[nameKey].title[0]?.plain_text || 'No Name'})
  }

  const businessModels =  []
  for (const bm of properties['Business Models'].relation) {
    const response = await notion.pages.retrieve({ page_id: bm.id });
    businessModels.push({ id: bm.id, name: response.properties[nameKey].title[0]?.plain_text || 'No Name'})
  }

  const fundingOptions = []
  for (const fo of properties['Funding Options'].relation) {
    const response = await notion.pages.retrieve({ page_id: fo.id });
    fundingOptions.push({ id: fo.id, name: response.properties[nameKey].title[0]?.plain_text || 'No Name'})
  }

  return {
    id: page.id,
    name,
    description,
    advantages,
    disadvantages,
    examples,
    links,
    entityTypes,
    businessModels,
    fundingOptions
  };
}

const splitOnFirstCharacter = (str: string, character: string) => {
  // Find the index of the first occurrence of the character
  const index = str.indexOf(character);

  // If the character is not found, return the original string in an array
  if (index === -1) return [str];

  // Split the string into two parts
  const firstPart = str.substring(0, index);
  const secondPart = str.substring(index + 1);

  // Return the two parts as an array
  return [firstPart, secondPart];
}