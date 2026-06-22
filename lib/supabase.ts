import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client (uses the secret/service key — never expose to the browser).
// Returns null if env isn't configured, so routes degrade gracefully instead of crashing.
let _client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  if (!_client) _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
