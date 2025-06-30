// Simple goal associations script
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function createSimpleAssociations() {
  try {
    console.log('🔗 Creating simple goal associations...');

    // Get all data
    const { data: goals } = await supabase.from('goals').select('*');
    const { data: entityTypes } = await supabase.from('entity_types').select('*');
    const { data: businessModels } = await supabase.from('business_models').select('*');
    const { data: fundingOptions } = await supabase.from('funding_options').select('*');

    console.log(`Found: ${goals.length} goals, ${entityTypes.length} entities, ${businessModels.length} models, ${fundingOptions.length} funding options`);

    const associations = [];

    // Create basic associations for each goal with all items
    for (const goal of goals) {
      // Associate with entity types
      for (const item of entityTypes) {
        associations.push({
          goal_id: goal.id,
          item_id: item.id,
          item_type: 'entity_type'
        });
      }

      // Associate with business models  
      for (const item of businessModels) {
        associations.push({
          goal_id: goal.id,
          item_id: item.id,
          item_type: 'business_model'
        });
      }

      // Associate with funding options
      for (const item of fundingOptions) {
        associations.push({
          goal_id: goal.id,
          item_id: item.id,
          item_type: 'funding_option'
        });
      }
    }

    console.log(`Creating ${associations.length} associations...`);

    // Clear existing associations first
    await supabase.from('goals_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('🧹 Cleared existing associations');

    // Insert in batches of 100
    const batchSize = 100;
    let created = 0;
    
    for (let i = 0; i < associations.length; i += batchSize) {
      const batch = associations.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('goals_items')
        .insert(batch)
        .select();

      if (error) throw error;
      created += data.length;
      console.log(`  ✅ Created batch ${Math.ceil((i + 1) / batchSize)} (${created}/${associations.length})`);
    }

    console.log(`🎉 Created ${created} goal associations successfully!`);

  } catch (error) {
    console.error('❌ Error creating associations:', error);
  }
}

createSimpleAssociations();