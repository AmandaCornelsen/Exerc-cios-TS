"use strict";
var formTime = document.getElementById("formTime");
var tbTime = document.getElementById("tbTime");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function salvarTimeStorage() {
    localStorage.setItem("times", JSON.stringify(times));
}
function atualizarTabelaTime() {
    tbTime.innerHTML = "";
    times.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.nomeTime}</td>
            <td>${p.nomeCurto}</td>
            <td>
                <button onclick="editarTime(${p.id})"> Editar </button>
                <button onclick="removerTime(${p.id})"> Remover </button>
            </td>
        `;
        tbTime.appendChild(row);
    });
}
function editarTime(id) {
    //find = busque dentro desse array...
    const time = times.find((p) => p.id == id);
    //se nao achar nenhum campeonato
    if (!time)
        return;
    document.getElementById("nomeTime").value = time.nomeTime;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const timeIndex = times.findIndex((p) => p.id == id);
    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if (timeIndex !== -1) {
        //se ja tem o mesmo index na lista = remover da lista
        times.splice(timeIndex, 1);
    }
    salvarTimeStorage();
    atualizarTabelaTime();
}
function salvarTime(event) {
    event.preventDefault();
    const novoTime = {
        id: Date.now(),
        nomeTime: document.getElementById("nomeTime").value,
        nomeCurto: document.getElementById("nomeCurto").value
    };
    times.push(novoTime);
    salvarTimeStorage();
    atualizarTabelaTime();
    formTime.reset();
    alert("Cadastrado com sucesso!");
}
function removerTime(id) {
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const timeIndex = times.findIndex((p) => p.id == id);
    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if (timeIndex !== -1) {
        //se ja tem o mesmo index na lista = remover da lista
        times.splice(timeIndex, 1);
    }
    salvarTimeStorage();
    atualizarTabelaTime();
}
