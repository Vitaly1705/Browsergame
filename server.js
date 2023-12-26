const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRouter = require('./register'); 
const loginRouter = require('./login'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use('/register', registerRouter); 
app.use('/login', loginRouter);

const textArray = [];
let idCounter = 1;

app.get('/text', (req, res) => {
  const formattedTextArray = textArray.map(entry => ({
    id: entry.id,
    user: entry.user,
    text: entry.text,
    timestamp: entry.timestamp,
    time: entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  res.json({ textArray: formattedTextArray });
});

app.post('/text', (req, res) => {
  const { id, user, text } = req.body;

  if (id && user && text) {
    const timestamp = new Date();
    const entry = { id, user, text, timestamp, time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    textArray.push(entry);
    res.json({ success: true, textArray }); // Hier haben wir formattedTextArray durch textArray ersetzt
  } else {
    res.status(400).json({ success: false, message: 'ID, Benutzer oder Text fehlen im Anfragekörper.' });
  }
});

app.post('/register', (req, res) => {
  const result = registerUser(req.body);

  if (result.error) {
    res.status(400).json({ success: false, message: result.error });
  } else {
    res.json({ success: true, message: result.message });
  }
});

app.post('/login', (req, res) => {
  const result = loginUser(req.body);

  if (result.error) {
    res.status(401).json({ success: false, message: result.error });
  } else {
    res.json({ success: true, message: result.message, token: result.token });
  }
});

setInterval(() => {
  if (textArray.length > 0) {
    console.log('TextArray wird nach 2 Stunden geleert.');
    textArray.length = 0;
    idCounter = 1; // Setze den Zähler zurück
  }
}, 1 * 60 * 60 * 1000); // 2 Stunden in Millisekunden



app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
