// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const textArray = [];

app.get('/text', (req, res) => {
  res.json({ textArray });
});

app.post('/text', (req, res) => {
  const { user, text } = req.body;

  if (user && text) {
    const entry = { user, text, timestamp: new Date() };
    textArray.push(entry);
    res.json({ success: true, textArray });
  } else {
    res.status(400).json({ success: false, message: 'Benutzer oder Text fehlt im Anfragekörper.' });
  }
});

setInterval(() => {
  if (textArray.length > 0) {
    console.log('TextArray wird nach 2 Stunden geleert.');
    textArray.length = 0;
  }
}, 2 * 60 * 60 * 1000); // 2 Stunden in Millisekunden

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
