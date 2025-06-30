const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use SERVICE ROLE key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Using service role key now!
);

async function adminClearDatabase() {
  console.log('🔑 Using SERVICE ROLE key for admin database clearing...\n');

  try {
    // Verify service role key is loaded
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
    }
    
    console.log('✅ Service role key loaded');
    console.log(`🔧 Using URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}\n`);

    // Get current counts first
    console.log('📊 Current database state:');
    const tables = ['goals_items', 'goals', 'entity_types', 'business_models', 'funding_options'];
    
    for (const table of tables) {
      try {
        const { count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        console.log(`   ${table}: ${count} records`);
      } catch (err) {
        console.log(`   ${table}: Error reading (${err.message})`);
      }
    }

    console.log('\n🗑️  ADMIN CLEARING with service role...');
    
    // Clear data in order (respecting foreign key constraints)
    for (const table of tables) {
      console.log(`🧹 Clearing ${table}...`);
      
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (error) {
        console.error(`   ❌ Error clearing ${table}:`, error);
      } else {
        console.log(`   ✅ Cleared ${table}`);
      }
    }

    // Verify tables are empty
    console.log('\n🔍 Verifying tables are empty...');
    for (const table of tables) {
      try {
        const { count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (count === 0) {
          console.log(`   ✅ ${table}: 0 records (CLEAN)`);
        } else {
          console.log(`   ⚠️  ${table}: ${count} records (STILL HAS DATA)`);
        }
      } catch (err) {
        console.log(`   ❌ ${table}: Error verifying (${err.message})`);
      }
    }

    console.log('\n🎉 Admin database clear completed!');

  } catch (error) {
    console.error('💥 Admin clear failed:', error);
  }
}

adminClearDatabase();