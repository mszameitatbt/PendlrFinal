<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Login-Popup der Startseite (vieles wiederholt sich zu Registrierungspopup, weshalb nun bereits deklariertes kaum mehr kommentiert wird!) -->

<template>
  <div
    v-if="isLoginPopupOpen"
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 400px; color: white; text-align: center;"
  >
    <div class="popup-header">
      <button @click="closePopup" class="close-btn">✖</button>
      <h2>Login</h2>
    </div>
    <!-- E-Mail Eingabe mit sichtbaren zulässigen Format für den Login -->
    <form @submit.prevent="loginUser" class="popup-form">
      <div class="form-group">
        <label for="email">E-Mail:</label>
        <input
          v-model="loginEmail"
          type="email"
          id="email"
          placeholder="Max.Mustermann@uni-bayreuth.de"
          class="form-input"
          style="color: white"
        />
      </div>
      <!-- PW Eingabe mit sichtbaren zulässigen Format für den Login -->
      <div class="form-group">
        <label for="password">Passwort:</label>
        <div style="position: relative">
          <input
            v-model="loginPassword"
            :type="loginPasswordType"
            id="password"
            placeholder="StrengGeheimesPasswort$1975"
            class="form-input"
            style="color: white"
          />
          <!-- Button zum Anzeigen des Passworts -->
          <button
            type="button"
            @click="toggleLoginPasswordVisibility"
            style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; color: white; font-size: 1.2em; cursor: pointer;"
          >
            {{ loginPasswordType === 'password' ? '👁️' : '🙈' }}
          </button>
        </div>
      </div>
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>
import { supabase } from "@/supabaseClient"; 

export default {
  props: {
    isLoginPopupOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      loginPasswordType: 'password',
    };
  },
  methods: {
    closePopup() {
      this.$emit('close-all-popups');
    },
    // Methode zum Anzeigen/Verbergen des Passworts
    toggleLoginPasswordVisibility() {
      this.loginPasswordType = this.loginPasswordType === 'password' ? 'text' : 'password';
    },
    // Methode zum Einloggen des Benutzers
    async loginUser() {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword,
      });

      if (error) {
        console.error("Login-Fehler:", error);
        alert("Fehler beim Login: " + error.message);
        return;
      }

      console.log("Erfolgreich eingeloggt:", user); //nur Konsolen Log, da bei einem Fehler der Nutzer schon darauf hingewiesen wird, dass etwas falsch läuft. So kann er direkt ohne Anklicken vom alert weiter gehen

      // Schließen des Popups und Weiterleitung zur Benutzer-Dashboard-Seite
      this.closePopup();
      this.$nextTick(() => {
        this.$router.push({ name: 'user-dashboard' }); // Weiterleitung zur Benutzer-Dashboard-Seite
      });

      this.$emit('close'); //Event an die übergeordnete Komponente senden
    },
    // Funktion zum Öffnen des Passwort zurücksetzen Popups
    openPasswortPopup() {
      this.$emit('open-passwort-popup');
      this.closePopup();
    },
    
  },
  };
</script>

<style scoped>
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
.form-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 1em;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #008556;
  color: white;
  border: none;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}
.login-btn:hover {
  background-color: #005c3c;
}

a {
color: #ADD8E6 !important; /* Zwingt die helle Blaue Farbe für Links */
}
</style>