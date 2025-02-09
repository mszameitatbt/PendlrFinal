<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Der folgende Code repräsentiert das Dashboard. Es wurde mit Absicht nicht als Component verpackt, da wir eine reine Elternklasse möchten, um spätere Komponenten sauberer zu trennen-->

<template>
    <v-app>
      <v-main>
        <!-- Hintergrundbild mit Overlay -->
        <div
          style="
            position: relative;
            background-image: url('https://cdn0.scrvt.com/a534b4b72e47031e7c1755abc55cf709/9d3cfd1d9ecd8bfe/2cf83d1df7d2/v/6909d8130b23/uni-bayreuth-pm-110-campus-sonnenuntergang.jpg');
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              z-index: 1;
            "
          ></div>
  
          <!-- Header -->
          <header
          style="background-color: rgba(0, 0, 0, 0.8); color: white; text-align: center; padding: 20px 0; position: absolute; top: 0; width: 100%; z-index: 2; height: 10%;"
          >
          </header>
          <div
            style="display: flex; justify-content: space-between; align-items: center; padding: 16px; z-index: 2;"
          >
            <div style="display: flex; align-items: center; height: 1px">
              <img
                src="pendlr.PNG"
                alt="Pendlr Logo"
                style="width: 50px; margin-right: 10px; height: -30px; border-radius: 50%; margin-top: 40px"
              />
              <h1 style="color: white; font-size: 2em; height: 10px ;margin: 0">Pendlr</h1>

              <!-- Home-Button -->
                     <div
                      style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                     >
                    <v-btn
                     @click="gotoHome"
                      icon
                     style="background-color: transparent; color: white; text-transform: none; margin-left: 150px; height: 25px; font-size: 25px; margin-top: 50px"
                       >
                        <v-icon large>mdi-home</v-icon>
                        </v-btn>
                        <span style="color: white; margin-left: 150px; margin-top: 5px; font-size: 16px;">Home</span> <!-- Schriftzug muss manuell mit margin-left in Position gebracht werden, da ansonten er nicht automatisch wie die anderen unter dem entsprechenden Symbol stehen -->
                     </div>

              <!-- Kalender-Button -->
                    <div
                      style="display: flex; align-items: center; flex-direction: column; margin-right: 175px; text-align: center;"
                    >
                    <v-btn
                     icon
                     @click="openCalendarPopup"
                     style="background-color: transparent; color: white; text-transform: none; height: 20px; font-size: 25px; margin-top: 50px"
                    >
                     <v-icon large>mdi-calendar</v-icon>
                    </v-btn>
                    <span style="color: white; margin-top: 12px; font-size: 16px;">Kalender</span> 
                    </div>

              <!-- Chat-Button -->
                    <div
                      style="display: flex; align-items: center; flex-direction: column; margin-right: 175px; text-align: center;"
                    >
                    <v-btn icon @click="toggleChatApp" style="background-color: transparent; color: white; height: 20px; text-transform: none; font-size: 25px; margin-top: 50px">
                    <v-icon large>mdi-chat</v-icon>
                    </v-btn>
                    <span style="color: white; margin-top: 12px; font-size: 16px;">Chat</span> 
                    </div>

              <!-- ÖPNV-Button -->
                    <div
                    style="display: flex; align-items: center; flex-direction: column; margin-right: 175px; text-align: center;">
                    <a href="https://www.vgn.de/verbindungen/" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; height: 20px; font-size: 25px; margin-top: 50px">
                     <v-icon large>mdi-train</v-icon>
                    </a>
                    <span style="color: white; margin-top: 12px; font-size: 16px;">ÖPNV</span> 
                    </div>
  
              <!-- Profil-Button -->
                    <div
                      style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                    >
                      <v-btn icon @click="openUserPopup"
                       style="background-color: transparent; color: white; text-transform: none; height: 20px; font-size: 25px; margin-top: 50px">
                        <v-icon large>mdi-account</v-icon>
                      </v-btn>
                      <span style="color: white; margin-top: 12px; font-size: 16px;">Profil</span> 
                    </div>

              <!-- Einstellungen-Button -->
                    <div
                      style="display: flex; align-items: center; flex-direction: column; text-align: center;"
                    >
                      <v-btn 
                      icon @click="openSettingsPopup"
                       style="background-color: transparent; color: white; text-transform: none; height: 20px; font-size: 25px; margin-top: 50px">
                        <v-icon large>mdi-cog</v-icon>
                      </v-btn> 
                      <span style="color: white; margin-top: 12px; font-size: 16px;">Einstellungen</span>       
                    </div>
            </div>
  
  
          </div>
  
          <!-- Hauptinhalt -->
          <div
            style="
              z-index: 2;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
            "
          >
            <!-- Ein kleiner Schmunzler für den User -->
            <h2 style="font-size: 2.5em; color: white; margin-bottom: 20px">
              Was darf es heute sein?
            </h2>
            <!-- Suche und Fahre Button -->
            <div style="display: flex; justify-content: center; gap: 15px">
              <v-btn
              @click="openSuchePopup"
                style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
              >
                ICH SUCHE!
              </v-btn>
              <v-btn
              @click="openFahrePopup"
                style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
              >
                ICH FAHRE!
              </v-btn>
  
            </div>
          </div>
  
          <!-- Fußzeile -->
        <footer
          style="background-color: rgba(0, 0, 0, 0.8); color: white; text-align: center; padding: 20px 0; position: absolute; bottom: 0; width: 100%; z-index: 2; height: 22%;"
        >
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px">
            <!-- Rechtliches -->
            <div style="text-align: left;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Rechtliches</h2>
              <p>
                <a href="#datenschutz" @click="openDatenschutzPopup" style="color: white; text-decoration: none;">Datenschutz</a>
              </p>
              <p>
                <a href="#agb" @click="openAGBPopup" style="color: white; text-decoration: none;">AGB</a>
              </p>
            </div>

            <!-- Social -->
            <div style="text-align: center;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Social</h2>
              <p><a href="https://www.instagram.com/pendlr_?igsh=ejU2cXlyc25zZWk4" target=_blank rel="noopener noreferrer" style="color: white; text-decoration: none;">Instagram</a></p>
              <p><a href="https://www.youtube.com/channel/UCpoS3418HsBp1guR8BczfSQ" target=_blank rel="noopener noreferrer" style="color: white; text-decoration: none;">YouTube</a></p>
            </div>

            <!-- Weitere -->
            <div style="text-align: right;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Weitere</h2>
              <p><a href="#faq" @click="openFAQPopup" style="color: white; text-decoration: none;">FAQ</a></p>
              <p><a href="#kontakt" @click="openKontaktPopup" style="color: white; text-decoration: none;">Kontakt</a></p>
            </div>
          </div>

          <!-- Copyright -->
          <p style="margin-top: 20px;">© 2025 Universität Bayreuth, Alle Rechte vorbehalten</p>
        </footer>
      </div>

  
        <!-- Popups -->
        <div
          v-if="isAnyPopupOpen"
          @click="closeAllPopups"
          style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;"
        ></div>
  
         <!-- Chat Popup -->
        <ChatApp v-if="isChatAppOpen" @close="toggleChatApp"/>
  
        <!-- User Popup -->
        <UserProfile :isPopupOpen="isUserPopupOpen" @close="closeUserPopup" />
  
        <!-- MyStatistics Popup -->
        <MyStatisticsPopup :isOpen="isStatisticsPopupOpen" @close="closeStatisticsPopup" style="z-index: 1102;" />
  
        <!-- RideList Popup -->
        <RideList :isOpen="isRideListPopupOpen" @close="closeRideListPopup" style="z-index: 1103;" />
  
        <!-- Suche Popup -->
        <div>
      <SucheComponent
        :isSuchePopupOpen="isSuchePopupOpen"
        @close=" closeSuchePopup"
        @submit="handleSucheSubmit"
      />
    </div>
  
        <!-- Fahre Popup -->
        <div>
      <FahreComponent
        :isFahrePopupOpen="isFahrePopupOpen"
        @close="closeFahrePopup"
        @submit="handleSucheSubmit"
      />
    </div>
  
      <!-- MyCalendar-Komponente -->
       <div>
      <MyCalendar
        :isOpen="isCalendarPopupOpen"
        :selectedDate="selectedDate"
        :events="events"
        @update-date="onDateSelected"
        @close="closeCalendarPopup"
      />
    </div>
  
    <!-- MySettings-Komponente -->
    <my-settings
    :isOpen="isSettingsPopupOpen"
    @close="closeSettingsPopup"
    @openStatistics="openStatisticsPopup"
    @openRideList="openRideListPopup"
  />
  
   <!-- Datenschutz Popup -->
   <DatenschutzPopup
        :isDatenschutzPopupOpen="isDatenschutzPopupOpen"
        @close="closeDatenschutzPopup" 
      />

      <!-- AGB Popup -->
      <AGBPopup :isAGBPopupOpen="isAGBPopupOpen" @close="closeAGBPopup" />

      <!-- Kontakt Popup -->
      <KontaktPopup :isKontaktPopupOpen="isKontaktPopupOpen" @close="closeKontaktPopup" />

      <!-- FAQ Popup -->
      <FAQPopup :isFAQPopupOpen="isFAQPopupOpen" @close="closeFAQPopup" />
  
        
      </v-main>
    </v-app>
  </template>
  
  <script>
  import ChatApp from './components/Dashboard/ChatApp.vue';
  import UserProfile from './components/Dashboard/UserProfile.vue';
  import MyStatisticsPopup from './components/Dashboard/MyStatisticsPopup.vue';
  import RideList from './components/Dashboard/RideList.vue';
  import MyCalendar from "./components/Dashboard/MyCalendar.vue";
  import MySettings from './components/Dashboard/MySettings.vue';
  import SucheComponent from './components/Dashboard/SucheComponent.vue';
  import FahreComponent from './components/Dashboard/FahreComponent.vue';
  import DatenschutzPopup from './components/DatenschutzPopup.vue';
  import AGBPopup from './components/AGBPopup.vue';
  import FAQPopup from './components/FAQPopup.vue';
  import KontaktPopup from './components/KontaktPopup.vue';
  import { mapState, mapActions } from 'vuex'; // Importiere mapState und mapActions von Vuex, damit wir auf den Store zugreifen können
  import { supabase } from './supabaseClient'; // Importiere den Supabase-Client
  
  
  
  export default {
    name: 'App',
    components: {
      ChatApp,
      UserProfile,
      MyStatisticsPopup,
      RideList,
      MyCalendar,
      MySettings,
      SucheComponent,
      FahreComponent,
      DatenschutzPopup,
      AGBPopup,
      FAQPopup,
      KontaktPopup,
    },
    data() {
    return {
      isChatAppOpen: false, // Alle Popups sind standardmäßig geschlossen
      isDatenschutzPopupOpen: false,
      isAGBPopupOpen: false,
      isKontaktPopupOpen: false,
      isFAQPopupOpen: false,
      isSuchePopupOpen: false,
      isFahrePopupOpen: false,
      isUserPopupOpen: false,
      isSettingsPopupOpen: false,
      isStatisticsPopupOpen: false, 
      isRideListPopupOpen: false,
      isCalendarPopupOpen: false, 
      manualDateInput: "", // Datumseingabe beim Kalender immer auf leer
      manualTimeInput: "", // Uhrzeiteingabe beim Kalender immer auf leer
      isDateInvalid: false,
      isTimeInvalid: false,
      isValidDate: false, 
      isValidTime: false, 
      selectedDate: null, 
      selectedSearchDateTime: null, 
      formattedSelectedDate: "",   // Das formatierte Datum für das Eingabefeld
      selectedTime: '12:00',  // Standardzeit (12:00), die der Benutzer ändern kann
      isAnyPopupOpen: false,
      // Events für den Kalender
      events: [
        {
          start: new Date(new Date().setHours(17, 0, 0, 0)), // Heute um 17:00 Uhr
          end: new Date(new Date().setHours(18, 0, 0, 0)), // Bis 18:00 Uhr
          title: "Beispiel-Event", // Titel des Events
        },
      ],
    };
  },
    computed: {
      ...mapState(['isAuthenticated', 'user']), // Zustand aus dem Store abrufen, damit der User sich im Dashboard überall ohne erneute Authentifizierung bewegen kann
    },
    created() {
  // Überprüfe beim Laden des Dashboards den Auth-Status
  this.checkAuth();

  // Falls der Benutzer nicht authentifiziert ist, leite ihn zur Login-Seite weiter
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      this.$router.push({ name: 'login' });
    }
  }).catch(error => {
    console.error('Error checking session:', error);
  });

  },
    methods: {
    toggleChatApp() {
      this.isChatAppOpen = !this.isChatAppOpen;
      this.isAnyPopupOpen = this.isChatAppOpen;
    },
    closeAllPopups() {
      this.isChatAppOpen = false;
      this.isRegisterPopupOpen = false;
      this.isDatenschutzPopupOpen = false;
      this.isAGBPopupOpen = false;
      this.isKontaktPopupOpen = false;
      this.isFAQPopupOpen = false;
      this.isSuchePopupOpen = false;
      this.isFahrePopupOpen = false;
      this.isUserPopupOpen = false;
      this.isSettingsPopupOpen = false;
      this.isStatisticsPopupOpen = false;
      this.isRideListPopupOpen = false;
      this.isCalendarPopupOpen = false;
      this.isAnyPopupOpen = false;
    },
  
    openFahrePopup() {
      this.isFahrePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeFahrePopup() {
      this.isFahrePopupOpen = false;
      this.isAnyPopupOpen = false;
    },
  
    openUserPopup() {
      this.isUserPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeUserPopup() {
      this.isUserPopupOpen = false;
      this.isAnyPopupOpen = false;
    },
  
    openSettingsPopup() {
      this.closeAllPopups(); // Schließe alle Popups, bevor das Einstellungen-Popup geöffnet wird
      this.isSettingsPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeSettingsPopup() {
      this.isSettingsPopupOpen = false;
      this.isAnyPopupOpen = false;
    },
  
    openStatisticsPopup() {
      this.closeAllPopups(); // Schließe alle Popups, bevor das Statistiken-Popup geöffnet wird
      this.isStatisticsPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeStatisticsPopup() {
      this.isStatisticsPopupOpen = false;
      this.isAnyPopupOpen = false;
      this.isSettingsPopupOpen = true; //Somit können wir ohne router die vorherige Komponente wieder öffnen
    this.isAnyPopupOpen = true; 
    },
  
    openRideListPopup() {
      this.closeAllPopups(); // Schließe alle Popups, bevor das Statistiken-Popup geöffnet wird
      this.isRideListPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeRideListPopup() {
      this.isRideListPopupOpen = false;
      this.isAnyPopupOpen = false;
      this.isSettingsPopupOpen = true; //Somit können wir ohne router die vorherige Komponente wieder öffnen
    this.isAnyPopupOpen = true; 
    },
  
    openCalendarPopup() {
      this.closeAllPopups(); // Schließe alle Popups, bevor das Kalender-Popup geöffnet wird
      this.isCalendarPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeCalendarPopup() {
      this.isCalendarPopupOpen = false;
      this.isAnyPopupOpen = false;
    },
  
    openSuchePopup() {
      this.isSuchePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeSuchePopup() {
      this.isSuchePopupOpen = false;
      this.isAnyPopupOpen = false;
    },
    openDatenschutzPopup() {
      this.isDatenschutzPopupOpen = true;
    },
    closeDatenschutzPopup() {
      this.isDatenschutzPopupOpen = false;
    },
    openAGBPopup() {
      this.isAGBPopupOpen = true;
    },
    closeAGBPopup() {
      this.isAGBPopupOpen = false;
    },
    openKontaktPopup() {
      this.isKontaktPopupOpen = true;
    },
    closeKontaktPopup() {
      this.isKontaktPopupOpen = false;
    },
    openFAQPopup() {
      this.isFAQPopupOpen = true;
    },
    closeFAQPopup() {
      this.isFAQPopupOpen = false;
    },
    openRideList() {
      this.isRideListPopupOpen = true;
    },

    gotoHome() {
      this.$router.push({ name: 'user-dashboard' }); //schickt den User auf den Klick auf das Home-Symbol auf die Dashboard-Seite
    },
    ...mapActions(['checkAuth']),
  },
  };
  </script>
  
  <style scoped>
  /* Zusätzliche Styles für das Layout und Popup */
  .dashboard {
  width: 100vw;
  height: 100vh; /* Nutzt die ganze Bildschirmhöhe */
  overflow: hidden;
}

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  
  .calendar-popup {
    position: fixed;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: #333; /* Hintergrundfarbe bleibt */
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    height: 65%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    color: white;
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
  </style>