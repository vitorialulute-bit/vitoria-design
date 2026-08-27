import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6pPII_qQjbXJFma90ZNqkxcQmZhry7JY",
  authDomain: "vitoria-design-436.firebaseapp.com",
  projectId: "vitoria-design-436",
  storageBucket: "vitoria-design-436.firebasestorage.app",
  messagingSenderId: "832750119618",
  appId: "1:832750119618:web:b8746cf2cd4b14916d295b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase carregado");

window.addEventListener("DOMContentLoaded", () => {

  const formulario = document.getElementById("leadForm");

  if (!formulario) {
    console.error("Formulário leadForm não encontrado");
    return;
  }

  console.log("Formulário encontrado");

  formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Botão clicado");

    const nome = document.getElementById("nome")?.value || "";
    const telefone = document.getElementById("telefone")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const servico = document.getElementById("servico")?.value || "";
    const observacao = document.getElementById("observacao")?.value || "";

    try {

      await addDoc(collection(db, "leads"), {
        nome,
        telefone,
        email,
        servico,
        observacao,
        origem: "Site",
        status: "Novo Lead",
        dataEntrada: new Date().toLocaleString("pt-BR")
      });

      alert("Lead enviado com sucesso!");

      formulario.reset();

    } catch (erro) {

      console.error("ERRO FIREBASE:", erro);

      alert(
        "Erro ao enviar lead. Verifique o console ou envie um print do erro."
      );
    }

  });

});
