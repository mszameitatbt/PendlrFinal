//<!--Code by Pendlr - Team
// Angepasst von ChatGPT
// Codebeschreibung: Dieser Code repräsentiert den Router, welcher für die Webseiteweiterleitungen verantwortlich ist -->

import { createRouter, createWebHistory } from 'vue-router';

// Importiere Komponenten
import UserDashboard from './UserDashboard.vue';
import Map from './Map.vue';
import PendlrProfiles from './Matching.vue';
import { supabase } from './supabaseClient';

// Funktion, um den Authentifizierungsstatus zu überprüfen, damit kein Benutzer ohne Anmeldung auf die geschützten Routen zugreifen kann
async function checkAuthStatus(to, from, next) {
  const { data: { user }, error } = await supabase.auth.getUser();
  //Die Route nach login gibt es nicht, jedoch wird der Benutzer einfach zur Startseite weitergeleitet, was im weitesten Sinne auch einer Login Seite gleicht :)
  if (error) {
    console.error('Fehler beim Abrufen des Benutzers:', error.message);
    next({ name: 'login' }); // Bei einem Fehler zur Login-Seite weiterleiten
  } else if (user) {
    next(); // Benutzer ist eingeloggt, weiter zur gewünschten Route
  } else {
    next({ name: 'login' }); // Benutzer ist nicht eingeloggt, zur Login-Seite weiterleiten
  }
}


const routes = [
  
  
  {
    path: '/dashboard',
    name: 'user-dashboard',
    component: UserDashboard,
    beforeEnter: checkAuthStatus
  },

  {
    path: '/map',
    name: 'map-component',
    component: Map,
    beforeEnter: checkAuthStatus
  },

  {
    path: '/matching',
    name: 'pendlr-profiles',
    component: PendlrProfiles,
    beforeEnter: checkAuthStatus
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
