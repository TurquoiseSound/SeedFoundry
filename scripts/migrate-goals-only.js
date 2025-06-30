// Quick goals migration script
const { Client } = require('@notionhq/client');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function extractTitle(title) {
  if (!title || !Array.isArray(title)) return '';
  return title.map(text => text.plain_text).join('').trim();
}

async function migrateGoalsOnly() {
  try {
    console.log('📝 Fetching goals from Notion...');
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_GOALS_DATABASE_ID,
    });

    const goals = response.results
      .map(page => {
        const name = extractTitle(page.properties.Name?.title);
        if (!name || name === 'N/A') return null;
        return { name: name };
      })
      .filter(Boolean);

    console.log(`Found ${goals.length} goals to migrate`);

    if (goals.length === 0) return;

    const { data, error } = await supabase
      .from('goals')
      .insert(goals)
      .select();

    if (error) throw error;
    console.log(`✅ Imported ${data.length} goals`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

migrateGoalsOnly();