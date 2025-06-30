-- Only add the missing INSERT and UPDATE policies we need for data migration
-- Skip the read policies that already exist

-- Main tables INSERT policies (these are what we need for data migration)
DROP POLICY IF EXISTS "Public insert access" ON goals;
CREATE POLICY "Public insert access" ON goals FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON entity_types;
CREATE POLICY "Public insert access" ON entity_types FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON business_models;
CREATE POLICY "Public insert access" ON business_models FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON funding_options;
CREATE POLICY "Public insert access" ON funding_options FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON goals_items;
CREATE POLICY "Public insert access" ON goals_items FOR INSERT WITH CHECK (true);

-- Main tables UPDATE policies
DROP POLICY IF EXISTS "Public update access" ON goals;
CREATE POLICY "Public update access" ON goals FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON entity_types;
CREATE POLICY "Public update access" ON entity_types FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON business_models;
CREATE POLICY "Public update access" ON business_models FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON funding_options;
CREATE POLICY "Public update access" ON funding_options FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON goals_items;
CREATE POLICY "Public update access" ON goals_items FOR UPDATE USING (true);-- Add INSERT and UPDATE policies for data migration
-- Using IF NOT EXISTS equivalent (DROP IF EXISTS + CREATE)

-- Main tables INSERT policies
DROP POLICY IF EXISTS "Public insert access" ON goals;
CREATE POLICY "Public insert access" ON goals FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON entity_types;
CREATE POLICY "Public insert access" ON entity_types FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON business_models;
CREATE POLICY "Public insert access" ON business_models FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON funding_options;
CREATE POLICY "Public insert access" ON funding_options FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON goals_items;
CREATE POLICY "Public insert access" ON goals_items FOR INSERT WITH CHECK (true);

-- Junction tables INSERT policies
DROP POLICY IF EXISTS "Public insert access" ON entity_business_models;
CREATE POLICY "Public insert access" ON entity_business_models FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON entity_funding_options;
CREATE POLICY "Public insert access" ON entity_funding_options FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert access" ON business_funding_options;
CREATE POLICY "Public insert access" ON business_funding_options FOR INSERT WITH CHECK (true);

-- Main tables UPDATE policies
DROP POLICY IF EXISTS "Public update access" ON goals;
CREATE POLICY "Public update access" ON goals FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON entity_types;
CREATE POLICY "Public update access" ON entity_types FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON business_models;
CREATE POLICY "Public update access" ON business_models FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON funding_options;
CREATE POLICY "Public update access" ON funding_options FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public update access" ON goals_items;
CREATE POLICY "Public update access" ON goals_items FOR UPDATE USING (true);