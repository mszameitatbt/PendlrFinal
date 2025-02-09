<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das ProfilPopup, welches eine Komponente vom Dashboard ist! Sofern nicht explizit kommentiert, ist der Stil gleich den außerhalb vom Dashboard-Ordner sich befindenden Popups, da der Stil oft gleich bleibt! (Achtung: Aufgrund neuer Datenbank gibt es kein Datenbanktracking mehr damit! Funktion könnte nur temporär zur Verfügung stehen!) -->

<template>
  <div
    v-if="isPopupOpen"
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
  >
    <div class="popup-header">
      <button @click="closePopup" class="close-btn">✖</button>
      <h2>Benutzerprofil</h2>
    </div>
  
    <hr />
  
    <!-- Profilbild -->
    <div class="profile-picture">
      <img :src="profile.picturePreview || placeholderImage" alt="Profilbild" />
    </div>
    <input 
      type="file" 
      id="profile-picture-upload" 
      @change="handleImageUpload"
      style="display: none"
    />
    <button 
      @click="triggerImageUpload" 
      class="upload-btn"
    >
      Neues Profilbild hochladen
    </button>
  
    <hr class="profile-section-divider" /> <!-- Trennlinie -->
  
    <v-form>
    <!-- Name mit max. 10 Zeichen um Imitationen von anderen Personen zu verhindern und um allgemeines Abusing zu verhindern -->
    <v-text-field
      v-model="profile.name"
      label="Username"
      required
      :rules="[nameRule]"
      maxlength="10"
      class="form-input"
    />
    <p style="color: darkorange; font-size: 0.9em; margin-top: -20px;">
    Unter diesem Namen wird Ihr Profil anderen Personen der Plattform angezeigt! Maximal 10 Zeichen erlaubt.
    </p>

    <!-- Alter -->
    <v-select
      v-model="profile.age"
      :items="ageOptions"
      label="Alter"
      required
      class="form-input"
    />

    <!-- Wohnort -->
    <v-text-field
      v-model="profile.location"
      label="Wohnort"
      required
      class="form-input"
    />

    <!-- Geschlecht -->
    <v-select
      v-model="profile.gender"
      :items="genderOptions"
      label="Geschlecht"
      required
      class="form-input"
    />

    <!-- Campus -->
    <v-select
      v-model="profile.campus"
      :items="campusOptions"
      label="Campus"
      required
      class="form-input"
    />

    <!-- Rolle -->
    <v-select
      v-model="profile.role"
      :items="roleOptions"
      label="Rolle"
      required
      class="form-input"
    />

    <!-- Fahrzeug. Das ist jedoch optional. Beim Ausfüllen öffnen sich alle anderen-->
    <v-text-field
      v-model="profile.vehicle"
      label="Dein Fahrzeug"
      @input="vehicleInput"
      class="form-input"
    />
    <p style="color: darkorange; font-size: 0.9em; margin-top: -20px;">
    Sofern Sie kein Fahrzeug besitzen und nur Mitfahrgelegenheiten suchen, lassen Sie dieses Feld leer.
    </p>
    
    <!-- Felder, die nur angezeigt werden, wenn das Fahrzeug ausgefüllt ist -->
     <!-- Farbe des Autos -->
    <v-row v-if="isVehicleFilled">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="profile.color"
          label="Farbe"
          required
          class="form-input"
        />
      <!-- Kraftstoff des Autos; gewünscht von Prof. Dr. Tittlbach für spätere analytische Auswertungen -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.fuel"
          :items="fuelOptions"
          label="Kraftstoff"
          required
          class="form-input"
        />
      <!-- Anzahl der Türen des Autos, um eventuelle Misskommunikation und Platzhindernisse direkt zu vermeiden -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.doors"
          :items="doorOptions"
          label="Anzahl an Türen"
          required
          class="form-input"
        />
      <!-- Kofferraumplatz des Autos, um eventuelle Platzprobleme direkt zu vermeiden -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.trunkSpace"
          :items="yesNoOptions"
          label="Kofferraumplatz vorhanden?"
          required
          class="form-input"
        />
      <!-- Klimaanlage des Autos, um eventuelle Klimaprobleme direkt zu vermeiden -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.airConditioning"
          :items="yesNoOptions"
          label="Klimaanalage funktionsfähig?"
          required
          class="form-input"
        />
      <!-- Rauchen erlaubt? -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.smokingAllowed"
          :items="yesNoOptions"
          label="Rauchen erlaubt?"
          required
          class="form-input"
        />
      <!-- Tiere erlaubt? -->
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="profile.petsAllowed"
          :items="yesNoOptions"
          label="Tiere erlaubt?"
          required
          class="form-input"
        />
      <!-- Musikpräferenz des Fahrers, denn Nonstop Schlagerparadies ist für manche Menschen eine Qual ;) -->
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="profile.musicPreference"
          label="Welche Musik/Radiosender hörst du am liebsten?"
          required
          class="form-input"
        />
      </v-col>
    </v-row>

    <!-- Profil speichern Button -->
    <v-btn type="submit" :disabled="!isFormValid" @click="created" class="form-btn">Profil speichern</v-btn>
  </v-form>
