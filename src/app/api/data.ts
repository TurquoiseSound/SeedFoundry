import notion from '../../lib/notion';

export default async function handler(req, res) {
  const databaseId = process.env.NOTION_ENTITY_DATABASE;
  try {
    const response = await notion.databases.query({ database_id: databaseId });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Notion' });
  }
}