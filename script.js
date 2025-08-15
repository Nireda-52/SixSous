let data;
const PARAMS = {
  confirmationNecessairePourSupprimerUneLigne: false
};

// Charger le JSON
fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    afficherEnveloppes();
  })
  .catch(err => console.error("Erreur de chargement du JSON :", err));

function afficherEnveloppes() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  data.enveloppes.forEach(env => {
    const div = document.createElement("div");
    div.className = "enveloppe";

    const classeMontant = env.montant_actuel >= 0 ? "positif" : "negatif";

    let transactionsHTML = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant</th>
            <th>Commentaire</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${env.transactions.map(t => `
            <tr>
              <td>${t.date}</td>
              <td><span class="montant ${t.montant >= 0 ? 'positif' : 'negatif'}">${t.montant} €</span></td>
              <td>${t.commentaire}</td>
              <td>
                <button class="erase" type="button" onclick="supprimerTransaction(${env.id}, ${t.id})">X</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    div.innerHTML = `
      <h2>${env.nom}</h2> 
      <p>Montant actuel : <span class="montant ${classeMontant}">${env.montant_actuel.toFixed(2)} / ${env.montant_initial.toFixed(2)} €</span></p>

      <h3>Transactions :</h3>
      ${transactionsHTML}

      <form onsubmit="ajouterTransaction(event, ${env.id})">
        <input type="number" step="0.01" name="montant" placeholder="Montant" required>
        <input type="text" name="commentaire" placeholder="Commentaire" required>
        <button type="submit">Ajouter</button>
      </form>
    `;
    app.appendChild(div);
  });
}

// TODO : Cette fonction n'est pas pratique parce qu'elle gère directement les valeurs du front. 
// Elle ne permet pas d'être réutilisé avec n'importe quel valeurs.
// A modifier.
function ajouterTransaction(e, enveloppeId) {
  e.preventDefault();
  const form = e.target;
  
  // Date du jour au format YYYY-MM-DD
  const date = new Date().toISOString().split('T')[0];
  
  const montant = parseFloat(form.montant.value);
  const commentaire = form.commentaire.value;

  const enveloppe = data.enveloppes.find(env => env.id === enveloppeId);
  const newId = enveloppe.transactions.length + 1;

  enveloppe.transactions.push({
    id: newId,
    date,
    montant,
    commentaire
  });

  enveloppe.montant_actuel += montant;

  afficherEnveloppes();
}

function supprimerTransaction(enveloppeId, transactionId) {
  const enveloppe = data.enveloppes.find(env => env.id === enveloppeId);
  const transaction = enveloppe.transactions.find(trans => trans.id === transactionId);

  // TODO cette façon de faire n'est pas très propre car on utilise deux fois le même bout de code. Il faudrait faire une sous-fonction pour éviter d'oublier de le modifier quelque part. 
  if(PARAMS.confirmationNecessairePourSupprimerUneLigne) {
    if (confirm("Vous êtes sur le point de supprimer la transaction [" + transaction.date + " " + transaction.montant + " € " + transaction.commentaire + "]. Confirmer ?")) {
      // Répercuter le montant sur l'enveloppe.
      enveloppe.montant_actuel -= transaction.montant;

      // Supprimer la transaction dans l'historique
      let index = enveloppe.transactions.findIndex(t => t.id === transactionId);
      enveloppe.transactions.splice(index, 1);

      console.log("Vous avez supprimé cette ligne : [" + transaction.date + " " + transaction.montant + " € " + transaction.commentaire + "] de l'enveloppe " + enveloppe.nom);

      afficherEnveloppes();
    }
  } else {
    // Répercuter le montant sur l'enveloppe.
      enveloppe.montant_actuel -= transaction.montant;

      // Supprimer la transaction dans l'historique
      let index = enveloppe.transactions.findIndex(t => t.id === transactionId);
      enveloppe.transactions.splice(index, 1);

      console.log("Vous avez supprimé cette ligne : [" + transaction.date + " " + transaction.montant + " € " + transaction.commentaire + "] de l'enveloppe " + enveloppe.nom);

      afficherEnveloppes();
  }
  
}

// TODO : rajouter des contrôle sur le type de paramètres passés en entrée.
// J'aimerais que le montant soit forcé en float mais mon IDE me dit que ce n'est possible qu'en TS. 
// Il faudra passé sur ce langage dans ce cas.
function ajouterTransactionWithData(enveloppe, montant, commentaire){
  const date = new Date().toISOString().split('T')[0];
  const newId = enveloppe.transactions.length + 1;
  enveloppe.transactions.push({
    id: newId,
    date,
    montant,
    commentaire
  });
  enveloppe.montant_actuel += montant;
}

function activerJourDePaie() {
  if (confirm("Vous êtes sur le point de remplir toutes vos enveloppes. Confirmer ?")) {
    console.log("C'est le jour de paie !")
    const app = document.getElementById("app");

    //Pour chaque enveloppe,
    data.enveloppes.forEach(env => {
      // calculer le montant manquant pour compléter l'enveloppe,
      let complement = env.montant_initial - env.montant_actuel;
      console.log(complement)
      // et l'ajouter à l'enveloppe.
      ajouterTransactionWithData(env, complement, "Jour de paie !")
    });

    afficherEnveloppes();
  }
}
