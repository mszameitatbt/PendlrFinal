<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Einstellungspopup vom Dashboard -->

<template>
    <div
      v-if="isOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="close" class="close-btn">✖</button>
        <h2>Einstellungen</h2>
      </div>
      <h1>App-Einstellungen</h1>
      <hr />
      <br />
      <!-- Statistiken Button -->
      <div style="display: flex; justify-content: center; gap: 15px">
        <v-btn
          @click="$emit('openStatistics')"
          style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkgreen; width: 100%; display: flex; align-items: center;"
        >
          Meine Statistiken
        </v-btn>
      </div>

      <br />
      <!-- RideList Button -->
      <div style="display: flex; justify-content: center; gap: 15px">
        <v-btn
          @click="$emit('openRideList')"
          style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkgreen; width: 100%; display: flex; align-items: center;"
        >
          Meine Fahrten
        </v-btn>
      </div>

      <br />
      <!-- Abmelden -->
      <div style="display: flex; justify-content: center; gap: 15px">
        <v-btn
          @click="logoutUser"
          style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkred; width: 100%; display: flex; align-items: center;"
        >
          Abmelden
        </v-btn>
      </div>

      <br />
      <!-- Profil löschen -->
      <div style="display: flex; justify-content: center; gap: 15px">
        <v-btn
        @click="deleteProfile"
          style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkred; width: 100%; display: flex; align-items: center;"
        >
          Profil löschen
        </v-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { supabase } from "@/supabaseClient";

  export default {
    name: "MySettings",
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit("close");
      },
      async logoutUser() {
      // Benutzer abmelden
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Abmeldefehler:", error.message);
        alert("Fehler beim Abmelden: " + error.message);
      } else {
        alert("Erfolgreich abgemeldet!");
        this.$router.push("login");
      }
    },
    //Profil löschen
    async deleteProfile() {
    if (confirm("Bist du dir sicher, dass du Pendlr verlassen möchtest?")) {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Fehler beim Abrufen der Session:", sessionError.message);
      alert("Fehler beim Abrufen der Session.");
      return;
    }
    const userId = session?.user?.id;
    if (!userId) {
      alert("Kein Benutzer gefunden.");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Fehler beim Löschen des Profils:", error.message);
      alert("Fehler beim Löschen des Profils: " + error.message);
      return;
    }
    alert("Profil erfolgreich gelöscht. Du wirst abgemeldet.");
    await this.logoutUser();
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
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  </style>
  