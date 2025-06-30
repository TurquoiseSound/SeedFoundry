// Notion to Supabase Migration Script using Notion API
// Usage: node scripts/migrate-from-notion.js

const { Client } = require('@notionhq/client');
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
  return richText.map(text => text.plain_text).join('').trim();
}

// Helper function to extract title text
function extractTitle(title) {
  if (!title || !Array.isArray(title)) return '';
  return title.map(text => text.plain_text).join('').trim();
}

// Helper function to extract select value
function extractSelect(select) {
  return select ? select.name : '';
}

// Process Goals from Notion database
async function processGoalsFromNotion(databaseId) {
  try {
    console.log('📝 Fetching goals from Notion...');

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const goals = response.results
      .map(page => {
        const name = extractTitle(page.properties.Name?.title);

        if (!name || name === 'N/A') return null;

        return {
          name: name
          // Remove description field since it doesn't exist in the schema
        };
      })
      .filter(Boolean); // Remove null entries

    if (goals.length === 0) {
      console.log('⚠️  No valid goals found');
      return [];
    }

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

    const entityTypes = response.results
      .map(page => {
        const props = page.properties;
        const name = extractTitle(props['﻿NAME']?.title);
        
        if (!name || name === 'N/A') return null;
        
        return {
          name: name,
          description: extractText(props.DESCRIPTION?.rich_text) || extractText(props['EXTENDED DESCRIPTION']?.rich_text) || '',
          advantages: extractText(props['Advantages - Specific to building principled social tech']?.rich_text) || '',
          disadvantages: extractText(props['DISADVANTAGES - Specific to building principled social tech']?.rich_text) || '',
          examples: extractText(props['Examples of Existing Tech Orgs']?.rich_text) || '',
          resources: extractText(props.Links?.rich_text) || '',
          status: 'Done'
        };
      })
      .filter(Boolean);

    if (entityTypes.length === 0) {
      console.log('⚠️  No valid entity types found');
      return [];
    }

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

    const businessModels = response.results
      .map(page => {
        const props = page.properties;
        const name = extractTitle(props['﻿Name']?.title);
        
        if (!name || name === 'N/A' || name === 'Extra Links') return null;
        
        return {
          name: name,
          description: extractText(props.Description?.rich_text) || '',
          advantages: extractText(props.Advantages?.rich_text) || '',
          disadvantages: extractText(props.Disadvantages?.rich_text) || '',
          examples: extractText(props.Examples?.rich_text) || '',
          resources: extractText(props.Links?.rich_text) || '',
          status: 'Done'
        };
      })
      .filter(Boolean);

    if (businessModels.length === 0) {
      console.log('⚠️  No valid business models found');
      return [];
    }

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

    const fundingOptions = response.results
      .map(page => {
        const props = page.properties;
        const name = extractTitle(props['﻿Name']?.title);
        
        if (!name || name === 'N/A' || name === 'Extra Links and Charts') return null;
        
        return {
          name: name,
          description: extractText(props.Description?.rich_text) || extractText(props.Brief?.rich_text) || '',
          advantages: extractText(props.Advantages?.rich_text) || '',
          disadvantages: extractText(props.Disadvantages?.rich_text) || '',
          examples: extractText(props['Examples of existing tech orgs']?.rich_text) || '',
          resources: extractText(props.Links?.rich_text) || '',
          status: 'Done'
        };
      })
      .filter(Boolean);

    if (fundingOptions.length === 0) {
      console.log('⚠️  No valid funding options found');
      return [];
    }

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

// Create goal associations (simplified version)
async function createGoalAssociations(goals, entityTypes, businessModels, fundingOptions) {
  try {
    console.log('🔗 Creating goal associations...');
    
    const allItems = [...entityTypes, ...businessModels, ...fundingOptions];
    const associations = [];
    
    // For now, associate each goal with all items (you can customize this logic)
    for (const goal of goals) {
      for (const item of allItems) {
        associations.push({
          goal_id: goal.id,
          item_id: item.id,
          item_type: entityTypes.includes(item) ? 'entity_type' : 
                    businessModels.includes(item) ? 'business_model' : 'funding_option',
          compatibility_score: 80 // Default compatibility score
        });
      }
    }

    if (associations.length === 0) {
      console.log('⚠️  No associations to create');
      return;
    }

    const { data, error } = await supabase
      .from('goals_items')
      .insert(associations)
      .select();

    if (error) throw error;
    console.log(`✅ Created ${data.length} goal associations`);

  } catch (error) {
    console.error('❌ Error creating associations:', error);
  }
}

// Main migration function
async function migrateFromNotion() {
  console.log('🚀 Starting Notion to Supabase migration...\n');

  try {
    // Process each database
    const goals = await processGoalsFromNotion(process.env.NOTION_GOALS_DATABASE_ID);
    const entityTypes = await processEntityTypesFromNotion(process.env.NOTION_ENTITY_TYPES_DATABASE_ID);
    const businessModels = await processBusinessModelsFromNotion(process.env.NOTION_BUSINESS_MODELS_DATABASE_ID);
    const fundingOptions = await processFundingOptionsFromNotion(process.env.NOTION_FUNDING_OPTIONS_DATABASE_ID);

    // Create associations
    await createGoalAssociations(goals, entityTypes, businessModels, fundingOptions);

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • Goals: ${goals.length}`);
    console.log(`   • Entity Types: ${entityTypes.length}`);
    console.log(`   • Business Models: ${businessModels.length}`);
    console.log(`   • Funding Options: ${fundingOptions.length}`);

  } catch (error) {
    console.error('💥 Migration failed:', error);
  }
}

// Run migration
migrateFromNotion();