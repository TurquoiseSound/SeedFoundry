-- Fix RLS Security Issues
-- Enable RLS on junction tables that were missing it

ALTER TABLE entity_business_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_funding_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_funding_options ENABLE ROW LEVEL SECURITY;

-- Create public read policies for junction tables
CREATE POLICY "Public read access" ON entity_business_models FOR SELECT USING (true);
CREATE POLICY "Public read access" ON entity_funding_options FOR SELECT USING (true);
CREATE POLICY "Public read access" ON business_funding_options FOR SELECT USING (true);

-- Optional: Add admin policies for managing data
-- Uncomment these if you need to manage data through the app
-- CREATE POLICY "Admin full access" ON entity_business_models FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access" ON entity_funding_options FOR ALL USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin full access" ON business_funding_options FOR ALL USING (auth.role() = 'authenticated');