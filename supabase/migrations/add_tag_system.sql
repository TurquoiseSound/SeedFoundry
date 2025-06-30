-- Add tag columns to existing tables
ALTER TABLE goals ADD COLUMN tags text[];
ALTER TABLE entity_types ADD COLUMN tags text[];
ALTER TABLE business_models ADD COLUMN tags text[];
ALTER TABLE funding_options ADD COLUMN tags text[];

-- Add compatibility calculation function
CREATE OR REPLACE FUNCTION calculate_compatibility(goal_tags text[], item_tags text[])
RETURNS integer AS $$
DECLARE
    matching_tags integer;
    total_tags integer;
    compatibility_score integer;
BEGIN
    -- Count matching tags
    SELECT array_length(
        ARRAY(SELECT unnest(goal_tags) INTERSECT SELECT unnest(item_tags)), 
        1
    ) INTO matching_tags;
    
    -- Handle null case
    matching_tags := COALESCE(matching_tags, 0);
    
    -- Get total unique tags
    SELECT array_length(
        ARRAY(SELECT DISTINCT unnest(goal_tags || item_tags)), 
        1
    ) INTO total_tags;
    
    -- Calculate compatibility percentage
    IF total_tags > 0 THEN
        compatibility_score := (matching_tags * 100) / total_tags;
    ELSE
        compatibility_score := 0;
    END IF;
    
    -- Ensure minimum score for any match
    IF matching_tags > 0 AND compatibility_score < 20 THEN
        compatibility_score := 20;
    END IF;
    
    RETURN compatibility_score;
END;
$$ LANGUAGE plpgsql;