-- Re-enable RLS after data migration with proper policies
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals_items ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
DROP POLICY IF EXISTS "Public access" ON goals;
CREATE POLICY "Public access" ON goals FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access" ON entity_types;
CREATE POLICY "Public access" ON entity_types FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access" ON business_models;
CREATE POLICY "Public access" ON business_models FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access" ON funding_options;
CREATE POLICY "Public access" ON funding_options FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access" ON goals_items;
CREATE POLICY "Public access" ON goals_items FOR ALL USING (true) WITH CHECK (true);