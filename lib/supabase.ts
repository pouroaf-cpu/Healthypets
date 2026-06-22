import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Uses the PUBLISHABLE/anon key only — NEVER the service key. The hp_ tables have
// insert-only RLS, so this key can only add signups/clicks and can't read or touch
// any other (e.g. injectbuddy) data, even if it leaked.
// Returns null if env isn't configured, so routes degrade gracefully instead of crashing.
let _client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY; // publishable/anon key ONLY
  if (!url || !key) return null;
  if (!_client) _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
