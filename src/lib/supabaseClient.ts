/**
 * supabaseClient.ts
 * ------------------
 * Initializes and exports the singleton Supabase client for the entire app.
 *
 * Environment variables are sourced from .env (Vite exposes vars prefixed
 * with VITE_ to the browser via import.meta.env).
 *
 * Usage:
 *   import { supabase } from '@/lib/supabaseClient';
 *   const { data, error } = await supabase.from('contacts').select('*');
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ── Environment variable validation ────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl) {
  throw new Error(
    '[supabaseClient] VITE_SUPABASE_URL is not set. ' +
    'Add it to your .env file and restart the dev server.'
  );
}

if (!supabaseAnonKey) {
  // Warn in dev so the app still boots during initial setup; will fail at
  // runtime on any authenticated request.
  console.warn(
    '[supabaseClient] VITE_SUPABASE_ANON_KEY is not set. ' +
    'All Supabase requests will fail until the key is provided in .env.'
  );
}

// ── Client singleton ────────────────────────────────────────────────────────────

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey ?? '', {
  auth: {
    // Persist the session in localStorage so the user stays logged in
    // across page refreshes.
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ── Convenience type re-exports (extend as you add generated DB types) ──────────

// Once you run `supabase gen types typescript`, replace `Database` below with
// the generated type and pass it as a generic to createClient<Database>().
//
// Example:
//   import { Database } from '@/types/supabase';
//   export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
