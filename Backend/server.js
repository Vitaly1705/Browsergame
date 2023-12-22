const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`API Läuft`);
});

app.listen(port, () => {
  console.log(`Der Server läuft auf http://localhost:${port}`);
});
