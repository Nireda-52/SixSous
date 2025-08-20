/*** UI.JS ***
  * Ce fichier regroupe toute fonction qui:
    * affecte le DOM de la page HTML,
    * affecte les class CSS de la page,
    * est appelée par les composant UI.
  * Les fonctions présentes ne doivent pas touché directement à la donnée, ce sont les fonctions de logic.js qui s'en chargent.
  * L'objectif est d'anticipé une migration en client/serveur ou les données ne pourront pas être manipulés directement par le front.
***/

//Import des fonctions de logique (backend)
import * as Logic from "./logic.js";

const PARAMS = {
  confirmationNecessairePourSupprimerUneLigne: true,
  confirmationNecessairePourLeJourDePaie: true,
  commentaireObligatoirePourAjouterUneTransaction: false,
  proposeDeChoisirLeMontantDuneNouvelleEnveloppe: false,
  proposeDeChoisirLeNomDuneNouvelleEnveloppe: false
};


/**
 * TODO : Commentaire JSDoc à améliorer
 * Affiche toutes les enveloppes et leurs transactions dans le DOM.
 * Cette fonction vide le conteneur principal et le remplit avec les enveloppes
 * provenant de l'objet data passé en paramètre.
 * 
 * @param {Object} data - L'objet contenant les enveloppes à afficher
 * @param {Array} data.enveloppes - Liste des enveloppes
 * @param {number} data.enveloppes[].id - Identifiant unique de l'enveloppe
 * @param {string} data.enveloppes[].nom - Nom de l'enveloppe
 * @param {number} data.enveloppes[].montant_actuel - Montant actuel de l'enveloppe
 * @param {number} data.enveloppes[].montant_initial - Montant initial de l'enveloppe
 * @param {Array} data.enveloppes[].transactions - Liste des transactions associées
 * @param {number} data.enveloppes[].transactions[].id - Identifiant de la transaction
 * @param {string} data.enveloppes[].transactions[].date - Date de la transaction
 * @param {number} data.enveloppes[].transactions[].montant - Montant de la transaction
 * @param {string} data.enveloppes[].transactions[].commentaire - Commentaire associé
 * @returns {void} - Ne retourne rien, met à jour uniquement le DOM
 */
export function afficherEnveloppes(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  data.enveloppes.forEach(env => {
    const div = document.createElement("div");
    div.className = "enveloppe";

    const classeMontant = env.montant_actuel >= 0 ? "positif" : "negatif";

    div.innerHTML = `
      <h2>${env.nom}</h2> 
      <p>Montant actuel : 
        <span class="montant ${classeMontant}">
          ${env.montant_actuel.toFixed(2)} / ${env.montant_initial.toFixed(2)} €
        </span>
      </p>

      <h3>Transactions :</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Montant</th><th>Commentaire</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${env.transactions.map(t => `
            <tr>
              <td>${t.date}</td>
              <td><span class="montant ${t.montant >= 0 ? 'positif' : 'negatif'}">${t.montant} €</span></td>
              <td>${t.commentaire}</td>
              <td>
                <button class="erase" data-env="${env.id}" data-id="${t.id}">X</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <form data-env="${env.id}">
        <input type="number" step="0.01" name="montant" placeholder="Montant" required>
        <input type="text" name="commentaire" placeholder="Commentaire" ${PARAMS.commentaireObligatoirePourAjouterUneTransaction ? "required" : ""}>
        <button type="submit">Ajouter</button>
      </form>
    `;

    app.appendChild(div);
  });
}

/**
 * TODO : Améliorer les commentaire et creuser le principe de callback via refreshFn
 * @param {Object} data - L'objet contenant les enveloppes à afficher
 * @param {*} refreshFunction - Callback pour relancer la fonction de rendu mère.
 */
export function brancherEvenements(data, refreshFunction) {
  const app = document.getElementById("app");

  // Ajouter une transaction
  app.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const id = parseInt(form.dataset.env);
      const env = data.enveloppes.find(e => e.id === id);

      const montant = parseFloat(form.montant.value);
      const commentaire = form.commentaire.value;

      Logic.ajouterTransaction(env, montant, commentaire);
      refreshFunction(); // callback pour re-render
    });
  });

  // Supprimer une transaction
  app.querySelectorAll("button.erase").forEach(btn => {
    btn.addEventListener("click", () => {
      if(PARAMS.confirmationNecessairePourSupprimerUneLigne){
        const confirmer = window.confirm("Voulez-vous vraiment supprimer cette transaction ?");
        if (!confirmer) return; // arrêt si annulation
      }

      const env = data.enveloppes.find(e => e.id === parseInt(btn.dataset.env));
      Logic.supprimerTransaction(env, parseInt(btn.dataset.id));
      refreshFunction(); // callback pour re-render
    });
  });

  document.querySelectorAll("button.TestBack").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = document.querySelector("#result");
      fetch('http://localhost:3000/test')
        .then(res => res.json())
        .then(data => {
          result.textContent = data.message;
        })
        .catch(err => {
          result.textContent = 'Erreur : ' + err;
        });
    });
  });
}

export function brancherJourDePaie(data, refreshScreen) {
  const btn = document.querySelector("button.JourDePaie");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if(PARAMS.confirmationNecessairePourLeJourDePaie){
      const confirmer = window.confirm("Voulez-vous vraiment remplir toutes les enveloppes ?");
      if (!confirmer) return; // arrêt si annulation
    }
    
    Logic.remplirEnveloppes(data.enveloppes)
    refreshScreen();
  });
}


//TODO : mettre une valeur par défaut pour budget.
export function ajouterEnveloppe(data, refreshScreen) {
  const btn = document.querySelector("div.add-enveloppe");
  if (!btn) return;

  btn.addEventListener("click", () => {
    let nom = "Nouvelle enveloppe";
    let budget = "150";
    if(PARAMS.proposeDeChoisirLeNomDuneNouvelleEnveloppe){
      nom = window.prompt("Quel nom souhaitez vous donner à votre enveloppe ?");
      if (!nom) return; // arrêt si annulation ou vide
    }

    if(PARAMS.proposeDeChoisirLeMontantDuneNouvelleEnveloppe){
      let budget = window.prompt("Quel budget souhaitez vous allouer à cette enveloppe ? (100€ par défaut)");
      if (!budget) return; // arrêt si annulation ou vide
    }

    Logic.creerEnveloppe(data.enveloppes, nom, Number(budget));
    refreshScreen();
  });
}

