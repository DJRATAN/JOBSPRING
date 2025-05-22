import { createClient } from '@supabase/supabase-js'

const superbaseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL;
const superbaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY;
// Create a single supabase client for interacting with your database
export const supabase = createClient(
    superbaseUrl,
    superbaseAnonKey
)