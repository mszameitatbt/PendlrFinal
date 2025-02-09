<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das FAQPoup der Fußzeile auf jeder Seite. Hier kann der Nutzer auf jeder Seite nochmal nachschauen, wie man was gestaltet. Die FAQs wurden dabei von Usertests und von eigenen Gedanken bzw. Usererfahrungen inspiriert!-->

<template>
    <div
      v-show="isFAQPopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closePopup" class="close-btn">✖</button>
        <h2>FAQ</h2>
      </div>
      <h1>Frequently Asked Questions rund um die Pendlr-App</h1>
  
      <hr>
  
      <h2>1. Wie funktioniert die App?</h2>
      <div>
        <p>1.1 Sie können nach erfolgreicher Registrierung und/oder Login folgende Optionen wählen:</p>
        <p><strong>Ich suche</strong> Sie suchen eine kostenlose Fahrgemeinschaft, um an einem bestimmten Datum zu Ihrem Ziel zu kommen.</p>
        <p><strong>Ich fahre</strong> Sie bieten eine kostenlose Fahrgemeinschaft, um an einem bestimmten Datum Ihre Fahrdienste gemeinnützig anzubieten.</p>
        <p><strong>Ich suche & fahre</strong> Sie suchen und bieten eine kostenlose Fahrgemeinschaft, um an einem bestimmten Datum Ihre Fahrdienste gemeinnützig anzubieten sowie diese zu nutzen.</p>
      </div>
  
      <hr>
  
      <h2>2. Ist die Nutzung der Plattform kostenlos?</h2>
      <p>2.1 Für jeden Anwender ist die Plattform kostenlos und enthält keine versteckten Kosten! Ebenso ist es vorgesehen, dass die angebotenen Fahrgemeinschaften auf dem Grundsatz der Gemeinnützigkeit sowie der Solidarität basieren und damit eine effizientere Nachhaltigkeit im Straßenverkehr ermöglichen.</p>
  
      <hr>
  
      <h2>3. Wer kann die Plattform nutzen?</h2>
      <p>3.1 Jeder Angehörige der UBT, sofern dieser eine @uni-bayreuth.de Mail-Adresse besitzt.</p>
  
      <hr>
  
      <h2>4. Warum muss ich ein Profil erstellen?</h2>
      <p>4.1 Um die anschließende Matchingfunktion mit anderen zu nutzen, sind Profile notwendig, da diese alle wichtigen Attribute enthalten und nur so sicher gestellt werden kann, dass das Prinzip des Matchens funktioniert!</p>
  
      <hr>
  
      <h2>5. Sind meine persönlichen Daten sicher?</h2>
      <p>5.1 Hierfür ist ein Blick in die Datenschutzrichtlinie ausreichend. Kurzgesagt: Ja! Pendlr schützt Ihre persönlichen Daten mit äußerster Sorgfalt und Vorsicht!</p>
  
      <hr>
  
      <h2>6. Wie wird die Sicherheit während der Fahrt gewährleistet?</h2>
      <p>6.1 Weisen Sie den Fahrer stets auf Achtsamkeit und die geltenden Vorschriften im Verkehr hin. Sofern Sie sich zu unsicher fühlen, bitten Sie den Fahrer anzuhalten.</p>
  
      <hr>
  
      <h2>7. Kann ich unangemessenes Verhalten melden? </h2>
      <p>7.1 Sie können jederzeit über die Kontaktinformation (Fußzeile) mit uns persönlich in Kontakt treten. Nennen Sie hierzu uns den Profilnamen und alle verfügbaren Informationen.</p>
  
      <hr>
  
      <h2>8. Kann ich eine Mitfahrgelegenheit stornieren?</h2>
      <p>8.1 Ja. Unter dem Menüpfad: Einstellungen/Meine Fahrten/Beifahrer können Sie eine Fahrt bis 30 Minuten vor Fahrtantritt stornieren! Bitte kontaktieren Sie unverzüglich danach den Fahrer persönlich!</p>
  
      <hr>
  
      <h2>9. Was passiert, wenn mein Fahrer/Mitfahrer absagt?</h2>
      <p>9.1 Sofern Kontakt mit dem Fahrer/Mitfahrer besteht, sollten Sie sich stets vor Fahrtantritt nochmals um die Zusage der jeweiligen Personen kümmern. Des Weiteren wird im System der Beifahrer aus der bevorstehenden Fahrt eliminiert, wodurch dieser keine Belohnung erhält</p>
  
      <hr>
  
      <h2>10. Kann ich spontane Fahrten organisieren?</h2>
      <p>10.1 Grundsätzlich ja, jedoch ist dafür die Voraussetzung, dass im gleichen Moment andere Nutzer online sind und ebenso eine spontane Fahrt mit der gleichen Strecke benötigen!</p>
  
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isFAQPopupOpen: Boolean,
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

  