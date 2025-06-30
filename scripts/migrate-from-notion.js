// Notion to Supabase Migration Script using Notion API
// Usage: node scripts/migrate-from-notion.js

const { Client } = require('@notion/client');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize clients
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function to extract text from Notion rich text
function extractText(richText) {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map(text => text.plain_text).join('');
}

// Helper function to extract multi-select values
function extractMultiSelect(multiSelect) {
  if (!multiSelect || !Array.isArray(multiSelect)) return [];
  return multiSelect.map(item => ({ title: item.name }));
}

// Helper function to extract select value
function extractSelect(select) {
  return select ? select.name : '';
}

// Helper function to extract number
function extractNumber(number) {
  return number ? number.number : 0;
}

// Process Goals from Notion database
async function processGoalsFromNotion(databaseId) {
  try {
    console.log('📝 Fetching goals from Notion...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const goals = response.results.map(page => ({
      name: extractText(page.properties.Name?.title || page.properties.Goal?.title),
      // Add other fields based on your Notion database structure
    }));

    // Insert into Supabase
    const { data, error } = await supabase
      .from('goals')
      .insert(goals)
      .select();

    if (error) throw error;
    console.log(`✅ Imported ${data.length} goals`);
    return data;

  } catch (error) {
    console.error('❌ Error processing goals:', error);
    return [];
  }
}

// Process Entity Types from Notion database
async function processEntityTypesFromNotion(databaseId) {
  try {
    console.log('🏢 Fetching entity types from Notion...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const entityTypes = response.results.map(page => {
      const props = page.properties;
      
      return {
        name: extractText(props.Name?.title),
        description: extractText(props.Description?.rich_text),
        advantages: JSON.stringify(extractMultiSelect(props.Advantages?.multi_select)),
        disadvantages: JSON.stringify(extractMultiSelect(props.Disadvantages?.multi_select)),
        examples: extractText(props.Examples?.rich_text),
        resources: extractText(props.Resources?.rich_text || props.URL?.url),
        status: extractSelect(props.Status?.select) || 'Done'
      };
    });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('entity_types')
      .insert(entityTypes)
      .select();

    if (error) throw error;
    console.log(`✅ Imported ${data.length} entity types`);
    return data;

  } catch (error) {
    console.error('❌ Error processing entity types:', error);
    return [];
  }
}

// Process Business Models from Notion database
async function processBusinessModelsFromNotion(databaseId) {
  try {
    console.log('💼 Fetching business models from Notion...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const businessModels = response.results.map(page => {
      const props = page.properties;
      
      return {
        name: extractText(props.Name?.title),
        description: extractText(props.Description?.rich_text),
        advantages: JSON.stringify(extractMultiSelect(props.Advantages?.multi_select)),
        disadvantages: JSON.stringify(extractMultiSelect(props.Disadvantages?.multi_select)),
        examples: extractText(props.Examples?.rich_text),
        resources: extractText(props.Resources?.rich_text || props.URL?.url),
        status: extractSelect(props.Status?.select) || 'Done'
      };
    });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('business_models')
      .insert(businessModels)
      .select();

    if (error) throw error;
    console.log(`✅ Imported ${data.length} business models`);
    return data;

  } catch (error) {
    console.error('❌ Error processing business models:', error);
    return [];
  }
}

// Process Funding Options from Notion database
async function processFundingOptionsFromNotion(databaseId) {
  try {
    console.log('💰 Fetching funding options from Notion...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const fundingOptions = response.results.map(page => {
      const props = page.properties;
      
      return {
        name: extractText(props.Name?.title),
        description: extractText(props.Description?.rich_text),
        advantages: JSON.stringify(extractMultiSelect(props.Advantages?.multi_select)),
        disadvantages: JSON.stringify(extractMultiSelect(props.Disadvantages?.multi_select)),
        examples: extractText(props.Examples?.rich_text),
        resources: extractText(props.Resources?.rich_text || props.URL?.url),
        status: extractSelect(props.Status?.select) || 'Done'
      };
    });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('funding_options')
      .insert(fundingOptions)
      .select();

    if (error) throw error;
    console.log(`✅ Imported ${data.length} funding options`);
    return data;

  } catch (error) {
    console.error('❌ Error processing funding options:', error);
    return [];
  }
}

// Process Goal Relationships from Notion
async function processGoalRelationships(databaseId, goals, items, itemType) {
  try {
    console.log(`🔗 Processing ${itemType} goal relationships...`);
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const relationships = [];

    response.results.forEach(page => {
      const props = page.properties;
      const itemName = extractText(props.Name?.title);
      const item = items.find(i => i.name === itemName);
      
      if (!item) return;

      // Process goal ratings - adjust property names based on your Notion setup
      goals.forEach(goal => {
        const ratingProp = props[`${goal.name} Rating`] || props[goal.name];
        if (ratingProp) {
          const rating = extractNumber(ratingProp) || 0;
          if (rating > 0) {
            relationships.push({
              goal_id: goal.id,
              item_id: item.id,
              item_type: itemType,
              rating: rating
            });
          }
        }
      });
    });

    if (relationships.length > 0) {
      const { error } = await supabase
        .from('goals_items')
        .insert(relationships);

      if (error) throw error;
      console.log(`✅ Created ${relationships.length} ${itemType} relationships`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${itemType} relationships:`, error);
  }
}

// Main migration function
async function migrateFromNotion() {
  try {
    console.log('🚀 Starting Notion API migration...');
    
    // Database IDs from your Notion workspace
    const databases = {
      goals: process.env.NOTION_GOALS_DATABASE_ID,
      entityTypes: process.env.NOTION_ENTITY_TYPES_DATABASE_ID,
      businessModels: process.env.NOTION_BUSINESS_MODELS_DATABASE_ID,
      fundingOptions: process.env.NOTION_FUNDING_OPTIONS_DATABASE_ID
    };

    // Process each database
    let goals = [];
    let entityTypes = [];
    let businessModels = [];
    let fundingOptions = [];

    if (databases.goals) {
      goals = await processGoalsFromNotion(databases.goals);
    }

    if (databases.entityTypes) {
      entityTypes = await processEntityTypesFromNotion(databases.entityTypes);
    }

    if (databases.businessModels) {
      businessModels = await processBusinessModelsFromNotion(databases.businessModels);
    }

    if (databases.fundingOptions) {
      fundingOptions = await processFundingOptionsFromNotion(databases.fundingOptions);
    }

    // Process relationships if we have goals and items
    if (goals.length > 0) {
      if (entityTypes.length > 0 && databases.entityTypes) {
        await processGoalRelationships(databases.entityTypes, goals, entityTypes, 'entity_type');
      }
      
      if (businessModels.length > 0 && databases.businessModels) {
        await processGoalRelationships(databases.businessModels, goals, businessModels, 'business_model');
      }
      
      if (fundingOptions.length > 0 && databases.fundingOptions) {
        await processGoalRelationships(databases.fundingOptions, goals, fundingOptions, 'funding_option');
      }
    }

    console.log('🎉 Notion migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Test connection function
async function testNotionConnection() {
  try {
    console.log('🔍 Testing Notion connection...');
    const response = await notion.users.me();
    console.log('✅ Connected to Notion as:', response.name);
    return true;
  } catch (error) {
    console.error('❌ Notion connection failed:', error.message);
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  // Test connection first
  testNotionConnection().then(connected => {
    if (connected) {
      migrateFromNotion();
    }
  });
}

module.exports = { migrateFromNotion, testNotionConnection };