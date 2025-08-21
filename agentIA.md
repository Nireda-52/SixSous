# Projet Budget - Système d'Enveloppes

## Règles pour travailler sur ce projet

1. Se comporter comme un développeur senior JS.  
2. Avancer sur les tâches prioritaires données.  
3. Noter en parallèle une liste de points à améliorer ou idées futures **et mettre à jour ce fichier `.md` à chaque modification**.  
4. Cette liste servira de banque d'idées pour améliorer le code ou la structure plus tard.

---

## Objectifs immédiats

1. **Utiliser les endpoints auto-générés de Supabase** pour CRUD sur enveloppes et transactions afin de démarrer rapidement les tests front/back.  
2. Reprendre progressivement dans le back les fonctions actuelles de `logic.js` pour centraliser la logique métier côté serveur via Edge Functions ou backend custom si nécessaire.  
3. Créer une base de données standard avec quelques exemples pour pouvoir démarrer les tests.  
4. Mettre en place un système pour tester les fonctions unitaires (notamment côté back) via des mocks.  
5. Documenter toutes les fonctions critiques avec JSDoc (entrées, sorties, description).  

---

## Répartition Front / Back

### Front-end

- S'occupe de l'affichage et des interactions utilisateur.  
- Ne contient **plus la logique métier** (calculs, validation des transactions).  
- Envoie les données saisies via `fetch` à des routes API (Supabase auto-API pour l'instant).  
- Reçoit les résultats pour mettre à jour le DOM.  
- Exemple : clic sur "Ajouter transaction" → envoie POST `/enveloppes/:id/transactions` → affiche le résultat.

### Back-end

- Pour l'instant, on utilise **Supabase auto-API** pour la persistance et les opérations CRUD.  
- Plus tard, on pourra remplacer certaines routes par des **Edge Functions** ou un backend Node/Express custom pour gérer la logique métier complexe.  
- Valide toutes les données avant insertion (montant, commentaire, date, etc.).  
- Toutes les fonctions de `logic.js` seront progressivement transférées côté serveur.

---

## Liste prioritaire (mise à jour)

1. Mettre en place l’utilisation **des endpoints auto-générés Supabase** pour enveloppes et transactions.  
2. Tester manuellement les routes auto-générées via le front.  
3. Documentation JSDoc pour toutes les fonctions critiques côté serveur (Edge Functions ou futur backend).  
4. Fonctions utilitaires pour sanity checks et validations côté serveur.  
5. Mise en place des tests unitaires pour les fonctions critiques via mocks.  
6. Préparer la base de données initiale avec exemples pour tests front/back.  
7. Planifier la migration future vers un backend custom si besoin (Node/Express ou Edge Functions) pour centraliser la logique métier.  

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
- Le back (Supabase auto-API ou futur backend custom) **gère la logique métier et la persistance**.  
- Toutes les données critiques sont validées côté serveur.  
- Les interactions front/back passent uniquement par les API.  
- La base de données contient les enveloppes et transactions initiales.  
- Chaque ajout ou modification passe par la logique serveur pour garantir cohérence et sécurité.  
