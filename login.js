const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const usersFilePath = './users.json';

function readUsers() {
  try {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function loginUser({ username, password }) {
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (user) {
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
      return { message: 'Login successful', token };
    } else {
      return { error: 'Invalid credentials' };
    }
  } else {
    return { error: 'Invalid credentials' };
  }
}

module.exports = loginUser;
