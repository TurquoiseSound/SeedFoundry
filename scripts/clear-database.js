const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function clearDatabase() {
  console.log('🧹 Clearing mock data from database...\n');

  try {
    // Clear data in order (respecting foreign key constraints)
    const tables = ['goals_items', 'goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      console.log(`🗑️  Clearing ${table}...`);
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (error) {
        console.error(`❌ Error clearing ${table}:`, error);
      } else {
        console.log(`✅ Cleared ${table}`);
      }
    }

    console.log('\n🎉 Database cleared successfully!');

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

clearDatabase();