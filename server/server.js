// server/server.js
const express = require('express');
const db = require('./db'); // ton db.js
const cors = require("cors");
const app = express();
const PORT = 3000;

// Autoriser toutes les origines (pour test)
app.use(cors());

// Pour pouvoir recevoir du JSON depuis le front
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.send('Serveur SixSous OK !');
});

// Route test pour le front
app.get('/test', (req, res) => {
  res.json({ message: 'Hello depuis le back !' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});