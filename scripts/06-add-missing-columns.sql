-- Add missing columns to salons table
ALTER TABLE salons 
ADD COLUMN IF NOT EXISTS area character varying,
ADD COLUMN IF NOT EXISTS owner_name character varying;

-- Update existing records to have a default status if needed
UPDATE salons SET status = 'pending' WHERE status IS NULL;
