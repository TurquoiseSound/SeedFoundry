// lib/fetchEntityTypes.ts
import { Client } from '@notionhq/client';
import { EntityType } from '../../types';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = process.env.NOTION_ENTITY_DATABASE;

export const fetchEntityTypes = async (): Promise<EntityType[]> => {
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

  const entities = Promise.all(response.results.map(async (page) => {
    // Assuming each property is a rich_text or title for simplicity
    // Adjust according to your actual data structure in Notion
    let properties = page.properties as any; // Cast to any for simplicity; consider defining a more precise type

    const nameKey = Object.keys(properties).find(key => properties[key].id === 'title')
    const name = properties[nameKey].title[0]?.plain_text || 'No Name';
    const description = properties.Description.rich_text[0]?.plain_text || 'No Description';
    const advantages = properties.Advantages.rich_text.map((rt: any) => rt.plain_text) || [];
    const disadvantages = properties.Disadvantages.rich_text.map((rt: any) => rt.plain_text) || [];
    const examples = properties.Examples.rich_text.map((rt: any) => rt.plain_text) || [];
    const links = properties.Links.rich_text.map((rt: any) => rt.plain_text) || [];

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
      businessModels,
      fundingOptions
    };
  }));

  return entities;
};