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
let alfabetoNumber = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
};

let tabela = document.getElementById("tabela");
let cabeçalho = document.getElementById("cabeçalho");
let corpo = document.getElementById("corpo");

function limparTabela() {
  // Remove todos os filhos do cabeçalho
  while (cabeçalho.firstChild) {
    cabeçalho.removeChild(cabeçalho.firstChild);
  }
}

function createTable() {
  limparTabela();
  for (let index in alfabeto) {
    const letra = alfabeto[index];
    const headerPalavra = document.createElement("th");
    headerPalavra.textContent = letra;
    headerPalavra.classList.add("classe-${index}");
    cabeçalho.appendChild(headerPalavra);
  }
  preencherEstados();
}

let letras = [];
let estados = [];

function preencherEstados() {
  let novo = false;
  for (let palavra of palavras) {
    for (let i = 0; i < palavra.length; i++) {
      let letraP = palavra[i];
      let letra = letras[i];

      console.log(letra + letraP);
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      console.log(letras);
      console.log(estados);

      if (
        (letraP !== letra || novo) &&
        !palavra.split("").every((letra) => letras.includes(letra))
      ) {
        novo = true;
        letras.push(letraP);
        estados.push(letraP);

        tr.classList.add(`q${estados.length - 1}`);
        console.log(estados.length);
        for (letra in estados) {
          if (i !== palavra.length - 1) {
            td.textContent = `q${letra}`;
            td.classList.add(`td-q${letra}`);
          } else {
            td.textContent = `*q${letra}`;
            td.classList.add(`td-q${letra}`);
          }
        }

        tr.appendChild(td);
        corpo.appendChild(tr);

        for (let j = 0; j < 26; j++) {
          let newTd = document.createElement("td");
          newTd.classList.add(`td-${alfabeto[j + 1]}`);
          tr.appendChild(newTd);
        }

        let linha = corpo.querySelector(`.q${letras.length - 1}`);
        let letraAtual = letraP.toUpperCase();
        let letraIndex = alfabetoNumber[letraAtual];
        let lastIndex = i;
        let lastState = `q${lastIndex}`;

        // Busca pelas células (td) dentro da linha
        let cellLinha = linha.getElementsByTagName(`td`);

        // Verifica se a célula na posição desejada existe
        if (!cellLinha[letraIndex]) {
          // Cria uma nova célula
          let newCell = document.createElement("td");
          newCell.textContent = `q${letras.length - 1}`;

          // Insere a nova célula na posição desejada
          if (letraIndex >= cellLinha.length) {
            linha.appendChild(newCell); // Adiciona no final da linha
          } else {
            // Adiciona a nova célula na posição especificada
            linha.insertBefore(newCell, cellLinha[letraIndex]);
          }
        } else {
          if (i === palavra.length - 1) {
            cellLinha[letraIndex].textContent = `q${letras.length - 1}`;
            td.classList.add(`td-q${letras.length - 1}`);
          } else {
            cellLinha[letraIndex].textContent = `q${letras.length - 1}`;
          }
        }
      } else if (palavra.split("").every((letra) => letras.includes(letra))) {
        novo = false;
        for (let i = 0; i < palavra.length; i++) {
          let letraP = palavra[i];
          let lastIndex = i;
          let lastState = `q${lastIndex}`;
          console.log(lastState);
          let linha = corpo.querySelector(`.${lastState}`);

          let letraAtual = letraP.toUpperCase();
          let letraIndex = alfabetoNumber[letraAtual];

          let cellLinha = linha.getElementsByTagName(`td`);

          if (i === palavra.length - 1) {
            cellLinha[0].textContent = `*${lastState}`;
            cellLinha[letraIndex].textContent = `${lastState}`;
            td.classList.add(`td-q${letras.length - 1}`);
          } else {
            cellLinha[letraIndex].textContent = `${lastState}`;
          }
        }
      }
    }
  }
}

function adicionarPalavra(event) {
  if (event.key === " ") {
    const input = document.getElementById("input-add");
    const palavra = input.value.trim();

    if (palavra !== "") {
      palavras.push(palavra);
      input.value = "";
      exibirPalavras();
      createTable();
    }
  }
}

function checarPalavra(event) {
  if (event.key === " ") {
    const input = document.getElementById("checar");
    const textoDigitado = input.value.toUpperCase();
    const palavra = input.value.trim();
    let vetPalavra = [];
    let palavraB = false;
    if (palavra !== "") {
      if (palavra.split("").every((letra) => letras.includes(letra))) {
        for (let i = 0; i < palavra.length; i++) {
          let lastState = `q${i}`;
          let letraAtual = palavra[i];
          let letraIndex = alfabetoNumber[letraAtual];
          letraAtual = letraAtual.toUpperCase();
          let linha = corpo.querySelector(`.td-${lastState}`);
          let cellLinha = linha.getElementsByTagName(`td-${letraAtual}`);

          if (cellLinha != "") {
            console.log("aeee");
            vetPalavra.push("*");
          }
        }
        if (vetPalavra.length == textoDigitado.length) {
          window.alert("Palavra encontrada!");
        }
      } else {
        window.alert("Palavra não encontrada");
      }
      if (vetPalavra.includes(textoDigitado)) {
        window.alert("A palavra pertence á linguagem");
      }
    }
  }
}

function pintarUltimaLetra(palavra) {
  const corpo = document.getElementById("tabela");
  const cells = corpo.getElementsByTagName("td");
  
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("destacado");
  }

  const ultimaLetra = palavra.charAt(palavra.length - 1).toUpperCase();
  if (alfabetoNumber.hasOwnProperty(ultimaLetra)) {
    const linha = corpo.getElementsByClassName(`q${palavra.length - 1}`);
    const coluna = corpo.getElementsByClassName(`td-${ultimaLetra}`);
    
    for (let j = 1; j < linha.length; j++) {
      linha[j].classList.add("destacado");
    }
    
    for (let j = 0; j < coluna.length; j++) {
      coluna[j].classList.add("destacado");
    }
  }
}

document.getElementById("checar").addEventListener("input", function(event) {
  let palavra = event.target.value.trim();
  pintarUltimaLetra(palavra);
});

document.getElementById("checar").addEventListener("keyup", function(event) {
  if (event.key === 'Backspace' || event.code === 'Backspace') {
    let palavra = event.target.value.trim();
    pintarUltimaLetra(palavra);
  }
});
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
    createTable();
  }
}

window.onload = function () {
  exibirPalavras();
};
