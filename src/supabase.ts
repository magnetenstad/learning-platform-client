import { createClient } from '@supabase/supabase-js'
import { Database } from './types/supabase'

const SUPABASE_URL = 'https://tloozckwxuycratyaohl.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsb296Y2t3eHV5Y3JhdHlhb2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NDM0MjIsImV4cCI6MjAwNjExOTQyMn0.HVQ6rl8HciiQ2cbLnjBTz1cf-MqDFn8IUDr1gmBIhlQ'

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
