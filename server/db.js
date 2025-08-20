// Ce fichier permet d'instancier la base de donnée une première fois en créant les table si ce n'est pas déjà fait.

// server/db.js
const Database = require('better-sqlite3');

// Crée ou ouvre la base SQLite
const db = new Database('./sixsous.db');

// Création des tables si elles n'existent pas
db.exec(`
  CREATE TABLE IF NOT EXISTS enveloppes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    montant_initial REAL NOT NULL,
    montant_actuel REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enveloppe_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    montant REAL NOT NULL,
    commentaire TEXT,
    FOREIGN KEY (enveloppe_id) REFERENCES enveloppes(id) ON DELETE CASCADE
  );
`);

module.exports = db;