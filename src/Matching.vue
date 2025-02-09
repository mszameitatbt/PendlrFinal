<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert die Matchingfunktion: Achtung: Aufgrund von neuer Datenbank und Komplikationen wurden alle Datenbankspeicherungen rausgenommen! Code nur noch lokal ausführbar! -->
<template>
    <v-app>
      <v-main>
        <div
          style="position: relative; background-image: url('https://cdn0.scrvt.com/a534b4b72e47031e7c1755abc55cf709/9d3cfd1d9ecd8bfe/2cf83d1df7d2/v/6909d8130b23/uni-bayreuth-pm-110-campus-sonnenuntergang.jpg'); background-size: cover; background-position: center; height: 100vh; display: flex; flex-direction: column; justify-content: space-between;"
        >
          <div
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 1;"
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
                      <span style="color: white; margin-left: 150px; margin-top: 5px; font-size: 16px;">Home</span> 
                 </div>
    
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
    
                      <div
                        style="display: flex; align-items: center; flex-direction: column; margin-right: 175px; text-align: center;"
                      >
                      <v-btn icon @click="toggleChatApp" style="background-color: transparent; color: white; height: 20px; text-transform: none; font-size: 25px; margin-top: 50px">
                      <v-icon large>mdi-chat</v-icon>
                      </v-btn>
                      <span style="color: white; margin-top: 12px; font-size: 16px;">Chat</span> 
                      </div>
    
                      <div
                      style="display: flex; align-items: center; flex-direction: column; margin-right: 175px; text-align: center;">
                      <a href="https://www.vgn.de/verbindungen/" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; height: 20px; font-size: 25px; margin-top: 50px">
                       <v-icon large>mdi-train</v-icon>
                      </a>
                      <span style="color: white; margin-top: 12px; font-size: 16px;">ÖPNV</span> 
                      </div>
    
    
                      <div
                        style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                      >
                        <v-btn icon @click="openUserPopup"
                         style="background-color: transparent; color: white; text-transform: none; height: 20px; font-size: 25px; margin-top: 50px">
                          <v-icon large>mdi-account</v-icon>
                        </v-btn>
                        <span style="color: white; margin-top: 12px; font-size: 16px;">Profil</span> 
                      </div>
    
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
  
          <!-- Filter Button -->
          <div style="position: absolute; bottom: 24%; right: 40%; transform: translateX(-50%); z-index: 1000;">
            <button @click="openFilter" class="filter-btn">
              Filter
            </button>
          </div>
  
          <!-- Filter Dialog -->
          <v-dialog v-model="filterOpen" height="78%" max-width="500px">
            <v-card class="filter-popup" color="#333" dark>
        <v-card-title class="popup-header">
          <v-btn icon class="close-btn" @click="closePopup">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h2>Filter</h2>
        </v-card-title>
              <v-card-text>
                <v-container>
                     <!-- Neue Zeile für die beiden Slider -->
         <!-- Slider-Bereich: Jeder Slider nimmt die volle Breite ein -->
         <v-row>
          <v-col cols="12">
            <v-slider
              v-model="filter.startRadius"
              :min="0"
              :max="100"
              step="1"
              label="Suchumkreis Start (km)"
              ticks
              tick-size="4"
              thumb-label="always"
              class="white-slider"
            ></v-slider>
          </v-col>
          <v-col cols="12">
            <v-slider
              v-model="filter.endRadius"
              :min="0"
              :max="100"
              step="1"
              label="Suchumkreis Ziel (km)"
              ticks
              tick-size="4"
              thumb-label="always"
              class="white-slider"
            ></v-slider>
          </v-col>
        </v-row>
                  <v-row>
                    <!-- Alter -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.age"
                        :items="[...ageOptions]"
                        label="Alter"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Universität -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.university"
                        :items="[...universityOptions]"
                        label="Campus"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Geschlecht -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.gender"
                        :items="[...genderOptions]"
                        label="Geschlecht"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Rolle -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.role"
                        :items="[...roleOptions]"
                        label="Rolle"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Kraftstoff -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.fuel"
                        :items="[...fuelOptions]"
                        label="Kraftstoff"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Türen -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.doors"
                        :items="[...doorOptions]"
                        label="Türen"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Kofferraum -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.trunkSpace"
                        :items="[...yesNoOptions]"
                        label="Kofferraum"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Klimaanlage -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.airConditioning"
                        :items="[...yesNoOptions]"
                        label="Klimaanlage"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Rauchen erlaubt -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.smokingAllowed"
                        :items="[...yesNoOptions]"
                        label="Rauchen erlaubt"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                    <!-- Tiere erlaubt -->
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="filter.petsAllowed"
                        :items="[...yesNoOptions]"
                        label="Tiere erlaubt"
                        outlined
                        dense
                        class="white-select"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
                <v-card-actions class="actions-column">
                <v-btn @click="resetFilter" class="apply-reset-btn">Filter zurücksetzen</v-btn>
                <v-btn  @click="applyFilter" class="apply-filter-btn">Filter anwenden</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          <div id="app">
            <!-- Falls es keine Profile mehr gibt, wird diese Nachricht angezeigt -->
            <div v-if="filteredProfiles.length === 0" class="no-profiles-message">
              Zu wählerisch? Setze deine Filter zurück oder passe sie an!
            </div>
            <!-- Ansonsten Profilkarte -->
            <div v-else-if="currentProfile" class="profile-card" :class="{ flipped: isFlipped }" @click="toggleFlip">
              <!-- Front of the Card --> 
               
              <div class="front" :style="{ backgroundImage: `url(${currentProfile.picture})` }">
                <div class="profile-info">
                  <h4>{{ currentProfile.name }} ({{ currentProfile.age }})</h4>
                  <h5>{{ currentProfile.status }}</h5>
                  <h6>Start: &nbsp;{{ currentProfile.start}} </h6> 
                    <h6>Ziel: &nbsp;{{ currentProfile.destination }}</h6> 
                    <h6>Zeit: &nbsp;{{ currentProfile.time }}</h6> 
                  <div class="rating">
                    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= currentProfile.rating }">
                      ★
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- Back of the Card -->
              <div class="back">
                <h3><u>Details:</u></h3>
                <p><strong>Wohnort:</strong> {{ currentProfile.location }}</p>
                <p><strong>Geschlecht:</strong> {{ currentProfile.gender }}</p>
                <p><strong>Campus:</strong> {{ currentProfile.university }}</p>
                <p><strong>Rolle:</strong> {{ currentProfile.role }}</p>
                <p><strong>Fahrzeug:</strong> {{ currentProfile.vehicle }}</p>
                <p><strong>Farbe:</strong> {{ currentProfile.color }}</p>
                <p><strong>Kraftstoff:</strong> {{ currentProfile.fuel }}</p>
                <p><strong>Türen:</strong> {{ currentProfile.doors }}</p>
                <p><strong>Kofferraum:</strong> {{ currentProfile.trunkSpace }}</p>
                <p><strong>Klimaanlage:</strong> {{ currentProfile.airConditioning }}</p>
                <p><strong>Rauchen erlaubt:</strong> {{ currentProfile.smokingAllowed }}</p>
                <p><strong>Tiere erlaubt:</strong> {{ currentProfile.petsAllowed }}</p>
                <p><strong>Musikpräferenz:</strong> {{ currentProfile.musicPreference }}</p>
              </div>
            </div>
  
            <!-- Buttons below the card -->
            <div class="buttons-container">
              <!-- Reject Button -->
              <button class="action-btn reject" @click="rejectProfile">
                ✖
              </button>
              <!-- Chat Button -->
              <button class="action-btn chat" @click="openChat">
                💬
              </button>
            </div>
  
            <!-- Rejection Message -->
            <div v-if="showRejection" class="rejection-message">NEIN!</div>
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
  import AGBPopup from './components/AGBPopup.vue';
  import FAQPopup from './components/FAQPopup.vue';
  import KontaktPopup from './components/KontaktPopup.vue'
  import DatenschutzPopup from './components/DatenschutzPopup.vue';



  export default {
    name: "PendlrProfiles",
    props: {
    currentsProfile: Object
  },
    components: {
      ChatApp,
      UserProfile,
      MyStatisticsPopup,
      RideList,
      MyCalendar,
      MySettings,
      AGBPopup,
      FAQPopup,
      KontaktPopup,
      DatenschutzPopup
    },
    data() {
      return {
        profiles: [
          {
            id: 1,
            name: "Anna",
            age: "18 - 30",
            status: "Fahre",
            start:"Universitätsstraße 30, Bayreuth",
            destination: "Markgräfliches Opernhaus Bayreuth",
            time: "10:00",
            picture: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4,
            location: "Berlin",
            gender: "Weiblich",
            university: "Kulmbach",
            role: "Studierende",
            vehicle: "VW Golf",
            color: "Rot",
            fuel: "Benzin",
            doors: "5",
            trunkSpace: "Ja",
            airConditioning: "Ja",
            smokingAllowed: "Nein",
            petsAllowed: "Ja",
            musicPreference: "Pop & Charts",
          },
          {
            id: 2,
            name: "Lukas",
            age: "31 - 40",
            status: "Fahre",
            start:"Universitätsstraße 30, Bayreuth",
            destination: "Campus Kulmbach",
            time: "14:30",
            picture: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            location: "München",
            gender: "Männlich",
            university: "Bayreuth",
            role: "Beschäftigte",
            vehicle: "Tesla Model 3",
            color: "Schwarz",
            fuel: "Elektro",
            doors: "4",
            trunkSpace: "Ja",
            airConditioning: "Ja",
            smokingAllowed: "Nein",
            petsAllowed: "Nein",
            musicPreference: "Rock & Alternative",
          },
          {
            id: 3,
            name: "Sophie",
            age: "18 - 30",
            status: "Suche",
            start:"AS in Thurnau",
            destination: "Universitätsstraße 30, Bayreuth",
            time: "17:00",
            picture: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 3,
            location: "Nürnberg",
            gender: "Weiblich",
            university: "AS in Thurnau",
            role: "Studierende",
            vehicle: "",
            color: "",
            fuel: "",
            doors: "",
            trunkSpace: "",
            airConditioning: "",
            smokingAllowed: "",
            petsAllowed: "",
            musicPreference: "Hip-Hop & RnB",
          },
        ],
        currentProfileIndex: 0,
        isFlipped: false,
        showRejection: false,
        filterOpen: false,
        // Rejected-Profil-IDs werden hier gespeichert
        rejectedProfiles: [],
        filter: {
          age: null,
          university: null,
          gender: null,
          role: null,
          fuel: null,
          doors: null,
          trunkSpace: null,
          airConditioning: null,
          smokingAllowed: null,
          petsAllowed: null,
          startRadius: 20, // Suchumkreis vom Startpunkt in km
          endRadius: 20    // Suchumkreis vom Zielpunkt in km
        },
        ageOptions: ['U18', '18 - 30', '31 - 40', '41 - 50', '51 - 60', 'Ü60'],
        universityOptions: ['Bayreuth', 'AS in Bayreuth', 'Kulmbach', 'AS in Thurnau', 'AS in Wallenfels'],
        genderOptions: ['Männlich', 'Weiblich', 'Divers'],
        roleOptions: ['Beschäftigte', 'Studierende'],
        fuelOptions: ['Benzin', 'Diesel', 'Elektro', 'Hybrid', 'andere Kraftstoffe'],
        doorOptions: ['2', '3', '4', '5'],
        yesNoOptions: ['Ja', 'Nein'],
        isChatAppOpen: false, 
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
        manualDateInput: "", 
        manualTimeInput: "", 
        isDateInvalid: false,
        isTimeInvalid: false,
        isValidDate: false, 
        isValidTime: false, 
        selectedDate: null, 
        selectedSearchDateTime: null, 
        formattedSelectedDate: "", 
        selectedTime: '12:00',  
        isAnyPopupOpen: false,
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
     // Filtert Profile anhand der gesetzten Filterkriterien UND schließt abgelehnte Profile aus
     filteredProfiles() {
        return this.profiles.filter(profile => {
          return (
            (this.filter.age === null || profile.age === this.filter.age) &&
            (!this.filter.university || profile.university.includes(this.filter.university)) &&
            (this.filter.gender === null || profile.gender === this.filter.gender) &&
            (this.filter.role === null || profile.role === this.filter.role) &&
            (this.filter.fuel === null || profile.fuel === this.filter.fuel) &&
            (this.filter.doors === null || profile.doors === this.filter.doors) &&
            (this.filter.trunkSpace === null || profile.trunkSpace === this.filter.trunkSpace) &&
            (this.filter.airConditioning === null || profile.airConditioning === this.filter.airConditioning) &&
            (this.filter.smokingAllowed === null || profile.smokingAllowed === this.filter.smokingAllowed) &&
            (this.filter.petsAllowed === null || profile.petsAllowed === this.filter.petsAllowed) &&
            !this.rejectedProfiles.includes(profile.id)
          );
        });
      },
      // Gibt das aktuell anzuzeigende Profil zurück oder null, falls keine Profile mehr vorhanden sind
      currentProfile() {
        const filtered = this.filteredProfiles;
        if (filtered.length === 0) {
          return null;
        }
        return filtered[this.currentProfileIndex % filtered.length];
      },
    },
   
    methods: {
        openChat() {
            this.isChatAppOpen = true;
            this.isAnyPopupOpen = true;
        },
      // Karten umdrehen
      toggleFlip() {
        this.isFlipped = !this.isFlipped;
      },
  
      // Beim Ablehnen wird die ID des aktuellen Profils gespeichert und zum nächsten gewechselt.
      rejectProfile() {
    if (this.currentProfile) {
      // Speichere die ID des aktuellen Profils in einer Variablen
      const rejectedId = this.currentProfile.id;
      this.showRejection = true;
      setTimeout(() => {
        // Nach 500ms erst den Eintrag als abgelehnt markieren
        this.rejectedProfiles.push(rejectedId);
        this.showRejection = false;
        this.nextProfile();
      }, 500);
    }
  },
  //gehe zum nächsten Profil
      nextProfile() {
        this.isFlipped = false;
        this.currentProfileIndex++;
      },
    
      openFilter() {
        this.filterOpen = !this.filterOpen;
      },
      resetFilter() {
        this.filter = {
          age: null,
          university: null,
          gender: null,
          role: null,
          fuel: null,
          doors: null,
          trunkSpace: null,
          airConditioning: null,
          smokingAllowed: null,
          petsAllowed: null,
        }
        // Ebenfalls die abgelehnten Profile zurücksetzen und den Index auf 0 setzen
        this.rejectedProfiles = [];
        this.currentProfileIndex = 0;
      },
      applyFilter() {
        this.filterOpen = false;
        this.currentProfileIndex = 0;
          // Beim Anwenden eines neuen Filters setzen wir auch die abgelehnten Profile zurück
          this.rejectedProfiles = [];
      },
      closePopup() {
        this.filterOpen = false;
      },
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
      this.isUserPopupOpen = false;
      this.isSettingsPopupOpen = false;
      this.isStatisticsPopupOpen = false;
      this.isRideListPopupOpen = false;
      this.isCalendarPopupOpen = false;
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
      this.isSettingsPopupOpen = true; // Hier kannst du das gewünschte Popup aktivieren
    this.isAnyPopupOpen = true;  // Ensuring at least one popup is open
    },
  
    openRideListPopup() {
      this.closeAllPopups(); // Schließe alle Popups, bevor das Statistiken-Popup geöffnet wird
      this.isRideListPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeRideListPopup() {
      this.isRideListPopupOpen = false;
      this.isAnyPopupOpen = false;
      this.isSettingsPopupOpen = true; 
    this.isAnyPopupOpen = true;  
    },
  
    openCalendarPopup() {
      this.closeAllPopups(); 
      this.isCalendarPopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeCalendarPopup() {
      this.isCalendarPopupOpen = false;
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
    gotoHome() {
      this.$router.push({ name: 'user-dashboard' });
    },
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
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
  /* Profile Card */
  .profile-card {
    top: -30%;
    bottom: 40%;
    left: 40%;
    width: 300px;
    height: 400px;
    perspective: 1000px;
    position: relative;
    margin-bottom: 100px;
    z-index: 1000;
  }
  
  .front,
  .back {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.6s;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
  }

  
  .front {
    background-size: cover;
    background-position: center;
  }
  
  .back {
    background-color: #333;
    color: white;
    transform: rotateY(180deg);
    text-align: center;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .profile-card.flipped .front {
    transform: rotateY(180deg);
  }
  
  .profile-card.flipped .back {
    transform: rotateY(0);
  }


  
  /* Profile Info */
  .profile-info {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    padding: 10px;
    color: white;
    font-size: 1.2em;
  }
  
  .rating {
    margin-top: 5px;
  }
  
  .star {
    font-size: 1.2em;
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
  }
  
  /* Buttons Container */
  .buttons-container {
    position: absolute;
    bottom: 23%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 175px;
    z-index: 5;
  }
  
  .action-btn {
    width: 60px;
    height: 60px;
    background: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease, background-color 0.2s ease;
    z-index: 1001;
  }
  
  .action-btn:hover {
    transform: scale(1.1);
    background-color: #f0f0f0;
  }
  
  .reject {
    background-color: red;
    color: white;
    font-weight: bold;
  }
  
  .reject:hover {
    background-color: #ff9999;
  }
  
  .chat {
    background-color: #008556;
  }
  
  .chat:hover {
    background-color: #99ff99;
  }
  
  /* Rejection Message */
  .rejection-message {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    font-size: 2em;
    padding: 10px 20px;
    border-radius: 10px;
    z-index: 5000;
    animation: fade-out 0.5s ease-out forwards;
  }
  
  /* Nachricht, wenn keine Profile mehr vorhanden sind */
  .no-profiles-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3em;
    text-align: center;
    z-index: 1001;
  }
  
  .actions-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -50px;
    gap: 10px;
    width: 100%;
  }
  
  /* Filter Button */
  .filter-btn {
    background-color: #FFBF00;
    color: white;
    padding: 10px 20px;
    width: 150px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .filter-btn:hover {
    background-color: #45a049;
  }
  
  .apply-reset-btn{
    background-color: #008556;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .apply-reset-btn:hover {
    background-color: #45a049;
  }
  
  .apply-filter-btn {
    background-color: #008556;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .apply-filter-btn:hover {
    background-color: #45a049;
  }
  
  .filter-select{
    color:white !important;
  }
  
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  </style>
  