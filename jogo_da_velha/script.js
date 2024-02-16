const jogadasVitoriosas = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Jogador {
  constructor(nome, simbolo) {
    this.nome = nome;
    this.simbolo = simbolo;
  }
}

class Tabuleiro {
  constructor() {
    this.celulas = Array.from(document.querySelectorAll('#tabuleiro li'));
    this.jogadores = [
      new Jogador('Jogador X', 'X'),
      new Jogador('Jogador O', 'O'),
    ];
  }

  iniciarH2Element() {
    const h2Element = document.querySelector('h2');
    h2Element.textContent = 'Em andamento';
    document.querySelector('.header-container').appendChild(h2Element);
    return h2Element;
  }

  iniciarJogo() {
    this.celulas.forEach((celula, indice) => {
      celula.addEventListener('click', () => this.realizarJogada(indice));
    });
    this.jogadorAtualIndex = 0;
    this.vencedor = null;
    this.h2Element = this.iniciarH2Element();
  }

  realizarJogada(indice) {
    const jogadorAtual = this.jogadores[this.jogadorAtualIndex];

    if (!this.celulas[indice].textContent && !this.vencedor) {
      this.celulas[indice].textContent = jogadorAtual.simbolo;
      if (this.verificarVencedor()) {
        this.vencedor = jogadorAtual;
        this.informaVencedor();
      } else {
        this.jogadorAtualIndex = 1 - this.jogadorAtualIndex;
      }
    }
  }

  verificarVencedor() {
    for (const jogada of jogadasVitoriosas) {
      const [a, b, c] = jogada;
      if (
        this.celulas[a].textContent &&
        this.celulas[a].textContent === this.celulas[b].textContent &&
        this.celulas[a].textContent === this.celulas[c].textContent
      ) {
        return true;
      }
    }

    return false;
  }

  informaVencedor() {
    this.h2Element.textContent = `O jogador ${this.vencedor.nome} venceu!`;
  }

  limparTabuleiro() {
    this.celulas.forEach((celula) => {
      celula.textContent = '';
    });
    this.iniciarJogo();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const iniciarButton = document.querySelector('button');
  const tabuleiro = new Tabuleiro();

  iniciarButton.addEventListener('click', function () {
    tabuleiro.limparTabuleiro(); // Limpa o tabuleiro ao clicar no botão "Iniciar"
    tabuleiro.iniciarJogo(); // Inicia um novo jogo ao clicar no botão "Iniciar"
  });
});
