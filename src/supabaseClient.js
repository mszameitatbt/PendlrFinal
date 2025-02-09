//<!--Code by Pendlr - Team
//Angepasst von ChatGPT
//Codebeschreibung: Dieser Code repräsentiert den Supabase-Client, der für die Kommunikation mit der Supabase-Datenbank verantwortlich ist. Hier wird der Client erstellt und exportiert, um ihn in anderen Teilen der Anwendung zu verwenden.


import { createClient } from '@supabase/supabase-js';

console.log('Supabase URL:', process.env.VUE_APP_SUPABASE_URL);
console.log('Supabase Key:', process.env.VUE_APP_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL; //befindet sich in der .env Datei
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY; //befindet sich in der .env Datei

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase-Umgebungsvariablen fehlen!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
