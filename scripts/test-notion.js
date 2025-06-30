const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function testNotionConnection() {
  console.log('🔍 Testing Notion API connection...\n');

  try {
    // Test basic connection
    console.log('🔑 Token:', process.env.NOTION_TOKEN ? '✅ Set' : '❌ Missing');
    
    // Test database IDs
    const dbIds = {
      goals: process.env.NOTION_GOALS_DATABASE_ID,
      entityTypes: process.env.NOTION_ENTITY_TYPES_DATABASE_ID,
      businessModels: process.env.NOTION_BUSINESS_MODELS_DATABASE_ID,
      fundingOptions: process.env.NOTION_FUNDING_OPTIONS_DATABASE_ID,
    };

    console.log('📋 Database IDs:');
    Object.entries(dbIds).forEach(([name, id]) => {
      console.log(`  ${name}: ${id ? '✅ Set' : '❌ Missing'}`);
    });

    console.log('\n🧪 Testing database access...');

    // Test each database
    for (const [name, databaseId] of Object.entries(dbIds)) {
      if (!databaseId) {
        console.log(`⚠️  Skipping ${name} - no database ID`);
        continue;
      }

      try {
        const response = await notion.databases.query({
          database_id: databaseId,
          page_size: 1, // Just get one item to test
        });

        console.log(`✅ ${name}: Connected (${response.results.length} items found)`);
        if (response.results.length > 0) {
          const item = response.results[0];
          const title = item.properties.Name?.title?.[0]?.plain_text || 
                       item.properties.Title?.title?.[0]?.plain_text || 
                       'No title found';
          console.log(`   Sample: "${title}"`);
        }
      } catch (error) {
        console.error(`❌ ${name}: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('💥 Connection failed:', error.message);
  }
}

testNotionConnection();