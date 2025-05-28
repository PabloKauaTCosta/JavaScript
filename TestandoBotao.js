const caixaUniQuiz = document.getElementById("caixaUniQuiz");
const perguntaUniQuiz = document.getElementById("questaoUniQuiz");
const opcoesRespostas = document.getElementById("opcoesRespostas");
const botaoProximo = document.getElementById("botaoProximo");
const resultadoQuiz = document.getElementById("resultadoUniQuiz");
const pontuacaoQuiz = document.getElementById("pontuacaoUniQuiz");
//teste amigas
const telaInicial = document.getElementById("telaInicial");
const botaoComecar = document.getElementById("botaoComecar");
const botaoReiniciar = document.getElementById("botaoReiniciar");

const questoes = [
    {
        questao: "Qual a raíz quadrada de 25?",
        opcoes: ["4", "5", "10", "6"],
        respostaCorreta: "5"
    },
    {
        questao: "Quanto é 3 x 3 x 3?",
        opcoes: ["23", "26", "9", "27"],
        respostaCorreta: "27"
    },
    {
        questao: "Qual o símbolo matemático da soma?",
        opcoes: ["x", "+", "-", "."],
        respostaCorreta: "+"
    }
];

let indiceQuestaoAtual = 0;
let pontuacao = 0;

//teste amigas
function iniciarQuiz() {
    telaInicial.style.display = "none";
    caixaUniQuiz.style.display = "block";
    indiceQuestaoAtual = 0;
    pontuacao = 0;
    carregarQuestao();
}

function carregarQuestao() {
    resultadoQuiz.style.display = "none";
    botaoProximo.style.display = "none";
    botaoReiniciar.style.display = "none";

    const questaoAtual = questoes[indiceQuestaoAtual];
    perguntaUniQuiz.textContent = questaoAtual.questao;
    opcoesRespostas.innerHTML = "";

    questaoAtual.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("answer-btn");
        botao.addEventListener("click", () => verificarResposta(opcao));
        opcoesRespostas.appendChild(botao);
    });
}

function verificarResposta(respostaSelecionada) {
    const questaoAtual = questoes[indiceQuestaoAtual];
    const botoesResposta = opcoesRespostas.querySelectorAll(".answer-btn");

    botoesResposta.forEach(botao => {
        if (botao.textContent === questaoAtual.respostaCorreta) {
            botao.classList.add("correct");
        }
        if (botao.textContent === respostaSelecionada && respostaSelecionada !== questaoAtual.respostaCorreta) {
            botao.classList.add("incorrect");
        }
        botao.disabled = true;
    });

    if (respostaSelecionada === questaoAtual.respostaCorreta) {
        pontuacao++;
    }

    botaoProximo.style.display = "block";
}

function proximaQuestao() {
    indiceQuestaoAtual++;
    if (indiceQuestaoAtual < questoes.length) {
        carregarQuestao();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    caixaUniQuiz.style.display = "none";
    resultadoQuiz.style.display = "block";
    pontuacaoQuiz.textContent = `${pontuacao} de ${questoes.length}`;
    botaoReiniciar.style.display = "block";
}

botaoComecar.addEventListener("click", iniciarQuiz);
botaoProximo.addEventListener("click", proximaQuestao);
botaoReiniciar.addEventListener("click", iniciarQuiz);