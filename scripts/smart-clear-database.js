const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use anon key but with a different deletion strategy
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function smartClearDatabase() {
  console.log('🧠 Smart database clearing strategy...\n');

  try {
    console.log('📊 Current database state:');
    const tables = ['goals_items', 'goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      try {
        const { count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        console.log(`   ${table}: ${count} records`);
      } catch (err) {
        console.log(`   ${table}: Error reading`);
      }
    }

    console.log('\n🗑️  Clearing tables with smart strategy...');
    
    // Strategy: Delete all records where created_at is not null (catches everything)
    for (const table of tables) {
      console.log(`🧹 Processing ${table}...`);
      
      // First try: Delete where ID exists
      let { error: error1 } = await supabase
        .from(table)
        .delete()
        .not('id', 'is', null);
      
      if (error1) {
        console.log(`   ❌ Method 1 failed: ${error1.message}`);
        
        // Second try: Delete with a simple condition
        let { error: error2 } = await supabase
          .from(table)
          .delete()
          .gte('created_at', '2000-01-01');
        
        if (error2) {
          console.log(`   ❌ Method 2 failed: ${error2.message}`);
          
          // Third try: Soft condition
          let { error: error3 } = await supabase
            .from(table)
            .delete()
            .neq('name', 'IMPOSSIBLE_NAME_THAT_DOES_NOT_EXIST_12345');
          
          if (error3) {
            console.log(`   ❌ All methods failed for ${table}`);
          } else {
            console.log(`   ✅ Cleared ${table} with method 3`);
          }
        } else {
          console.log(`   ✅ Cleared ${table} with method 2`);
        }
      } else {
        console.log(`   ✅ Cleared ${table} with method 1`);
      }
    }

    // Final verification
    console.log('\n🔍 Final verification...');
    for (const table of tables) {
      try {
        const { count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (count === 0) {
          console.log(`   ✅ ${table}: CLEAN (0 records)`);
        } else {
          console.log(`   ⚠️  ${table}: ${count} records remaining`);
        }
      } catch (err) {
        console.log(`   ❌ ${table}: Error verifying`);
      }
    }

  } catch (error) {
    console.error('💥 Smart clear failed:', error);
  }
}

smartClearDatabase();