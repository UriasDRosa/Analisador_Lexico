let palavras = [];
let alfabeto = [
  "δ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let tabela = document.getElementById("tabela");
let delta = document.querySelector(".classe-0");

function createTable() {
  for (let index in alfabeto) {
    const letra = alfabeto[index];
    const headerPalavra = document.createElement("th");
    headerPalavra.textContent = letra;
    headerPalavra.classList.add("classe-${index}");
    tabela.appendChild(headerPalavra);
  }
}

function addState() {
  const estado = document.createElement("tr"); // Cria uma nova linha

  for (let i = 0; i < alfabeto.length; i++) {
    const cell = document.createElement("td"); // Cria uma célula
    if (i === 0) {
      cell.textContent = "q0"; // Define o conteúdo para 'q0' apenas na primeira célula
    }
    estado.appendChild(cell); // Adiciona a célula à linha
  }

  tabela.appendChild(estado); // Adiciona a nova linha à tabela
}

function adicionarPalavra(event) {
  if (event.key === " ") {
    const input = document.getElementById("input-add");
    const palavra = input.value.trim();

    if (palavra !== "") {
      palavras.push(palavra);
      input.value = "";
      exibirPalavras();
    }
  }
}

function exibirPalavras() {
  const palavrasDigitadas = document.getElementById("palavras-digitadas");
  palavrasDigitadas.innerHTML = "";

  palavras.forEach((palavra) => {
    const divPalavra = document.createElement("div");
    divPalavra.classList.add("palavra");

    const texto = document.createElement("span");
    texto.textContent = palavra;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.classList.add("btn-remover");
    botaoRemover.onclick = function () {
      removerPalavra(palavra);
    };

    divPalavra.appendChild(texto);
    divPalavra.appendChild(botaoRemover);
    palavrasDigitadas.appendChild(divPalavra);
  });
}

function removerPalavra(palavra) {
  const index = palavras.indexOf(palavra);
  if (index !== -1) {
    palavras.splice(index, 1);
    exibirPalavras();
  }
}

window.onload = function () {
  exibirPalavras();
  createTable();
  addState();
};
