var formPartida = document.getElementById("formPartida") as HTMLFormElement;
var tbPartidas = document.getElementById("tbPartidas") as HTMLElement;

interface Partida {
    timeMandante : string;
    timeVisitante : string;
}

function atualizarTabelaPartida() {
    tabelaCampeonato.innerHTML = "";
    formPartida.forEach(( c : Partida )  =>{
      tbPartidas.innerHTML += `
      <tr>
           <td>${c.timeMandante}</td>
           <td>${c.timeVisitante}</td>
      </tr>
    `;
    })
  }

  function salvarPartida(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novaPartida: Partida = {
      timeMandante: (document.getElementById("timeMandante") as HTMLInputElement).value,
      timeVisitante: (document.getElementById("timeVisitante") as HTMLSelectElement).value 
    };
    campeonatos.push(novaPartida)
    atualizarTabela()
    salvarLocalStorage()
    formCampeonato.reset()
    alert('Cadastro com sucesso!')
  }