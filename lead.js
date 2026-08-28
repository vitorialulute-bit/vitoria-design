import { app } from "./firebase.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const db = getFirestore(app);

const form = document.getElementById("leadForm");

console.log("lead.js carregado");
console.log("FORM:", form);

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      const lead = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        servico: document.getElementById("servico").value,
        observacao: document.getElementById("observacao").value,
        criadoEm: serverTimestamp()
      };

      console.log("Enviando lead:", lead);

      await addDoc(collection(db, "leads"), lead);

      alert("Orçamento enviado com sucesso!");

      form.reset();

    } catch (erro) {

      console.error("Erro ao salvar lead:", erro);

      alert("Erro ao enviar orçamento. Veja o Console.");

    }

  });

} else {

  console.error("Formulário leadForm não encontrado.");

}
