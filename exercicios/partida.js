"use strict";
var formPartida = document.getElementById("formPartida");
var tbPartidas = document.getElementById("tbPartidas");
function atualizarTabelaPartida() {
    tabelaCampeonato.innerHTML = "";
    formPartida.forEach((c) => {
        tbPartidas.innerHTML += `
      <tr>
           <td>${c.timeMandante}</td>
           <td>${c.timeVisitante}</td>
      </tr>
    `;
    });
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novaPartida = {
        timeMandante: document.getElementById("timeMandante").value,
        timeVisitante: document.getElementById("timeVisitante").value
    };
    campeonatos.push(novaPartida);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert('Cadastro com sucesso!');
}
