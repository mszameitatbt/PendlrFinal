<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Kontaktpopup in der Fußzeile jeder Seite. Hier wird angegeben, wo man sich hinwenden kann/bzw. wie man uns als Entwickllerteam erreichen kann! Es wurde so gestaltet, dass ein anonymes Kontaktformular nicht exisitiert, um Abusing auszuschließen! -->

<template>
    <div
      v-if="isKontaktPopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closePopup" class="close-btn">✖</button>
        <h2>Kontakt</h2>
      </div>
      <h1>Kontaktinformationen</h1>
  
      <hr>
      <!-- Kontaktinformationen -->
      <h2>Bei Fragen oder Anmerkungen wenden Sie sich persönlich an 
        <a href="mailto:Michl.Szameitat@uni-bayreuth.de">das Entwicklerteam</a>.
      </h2>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isKontaktPopupOpen: Boolean,
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  
  <style scoped>
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    padding: 20px;
    background: #333;
    border-radius: 10px;
    width: 500px;
    color: white;
    text-align: center;
    max-height: 80vh;
    overflow-y: auto;
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

  a {
  color: #ADD8E6 !important; /* Zwingt die helle Blaue Farbe für Links */
}
</style>
