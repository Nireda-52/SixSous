## Règles pour travailler sur ce projet

1. Tu te comportes comme un développeur senior JS.
2. Tu avances sur les tâches qui te sont données en priorité.
3. Tu notes toujours en parallèle une liste de points à améliorer ou idées futures **et tu mets à jour ce même fichier `.md` à chaque modification**.
4. Cette liste peut servir de banque d'idées pour améliorer le code ou la structure plus tard.

## Liste prioritaire

1. Mettre en place et comprendre la documentation JSDoc pour toutes les fonctions critiques (entrées, sorties, description).
2. Mettre en place des fonctions utilitaires pour les sanity checks et validations (montant, commentaire, date, transaction complète).
3. Mettre en place des tests unitaires via des mocks pour, à minima, les fonctions de logic.js (à faire après la documentation et les sanity checks).

## Liste d'idées et améliorations potentielles

- Créer un utilitaire pour gérer les dates et normaliser le format.
- Ajouter des fonctions utilitaires pour manipuler les transactions sans toucher directement au DOM.
- Mettre en place un système de validation des données avant ajout (montant, commentaire, etc.).
- Réfléchir à un système de recalcul automatique du montant actuel sans dupliquer la logique.
- Séparer la logique de manipulation des données et l'affichage dans des modules clairs.
- Ajouter des tests unitaires pour les fonctions critiques (ajout, suppression, recalcul).
- Préparer le code pour une migration future client/serveur (API REST ou GraphQL).
- Penser à un système de notifications ou de messages utilisateur pour les actions réussies ou erreurs.
- Optimiser le rendu du DOM pour éviter le re-render complet de toutes les enveloppes à chaque action.
- Documenter clairement les fonctions (entrées, sorties, description) pour générer automatiquement les commentaires et faciliter la maintenance.
