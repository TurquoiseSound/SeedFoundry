require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testGoalAssociations() {
  console.log('🔍 Testing goal associations...\n');
  
  try {
    // Get goals
    const { data: goals } = await supabase
      .from('goals')
      .select('id, name, primary_category')
      .limit(3);
    
    console.log('📝 Sample goals:');
    goals.forEach(goal => {
      console.log(`   ${goal.name} (${goal.primary_category})`);
    });
    
    // Check associations
    const { data: associations } = await supabase
      .from('goals_items')
      .select(`
        goal_id,
        item_type,
        compatibility_score,
        goals!inner(name)
      `)
      .limit(10);
    
    console.log('\n🔗 Sample associations:');
    associations.forEach(assoc => {
      console.log(`   ${assoc.goals.name} → ${assoc.item_type} (${assoc.compatibility_score}%)`);
    });
    
    // Count total associations
    const { count } = await supabase
      .from('goals_items')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n📊 Total associations: ${count}`);
    
    // Test API endpoint
    console.log('\n🚀 Testing API endpoint...');
    const testGoalId = goals[0].id;
    
    const { data: entityTypes } = await supabase
      .from('goals_items')
      .select(`
        compatibility_score,
        entity_types!inner(id, name, description)
      `)
      .eq('goal_id', testGoalId)
      .eq('item_type', 'entity_type')
      .order('compatibility_score', { ascending: false });
    
    console.log(`\nFor goal "${goals[0].name}":`);
    entityTypes.slice(0, 3).forEach(item => {
      console.log(`   ✅ ${item.entity_types.name} (${item.compatibility_score}%)`);
    });
    
  } catch (error) {
    console.error('❌ Error testing associations:', error);
  }
}

testGoalAssociations();