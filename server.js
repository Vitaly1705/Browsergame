// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const textArray = [];
let idCounter = 1;

app.get('/text', (req, res) => {
  res.json({ textArray });
});

app.post('/text', (req, res) => {
  const { id, user, text } = req.body;

  if (id && user && text) {
    const entry = { id, user, text, timestamp: new Date() };
    textArray.push(entry);
    res.json({ success: true, textArray });
  } else {
    res.status(400).json({ success: false, message: 'ID, Benutzer oder Text fehlen im Anfragekörper.' });
  }
});

setInterval(() => {
  if (textArray.length > 0) {
    console.log('TextArray wird nach 2 Stunden geleert.');
    textArray.length = 0;
    idCounter = 1; // Setze den Zähler zurück
  }
}, 2 * 60 * 60 * 1000); // 2 Stunden in Millisekunden

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
