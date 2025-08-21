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

// Retournes les informations de toutes les enveloppes
app.get('/enveloppes', (req, res) => {
  try {
      const stmt = db.prepare('SELECT * FROM enveloppes');
      const enveloppes = stmt.all(); // récupère toutes les lignes
      res.json(enveloppes); // renvoie en JSON
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

//  Retourne les infos d'une seule enveloppe
app.get('/enveloppes/:id', (req, res) => {
  try {
    const enveloppeId = req.params.id;

    const stmt = db.prepare('SELECT * FROM enveloppes WHERE id = @id');
    const enveloppes = stmt.get({id: enveloppeId});
    if (!enveloppes) {
        return res.status(404).json({ error: 'Enveloppe non trouvée' });
    }
    res.json(enveloppes); // renvoie en JSON
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

//  Retourne toutes les transaction d'une seule enveloppe
app.get('/enveloppes/:id/transactions', (req, res) => {
  try {
    const enveloppeId = req.params.id;

    const stmt = db.prepare('SELECT * FROM transactions WHERE enveloppe_id = @id ORDER BY date DESC');
    const transactions = stmt.all({ id: enveloppeId});
    res.json(transactions); // renvoie en JSON
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Route test pour le front
app.get('/test', (req, res) => {
  res.json({ message: 'Hello depuis le back !' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});