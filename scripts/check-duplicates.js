const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkForDuplicates() {
  console.log('🔍 Checking for duplicates in database...\n');

  try {
    // Check goals for duplicates
    const { data: goals } = await supabase.from('goals').select('*');
    const goalNames = goals.map(g => g.name);
    const uniqueGoalNames = [...new Set(goalNames)];
    
    console.log(`📝 GOALS:`);
    console.log(`   Total records: ${goals.length}`);
    console.log(`   Unique names: ${uniqueGoalNames.length}`);
    console.log(`   Duplicates: ${goals.length - uniqueGoalNames.length}`);
    
    if (goals.length !== uniqueGoalNames.length) {
      console.log('\n   🔍 Sample goals:');
      goals.slice(0, 10).forEach((goal, i) => {
        console.log(`     ${i + 1}. "${goal.name}" (ID: ${goal.id})`);
      });
    }

    // Check entity types for duplicates
    const { data: entityTypes } = await supabase.from('entity_types').select('*');
    const entityNames = entityTypes.map(e => e.name);
    const uniqueEntityNames = [...new Set(entityNames)];
    
    console.log(`\n🏢 ENTITY TYPES:`);
    console.log(`   Total records: ${entityTypes.length}`);
    console.log(`   Unique names: ${uniqueEntityNames.length}`);
    console.log(`   Duplicates: ${entityTypes.length - uniqueEntityNames.length}`);

    if (entityTypes.length !== uniqueEntityNames.length) {
      console.log('\n   🔍 Sample entity types:');
      entityTypes.slice(0, 10).forEach((entity, i) => {
        console.log(`     ${i + 1}. "${entity.name}" (ID: ${entity.id})`);
      });
    }

    // Check business models for duplicates
    const { data: businessModels } = await supabase.from('business_models').select('*');
    const modelNames = businessModels.map(b => b.name);
    const uniqueModelNames = [...new Set(modelNames)];
    
    console.log(`\n💼 BUSINESS MODELS:`);
    console.log(`   Total records: ${businessModels.length}`);
    console.log(`   Unique names: ${uniqueModelNames.length}`);
    console.log(`   Duplicates: ${businessModels.length - uniqueModelNames.length}`);

    if (businessModels.length !== uniqueModelNames.length) {
      console.log('\n   🔍 Sample business models:');
      businessModels.slice(0, 10).forEach((model, i) => {
        console.log(`     ${i + 1}. "${model.name}" (ID: ${model.id})`);
      });
    }

    // Check funding options for duplicates
    const { data: fundingOptions } = await supabase.from('funding_options').select('*');
    const fundingNames = fundingOptions.map(f => f.name);
    const uniqueFundingNames = [...new Set(fundingNames)];
    
    console.log(`\n💰 FUNDING OPTIONS:`);
    console.log(`   Total records: ${fundingOptions.length}`);
    console.log(`   Unique names: ${uniqueFundingNames.length}`);
    console.log(`   Duplicates: ${fundingOptions.length - uniqueFundingNames.length}`);

    if (fundingOptions.length !== uniqueFundingNames.length) {
      console.log('\n   🔍 Sample funding options:');
      fundingOptions.slice(0, 10).forEach((funding, i) => {
        console.log(`     ${i + 1}. "${funding.name}" (ID: ${funding.id})`);
      });
    }

    // Summary
    const totalDuplicates = 
      (goals.length - uniqueGoalNames.length) +
      (entityTypes.length - uniqueEntityNames.length) +
      (businessModels.length - uniqueModelNames.length) +
      (fundingOptions.length - uniqueFundingNames.length);

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total duplicate records: ${totalDuplicates}`);
    
    if (totalDuplicates > 0) {
      console.log('\n🧹 Recommendation: Clear database and re-run migration once to avoid duplicates');
    }

  } catch (error) {
    console.error('❌ Error checking duplicates:', error);
  }
}

checkForDuplicates();