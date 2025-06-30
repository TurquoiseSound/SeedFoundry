-- Add the missing compatibility_score column to goals_items table
ALTER TABLE goals_items ADD COLUMN IF NOT EXISTS compatibility_score INTEGER DEFAULT 70;

-- Add category columns to support category-based compatibility
ALTER TABLE goals ADD COLUMN IF NOT EXISTS primary_category TEXT;
ALTER TABLE entity_types ADD COLUMN IF NOT EXISTS categories TEXT[];
ALTER TABLE business_models ADD COLUMN IF NOT EXISTS categories TEXT[];
ALTER TABLE funding_options ADD COLUMN IF NOT EXISTS categories TEXT[];

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_goals_primary_category ON goals(primary_category);
CREATE INDEX IF NOT EXISTS idx_entity_types_categories ON entity_types USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_business_models_categories ON business_models USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_funding_options_categories ON funding_options USING GIN(categories);