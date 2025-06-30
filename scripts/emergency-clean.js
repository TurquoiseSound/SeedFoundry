const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // We'll try with anon key first
);

async function emergencyCleanDatabase() {
  console.log('🚨 EMERGENCY DATABASE CLEAN...\n');

  try {
    // Get current counts
    console.log('📊 Current database state:');
    const tables = ['goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      console.log(`   ${table}: ${count} records`);
    }
    
    console.log('\n🗑️  Attempting manual deletion...');
    
    // Try deleting specific records by getting their IDs first
    for (const table of tables) {
      console.log(`\n🔍 Processing ${table}...`);
      
      // Get all IDs
      const { data: records } = await supabase
        .from(table)
        .select('id');
      
      if (records && records.length > 0) {
        console.log(`   Found ${records.length} records to delete`);
        
        // Delete in batches of 100
        const batchSize = 100;
        for (let i = 0; i < records.length; i += batchSize) {
          const batch = records.slice(i, i + batchSize);
          const ids = batch.map(r => r.id);
          
          const { error } = await supabase
            .from(table)
            .delete()
            .in('id', ids);
          
          if (error) {
            console.error(`     ❌ Batch ${Math.floor(i/batchSize) + 1} failed:`, error.message);
          } else {
            console.log(`     ✅ Batch ${Math.floor(i/batchSize) + 1} deleted (${batch.length} records)`);
          }
        }
      } else {
        console.log(`   ✅ ${table} is already empty`);
      }
    }
    
    // Final verification
    console.log('\n📊 Final database state:');
    for (const table of tables) {
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      console.log(`   ${table}: ${count} records`);
    }

  } catch (error) {
    console.error('💥 Emergency clean failed:', error);
  }
}

emergencyCleanDatabase();