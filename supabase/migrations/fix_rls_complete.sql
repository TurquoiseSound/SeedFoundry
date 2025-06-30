-- Fix RLS Security Issues - Complete Version
-- Enable RLS on junction tables that were missing it

ALTER TABLE entity_business_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_funding_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_funding_options ENABLE ROW LEVEL SECURITY;

-- Create public read policies for junction tables
CREATE POLICY "Public read access" ON entity_business_models FOR SELECT USING (true);
CREATE POLICY "Public read access" ON entity_funding_options FOR SELECT USING (true);
CREATE POLICY "Public read access" ON business_funding_options FOR SELECT USING (true);

-- Add INSERT policies for data migration (main tables)
CREATE POLICY "Public insert access" ON goals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON entity_types FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON business_models FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON funding_options FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON goals_items FOR INSERT WITH CHECK (true);

-- Add INSERT policies for junction tables
CREATE POLICY "Public insert access" ON entity_business_models FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON entity_funding_options FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON business_funding_options FOR INSERT WITH CHECK (true);

-- Add UPDATE policies for data migration
CREATE POLICY "Public update access" ON goals FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON entity_types FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON business_models FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON funding_options FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON goals_items FOR UPDATE USING (true);