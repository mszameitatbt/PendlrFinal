<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Ich Fahre Popup der Dashboard Komponente -->

<template>
    <div v-if="isFahrePopupOpen" class="search-popup">
      <!-- Popup Header -->
      <div class="popup-header">
        <button @click="closeFahrePopup" class="close-btn">✖</button>
        <p class="popup-title">FAHRE</p>
         <!-- Der button ist dafür da, dass der User nur weiter kann, wenn er das entsprechende Format auch erfüllt -->
        <button
          :disabled="isDateInvalid || isTimeInvalid || isPassengersInvalid"
          class="submit-btn"
          @click="submitSearch"
        >➔ Weiter</button>
      </div>
  
      <!-- Popup Body -->
      <div class="popup-body">
        <!-- Kalender -->
        <div>
          <vue-cal
            style="height: 250px;"
            @cell-click="onDateSelected"
            :selected-date="manualDateInput"
            theme="dark"
          />
        </div>
  
        <!-- Eingabefelder nebeneinander -->
        <div class="form-row">
            <label for="datePicker" style="color: white;">Datum eingeben:</label>
          <!-- Manuelle Datumseingabe -->
          <div class="input-container">
            <input
              type="text"
              id="datePicker"
              v-model="manualDateInput"
              class="form-input"
              placeholder="YYYY/MM/DD"
              @blur="validateDateInput"
              :class="{ invalid: isDateInvalid }"
            />
            <button class="date-btn" @click="insertCurrentDate">📅</button>
          </div>
  
          <!-- Manuelle Uhrzeit Eingabe -->
            <label for="timePicker" style="color: white;">Uhrzeit eingeben:</label>
          <div class="input-container">
            <input
              type="text"
              id="timePicker"
              v-model="manualTimeInput"
              class="form-input"
              placeholder="HH:MM"
              @blur="validateTimeInput"
              :class="{ invalid: isTimeInvalid }"
            />
            <button class="time-btn" @click="openTimePicker">⏰</button>
          </div>
  
          <!-- Anzahl an Mitfahrern -->
          <label for="passengerCount" style="color: white;">Anzahl von bereits zugesagten Mitfahrern:</label>
          <div class="input-container">
            <input
              type="number"
              id="passengerCount"
              v-model="passengerCount"
              class="form-input"
              placeholder="0-9"
              min="0"
              max="9"
              @blur="validatePassengerCount"
              :class="{ invalid: isPassengersInvalid }"
            />
          </div>
        </div>
  
        <!-- Fehlermeldungen -->
        <div v-if="isDateInvalid || isTimeInvalid || isPassengersInvalid" class="error-container">
          <span v-if="isDateInvalid" class="error-msg">Bitte ein gültiges Datum im Format YYYY/MM/DD eingeben.</span>
          <span v-if="isTimeInvalid" class="error-msg">Bitte eine gültige Uhrzeit im Format HH:MM eingeben.</span>
          <span v-if="isPassengersInvalid" class="error-msg">Bitte eine Zahl zwischen 1 und 10 eingeben.</span>
        </div>
      </div>
    </div>
  </template>


   <script>
   import VueCal from "vue-cal";
   import "vue-cal/dist/vuecal.css";
   import { mapActions } from 'vuex';
   
   export default {
     name: "FahreComponent",
     components: { VueCal },
     props: {
       isFahrePopupOpen: {
         type: Boolean,
         required: true,
       },
     },
     data() {
       return {
         manualDateInput: "",
         manualTimeInput: "",
         passengerCount: "",
         isDateInvalid: false,
         isTimeInvalid: false,
         isPassengersInvalid: false, 
       };
     },
     methods: {
      ...mapActions(['addEvent']),
      closeFahrePopup() {
      this.$emit("close");
    },
    //Anklicken des Kalenders und Datum in das Eingabefeld einfügen
    onDateSelected(date) {
      const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
      this.manualDateInput = formattedDate;
      this.validateDateInput();
    },
    //Aktuelles Datum einfügen
    insertCurrentDate() {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
      this.manualDateInput = formattedDate;
      this.validateDateInput();
    },
    //Datum validieren (Internationales Format, da sonst die englische Kalender Komponente nicht richtig funktioniert)
    validateDateInput() {
      const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
      if (!dateRegex.test(this.manualDateInput)) {
        this.isDateInvalid = true;
        return;
      }
      const [year, month, day] = this.manualDateInput.split('/').map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.isDateInvalid = inputDate < today;
    },
    //Uhrzeit validieren
    validateTimeInput() {
      const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
      this.isTimeInvalid = !timeRegex.test(this.manualTimeInput);
    },
    //Mitfahreranzahl validieren
    validatePassengerCount() {
      this.isPassengersInvalid = !(this.passengerCount >= 1 && this.passengerCount <= 10);
    },
    //Uhrzeitpicker öffnen, um aktuelle Uhrzeit einzufügen
    openTimePicker() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      this.manualTimeInput = `${hours}:${minutes}`;
      this.validateTimeInput();
    },
    //Fahrt besträtigen
    async submitSearch() {
      if (this.isDateInvalid || this.isTimeInvalid || this.isPassengersInvalid) {
        alert("Bitte geben Sie gültige Werte für Datum, Uhrzeit und Mitfahreranzahl ein.");
        return;
      }
      
      // Erstelle Startzeit basierend auf manuellen Eingaben
      const [year, month, day] = this.manualDateInput.split('/').map(Number);
      const [hour, minute] = this.manualTimeInput.split(':').map(Number);
      const startTime = new Date(year, month - 1, day, hour, minute);
      // Beispiel: Termin endet eine Stunde später
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  
      const eventData = {
        title: "Fahrtermin",
        description: `Mitfahrer: ${this.passengerCount}`,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      };
  
      // Speichere den Termin in Supabase über den Vuex-Store
      await this.addEvent(eventData);
  
      // Optional: Emitte die Daten und navigiere zur Map
      this.$emit("submit", {
        date: this.manualDateInput,
        time: this.manualTimeInput,
        passengers: this.passengerCount,
      });
      this.$router.push({ name: 'map-component' });
    },
  },
};
</script>
   
   <style scoped>
   /* Zusätzliche Styles für das Layout und Popup */
   .popup-body {
     padding-top: 20px; /* Abstand zur Kopfzeile */
     display: flex;
     flex-direction: column;
     gap: 20px; /* Abstand zwischen Elementen */
     height: auto;
   }
 
   .search-popup {
     position: fixed;
     top: 43%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 1000;
     background: #333; /* Hintergrundfarbe bleibt */
     border-radius: 10px;
     padding: 20px;
     width: 65%;
     height: auto;
     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
     color: white;
   }
 
   /* Header */
   .popup-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-bottom: 10px;
     border-bottom: 1px solid rgba(255, 255, 255, 0.2);
   }
 
   .popup-title {
     flex-grow: 1;
     text-align: center;
     font-size: 1.2em;
     font-weight: bold;
   }
 
   .close-btn {
     background: none;
     border: none;
     color: white;
     font-size: 1.5em;
     cursor: pointer;
   }
 
   /* Kalender */
   vue-cal {
     width: 100%;
     background: #444; /* Passende Farbe für den Kalenderhintergrund */
     border-radius: 10px;
   }
 
   /* Formulareingaben */
   .form-group {
     display: flex;
     flex-direction: column;
     gap: 10px;
     align-items: center;
   }
 
   .form-input {
     padding: 10px;
     border: none;
     border-radius: 5px;
     background-color: #444;
     color: white;
     font-size: 1em;
   }
 
   .form-input.invalid {
     border: 1px solid red;
     background-color: #ffcccc;
   }
 
   /* Fehlernachrichten */
   .error-container {
     text-align: center;
     margin-top: 10px;
   }
 
   .error-msg {
     color: red;
     font-size: 0.9em;
   }
 
   /* Container für Datumseingabefeld und Button */
   .input-container {
     display: flex;
     align-items: center;
     width: auto;
   }
 
   .date-btn,
   .time-btn {
     background-color: #008556;
     color: white;
     border: none;
     border-radius: 5px;
     margin-left: 10px;
     padding: 8px 12px;
     cursor: pointer;
     font-size: 1.2em;
   }
 
   .date-btn:hover,
   .time-btn:hover {
     background-color: #005c3c;
   }
 
   /* Submit-Button */
   .submit-btn:disabled {
     background-color: #666;
     cursor: not-allowed;
   }
 
   .submit-btn:hover {
     background-color: #005c3c;
   }
 
   .submit-btn:active {
     transform: scale(0.98); /* Visuelles Feedback bei Button-Klick */
   }

   /* Form-Row für horizontale Anordnung */
