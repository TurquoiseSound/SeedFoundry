const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  console.log('');

  try {
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('goals')
      .select('count', { count: 'exact', head: true });

    if (testError) {
      console.error('❌ Connection Error:', testError);
      return;
    }

    console.log('✅ Connected to Supabase successfully!\n');

    // Check each table
    const tables = ['goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) {
        console.error(`❌ Error fetching ${table}:`, error);
      } else {
        console.log(`📊 ${table}: ${count || 0} records`);
        if (data && data.length > 0) {
          console.log(`   Sample: ${data[0].name || data[0].id}`);
        }
      }
    }

    // Check junction tables
    const junctionTables = ['goals_items'];
    
    for (const table of junctionTables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) {
        console.error(`❌ Error fetching ${table}:`, error);
      } else {
        console.log(`🔗 ${table}: ${count || 0} relationships`);
      }
    }

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

testDatabaseConnection();