</div>
</template>

<script>
import { supabase } from "@/supabaseClient"; 

export default {
name: 'UserProfile',
props: {
  isPopupOpen: Boolean,
},
data() {
  return {
    profile: {
      name: '',
      age: null,
      location: '',
      gender: null,
      vehicle: '',
      fuel: null,
      color: '',
      doors: null,
      trunkSpace: null,
      airConditioning: null,
      smokingAllowed: null,
      petsAllowed: null,
      musicPreference: '',
      picture: null, // Das hochgeladene Bild
      picturePreview: null, // Vorschau des Bildes
    },
    // Ausfüllregeln 
    nameRule: value => !!value || 'Name ist erforderlich.',
    ageOptions: ['U18', '18 - 30', '31 - 40', '41 - 50', '51 - 60', 'Ü60'], // Optionen für Alter
    genderOptions: ['Männlich', 'Weiblich', 'Divers'],
    campusOptions: ['Bayreuth', 'AS in Bayreuth', 'Kulmbach', 'AS in Thurnau', 'AS in Wallenfels'], // Optionen für Campus
    roleOptions: ['Beschäftigte', 'Studierende'], // Optionen für Rolle
    fuelOptions: ['Benzin', 'Diesel', 'Elektro', 'Hybrid', 'andere Kraftstoffe'],
    doorOptions: ['2', '3', '4', '5'],
    yesNoOptions: ['Ja', 'Nein'],
    isVehicleFilled: false,  // Kontrolliert, ob das Fahrzeugfeld ausgefüllt ist
    isProfilePopupOpen: true,  // Steuert das Öffnen des Profilerstellungs-Popups
  };
},
computed: {
  isFormValid() {
    return (
      this.profile.name &&
      this.profile.age &&
      this.profile.location &&
      this.profile.gender &&
      this.profile.campus &&
      this.profile.role &&
      (this.profile.vehicle ? this.isAllVehicleFieldsValid() : true)
    );
  },
},
  methods: {
    closePopup() {
      this.$emit("close");
    },
    //Profil erstellen und speichern --> Ausgiebige Überprüfung in der Konsole, da nach frischer Datenbank plötzlich es nicht mehr speichert
    async created() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
       console.error("Fehler beim Abrufen der Session:", error.message);
       return;
      }

      const user = data?.session?.user;

      if (user) {
       this.userId = user.id; // Setze die User-ID für das Profil

       // Überprüfen, ob der Benutzer bereits ein Profil hat
      const { data: existingProfile, error: profileError } = await supabase
       .from("auth.profiles")
       .select("*")
       .eq("user_id", this.userId)
       .single();

      if (profileError) {
        console.error("Fehler beim Abrufen des Profils:", profileError.message);
       return;
      }

      if (existingProfile) {
       this.profile = { ...existingProfile };
       console.log("Profil gefunden:", existingProfile);
     } else {
       console.log("Kein Profil gefunden, neues Profil erstellen");
     }
     } else {
       console.error("Benutzer nicht eingeloggt.");
      }
    },

  // Profilbild ändern
  onProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.profile.picture = file; // Speichere die Datei
      const reader = new FileReader();
      reader.onload = e => {
        this.profile.picturePreview = e.target.result; // Vorschau des Bildes anzeigen
      };
      reader.readAsDataURL(file);
    }
  },
  // Wenn Auto eingebegebn wird, dann bleibt das Feld nicht leer
  vehicleInput() {
    this.isVehicleFilled = this.profile.vehicle !== '';
  },
  // Alle Fahrzeugattribute
  isAllVehicleFieldsValid() {
    return (
      this.profile.color &&
      this.profile.doors &&
      this.profile.trunkSpace &&
      this.profile.airConditioning &&
      this.profile.smokingAllowed &&
      this.profile.petsAllowed &&
      this.profile.musicPreference
    );
  },
  // Profil speichern
  submitProfile() {
    alert('Profil gespeichert!');
  },

  // Profilbild hochladen beim Klick vom Benutzer
    triggerImageUpload() {
      // Klick auf den Button öffnet den Datei-Dialog
      document.getElementById("profile-picture-upload").click();
    },
    // Bildvorschau anzeigen
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profile.picturePreview = reader.result;
        };
        reader.readAsDataURL(file); // Bild als Data URL laden
      }
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

