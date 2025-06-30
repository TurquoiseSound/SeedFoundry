// Database Population Script
// Run this with: node scripts/populate-database.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const goals = [
  { name: 'Maximize Social Impact' },
  { name: 'Sustainable Revenue' },
  { name: 'Community Ownership' },
  { name: 'Environmental Sustainability' },
  { name: 'Innovation Leadership' },
];

const entityTypes = [
  {
    name: 'Public Benefit Corporation',
    description: 'A for-profit corporation that includes positive impact on society, workers, the community and the environment.',
    advantages: JSON.stringify([
      { title: 'Legal Protection', description: 'Directors required to consider impact alongside profit' },
      { title: 'Brand Value', description: 'Strong signal to stakeholders about mission commitment' }
    ]),
    disadvantages: JSON.stringify([
      { title: 'Additional Reporting', description: 'Must report on social impact' },
      { title: 'Complex Balance', description: 'Need to manage both profit and impact goals' }
    ]),
    examples: 'Patagonia, Kickstarter, Allbirds',
    resources: 'benefitcorp.net',
    status: 'Done'
  },
  {
    name: 'Worker Cooperative',
    description: 'A business owned and democratically controlled by its workers.',
    advantages: JSON.stringify([
      { title: 'Employee Engagement', description: 'Workers directly benefit from success' },
      { title: 'Resilient Model', description: 'Distributed ownership increases stability' }
    ]),
    disadvantages: JSON.stringify([
      { title: 'Decision Making', description: 'Democratic process can slow decisions' },
      { title: 'Limited Capital', description: 'Traditional investors may be hesitant' }
    ]),
    examples: 'Mondragon Corporation, Equal Exchange',
    resources: 'usworker.coop',
    status: 'Done'
  }
];

const businessModels = [
  {
    name: 'Direct Sales',
    description: 'Selling products or services directly to customers.',
    status: 'Done'
  },
  {
    name: 'Subscription',
    description: 'Recurring revenue model with regular payments.',
    status: 'Done'
  },
  {
    name: 'Service',
    description: 'Revenue from providing services to clients.',
    status: 'Done'
  }
];

const fundingOptions = [
  {
    name: 'Impact Investment',
    description: 'Investment intended to generate positive, measurable social and environmental impact.',
    status: 'Done'
  },
  {
    name: 'Traditional VC',
    description: 'Venture capital focused primarily on financial returns.',
    status: 'Done'
  },
  {
    name: 'Member Investment',
    description: 'Funding from cooperative members or community stakeholders.',
    status: 'Done'
  },
  {
    name: 'Cooperative Loan Funds',
    description: 'Specialized lending for cooperative businesses.',
    status: 'Done'
  }
];

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...');

    // Insert goals
    console.log('📝 Inserting goals...');
    const { data: goalsData, error: goalsError } = await supabase
      .from('goals')
      .insert(goals)
      .select();
    
    if (goalsError) throw goalsError;
    console.log(`✅ Inserted ${goalsData.length} goals`);

    // Insert entity types
    console.log('🏢 Inserting entity types...');
    const { data: entityData, error: entityError } = await supabase
      .from('entity_types')
      .insert(entityTypes)
      .select();
    
    if (entityError) throw entityError;
    console.log(`✅ Inserted ${entityData.length} entity types`);

    // Insert business models
    console.log('💼 Inserting business models...');
    const { data: businessData, error: businessError } = await supabase
      .from('business_models')
      .insert(businessModels)
      .select();
    
    if (businessError) throw businessError;
    console.log(`✅ Inserted ${businessData.length} business models`);

    // Insert funding options
    console.log('💰 Inserting funding options...');
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_options')
      .insert(fundingOptions)
      .select();
    
    if (fundingError) throw fundingError;
    console.log(`✅ Inserted ${fundingData.length} funding options`);

    // Insert goal relationships
    console.log('🔗 Creating goal relationships...');
    const goalRelationships = [
      // Public Benefit Corporation relationships
      { goal_id: goalsData[0].id, item_id: entityData[0].id, item_type: 'entity_type', rating: 0.9 },
      { goal_id: goalsData[1].id, item_id: entityData[0].id, item_type: 'entity_type', rating: 0.7 },
      { goal_id: goalsData[2].id, item_id: entityData[0].id, item_type: 'entity_type', rating: 0.8 },
      
      // Worker Cooperative relationships
      { goal_id: goalsData[1].id, item_id: entityData[1].id, item_type: 'entity_type', rating: 0.8 },
      { goal_id: goalsData[2].id, item_id: entityData[1].id, item_type: 'entity_type', rating: 0.95 },
      { goal_id: goalsData[3].id, item_id: entityData[1].id, item_type: 'entity_type', rating: 0.7 },
    ];

    const { error: relationError } = await supabase
      .from('goals_items')
      .insert(goalRelationships);
    
    if (relationError) throw relationError;
    console.log(`✅ Created ${goalRelationships.length} goal relationships`);

    console.log('🎉 Database population completed successfully!');
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

populateDatabase();