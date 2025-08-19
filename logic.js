/*** LOGIC.JS ***
 * Ce fichier contient toute la logique métier :
 * ajout/suppression de transactions, calcul des montants, génération d'IDs, etc.
 * Aucune manipulation du DOM ici.
 **/

let transactionIDCounter = 1; // compteur pour générer des IDs uniques pour les transactions

/**
 * Ajoute une transaction à une enveloppe.
 * Si la date n'est pas fournie, prend la date du jour.
 *
 * @param {Object} enveloppe - L'enveloppe cible à modifier.
 * @param {number} montant - Montant de la transaction (positif ou négatif)
 * @param {string} commentaire - Commentaire de la transaction
 * @param {string} [date] - Date au format YYYY-MM-DD (optionnelle)
 */
export function ajouterTransaction(enveloppe, montant, commentaire, givenDate) {
  //TODO: gérer le côté optionnel de la variable date (qui est actuellement absente)
  const date = givenDate || new Date().toLocaleString('fr-FR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }).replace(',', '');

  const nouvelleTransaction = {
    id: ++transactionIDCounter, // génère un ID unique
    date,
    montant,
    commentaire
  };

  enveloppe.transactions.push(nouvelleTransaction);

  // Met à jour le montant actuel de l'enveloppe
  enveloppe.montant_actuel += montant;
}

/**
 * Supprime une transaction d'une enveloppe.
 *
 * @param {Object} enveloppe - L'enveloppe cible
 * @param {number} transactionID - ID de la transaction à supprimer
 * @returns {boolean} - True si suppression réussie, false sinon
 */
export function supprimerTransaction(enveloppe, transactionID) {
  const index = enveloppe.transactions.findIndex(t => t.id === transactionID);
  if (index === -1) return false;

  const montant = enveloppe.transactions[index].montant;
  enveloppe.transactions.splice(index, 1);

  // Met à jour le montant actuel de l'enveloppe
  enveloppe.montant_actuel -= montant;

  return true;
}

/**
 * Rempli chaque enveloppes pour que son montant actuel soit égal à son budget initial.
 * @param {Object} enveloppes - Liste des enveloppes à remplir.
 * @param {string} commentaire - Commentaire utiliser pour le remplissage. (optionelle)
 */
export function remplirEnveloppes(enveloppes, commentaire) {
    // Par défaut la valeur utilisée pour le commentaire est,
    if (!commentaire){
      // "Jour de paie !"
      commentaire = "Jour de paie !"
    }

    //Pour chaque enveloppes,
    enveloppes.forEach(env => {
      // calculer le montant manquant pour compléter l'enveloppe,
      let complement = env.montant_initial - env.montant_actuel;
      // et l'ajouter à l'enveloppe.
      ajouterTransaction(env, complement, commentaire)
    });
}