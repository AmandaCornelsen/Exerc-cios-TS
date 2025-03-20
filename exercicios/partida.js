"use strict";
var formPartida = document.getElementById("formPartida");
var tabelabPartidas = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatos() {
    const selectCampeonato = document.getElementById("campeonato");
    selectCampeonato.innerHTML = "";
    campeonatos.forEach((campeonato) => {
        const option = document.createElement("option");
        option.value = campeonato.nome;
        option.textContent = campeonato.nome;
        selectCampeonato.appendChild(option);
    });
}
function editarPartida(id) {

    const partida = partidas.find((p) => p.id == id);

    if (!partida)
        return;
    document.getElementById("timeMandante").value = partida.timeMandante;
    document.getElementById("timeVisitante").value = partida.timeVisitante;
    document.getElementById("campeonato").value = partida.campeonato;
    document.getElementById("dataPartida").value = partida.dataPartida;

    const partidaIndex = partidas.findIndex((p) => p.id == id);
    if (partidaIndex !== -1) {
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidaStorage();
    atualizarTabelaPartida();
}
function removerPartida(id) {
    const partidaIndex = partidas.findIndex((p) => p.id == id);
    if (partidaIndex !== -1) {
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidaStorage();
    atualizarTabelaPartida();
}
function atualizarTabelaPartida() {
    tabelabPartidas.innerHTML = "";
    partidas.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.timeMandante}</td>
            <td>${p.timeVisitante}</td>
            <td>${p.campeonato}</td>
            <td>${p.dataPartida}</td>
            <td>
                <button onclick="editarPartida(${p.id})"> Editar </button>
                <button onclick="removerPartida(${p.id})"> Remover </button>
            </td>
        `;
        tabelabPartidas.appendChild(row);
    });
}
function salvarPartidaStorage() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}
function salvarPartida(event) {
    event.preventDefault();
    const novaPartida = {
        id: Date.now(),
        timeMandante: document.getElementById("timeMandante").value,
        timeVisitante: document.getElementById("timeVisitante").value,
        campeonato: document.getElementById("campeonato").value,
        dataPartida: document.getElementById("dataPartida").value
    };
    partidas.push(novaPartida);
    salvarPartidaStorage();
    atualizarTabelaPartida();
    formPartida.reset();
    alert("Cadastrado com sucesso!");
}
function observarMudancasLocalStorage() {
    window.addEventListener("storage", (event) => {
        if (event.key === "campeonatos") {
            campeonatos = JSON.parse(event.newValue || "[]");
            carregarCampeonatos();
        }
    });
}
carregarCampeonatos();
atualizarTabelaPartida();
observarMudancasLocalStorage();
formPartida.addEventListener("submit", salvarPartida);
