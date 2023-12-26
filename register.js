const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, 'user.json');

// Lese die Benutzerdaten aus der Datei
let users = [];

if (fs.existsSync(userFilePath)) {
  const fileContent = fs.readFileSync(userFilePath, 'utf-8');
  users = JSON.parse(fileContent);
}

// Funktion zur Generierung von IDs
function generateUserId() {
  // Ermittle die höchste vorhandene ID
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

  // Erstelle eine neue ID, indem 1 zur höchsten ID addiert wird
  return maxId + 1;
}

router.post('/', (req, res) => {
  const userData = req.body;

  // Überprüfe, ob der Benutzername bereits existiert
  const usernameExists = users.some(user => user.username === userData.username);

  // Überprüfe, ob die E-Mail-Adresse bereits existiert
  const emailExists = users.some(user => user.email === userData.email);

  if (usernameExists) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  if (emailExists) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }

  // Füge die generierte ID zum Benutzerdaten hinzu
  userData.id = generateUserId();

  // Hier sollte die Logik zur Speicherung der Benutzerdaten stehen
  users.push(userData);

  // Speichere die aktualisierten Benutzerdaten in der Datei
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf-8');

  res.json({ success: true, message: 'User registered successfully', user: userData });
});

module.exports = router;
