const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPolicies() {
  console.log('🔍 Checking RLS policies...\n');

  try {
    // Check what policies exist
    const { data: policies, error } = await supabase
      .from('pg_policies')
      .select('*')
      .in('tablename', ['goals', 'entity_types', 'business_models', 'funding_options', 'goals_items']);

    if (error) {
      console.error('❌ Error fetching policies:', error);
      return;
    }

    console.log('📋 Current policies:');
    policies.forEach(policy => {
      console.log(`  ${policy.tablename}: ${policy.policyname} (${policy.cmd})`);
    });

    // Test a simple insert
    console.log('\n🧪 Testing insert...');
    const { data, error: insertError } = await supabase
      .from('goals')
      .insert([{ name: 'Test Goal', description: 'Test Description' }])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError);
    } else {
      console.log('✅ Insert successful:', data);
      
      // Clean up test data
      if (data && data.length > 0) {
        await supabase.from('goals').delete().eq('id', data[0].id);
        console.log('🧹 Cleaned up test data');
      }
    }

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

checkPolicies();