.form-row {
  display: flex;
  justify-content: center; /* Zentriert alle Felder horizontal */
  align-items: center; /* Vertikale Zentrierung der Felder */
  gap: 20px; /* Abstand zwischen den Feldern */
  margin-bottom: 10px; /* Abstand zwischen Eingabefeldern und Fehlermeldungen */
}

/* Eingabefelder */
.input-container {
  display: flex;
  align-items: center; /* Zentriert Textfeld und Button vertikal */
}

.form-input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 1em;
  width: 150px; /* Einheitliche Breite */
}

.form-input.invalid {
  border: 1px solid red;
  background-color: #ffcccc;
}

/* Buttons */
.date-btn, .time-btn {
  background-color: #008556;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.2em;
}

.date-btn:hover, .time-btn:hover {
  background-color: #005c3c;
}

/* Fehlernachrichten */
.error-container {
  text-align: center;
}

.error-msg {
  color: red;
  font-size: 0.9em;
}

/* Button mit Pfeil, nur aktiv, wenn Datum und Uhrzeit ausgewählt sind */
.submit-btn {
   background-color: #008556; /* Grüner Hintergrund */
   color: white;
   font-size: 1.2em;
   border: none;
   border-radius: 5px;
   padding: 10px 20px;
   cursor: pointer;
   display: inline-flex;
   align-items: center;
   justify-content: center;
 }
 
 .submit-btn:disabled {
   background-color: #666; /* Grauer Button wenn deaktiviert */
   cursor: not-allowed;
 }
 
 .submit-btn:hover {
   background-color: #005c3c;
 }
 
 .submit-btn:active {
   transform: scale(0.98); /* Visuelles Feedback bei Button-Klick */
 }

 .close-btn {
   background: none;
   border: none;
   color: white;
   font-size: 1.5em;
   cursor: pointer;
 }
 </style>
