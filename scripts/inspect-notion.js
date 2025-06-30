const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function inspectNotionDatabases() {
  console.log('🔍 Inspecting Notion database structures...\n');

  const dbIds = {
    goals: process.env.NOTION_GOALS_DATABASE_ID,
    entityTypes: process.env.NOTION_ENTITY_TYPES_DATABASE_ID,
    businessModels: process.env.NOTION_BUSINESS_MODELS_DATABASE_ID,
    fundingOptions: process.env.NOTION_FUNDING_OPTIONS_DATABASE_ID,
  };

  for (const [name, databaseId] of Object.entries(dbIds)) {
    if (!databaseId) continue;

    try {
      console.log(`\n📋 ${name.toUpperCase()} DATABASE:`);
      
      // Get database info to see properties
      const database = await notion.databases.retrieve({ database_id: databaseId });
      
      console.log('   Properties:');
      Object.entries(database.properties).forEach(([propName, propInfo]) => {
        console.log(`     • ${propName} (${propInfo.type})`);
      });

      // Get a sample record
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 1,
      });

      if (response.results.length > 0) {
        const item = response.results[0];
        console.log('\n   Sample record:');
        Object.entries(item.properties).forEach(([propName, propValue]) => {
          let displayValue = 'N/A';
          
          if (propValue.type === 'title' && propValue.title.length > 0) {
            displayValue = propValue.title[0].plain_text;
          } else if (propValue.type === 'rich_text' && propValue.rich_text.length > 0) {
            displayValue = propValue.rich_text[0].plain_text;
          } else if (propValue.type === 'select' && propValue.select) {
            displayValue = propValue.select.name;
          } else if (propValue.type === 'multi_select' && propValue.multi_select.length > 0) {
            displayValue = propValue.multi_select.map(s => s.name).join(', ');
          }
          
          console.log(`     ${propName}: "${displayValue}"`);
        });
      }

    } catch (error) {
      console.error(`❌ Error inspecting ${name}:`, error.message);
    }
  }
}

inspectNotionDatabases();