-- 1. Track the creator's unlock progress and dynamic fee
ALTER TABLE profiles 
ADD COLUMN platform_fee_percent INTEGER DEFAULT 20,
ADD COLUMN waitlist_goal_reached BOOLEAN DEFAULT false;

-- 2. Create the waitlist subscribers table
CREATE TABLE creator_waitlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    fan_email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(creator_id, fan_email) -- Prevent duplicate signups for the same creator
);

-- Enable RLS
ALTER TABLE creator_waitlists ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can insert (public fans signing up)
CREATE POLICY "Public fans can join waitlists" 
ON creator_waitlists FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Policy: Creators can only read their own waitlist data
CREATE POLICY "Creators can view their own subscribers" 
ON creator_waitlists FOR SELECT 
TO authenticated 
USING (auth.uid() = creator_id);

-- 5. THE MAGIC TRIGGER: Automatically unlock lower fees at 50 subs
CREATE OR REPLACE FUNCTION check_waitlist_milestone()
RETURNS TRIGGER AS $$
DECLARE
    sub_count INTEGER;
BEGIN
    SELECT count(*) INTO sub_count 
    FROM creator_waitlists 
    WHERE creator_id = NEW.creator_id;

    IF sub_count >= 50 THEN
        UPDATE profiles 
        SET platform_fee_percent = 10, waitlist_goal_reached = true 
        WHERE id = NEW.creator_id AND waitlist_goal_reached = false;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_waitlist_signup
AFTER INSERT ON creator_waitlists
FOR EACH ROW
EXECUTE FUNCTION check_waitlist_milestone();