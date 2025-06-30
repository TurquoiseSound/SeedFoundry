const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function testCurrentGoalsDB() {
  console.log('🔍 Testing current NOTION_GOALS_DATABASE_ID...\n');
  console.log(`Database ID: ${process.env.NOTION_GOALS_DATABASE_ID}\n`);

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_GOALS_DATABASE_ID,
    });

    console.log(`📝 Found ${response.results.length} records in this database\n`);

    console.log('🔍 All records in this database:');
    response.results.forEach((page, i) => {
      const name = page.properties.Name?.title?.[0]?.plain_text || 'No title';
      console.log(`   ${i + 1}. "${name}"`);
    });

    // Check for duplicates
    const names = response.results.map(page => 
      page.properties.Name?.title?.[0]?.plain_text || 'No title'
    );
    const uniqueNames = [...new Set(names)];

    console.log(`\n📊 Analysis:`);
    console.log(`   Total records: ${response.results.length}`);
    console.log(`   Unique names: ${uniqueNames.length}`);
    console.log(`   Duplicates: ${response.results.length - uniqueNames.length}`);

    if (response.results.length !== uniqueNames.length) {
      console.log('\n⚠️  This appears to be a MAPPING database (has duplicates)');
      console.log('   You need to use the MAIN goals database ID instead');
    } else {
      console.log('\n✅ This appears to be the MAIN goals database (no duplicates)');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCurrentGoalsDB();