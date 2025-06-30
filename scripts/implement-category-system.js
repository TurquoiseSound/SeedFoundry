require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Define categories and their compatibility rules
const CATEGORIES = {
  SOCIAL_IMPACT: 'Social Impact',
  CONTROL: 'Control & Ownership', 
  SPEED: 'Quick & Simple',
  COST: 'Cost Effective',
  FLEXIBILITY: 'Flexible Structure',
  COLLABORATION: 'Collaborative',
  GROWTH: 'Growth Focused',
  SUSTAINABILITY: 'Sustainable Business',
  TRANSPARENCY: 'Transparency'
};

// Goal category mappings based on your new goal names
const GOAL_CATEGORIES = {
  'Maximize Social Impact': {
    primary: CATEGORIES.SOCIAL_IMPACT,
    weights: { [CATEGORIES.SOCIAL_IMPACT]: 0.9, [CATEGORIES.TRANSPARENCY]: 0.1 }
  },
  'Retain Founder Control': {
    primary: CATEGORIES.CONTROL,
    weights: { [CATEGORIES.CONTROL]: 0.8, [CATEGORIES.FLEXIBILITY]: 0.2 }
  },
  'Minimal Cost Quick Start': {
    primary: CATEGORIES.COST,
    weights: { [CATEGORIES.COST]: 0.6, [CATEGORIES.SPEED]: 0.4 }
  },
  'Legal Entity Flexibility': {
    primary: CATEGORIES.FLEXIBILITY,
    weights: { [CATEGORIES.FLEXIBILITY]: 0.9, [CATEGORIES.CONTROL]: 0.1 }
  },
  'Mixed Capital Optionality': {
    primary: CATEGORIES.FLEXIBILITY,
    weights: { [CATEGORIES.FLEXIBILITY]: 0.7, [CATEGORIES.GROWTH]: 0.3 }
  },
  'Shared Ownership': {
    primary: CATEGORIES.COLLABORATION,
    weights: { [CATEGORIES.COLLABORATION]: 0.8, [CATEGORIES.SOCIAL_IMPACT]: 0.2 }
  },
  'Multi-Stakeholder Representation': {
    primary: CATEGORIES.COLLABORATION,
    weights: { [CATEGORIES.COLLABORATION]: 0.7, [CATEGORIES.TRANSPARENCY]: 0.3 }
  },
  'Share Customer Benefits': {
    primary: CATEGORIES.SOCIAL_IMPACT,
    weights: { [CATEGORIES.SOCIAL_IMPACT]: 0.6, [CATEGORIES.COLLABORATION]: 0.4 }
  },
  'Avoid Rapid Growth Pressure': {
    primary: CATEGORIES.SUSTAINABILITY,
    weights: { [CATEGORIES.SUSTAINABILITY]: 0.8, [CATEGORIES.CONTROL]: 0.2 }
  }
};

// Item category mappings (examples - will expand based on your data)
const ENTITY_TYPE_CATEGORIES = {
  'B-Corp': [CATEGORIES.SOCIAL_IMPACT, CATEGORIES.TRANSPARENCY],
  'LLC': [CATEGORIES.CONTROL, CATEGORIES.FLEXIBILITY, CATEGORIES.SPEED],
  'Corporation': [CATEGORIES.GROWTH, CATEGORIES.CONTROL],
  'Cooperative': [CATEGORIES.COLLABORATION, CATEGORIES.SOCIAL_IMPACT],
  'L3C': [CATEGORIES.SOCIAL_IMPACT, CATEGORIES.FLEXIBILITY],
  'Sole Proprietorship': [CATEGORIES.COST, CATEGORIES.SPEED],
  'Partnership': [CATEGORIES.COLLABORATION, CATEGORIES.SPEED],
  'Nonprofit': [CATEGORIES.SOCIAL_IMPACT, CATEGORIES.TRANSPARENCY]
};

const BUSINESS_MODEL_CATEGORIES = {
  'Subscription': [CATEGORIES.GROWTH, CATEGORIES.SUSTAINABILITY],
  'Donation': [CATEGORIES.SOCIAL_IMPACT],
  'Marketplace': [CATEGORIES.GROWTH, CATEGORIES.COLLABORATION],
  'Freemium': [CATEGORIES.GROWTH, CATEGORIES.COST],
  'B2B Sales': [CATEGORIES.GROWTH, CATEGORIES.CONTROL],
  'Licensing': [CATEGORIES.FLEXIBILITY, CATEGORIES.GROWTH],
  'Advertising': [CATEGORIES.GROWTH],
  'Commission': [CATEGORIES.COLLABORATION, CATEGORIES.GROWTH]
};

const FUNDING_OPTION_CATEGORIES = {
  'Bootstrapping': [CATEGORIES.CONTROL, CATEGORIES.COST],
  'Angel Investment': [CATEGORIES.GROWTH, CATEGORIES.SPEED],
  'Venture Capital': [CATEGORIES.GROWTH],
  'Crowdfunding': [CATEGORIES.COLLABORATION, CATEGORIES.SOCIAL_IMPACT],
  'Grants': [CATEGORIES.SOCIAL_IMPACT, CATEGORIES.COST],
  'Bank Loan': [CATEGORIES.CONTROL, CATEGORIES.SPEED],
  'Revenue-Based Financing': [CATEGORIES.FLEXIBILITY, CATEGORIES.CONTROL],
  'Impact Investment': [CATEGORIES.SOCIAL_IMPACT, CATEGORIES.GROWTH]
};

// Calculate compatibility score based on category overlap
function calculateCategoryCompatibility(goalWeights, itemCategories) {
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const [category, weight] of Object.entries(goalWeights)) {
    totalWeight += weight;
    if (itemCategories.includes(category)) {
      totalScore += weight * 100; // 100% match for matching categories
    }
  }
  
  // Base score of 30 for any item, then add category matches
  const categoryScore = totalWeight > 0 ? (totalScore / totalWeight) : 30;
  return Math.max(30, Math.min(100, Math.round(categoryScore)));
}

async function implementCategorySystem() {
  console.log('🏷️ Implementing category-based compatibility system...\n');
  
  try {
    // Step 1: Update goals with primary categories
    console.log('📝 Updating goals with categories...');
    const { data: goals } = await supabase
      .from('goals')
      .select('id, name');
    
    for (const goal of goals) {
      const categoryInfo = GOAL_CATEGORIES[goal.name];
      if (categoryInfo) {
        await supabase
          .from('goals')
          .update({ 
            primary_category: categoryInfo.primary 
          })
          .eq('id', goal.id);
        console.log(`   ✅ ${goal.name} → ${categoryInfo.primary}`);
      }
    }
    
    // Step 2: Update entity types with categories
    console.log('\n🏢 Updating entity types with categories...');
    const { data: entityTypes } = await supabase
      .from('entity_types')
      .select('id, name');
    
    for (const entityType of entityTypes) {
      const categories = ENTITY_TYPE_CATEGORIES[entityType.name] || [CATEGORIES.FLEXIBILITY];
      await supabase
        .from('entity_types')
        .update({ categories })
        .eq('id', entityType.id);
      console.log(`   ✅ ${entityType.name} → [${categories.join(', ')}]`);
    }
    
    // Step 3: Update business models with categories
    console.log('\n💼 Updating business models with categories...');
    const { data: businessModels } = await supabase
      .from('business_models')
      .select('id, name');
    
    for (const businessModel of businessModels) {
      const categories = BUSINESS_MODEL_CATEGORIES[businessModel.name] || [CATEGORIES.GROWTH];
      await supabase
        .from('business_models')
        .update({ categories })
        .eq('id', businessModel.id);
      console.log(`   ✅ ${businessModel.name} → [${categories.join(', ')}]`);
    }
    
    // Step 4: Update funding options with categories
    console.log('\n💰 Updating funding options with categories...');
    const { data: fundingOptions } = await supabase
      .from('funding_options')
      .select('id, name');
    
    for (const fundingOption of fundingOptions) {
      const categories = FUNDING_OPTION_CATEGORIES[fundingOption.name] || [CATEGORIES.GROWTH];
      await supabase
        .from('funding_options')
        .update({ categories })
        .eq('id', fundingOption.id);
      console.log(`   ✅ ${fundingOption.name} → [${categories.join(', ')}]`);
    }
    
    // Step 5: Create goal associations with category-based scoring
    console.log('\n🔗 Creating goal associations with category-based compatibility...');
    
    // Clear existing associations
    await supabase.from('goals_items').delete().neq('id', 0);
    
    let associationsCreated = 0;
    
    for (const goal of goals) {
      const goalWeights = GOAL_CATEGORIES[goal.name]?.weights || {};
      
      // Associate with entity types
      for (const entityType of entityTypes) {
        const categories = ENTITY_TYPE_CATEGORIES[entityType.name] || [];
        const score = calculateCategoryCompatibility(goalWeights, categories);
        
        if (score >= 40) { // Only create associations with reasonable compatibility
          await supabase
            .from('goals_items')
            .insert({
              goal_id: goal.id,
              item_id: entityType.id,
              item_type: 'entity_type',
              compatibility_score: score
            });
          associationsCreated++;
        }
      }
      
      // Associate with business models
      for (const businessModel of businessModels) {
        const categories = BUSINESS_MODEL_CATEGORIES[businessModel.name] || [];
        const score = calculateCategoryCompatibility(goalWeights, categories);
        
        if (score >= 40) {
          await supabase
            .from('goals_items')
            .insert({
              goal_id: goal.id,
              item_id: businessModel.id,
              item_type: 'business_model',
              compatibility_score: score
            });
          associationsCreated++;
        }
      }
      
      // Associate with funding options
      for (const fundingOption of fundingOptions) {
        const categories = FUNDING_OPTION_CATEGORIES[fundingOption.name] || [];
        const score = calculateCategoryCompatibility(goalWeights, categories);
        
        if (score >= 40) {
          await supabase
            .from('goals_items')
            .insert({
              goal_id: goal.id,
              item_id: fundingOption.id,
              item_type: 'funding_option',
              compatibility_score: score
            });
          associationsCreated++;
        }
      }
    }
    
    console.log(`\n🎉 Category-based compatibility system implemented successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   • Goals categorized: ${goals.length}`);
    console.log(`   • Entity types categorized: ${entityTypes.length}`);
    console.log(`   • Business models categorized: ${businessModels.length}`);
    console.log(`   • Funding options categorized: ${fundingOptions.length}`);
    console.log(`   • Associations created: ${associationsCreated}`);
    
  } catch (error) {
    console.error('❌ Error implementing category system:', error);
  }
}

// Run the implementation
implementCategorySystem();