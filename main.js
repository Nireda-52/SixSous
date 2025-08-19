// Import des fonctions liés à l'affichages
import * as UI from "./ui.js";

let data;
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderApp();
  })
  .catch(err => console.error("Erreur de chargement du JSON :", err));

function renderApp() {
  console.log("renderApp() appelée", data);
  UI.afficherEnveloppes(data);
  UI.brancherEvenements(data, renderApp);
}
