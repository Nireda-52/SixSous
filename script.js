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
          </tr>
        </thead>
        <tbody>
          ${env.transactions.map(t => `
            <tr>
              <td>${t.date}</td>
              <td><span class="montant ${t.montant >= 0 ? 'positif' : 'negatif'}">${t.montant} €</span></td>
              <td>${t.commentaire}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    div.innerHTML = `
      <h2>${env.nom}</h2>
      <p>Budget initial : <span class="montant positif">${env.montant_initial.toFixed(2)} €</span></p>
      <p>Montant actuel : <span class="montant ${classeMontant}">${env.montant_actuel.toFixed(2)} €</span></p>

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
