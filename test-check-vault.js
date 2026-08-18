const { createClient } = require('@supabase/supabase-js')
const _supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5reHp0c2Z1aGdqdmNkc2V1cmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjcxMjE1OSwiZXhwIjoxODgwNTAzMzU5fQ.fake_key_but_we_need_real_one',
) // Wait, we don't have the real service role key locally.
