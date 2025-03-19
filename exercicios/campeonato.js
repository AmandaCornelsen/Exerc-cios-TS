"use strict";
//Variáveis globais
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function atualizarTabela() {
    tabelaCampeonato.innerHTML = "";
    campeonatos.forEach((c) => {
        tabelaCampeonato.innerHTML += `
    <tr>
         <td>${c.nome}</td>
         <td>${c.categoria}</td>
         <td>${c.tipo}</td>
         <td>${c.dataInicio}</td>
         <td>${c.dataFim}</td>
         <td>
          <button onclick="editarCampeonato(${c.id})"> Editar </button>
          <button onclick="removerCampeonato(${c.id})"> Remover </button>
         </td> 
         </tr>
  `;
    });
}
function editarCampeonato(id) {
    //Find = buscar um elemento em um array
    const campeonato = campeonatos.find((c) => c.id == id);
    if (!campeonato)
        return;
    document.getElementById("nome").value = campeonato.nome;
    document.getElementById("categoria").value = campeonato.categoria;
    document.getElementById("tipo").value = campeonato.tipo;
    document.getElementById("dataInicio").value = campeonato.dataInicio;
    document.getElementById("dataFim").value = campeonato.dataFim;
}
function removerCampeonato(id) {
}
function salvarLocalStorage() {
    let campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoCampeonato = {
        id: Date.now(),
        categoria: document.getElementById("categoria").value,
        dataFim: "2025-10-30",
        dataInicio: "2025-04-01",
        nome: document.getElementById("nome").value,
        tipo: "pontos-corridos",
    };
    campeonatos.push(novoCampeonato);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert('Cadastro com sucesso!');
}
formCampeonato.addEventListener("submit", salvar);
atualizarTabela();
