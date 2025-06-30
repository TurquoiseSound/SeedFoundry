# 🚀 Notion to Supabase Migration Guide

## Step 1: Install Dependencies

```bash
npm install @notion/client csv-parser
```

## Step 2: Set Up Notion Integration

### Create Notion Integration
1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it "SEED Foundry Migration"
4. Select your workspace
5. Copy the **Internal Integration Token**

### Share Databases with Integration
For each database you want to migrate:
1. Open the database in Notion
2. Click "..." → "Add connections"
3. Select your "SEED Foundry Migration" integration

### Get Database IDs
1. Open each database in Notion
2. Copy the URL - the database ID is the long string after the last `/` and before `?`
   - Example: `https://notion.so/workspace/DATABASE_ID?v=...`

## Step 3: Update Environment Variables

Add to your `.env.local`:

```bash
# Existing Supabase config
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Notion API Configuration
NOTION_TOKEN=your_notion_integration_token

# Notion Database IDs (get these from your Notion URLs)
NOTION_GOALS_DATABASE_ID=your_goals_database_id
NOTION_ENTITY_TYPES_DATABASE_ID=your_entity_types_database_id
NOTION_BUSINESS_MODELS_DATABASE_ID=your_business_models_database_id
NOTION_FUNDING_OPTIONS_DATABASE_ID=your_funding_options_database_id
```

## Step 4: Fix Security Issues

Run this SQL in your Supabase dashboard → SQL Editor:

```sql
-- Copy and paste the content from supabase/migrations/fix_rls_security.sql
```

## Step 5: Expected Notion Database Structure

### Goals Database
- **Name** (Title): Goal name
- **Status** (Select): Draft/Done

### Entity Types Database
- **Name** (Title): Entity type name
- **Description** (Text): Description
- **Advantages** (Multi-select): List of advantages
- **Disadvantages** (Multi-select): List of disadvantages
- **Examples** (Text): Example companies
- **Resources** (Text or URL): Resource links
- **Status** (Select): Draft/Done
- **Goal Rating Columns** (Number): One column per goal with ratings 0-1

### Business Models Database
- Same structure as Entity Types

### Funding Options Database
- Same structure as Entity Types

## Step 6: Run Migration

```bash
# Test connection first
node scripts/migrate-from-notion.js

# If successful, your data will be imported!
```

## Step 7: Update Your App

The app will automatically use real data once migration is complete!

## 🔧 Troubleshooting

### Common Issues:

1. **"Notion connection failed"**
   - Check your `NOTION_TOKEN` in `.env.local`
   - Ensure integration has access to databases

2. **"Database not found"**
   - Verify database IDs in `.env.local`
   - Make sure databases are shared with integration

3. **"Property not found"**
   - Check that your Notion database columns match expected names
   - Adjust property names in the migration script if needed

### Property Name Mapping

If your Notion columns have different names, update these in `migrate-from-notion.js`:

```javascript
// Current expected names:
props.Name?.title           // → name
props.Description?.rich_text // → description  
props.Advantages?.multi_select // → advantages
props.Status?.select        // → status
```

## 🎯 Next Steps

After successful migration:
1. Your app will display real data from Supabase
2. You can continue adding data through Notion
3. Re-run migration script to sync new data
4. Consider setting up automated sync if needed

## 📞 Need Help?

If you encounter issues:
1. Check the console output for specific error messages
2. Verify all environment variables are set correctly
3. Ensure Notion databases have the expected column structure