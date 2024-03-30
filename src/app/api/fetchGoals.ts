import { isEmpty } from 'lodash';
import { Client } from '@notionhq/client';
import { cache } from 'react'

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const fetchGoals = cache(async (): Promise<Goal[]> => {
  const databaseId = process.env.NOTION_GOALS_DATABASE;

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

  const items = response.results.map(page => {
    // Assuming each property is a rich_text or title for simplicity
    // Adjust according to your actual data structure in Notion
    return convertPagetoItem(page);
  }).filter(item => !isEmpty(item));

  return Promise.resolve(items);
});

const convertPagetoItem = (page: any): Goal => {
  let properties = page.properties as any; // Cast to any for simplicity; consider defining a more precise type

  const nameKey = Object.keys(properties).find(key => properties[key].id === 'title') || 'title'
  const name = properties[nameKey].title[0]?.plain_text;

  return { id: page.id, value: page.id, label: name };
}