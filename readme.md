# Principe
SixSous est une application permettant de mettre en pratique la "méthode des enveloppes", méthode de gestion de budget, appliqué au dépenses numériques.

# Journal de bord 

> 15/08/25 : Une bonne avancé sur le projet, on peut maintenant supprimer des lignes d'une enveloppe. Je suis capable de comprendre la majeure partie du code et de le modifier sans soucis _preuve en est avec le développement de cette nouvelle feature_. Pour l'instant je pense que je ne vais garder l'appplication qu'en HTML/CSS/JS. J'envisagerais de passer sur un framework seulement si c'est nécessaire ou que l'appli devient trop lourde. Se remémorer les bases ne fera jamais de mal, et c'est une façon d'apprendre comment marchent certaines fonctionnalités que l'on utilise tous les jours dans des librairies Front.
*Prochain objectif*, connecter la BDD pour avoir des données permanente. 

# Features possibles
* Rajouter un champ date et heure, si l'utilisateur ne le renseigne pas, prendre la date du jour.
* Mettre une popup de confirmation avant de supprimer une transaction (popup qui propose par défaut l'action annulée).
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