import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Variables de entorno de Supabase no encontradas:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Definida' : 'No definida');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Definida' : 'No definida');
  console.error('Asegúrate de crear un archivo .env.local con las credenciales de Supabase');
  throw new Error('Supabase URL y/o Key no están definidos. Revisa el archivo .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
