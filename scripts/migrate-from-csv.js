// CSV to Supabase Migration Script
// Usage: node scripts/migrate-from-csv.js

const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function to parse JSON-like strings from CSV
function parseJsonField(field) {
  if (!field || field.trim() === '') return [];
  try {
    // Handle different formats that might come from Notion
    if (field.startsWith('[') && field.endsWith(']')) {
      return JSON.parse(field);
    }
    // Handle comma-separated values
    if (field.includes(',')) {
      return field.split(',').map(item => ({ title: item.trim() }));
    }
    // Single item
    return [{ title: field.trim() }];
  } catch (error) {
    console.warn('Could not parse field:', field);
    return [];
  }
}

// Process Goals CSV
async function processGoals(csvPath) {
  const goals = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        goals.push({
          name: row.Name || row.name || row.Goal,
          // Add any other fields from your Notion database
        });
      })
      .on('end', async () => {
        try {
          const { data, error } = await supabase
            .from('goals')
            .insert(goals)
            .select();
          
          if (error) throw error;
          console.log(`✅ Imported ${data.length} goals`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Process Entity Types CSV
async function processEntityTypes(csvPath) {
  const entityTypes = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        entityTypes.push({
          name: row.Name || row.name,
          description: row.Description || row.description || '',
          advantages: JSON.stringify(parseJsonField(row.Advantages || row.advantages)),
          disadvantages: JSON.stringify(parseJsonField(row.Disadvantages || row.disadvantages)),
          examples: row.Examples || row.examples || '',
          resources: row.Resources || row.resources || '',
          status: 'Done' // Set all imported items as Done
        });
      })
      .on('end', async () => {
        try {
          const { data, error } = await supabase
            .from('entity_types')
            .insert(entityTypes)
            .select();
          
          if (error) throw error;
          console.log(`✅ Imported ${data.length} entity types`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Process Business Models CSV
async function processBusinessModels(csvPath) {
  const businessModels = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        businessModels.push({
          name: row.Name || row.name,
          description: row.Description || row.description || '',
          advantages: JSON.stringify(parseJsonField(row.Advantages || row.advantages)),
          disadvantages: JSON.stringify(parseJsonField(row.Disadvantages || row.disadvantages)),
          examples: row.Examples || row.examples || '',
          resources: row.Resources || row.resources || '',
          status: 'Done'
        });
      })
      .on('end', async () => {
        try {
          const { data, error } = await supabase
            .from('business_models')
            .insert(businessModels)
            .select();
          
          if (error) throw error;
          console.log(`✅ Imported ${data.length} business models`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Process Funding Options CSV
async function processFundingOptions(csvPath) {
  const fundingOptions = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        fundingOptions.push({
          name: row.Name || row.name,
          description: row.Description || row.description || '',
          advantages: JSON.stringify(parseJsonField(row.Advantages || row.advantages)),
          disadvantages: JSON.stringify(parseJsonField(row.Disadvantages || row.disadvantages)),
          examples: row.Examples || row.examples || '',
          resources: row.Resources || row.resources || '',
          status: 'Done'
        });
      })
      .on('end', async () => {
        try {
          const { data, error } = await supabase
            .from('funding_options')
            .insert(fundingOptions)
            .select();
          
          if (error) throw error;
          console.log(`✅ Imported ${data.length} funding options`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Main migration function
async function migrateFromCSV() {
  try {
    console.log('🚀 Starting CSV migration...');
    
    // Check if CSV files exist
    const csvFiles = {
      goals: './data/goals.csv',
      entityTypes: './data/entity-types.csv',
      businessModels: './data/business-models.csv',
      fundingOptions: './data/funding-options.csv'
    };
    
    // Process each CSV file if it exists
    if (fs.existsSync(csvFiles.goals)) {
      await processGoals(csvFiles.goals);
    } else {
      console.log('⚠️  Goals CSV not found, skipping...');
    }
    
    if (fs.existsSync(csvFiles.entityTypes)) {
      await processEntityTypes(csvFiles.entityTypes);
    } else {
      console.log('⚠️  Entity Types CSV not found, skipping...');
    }
    
    if (fs.existsSync(csvFiles.businessModels)) {
      await processBusinessModels(csvFiles.businessModels);
    } else {
      console.log('⚠️  Business Models CSV not found, skipping...');
    }
    
    if (fs.existsSync(csvFiles.fundingOptions)) {
      await processFundingOptions(csvFiles.fundingOptions);
    } else {
      console.log('⚠️  Funding Options CSV not found, skipping...');
    }
    
    console.log('🎉 CSV migration completed!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run if called directly
if (require.main === module) {
  migrateFromCSV();
}

module.exports = { migrateFromCSV };