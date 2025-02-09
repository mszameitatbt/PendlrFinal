<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert die Statistik Seite des Einstellungsmenüs vom Dashboard! Achtung: Aufgrund von Datenbankwechsel haben wir eine only anloge Variante eingebaut! (Funktion auch wegnommen, dass es pro Verifizierung eine Gutschrift von 166g auf einen Personenkilometer gibt (hierbei Personenanzahl - 1, da man sonst für den Fahrer eins zu viel rechnet!), da dies nur sinnvoll mit entsprechender Userverifizierung, also einer Datenbank, ist)-->

<template>
    <div
      v-if="isOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closePopup()" class="back-btn">←</button>
        <h2>Meine Statistiken</h2>
      </div>
  
      <!-- Tabs für Sparmission und Bewertung -->
      <v-tabs v-model="activeTab" background-color="teal" dark>
        <v-tab>Sparmission</v-tab>
        <v-tab>Bewertung</v-tab>
      </v-tabs>
  
      <!-- CO2-Abdruck Tab Inhalt -->
      <v-tab-item v-if="activeTab === 0">
        <div class="tab-content">
          <p>Sparmission</p>
  
          <!-- Balken für CO2-Abdruck -->
          <div
            style="width: 100%; height: 20px; background-color: #B0BEC5; border-radius: 10px; margin: 20px 0;"
          >
            <div
              :style="{
                width: computedCo2Percentage + '%',
                height: '100%',
                backgroundColor: computedCo2Percentage >= 100 ? 'gold' : '#4CAF50',
                borderRadius: '10px 0 0 10px'
              }"
            ></div>
          </div>
          <p>{{ computedCo2Percentage }}% Schadstoffemissionen eingespart!</p>
  
          <!-- Button erscheint bei 100% CO2-Einsparung -->
          <button
            v-if="computedCo2Percentage === 100"
            class="gift-button"
            @click="orderGift"
          >
            Jetzt eine Prämie Ihrer Wahl einlösen!
          </button>
  
          <!-- Liste mit Einsparungen und Prämien -->
          <div style="margin-top: 20px; text-align: left;">
            <p><strong>Insgesamt eingespart:</strong> {{ totalCo2Saved }} kg Schadstoffemissionen</p>
            <p><strong>Prämien verdient:</strong> {{ totalPrizesEarned }} </p>
          </div>
        </div>
      </v-tab-item>
  
      <!-- Bewertung Tab Inhalt -->
      <v-tab-item v-if="activeTab === 1">
        <div class="tab-content">
          <p>Bewertung des Fahrers</p>
  
          <!-- 5 Sterne Bewertungssystem -->
          <div class="stars-container">
            <span
              v-for="index in 5"
              :key="index"
              class="star"
              :class="{
                'filled': index <= Math.floor(averageRating),
                'half-filled': index === Math.ceil(averageRating) && !Number.isInteger(averageRating),
              }"
            >&#9733;</span>
          </div>
          <!-- Anzahl von Bewertungen -->
          <div class="rating-info">
            <p><strong>So viele haben mich bewertet:</strong> {{ totalDriverRatings }}</p>
            <p><strong>So viele habe ich bereits bewertet:</strong> {{ totalUserRatings }}</p>
          </div>
        </div>
      </v-tab-item>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyStatisticsPopup',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        activeTab: 0, // Der aktive Tab (0 für CO2-Abdruck, 1 für Bewertung)
        co2Saved: 42, // Emmissions Einsparung in kg (für 250 km )
        targetCo2: 42, // Ziel-CO2-Einsparung (42 kg)
        totalCo2Saved: 0, // Gesamt CO2 Einsparung über alle Sitzungen hinweg
        totalPrizesEarned: 0, // Anzahl der verdienten Prämien 
        totalDriverRatings: 12, // Anzahl der Bewertungen, die der Fahrer erhalten hat (4x3 Sterne + 8x5 Sterne)
        totalUserRatings: 5, // Anzahl der Bewertungen, die der Benutzer abgegeben hat
        ratings: [3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5], // Bewertungen des Fahrers
      };
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
      orderGift() {
        alert('Prämie wurde eingelöst!'); // Dies könnte später durch eine echte Aktion ersetzt werden
        this.totalPrizesEarned += 1; // Eine Prämie verdient
        this.totalCo2Saved += this.co2Saved; // CO2-Einsparung der aktuellen Sitzung zur Gesamt-Einsparung hinzufügen
        this.co2Saved = 0; // Reset der aktuellen CO2-Einsparung nach Prämie
      },
    },
    computed: {
      // Berechnet den CO2-Anteil basierend auf der CO2-Einsparung
      computedCo2Percentage() {
        const co2Percentage = (this.co2Saved / this.targetCo2) * 100;
        return Math.min(co2Percentage, 100); // Verhindert, dass der Wert über 100% geht
      },
      // Berechnet den Durchschnitt der Bewertungen
      averageRating() {
        const totalRating = this.ratings.reduce((sum, rating) => sum + rating, 0);
        return totalRating / this.ratings.length; // Durchschnitt der Bewertungen
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
  
  .gift-button {
    margin-top: 20px;
    background-color: #008556;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.2em;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .gift-button:hover {
    background-color: darkgoldenrod;
  }
  
  /* Sterne-Styling */
  .stars-container {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  
  .star {
    font-size: 2em;
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
  }
  
  .star.half-filled {
    color: gold;
    background: linear-gradient(90deg, gold 50%, #ccc 50%);
  }
  
  .rating-info {
    margin-top: 20px;
    text-align: left;
    font-size: 1em;
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
  </style>
  