.profile-picture img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px auto;
  display: block;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

.editable-fields {
  text-align: left;
  margin-bottom: 0; /* Entfernt den Abstand nach unten */
  position: relative;
}

.edit-icon {
  font-size: 1.2em;
  cursor: pointer;
  color: white;
  position: absolute;
  right: 10px;
  top: 0;
}

.edit-icon:hover {
  color: #ff9900;
}

.input-field {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
  margin-bottom: 10px;
}

.input-field:focus {
  outline: none;
  border-color: #66b89f;
}

.editing {
  font-weight: bold;
  color: white;
}

.upload-btn {
  background-color: #008556;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
}

.upload-btn:hover {
  background-color: #006d4c;
}

.profile-section-divider {
  margin-top: 10px; /* Weniger Abstand zu den anderen Abschnitten */
}

.save-btn {
  margin-top: 20px;
}

.save-btn:hover {
  background-color: #006d4c;
}
/* Profilbild spezifische Styles */
.profile-picture {
margin-bottom: 20px;
}
.profile-picture-label {
display: block;
margin-bottom: 10px;
color: white;
font-weight: bold;
}
.profile-picture-input {
display: block;
margin-bottom: 10px;
}
.picture-preview img {
max-width: 100px;
max-height: 100px;
border-radius: 50%;
margin-top: 10px;
}
.back-btn {
background: none;
border: none;
color: white;
font-size: 2em; /* Größe des Pfeils */
cursor: pointer;
padding: 15px; /* Vergrößert den Klickbereich */
width: 60px; /* Breite des Buttons */
height: 60px; /* Höhe des Buttons */
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%; /* Rundes Design */
transition: background-color 0.3s ease; /* Sanfter Hover-Effekt */
}

.back-btn:hover {
background-color: rgba(255, 255, 255, 0.2); /* Hover-Hintergrund */
}

.form-btn {
width: 100%;
padding: 10px;
height: 50px;
background-color: #008556;
color: white;
border: none;
font-size: 1.5em;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

/* Hover-Effekt */
.form-btn:hover {
background-color: #005c3c; /* Farbe beim Hover */
}

/* Wenn der Button deaktiviert ist */
.form-btn:disabled {
background-color: #66b89f; /* Farbe für deaktivierten Zustand */
cursor: not-allowed;
}

a {
color: #ADD8E6 !important; /* Zwingt die helle Blaue Farbe der Links */
}
</style>