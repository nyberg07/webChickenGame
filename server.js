// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // frontend-filer i /public

// Fil för highscores
const FILE = path.join(__dirname, 'highscores.json');

// GET /api/highscores - hämta highscore
app.get('/api/highscores', (req, res) => {
  const data = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : {};
  res.json(data);
});

// POST /api/highscores - spara vinst
app.post('/api/highscores', (req, res) => {
  const name = req.body.name || 'Unknown';
  const data = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : {};
  data[name] = (data[name] || 0) + 1;
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json(data);
});

// Starta server
app.listen(PORT, () => console.log(`Server körs på http://localhost:${PORT}`));
