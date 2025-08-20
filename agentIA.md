# Projet Budget - Système d'Enveloppes

## Règles pour travailler sur ce projet

1. Se comporter comme un développeur senior JS.
2. Avancer sur les tâches prioritaires données.
3. Noter en parallèle une liste de points à améliorer ou idées futures **et mettre à jour ce fichier `.md` à chaque modification**.
4. Cette liste servira de banque d'idées pour améliorer le code ou la structure plus tard.

---

## Objectifs immédiats

1. Créer les routes API pour envoyer/récupérer les données entre front et back.
2. Reprendre dans le back les fonctions actuelles de `logic.js` du front pour centraliser la logique métier côté serveur.
3. Créer une base de données standard avec quelques exemples pour pouvoir démarrer les tests.
4. Mettre en place un système pour tester les fonctions unitaires (notamment côté back) via des mocks.
5. Documenter toutes les fonctions critiques avec JSDoc (entrées, sorties, description).

---

## Répartition Front / Back

### Front-end

- S'occupe de l'affichage et des interactions utilisateur.
- Ne contient **plus la logique métier** (calculs, validation des transactions).
- Envoie les données saisies via `fetch` à des routes API.
- Reçoit les résultats pour mettre à jour le DOM.
- Exemple : clic sur "Ajouter transaction" → envoie POST `/api/enveloppes/:id/transactions` → affiche le résultat.

### Back-end

- Gère la logique métier et la persistance des données.
- Valide toutes les données avant insertion (montant, commentaire, date, etc.).
- Stocke les données dans la base SQLite (ou autre base choisie).
- Expose les routes API REST pour CRUD enveloppes et transactions.
- Exemple de flux :
  1. Front envoie JSON `{montant, commentaire}`.
  2. Back valide, calcule si nécessaire, insère en base.
  3. Back renvoie au front la transaction créée avec son ID et date.
- Toutes les fonctions de `logic.js` seront progressivement transférées côté serveur.

---

## Liste prioritaire

1. Documentation JSDoc pour toutes les fonctions critiques.
2. Fonctions utilitaires pour sanity checks et validations.
3. Tests unitaires via mocks pour les fonctions critiques (ajout, suppression, recalcul).
4. Mise en place des routes API et tests manuels pour vérification.
5. Préparer la base de données initiale avec exemples.

---

## Liste d'idées et améliorations potentielles

- Utilitaire pour gérer les dates et normaliser le format.
- Fonctions utilitaires pour manipuler les transactions sans toucher directement au DOM.
- Validation des données côté back avant ajout (montant, commentaire, etc.).
- Système de recalcul automatique du montant actuel sans dupliquer la logique.
- Séparer clairement logique métier et affichage (modules distincts).
- Tests unitaires pour toutes les fonctions critiques.
- Préparer le code pour migration future client/serveur (API REST ou GraphQL).
- Notifications ou messages utilisateur pour actions réussies ou erreurs.
- Optimiser le rendu DOM pour éviter re-render complet.
- Documentation claire et générable automatiquement pour faciliter la maintenance.
- Penser à la gestion des erreurs côté front et back (codes HTTP, messages utilisateur).

---

## Points techniques importants

- Le front **ne fait que de la présentation et envoie les données**.
- Le back **gère la logique métier et la persistance**.
- Toutes les données critiques sont validées côté serveur.
- Les interactions front/back passent uniquement par les API.
- La base de données contient les enveloppes et transactions initiales.
- Chaque ajout ou modification passe par la logique serveur pour garantir cohérence et sécurité.

