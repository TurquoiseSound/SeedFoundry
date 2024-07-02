import { trim } from 'lodash';
import { Client, isFullPageOrDatabase } from '@notionhq/client';
import { cache } from 'react'
import { Item } from '../../types';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databases: { [key: string]: string | undefined } = {
  'entity-types': process.env.NOTION_ENTITY_DATABASE,
  'business-models': process.env.NOTION_BUSINESS_MODEL_DATABASE,
  'funding-options': process.env.NOTION_FUNDING_OPTION_DATABASE,
  'goals-entity-types': process.env.NOTION_GOALS_ENTITIES_DATABASE,
  'goals-business-models': process.env.NOTION_GOALS_BUSINESS_MODELS_DATABASE,
  'goals-funding-options': process.env.NOTION_GOALS_FUNDING_OPTIONS_DATABASE
};

export const fetchItem = cache(async (page_id: string): Promise<Item> => {
  const response = await notion.pages.retrieve({ page_id });
  return convertPagetoItem(response, []);
})

export const fetchItems = cache(async (type: string): Promise<Item[]> => {
  const databaseId = databases[type];
  const goalsDatabaseId = databases[`goals-${type}`];
  const typeKey = type.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').slice(0, -1);

  if (!databaseId || !goalsDatabaseId) {
    throw new Error('Database ID is not set');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Done"
      }
    }
  });

  const goalsResponse = await notion.databases.query({
    database_id: goalsDatabaseId
  });

  const items = Promise.all(response.results.map(async (page) => {
    const relatedGoals = goalsResponse.results.filter((goal) => {
      if (!isFullPageOrDatabase(goal)) return false;
      let properties = goal.properties as any; // Cast to any for simplicity; consider defining a more precise type
      return properties[typeKey]?.relation[0]?.id === page.id // some((relation: any) => relation.id === page.id);
    })
    return convertPagetoItem(page, relatedGoals);
  }));

  return items;
})

const convertPagetoItem = async (page: any, relatedGoals: any[]): Promise<Item> => {
  let properties = page.properties as any; // Cast to any for simplicity; consider defining a more precise type

  const nameKey = Object.keys(properties).find(key => properties[key].id === 'title') || 'title'
  const name = properties[nameKey].title[0]?.plain_text || 'No Name';
  const description = properties.Description.rich_text[0]?.plain_text || 'No Description';

  const advantages = (properties.Advantages.rich_text as Array<any>).reduce<string>((full_text: string, rt: any) => {
    return full_text + rt.plain_text
  }, '').split(/\r?\n/).map((ad: string) => {
    const parts = splitOnFirstCharacter(ad, ':');
    return { title: trim(parts[0]), description: trim(parts[1]) }
  }).filter((ad: any) => ad.title !== '');

  const disadvantages = (properties.Disadvantages.rich_text as Array<any>).reduce<string>((full_text: string, rt: any) => {
    return full_text + rt.plain_text
  }, '').split(/\r?\n/).map((ad: string) => {
    const parts = splitOnFirstCharacter(ad, ':');
    return { title: trim(parts[0]), description: trim(parts[1]) }
  }).filter((ad: any) => ad.title !== '');

  const examples = richTextToHtml(properties.Examples.rich_text)
  const resources = richTextToHtml(properties.Resources.rich_text)

  const entityTypes =  []
  let i = 0
  for (const et of properties['Compatible Entity Types'].relation) {
    // Pull the name from a rollup property
    entityTypes.push({ id: et.id, name: properties['Compatible Entity Type Names'].rollup.array[i]?.title[0]?.plain_text || 'No Name'})
    i++
  }

  const businessModels =  []
  i = 0
  for (const bm of properties['Compatible Business Models'].relation) {
    // Pull the name from a rollup property
    businessModels.push({ id: bm.id, name: properties['Compatible Business Model Names'].rollup.array[i]?.title[0]?.plain_text || 'No Name'})
    i++
  }

  const fundingOptions = []
  i = 0
  for (const fo of properties['Compatible Funding Options'].relation) {
    // Pull the name from a rollup property
    fundingOptions.push({ id: fo.id, name: properties['Compatible Funding Option Names'].rollup.array[i]?.title[0]?.plain_text || 'No Name'})
    i++
  }

  const relatedGoalsMap: { [id : string] : number } = {}
  for (const goal of relatedGoals) {
    relatedGoalsMap[goal.properties['Goal'].relation[0].id] = parseFloat(goal.properties['Rating'].number)
  }

  return {
    id: page.id,
    advantages,
    businessModels,
    description,
    disadvantages,
    entityTypes,
    examples,
    fundingOptions,
    name,
    relatedGoals: relatedGoalsMap,
    resources
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

// Function to convert rich text to HTML
const richTextToHtml = (richText: any[]): string => {
  let htmlContent = '';
  richText.forEach(text => {
    let content = text.text.content.replace(/\n/g, '<br>');
    const annotations = text.annotations;

    if (annotations.bold) {
        content = `<b>${content}</b>`;
    }
    if (annotations.italic) {
        content = `<i>${content}</i>`;
    }
    if (annotations.strikethrough) {
        content = `<s>${content}</s>`;
    }
    if (annotations.underline) {
        content = `<u>${content}</u>`;
    }
    if (annotations.code) {
        content = `<code>${content}</code>`;
    }
    if (text.text.link) {
        content = `<a href="${text.text.link.url}" target='__blank'>${content}</a>`;
    }

    htmlContent += content;
  });

  return htmlContent;
}