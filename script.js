let data;

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
                <button class="erase" type="button" onclick="supprimerTransaction(event, ${env.id}, ${t.id})">X</button>
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

function supprimerTransaction(e, enveloppeId, transactionId) {
  //Je ne sais pas encore à quoi ça sert, à creuser.
  e.preventDefault();
  const form = e.target;

  const enveloppe = data.enveloppes.find(env => env.id === enveloppeId);
  const transaction = enveloppe.transactions.find(trans => trans.id === transactionId);

  // Répercuter le montant sur l'enveloppe.
  enveloppe.montant_actuel -= transaction.montant; 

  // Supprimer la transaction dans l'historique
  let index = enveloppe.transactions.findIndex(t => t.id === transactionId);
  enveloppe.transactions.splice(index, 1);

  console.log("Vous avez supprimé cette ligne : [" + transaction.date + " " + transaction.montant + " € " + transaction.commentaire + "] de l'enveloppe " + enveloppe.nom);

  afficherEnveloppes();
}
