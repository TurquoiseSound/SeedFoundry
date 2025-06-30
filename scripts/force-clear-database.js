const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function forceCleanDatabase() {
  console.log('🧹 FORCE CLEARING entire database...\n');

  try {
    // Clear data in order (respecting foreign key constraints)
    const tables = ['goals_items', 'goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      console.log(`🗑️  FORCE clearing ${table}...`);
      
      // First try truncate (fastest)
      try {
        const { error: truncateError } = await supabase.rpc('exec_sql', {
          sql: `TRUNCATE TABLE ${table} CASCADE;`
        });
        
        if (truncateError) {
          // If truncate fails, use delete
          const { error: deleteError } = await supabase
            .from(table)
            .delete()
            .gte('id', '00000000-0000-0000-0000-000000000000');
          
          if (deleteError) {
            console.error(`❌ Error clearing ${table}:`, deleteError);
          } else {
            console.log(`✅ Cleared ${table} (via delete)`);
          }
        } else {
          console.log(`✅ Truncated ${table}`);
        }
      } catch (err) {
        // Final fallback: simple delete
        const { error } = await supabase
          .from(table)
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
        
        if (error) {
          console.error(`❌ Error clearing ${table}:`, error);
        } else {
          console.log(`✅ Cleared ${table} (fallback)`);
        }
      }
    }

    // Verify tables are empty
    console.log('\n🔍 Verifying tables are empty...');
    for (const table of tables) {
      const { data, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      console.log(`   ${table}: ${count} records`);
    }

    console.log('\n🎉 Database force cleared successfully!');

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

forceCleanDatabase();