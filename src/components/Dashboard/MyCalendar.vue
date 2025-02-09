<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert die Kalender Komponente. Achtung: Datenbankwechsel hat vorgänger Version notwendig gemacht. Kann nicht richtig mit den Backend kommunizieren!-->

<template>
  <div v-if="isOpen" class="calendar-popup">
    <div class="popup-header">
      <button @click="$emit('close')" class="close-btn">✖</button>
      <h2 style="color: white;">Kalender</h2>
    </div>
    <vue-cal
      v-model="internalDate"
      @date-selected="onDateSelected"
      :time-cell-interval="60"
      :events="events"
      time-range-start="06:00"
      time-range-end="18:00"
      style="height: calc(100% - 50px); color: white;"
    />
  </div>
</template>

<script>
import VueCal from "vue-cal"; 
import "vue-cal/dist/vuecal.css"; // Importiere die Standard-Styles
import { mapActions } from 'vuex';

export default {
  name: "MyCalendar",
components: {
  VueCal, // Registriere VueCal
},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    selectedDate: {
      type: [Date, String],
      default: null,
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      internalDate: this.selectedDate, // Lokale Kopie von selectedDate
    };
  },
  watch: {
    // Aktualisiert die interne Kopie, wenn die prop sich ändert
    selectedDate(newDate) {
      this.internalDate = newDate;
    },
  },
  methods: {
    ...mapActions(['fetchEvents']),
    onDateSelected(date) {
      // Emittiere das ausgewählte Datum an die Hauptkomponente
      this.$emit("update-date", date);
    },
    async created() {
  // Lade die Termine des Benutzers, wenn die Komponente geladen wird
  await this.fetchEvents();
},
  },
};
</script>

<style scoped>
.calendar-popup {
  position: fixed;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #333;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 65%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
}

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