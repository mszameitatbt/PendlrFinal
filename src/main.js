//<!--Code by Pendlr - Team
//Angepasst von ChatGPT
// Codebeschreibung: Dieser Code repräsentiert den Backbone und erstellt unter anderem die App an sich, sowie die Einbindung von notwendigen Komponenten wie den Router und den Store. Hier wird auch der Supabase-Client bereitgestellt.

import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';  // Füge den Router hier hinzu
import { supabase } from './supabaseClient'; // Der zuvor erstellte Client
import store from './store'; // Importiere deinen Vuex Store

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)  // Hier registrierst du den Router
  .use(store) // Hier registrierst du den Store
  .provide('supabase', supabase) // Hier stellst du den Client bereit
  .mount('#app');

  