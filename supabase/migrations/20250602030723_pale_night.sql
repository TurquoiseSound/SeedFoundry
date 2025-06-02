-- Create tables
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE entity_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  advantages TEXT,
  disadvantages TEXT,
  examples TEXT,
  resources TEXT,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE business_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  advantages TEXT,
  disadvantages TEXT,
  examples TEXT,
  resources TEXT,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE TABLE funding_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  advantages TEXT,
  disadvantages TEXT,
  examples TEXT,
  resources TEXT,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create junction tables for many-to-many relationships
CREATE TABLE goals_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('entity_type', 'business_model', 'funding_option')),
  rating DECIMAL CHECK (rating >= 0 AND rating <= 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(goal_id, item_id, item_type)
);

CREATE TABLE entity_business_models (
  entity_type_id UUID REFERENCES entity_types(id) ON DELETE CASCADE,
  business_model_id UUID REFERENCES business_models(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (entity_type_id, business_model_id)
);

CREATE TABLE entity_funding_options (
  entity_type_id UUID REFERENCES entity_types(id) ON DELETE CASCADE,
  funding_option_id UUID REFERENCES funding_options(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (entity_type_id, funding_option_id)
);

CREATE TABLE business_funding_options (
  business_model_id UUID REFERENCES business_models(id) ON DELETE CASCADE,
  funding_option_id UUID REFERENCES funding_options(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (business_model_id, funding_option_id)
);

-- Create users table for auth and subscriptions
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  subscription_status TEXT,
  subscription_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON goals FOR SELECT USING (true);
CREATE POLICY "Public read access" ON entity_types FOR SELECT USING (status = 'Done');
CREATE POLICY "Public read access" ON business_models FOR SELECT USING (status = 'Done');
CREATE POLICY "Public read access" ON funding_options FOR SELECT USING (status = 'Done');
CREATE POLICY "Public read access" ON goals_items FOR SELECT USING (true);

-- Create policy for users to only see their own data
CREATE POLICY "Users can only see their own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Create necessary indexes
CREATE INDEX idx_entity_types_status ON entity_types(status);
CREATE INDEX idx_business_models_status ON business_models(status);
CREATE INDEX idx_funding_options_status ON funding_options(status);
CREATE INDEX idx_goals_items_goal_id ON goals_items(goal_id);
CREATE INDEX idx_goals_items_item_id ON goals_items(item_id);