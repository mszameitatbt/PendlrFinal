<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Registrierungspopup der Startseite-->

<template>
  <!-- Registrierungspopupstyle und erst anzeigen, wenn Methode getriggert wurde -->
  <div
    v-if="isRegisterPopupOpen"
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 400px; color: white; text-align: center;"
  >
    <div class="popup-header">
      <button @click="closePopup" class="close-btn">✖</button>
      <h2>Registrieren</h2>
    </div>
    <form class="popup-form" @submit.prevent="registerUser">
      <!-- E-Mail -->
      <div class="form-group">
        <label for="email">E-Mail:</label>
        <input
          v-model="registerEmail"
          type="email"
          id="email"
          placeholder="Max.Mustermann@uni-bayreuth.de"
          class="form-input"
          style="color: white"
        />
        <!-- Fehlermeldung, wenn E-Mail nicht im richtigen Format -->
        <p v-if="!isEmailValid" style="color: darkorange; font-size: 0.9em; margin-top: 5px;">
          Nur E-Mail-Adressen im folgenden Format erlaubt: Vorname.Nachname@uni-bayreuth.de
        </p>
      </div>

      <!-- Passwort mit verblassten Beispielpasswort, damit die PW Anforderungen für den User klar sind -->
      <div class="form-group">
        <label for="password">Passwort:</label>
        <div style="position: relative">
          <input
            v-model="registerPassword"
            :type="registerPasswordType"
            id="password"
            placeholder="StrengGeheimesPasswort$1975"
            class="form-input"
            style="color: white"
          />
          <!-- Button zum Anzeigen des Passworts -->
          <button
            type="button"
            @click="toggleRegisterPasswordVisibility"
            style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; color: white; font-size: 1.2em; cursor: pointer;"
          >
            {{ registerPasswordType === 'password' ? '👁️' : '🙈' }}
          </button>
          <!-- Passwortanforderungen, welche auch in Superbase festgelegt worden sind -->
        </div>
        <p style="color: darkorange; font-size: 0.9em; margin-top: 5px;">
          Muss enthalten: Mindestens 8 Zeichen, mindestens ein Sonderzeichen, mindestens einen Groß- & Kleinbuchstaben und mindestens eine Zahl.
        </p>
      </div>

      <!-- Passwort Bestätigung -->
      <div class="form-group">
        <label for="confirm-password">Passwort bestätigen:</label>
        <div style="position: relative">
          <input
            v-model="confirmPassword"
            :type="confirmPasswordType"
            id="confirm-password"
            placeholder="Passwort bestätigen"
            class="form-input"
            style="color: white"
          />
          <button
            type="button"
            @click="toggleConfirmPasswordVisibility"
            style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; color: white; font-size: 1.2em; cursor: pointer;"
          >
            {{ confirmPasswordType === 'password' ? '👁️' : '🙈' }}
          </button>
        </div>
      </div>

      <!-- Checkbox für AGB und Datenschutz -->
      <div class="form-group">
        <label>
          <input
            type="checkbox"
            v-model="acceptTerms"
          />
          Ich akzeptiere die <a href="#" @click="openDatenschutzPopup">Datenschutzrichtlinie</a> und die <a href="#" @click="openAGBPopup">AGBs</a>.
        </label>
      </div>

      <button type="submit" @click="$emit('openProfilPage')" class="register-btn">Registrieren</button>
    </form>
  </div>
</template>

<script>
import { supabase } from "@/supabaseClient";
export default {
props: {
  isRegisterPopupOpen: Boolean,
},
emits: ["update:isRegisterPopupOpen"],
data() {
  return {
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
    registerPasswordType: 'password', // Passwort verstecken
    confirmPasswordType: 'password', // Passwort verstecken
    acceptTerms: false,
    isProfilePopupOpen: false, 
  };
},
computed: {
  // Überprüfung, ob die E-Mail-Adresse im richtigen Format ist
  isEmailValid() {
    const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)@uni-bayreuth\.de$/;
    return emailRegex.test(this.registerEmail);
  },
},
methods: {
  // Passwort sichtbar machen
  toggleRegisterPasswordVisibility() {
    this.registerPasswordType = this.registerPasswordType === 'password' ? 'text' : 'password';
  },
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
  },
  // Registrierungsmethode mit Supabase
  async registerUser() {
    // Überprüfung, ob Passwörter übereinstimmen
    if (this.registerPassword !== this.confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    // Überprüfung, ob E-Mail im richtigen Format ist
    if (!this.acceptTerms) {
      alert("Sie müssen die Datenschutzrichtlinie und die AGBs akzeptieren!");
      return;
    }
    // Überprüfung, ob E-Mail bereits existiert
    const { data: existingUser, error: userCheckError } = await supabase
  .from("auth.users") //Supabase Tabelle
  .select("id") //ID des Users
  .eq("email", this.registerEmail)
  .single();
  
  //Konsolen-Befehl, falls Fehler bei der Überprüfung der E-Mail
  if (userCheckError) console.error("Fehler beim Überprüfen der E-Mail:", userCheckError);

  //sichtbare Fehlermeldung im Browser, falls E-Mail bereits existiert
  if (existingUser) {
  alert("Diese E-Mail-Adresse ist bereits registriert!");
  return;
  }
  // Registrierung mit Supabase
const { user, error } = await supabase.auth.signUp({
  email: this.registerEmail,
  password: this.registerPassword,
});
//Sichtbare Fehlermeldung im Browser und in der Konsole, falls Fehler bei der Registrierung
if (error) {
  console.error("Registrierungsfehler:", error);
  alert("Fehler bei der Registrierung: " + error.message);
  return;
}
//Sichtbare Meldung im Brwoser und Konsolen-Befehl, falls neuer Benutzer registriert wurde
console.log("Neuer Benutzer registriert:", user);
alert("Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mails zur Bestätigung.");

    // Registrierungspopup schließen
    this.$emit('update:isRegisterPopupOpen', false);
    

  },
  openDatenschutzPopup() {
    this.$emit('open-datenschutz-popup'); //Event an die übergeordnete Komponente senden
  },
  openAGBPopup() {
    this.$emit('open-agb-popup');
  },
  closePopup() {
    this.$emit('update:isRegisterPopupOpen', false);
  },
},
};
</script>


<style scoped>
/* Zusätzliche Styles für das Layout und Popup */
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
.login-btn, .register-btn {
  width: 100%;
  padding: 10px;
  background-color: #008556;
  color: white;
  border: none;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}
.login-btn:hover, .register-btn:hover {
  background-color: #005c3c;
}

a {
color: #ADD8E6 !important; /* Zwingt die helle Blaue Farbe für Links, damit sie besser sichtbar sind */
}
</style>