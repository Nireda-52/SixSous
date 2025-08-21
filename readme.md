# Principe
SixSous est une application permettant de mettre en pratique la "méthode des enveloppes", méthode de gestion de budget, appliqué au dépenses numériques.

# En cours
Mettre en place la base de données dans Supabase

# Dépendances
Voici les dépendances qui peuvent être nécessaire pour installer le projet :
* Node.Js
    * Utilisé pour faire fonctionner la partie serveur
    * Installer Node.Js sur sa machine (via leur site internet)
    * Installer better-sqlite3 (pour pouvoir créer la bdd)
    * Installer Express (pour pouvoir lancer le serveur)
    * Installer CORS et l'intégrer dans le fichier server.js (utile pour éviter les erreurs de type adresse non autorisée)
    * Lancer le serveur avec  > node .\server\server.js
* SqlLite Extension (VsCode)
    * Je recommande de l'installer pour pouvoir intéragir directement avec la base de donnée sans avoir à passer par l'application (très utile pour le débug)


# Features possibles
* Avoir un form tout en haut pour rajouter une dépense dans n'importe quelle enveloppe (via dropdown)
* Pourvoir rajouter une enveloppe
* Passer à un format BDD pour permettre d'avoir un fonctionnement Front-End / Back-End.
* Changer le fonctionnement au niveau des transaction. Avoir des "périodes" sur laquelle on enregistre des transaction. La période correspond à un mois de gestion. Dans la pratique un mois peut déborder de quelques jours (Le temps que la paie arrive ou que l'on prenne le temps de faire la passation), c'est pour ça qu'on gère les transaction sur des périodes.
* Créer une barre d'avancement avec un pourcentage qui montre à quel point tu as utilisé une enveloppe. On pourrait aussi définir un indicateur pour savoir si tu as dépensé plus que ce qu'il ne le fallait à la jourénée ou à la semaine. La barre affiche le pourcentage et la couleur indique si tu es vert(large en budg), jaune(dans les clous mais attention), rouge(y'a du dépassement, à surveiller).

# Rappel des bonnes règles de commit
|Commit Name|Description|
|-----------|:----------|
| feat      | Nouvelle fonctionnalité|
| fix	    | Correction de bug|
| docs	    | Documentation unment|
| style	    | Changement de style (indentation, virgules...)|
| refactor	| Refactoring de code sans changer le comportement|
| test	    | Ajout ou modif de tests|
| chore	    | Tâches diverses (CI/CD, dépendances...)|