// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://acrweluvtmfkqrfkvtgl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcndlbHV2dG1ma3FyZmt2dGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzY4MDAsImV4cCI6MjAyNTI1MjgwMH0.6MjA1ODc1NDM1OX0.5MBhsNCQhBMR2xyERzZMkT0G_jRRawvIRlNNOWXZU4'
);

export { supabase };