<!--Code by Pendlr - Team
    Angepasst von ChatGPT
    Codebeschreibung: Dieser Code repräsentiert das Datenschutzpopup in der Fußzeile. Anmerkung: Aufgrund von oberster Anweisung (Prof. Dr. Tittlbach) ist hier kaum Eigenleistung reingeflossen, jediglich der "neue" Datenschutzbeauftrage der Uni wurde als korrekter Ansprechpartner festgelgt. Einen wirklich juristisch bindenden Text dürfen wir als "Nicht-Juristen" gar nicht verfassen! -->

<template>
    <div
      v-if="isDatenschutzPopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closePopup" class="close-btn">✖</button>
        <h2>Datenschutz</h2>
      </div>
      <h1>Datenschutzrichtlinie für die Nutzung der Pendlr-App</h1>
  
      <hr>
  
      <h2>1. Verantwortlicher</h2>
      <p>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG) ist:</p>
      <p><strong>Universität Bayreuth</strong><br>
        Universitätsstraße 30<br>
        95447 Bayreuth<br>
        Deutschland<br>
        E-Mail: <a href="mailto:Datenschutz@uni-bayreuth.de">Datenschutz@uni-bayreuth.de</a>
      </p>
  
      <hr>
  
      <h2>2. Erhobene Daten</h2>
      <p>Wir erheben, verarbeiten und nutzen personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Bestimmungen. Folgende Daten werden in der App erfasst:</p>
  
      <h3>Registrierung und Login:</h3>
      <ul>
        <li>Vorname, Nachname</li>
        <li>E-Mail-Adresse (z. B. vorname.nachname@uni-bayreuth.de)</li>
        <li>Passwort (verschlüsselt)</li>
      </ul>
  
      <h3>Nutzung der App:</h3>
      <ul>
        <li>Standortdaten (optional und nur mit Ihrer Zustimmung)</li>
        <li>Informationen zu Fahrgemeinschaften und geteilten Fahrten</li>
        <li>Interaktionen innerhalb der App (z. B. Match-Daten)</li>
      </ul>
  
      <h3>Technische Daten:</h3>
      <ul>
        <li>IP-Adresse</li>
        <li>Gerätetyp und Betriebssystem</li>
        <li>App-Nutzungsverhalten (z. B. Fehlerprotokolle)</li>
      </ul>
  
      <hr>
  
      <h2>3. Zweck der Verarbeitung</h2>
      <p>Die erhobenen Daten dienen folgenden Zwecken:</p>
      <ul>
        <li>Bereitstellung der grundlegenden Funktionen der App (z. B. Vermittlung von Fahrgemeinschaften).</li>
        <li>Verbesserung der App und Behebung technischer Probleme.</li>
        <li>Erfüllung gesetzlicher Verpflichtungen.</li>
        <li>Kommunikation mit Nutzern, z. B. bei Support-Anfragen.</li>
      </ul>
  
      <hr>
  
      <h2>4. Rechtsgrundlagen der Datenverarbeitung</h2>
      <p>Die Verarbeitung Ihrer Daten erfolgt auf Basis der folgenden Rechtsgrundlagen:</p>
      <ul>
        <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung): Verarbeitung von Standortdaten und für nicht-essenzielle Funktionen der App.</li>
        <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragserfüllung): Bereitstellung der App-Dienste.</li>
        <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> (gesetzliche Verpflichtungen): Speicherung von Daten zur Erfüllung steuer- oder handelsrechtlicher Pflichten.</li>
        <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigte Interessen): Verbesserung der App und Analyse des Nutzungsverhaltens.</li>
      </ul>
  
      <hr>
  
      <h2>5. Speicherdauer</h2>
      <p>Wir speichern Ihre Daten nur so lange, wie dies für die jeweiligen Verarbeitungszwecke erforderlich ist. Nach Wegfall des Zwecks oder Widerruf Ihrer Einwilligung werden Ihre Daten gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.</p>
  
      <hr>
  
      <h2>6. Weitergabe von Daten</h2>
      <p>Eine Weitergabe Ihrer Daten erfolgt ausschließlich:</p>
      <ul>
        <li>an Drittanbieter, die uns bei der Bereitstellung der App unterstützen (z. B. Hosting-Anbieter). Diese Drittanbieter sind vertraglich verpflichtet, Ihre Daten gemäß den gesetzlichen Anforderungen zu schützen.</li>
        <li>bei gesetzlicher Verpflichtung, z. B. an Strafverfolgungsbehörden.</li>
      </ul>
  
      <hr>
  
      <h2>7. Ihre Rechte</h2>
      <p>Sie haben das Recht:</p>
      <ul>
        <li>Auskunft über die Verarbeitung Ihrer Daten zu verlangen (Art. 15 DSGVO).</li>
        <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO).</li>
        <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO), soweit keine gesetzlichen Pflichten entgegenstehen.</li>
        <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO).</li>
        <li>die Übertragbarkeit Ihrer Daten zu verlangen (Art. 20 DSGVO).</li>
        <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen (Art. 21 DSGVO).</li>
      </ul>
      <p>Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an:</p>
      <p><strong>E-Mail:</strong> <a href="mailto:Datenschutz@uni-bayreuth.de">Datenschutz@uni-bayreuth.de</a></p>
  
      <hr>
  
      <h2>8. Widerruf der Einwilligung</h2>
      <p>Sie können Ihre Einwilligung zur Verarbeitung personenbezogener Daten jederzeit mit Wirkung für die Zukunft widerrufen. Senden Sie hierfür eine Nachricht an:</p>
      <p><strong>E-Mail:</strong> <a href="mailto:Datenschutz@uni-bayreuth.de">Datenschutz@uni-bayreuth.de</a></p>
  
      <hr>
  
      <h2>9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
      <p>Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren. In Deutschland ist dies z. B.:</p>
      <p><strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br>
        Promenade 27 (Schloss)<br>
        91522 Ansbach<br>
        Telefon: +49 981 53 1300<br>
        E-Mail: <a href="mailto:poststelle@lda.bayern.de">poststelle@lda.bayern.de</a>
      </p>
  
      <hr>
  
      <h2>10. Datensicherheit</h2>
      <p>Wir verwenden technische und organisatorische Maßnahmen, um Ihre Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen. Diese Maßnahmen werden regelmäßig überprüft und an den Stand der Technik angepasst.</p>
  
      <hr>
  
      <h2>11. Änderungen dieser Datenschutzerklärung</h2>
      <p>Diese Datenschutzerklärung kann von Zeit zu Zeit aktualisiert werden, um Änderungen an der App oder rechtliche Vorgaben zu berücksichtigen. Die aktuelle Version ist jederzeit in der App abrufbar.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isDatenschutzPopupOpen: Boolean,
    },
    methods: {
      closePopup() {
        this.$emit('close');
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
  