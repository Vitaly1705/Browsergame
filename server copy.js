const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importiere das cors-Paket

const app = express();
const port = 3000;

// Middleware für das Parsen von JSON-Daten
app.use(bodyParser.json());

// CORS-Middleware hinzufügen
app.use(cors());

// Array für die Speicherung von Textdaten
const textArray = [];

// GET-Methode: Gibt den aktuellen Array zurück
app.get('/text', (req, res) => {
  res.json({ textArray });
});

// POST-Methode: Fügt Text zum Array hinzu und gibt den aktualisierten Array zurück
app.post('/text', (req, res) => {
  const newText = req.body.text;

  if (newText) {
    textArray.push(newText);
    res.json({ success: true, textArray });
  } else {
    res.status(400).json({ success: false, message: 'Text fehlt im Anfragekörper.' });
  }
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
