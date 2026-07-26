-- Add missing Mux integration columns to content table
ALTER TABLE public.content 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'processing',
ADD COLUMN IF NOT EXISTS mux_asset_id TEXT;
