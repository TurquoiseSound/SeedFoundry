-- Temporarily disable RLS for data migration
ALTER TABLE goals DISABLE ROW LEVEL SECURITY;
ALTER TABLE entity_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE business_models DISABLE ROW LEVEL SECURITY;
ALTER TABLE funding_options DISABLE ROW LEVEL SECURITY;
ALTER TABLE goals_items DISABLE ROW LEVEL SECURITY;

-- Note: Run this first, then populate data, then run the re-enable script