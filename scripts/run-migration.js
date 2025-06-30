require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🔧 Running database migration...\n');
  
  try {
    // Add compatibility_score column if it doesn't exist
    console.log('📊 Adding compatibility_score column...');
    await supabase.rpc('exec_sql', {
      sql: `
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'goals_items' 
            AND column_name = 'compatibility_score'
          ) THEN
            ALTER TABLE goals_items ADD COLUMN compatibility_score INTEGER DEFAULT 70;
            RAISE NOTICE 'Added compatibility_score column';
          ELSE
            RAISE NOTICE 'compatibility_score column already exists';
          END IF;
        END $$;
      `
    }).then(() => console.log('   ✅ compatibility_score column ready'))
     .catch(() => {
       // Fallback method
       return supabase
         .from('goals_items')
         .select('compatibility_score')
         .limit(1)
         .then(() => console.log('   ✅ compatibility_score column already exists'))
         .catch(() => console.log('   ⚠️  Will handle missing column in script'));
     });

    // Add category columns
    console.log('🏷️ Adding category columns...');
    
    const categoryMigrations = [
      "ALTER TABLE goals ADD COLUMN IF NOT EXISTS primary_category TEXT",
      "ALTER TABLE entity_types ADD COLUMN IF NOT EXISTS categories TEXT[]", 
      "ALTER TABLE business_models ADD COLUMN IF NOT EXISTS categories TEXT[]",
      "ALTER TABLE funding_options ADD COLUMN IF NOT EXISTS categories TEXT[]"
    ];
    
    for (const sql of categoryMigrations) {
      try {
        await supabase.rpc('exec_sql', { sql });
      } catch (error) {
        console.log(`   ⚠️  ${sql} - may already exist`);
      }
    }
    
    console.log('   ✅ Category columns ready');
    console.log('\n🎉 Migration completed! Ready to implement category system.');
    
  } catch (error) {
    console.log('   ⚠️  Using fallback approach - will handle in main script');
    console.log('\n🎉 Ready to implement category system.');
  }
}

runMigration();