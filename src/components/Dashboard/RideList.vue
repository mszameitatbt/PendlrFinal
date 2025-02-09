<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräseniert die Fahrtenliste mit Verifizierung und Storno! Achtung: Durch Datenbankwechsel auf eine alte, analoge Version zurückgegriffen! -->

<template>
    <div v-if="isOpen" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;">
      
      <div class="popup-header">
        <button @click="closePopup()" class="back-btn">←</button>
        <h2>Meine Fahrten</h2>
      </div>
      
      <!-- Tabs -->
      <v-tabs v-model="activeTab" background-color="teal" dark>
        <v-tab>Beifahrer</v-tab>
        <v-tab>Fahrer</v-tab>
      </v-tabs>
    
      <!-- Beifahrer Tab Inhalt -->
      <v-tab-item v-if="activeTab === 0">
        <div class="tab-content">
          <h2>Beifahrer Übersicht</h2>
          <!-- Beifahrer Fahrten -->
          <ul>
            <li v-for="ride in passengerRides" :key="ride.id" style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 10px 0;">
              <p>
                Start: {{ ride.start }} - Ziel: {{ ride.destination }} - Zeit: {{ ride.time }} Uhr 
               - <v-icon small>mdi-account</v-icon> {{ ride.passengersCount }}
                <span v-if="ride.cancelled" style="color: red; font-weight: bold;">- Storniert</span>
              </p>
  
              <!-- Button zum Stornieren -->
              <button v-if="!ride.cancelled" @click="cancelRide(ride.id)" class="cancel-btn">Stornieren</button>
            </li>
          </ul>
        </div>
      </v-tab-item>
    
      <!-- Fahrer Tab Inhalt -->
      <v-tab-item v-if="activeTab === 1">
        <div class="tab-content">
            <h2>Fahrer Übersicht</h2>
          <ul>
            <li v-for="ride in rides" :key="ride.id" style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 10px 0;">
              <p>
                Start: {{ ride.start }} - Ziel: {{ ride.destination }} - Zeit: {{ ride.time }} Uhr
                <span v-if="ride.verified" style="color: green;">✔ Verifiziert</span>
                <span v-else style="color: red;">✘ Nicht verifiziert</span>
                <span v-if="ride.cancelled" style="color: red; font-weight: bold;">- Storniert</span>
              </p>

              <!-- Wenn die Fahrt noch nicht verifiziert und nicht storniert ist: -->
              <div v-if="!ride.verified && !ride.cancelled">
                    <!-- Falls noch kein Formular für diese Fahrt aktiv ist -->
                    <button
                      v-if="activeVerificationRideId !== ride.id"
                      @click="startVerification(ride.id)"
                      class="verify-btn"
                    >
                      Verifizieren
                    </button>
  
                    <!-- Wenn das Formular für diese Fahrt aktiv ist -->
                    <div v-else class="verify-form" style="margin-top: 10px; color: white;">
                      <input type="number" v-model.number="verificationKilometers" 
                      placeholder="Kilometer" style="margin-bottom: 5px; width: 80%; padding: 5px; color: white;"/>
                      <input type="number" v-model.number="verificationPersons" placeholder="Personenanzahl" style="margin-bottom: 5px; width: 80%; padding: 5px; color: white;" />
                      <button @click="confirmVerification(ride.id)" class="verify-btn">Bestätigen</button>
                      <div v-if="verificationError" style="color: red; margin-top: 5px;">{{ verificationError }}</div>
                    </div>
                  </div>
  
              <!-- Button zum Stornieren -->
              <button v-if="!ride.cancelled && !ride.verified" @click="cancelRide(ride.id)" class="cancel-btn">Stornieren</button>
            </li>
          </ul>
        </div>
      </v-tab-item>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'RideListPopup',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        activeTab: 1, // Standard auf den "Fahrer" Tab setzen
        rides: [
          {
            id: 1,
            start: 'Bayreuth Uni',
            destination: 'Markgräfliches Opernhaus Bayreuth',
            time: '10:00',
            verified: false,
            cancelled: false,
          },
          {
            id: 2,
            start: 'Bayreuth Uni',
            destination: 'Eremitage Bayreuth',
            time: '14:30',
            verified: false,
            cancelled: false,
          },
          {
            id: 3,
            start: 'Campus Kulmbach',
            destination: 'Bayreuth Uni',
            time: '17:00',
            verified: true,
            cancelled: false,
          }
        ], 
          // Für die Verifizierung
      activeVerificationRideId: null,
      verificationKilometers: '',
      verificationPersons: '',
      verificationError: '',
        passengerRides: [
          {
            id: 4,
            start: 'Bayreuth Uni',
            destination: 'St. Georgen Campus',
            time: '11:00',
            passengersCount: 2,
            cancelled: false,
          },
          {
            id: 5,
            start: 'Bayreuth Uni',
            destination: 'Opernhaus Bayreuth',
            time: '13:00',
            passengersCount: 5,
            cancelled: false,
          },
          {
            id: 6,
            start: 'Markgräfliches Opernhaus',
            destination: 'Campus Kulmbach',
            time: '15:00',
            passengersCount: 9,
            cancelled: false,
          }
        ], // Beispielhafte Fahrten für Beifahrer
      };
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
      startVerification(rideId) {
      // Setze das aktive Verifizierungsformular für diese Fahrt und lösche alte Werte
      this.activeVerificationRideId = rideId;
      this.verificationKilometers = '';
      this.verificationPersons = '';
      this.verificationError = '';
    },
    confirmVerification(rideId) {
      // Validierung: Kilometer > 0 und Personenanzahl > 1
      if (this.verificationKilometers <= 0) {
        this.verificationError = 'Kilometer müssen größer als 0 sein.';
        return;
      }
      if (this.verificationPersons <= 1 || this.verificationPersons >10) {
        this.verificationError = 'Die Personenanzahl muss größer als 1 und kleiner als 10 sein.';
        return;
      }
      // Falls gültig: markiere die Fahrt als verifiziert und schließe das Formular
      const ride = this.rides.find(r => r.id === rideId);
      if (ride) {
        ride.verified = true;
        ride.kilometers = this.verificationKilometers;
        ride.totalPersons = this.verificationPersons;
      }
      this.activeVerificationRideId = null;
    },

      cancelRide(id) {
        // Findet die Fahrt in der jeweiligen Liste und setzt den Status auf "storniert"
        const ride = this.rides.find((r) => r.id === id);
        if (ride) {
          ride.cancelled = true; // Setze den Status der Fahrt auf "storniert"
        }
  
        const passengerRide = this.passengerRides.find((r) => r.id === id);
        if (passengerRide) {
          passengerRide.cancelled = true; // Setze den Status der Fahrt auf "storniert"
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
    background-color: #008556;
  }
  
  .v-tab {
    font-size: 1.2em;
    cursor: pointer;
  }
  
  .v-tab:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .v-tab-item {
    margin-top: 20px;
  }
  
  .tab-content {
    text-align: center;
    margin-top: 20px;
  }
  
  button {
    margin-top: 5px;
    padding: 5px 10px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Spezifisches Styling für den Verifizieren-Button */
  .verify-btn {
    margin-top: 5px;
    padding: 5px 10px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .verify-btn:hover {
    background-color: darkgreen;
  }
  
  /* Spezifisches Styling für den Stornieren-Button */
  .cancel-btn {
    margin-top: 5px;
    padding: 5px 10px;
    color: white;
    border: 1px solid red;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-btn:hover {
    background-color: red;
  }
  
  /* Zurück-Button */
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
  </style>
  