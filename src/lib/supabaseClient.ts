/**
 * supabaseClient.ts
 * ------------------
 * Initializes and exports the singleton Supabase client for the entire app,
 * typed against the generated Database schema.
 *
 * Environment variables are sourced from .env (Vite exposes vars prefixed
 * with VITE_ to the browser via import.meta.env).
 *
 * Usage:
 *   import { supabase } from '@/lib/supabaseClient';
 *   const { data, error } = await supabase.from('contacts').select('*');
 *
 * Type helpers (re-exported from generated types):
 *   import type { Tables, TablesInsert, Enums } from '@/lib/supabaseClient';
 *   const contact: Tables<'contacts'> = ...
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Re-export generated type helpers for convenience throughout the app
export type { Database } from './database.types';
export type { Tables, TablesInsert, TablesUpdate, Enums } from './database.types';

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
  console.warn(
    '[supabaseClient] VITE_SUPABASE_ANON_KEY is not set. ' +
    'All Supabase requests will fail until the key is provided in .env.'
  );
}

// ── Typed client singleton ──────────────────────────────────────────────────────

export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
