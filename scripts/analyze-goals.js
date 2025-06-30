const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkGoalsOrigin() {
  console.log('🔍 Checking goals data source...\n');

  try {
    const { data: goals } = await supabase.from('goals').select('*');
    
    console.log(`📝 Found ${goals.length} total goals in database\n`);
    
    // Group goals by similarity to identify which are from mock data vs Notion
    const mockDataGoals = goals.filter(g => 
      g.name.includes('Maximize Social Impact') ||
      g.name.includes('Sustainable Revenue') ||
      g.name.includes('Community Ownership') ||
      g.name.includes('Environmental Sustainability') ||
      g.name.includes('Innovation Leadership')
    );
    
    const notionGoals = goals.filter(g => 
      g.name.includes('I want to') ||
      g.name.includes('most possible social impact') ||
      g.name.includes('legal structure') ||
      g.name.includes('funding sources') ||
      g.name.includes('stakeholders') ||
      g.name.includes('retain control')
    );
    
    const otherGoals = goals.filter(g => 
      !mockDataGoals.includes(g) && !notionGoals.includes(g)
    );

    console.log(`🧪 MOCK DATA GOALS (${mockDataGoals.length}):`);
    mockDataGoals.forEach((goal, i) => {
      console.log(`   ${i + 1}. "${goal.name}"`);
    });

    console.log(`\n📋 NOTION GOALS (${notionGoals.length}):`);
    notionGoals.forEach((goal, i) => {
      console.log(`   ${i + 1}. "${goal.name}"`);
    });

    console.log(`\n❓ OTHER GOALS (${otherGoals.length}):`);
    otherGoals.forEach((goal, i) => {
      console.log(`   ${i + 1}. "${goal.name}"`);
    });

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Mock data goals: ${mockDataGoals.length}`);
    console.log(`   Notion goals: ${notionGoals.length}`);
    console.log(`   Other goals: ${otherGoals.length}`);
    console.log(`   Total: ${goals.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkGoalsOrigin();