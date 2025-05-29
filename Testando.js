const telaInicial = document.getElementById('tela-inicial');
const botaoJogar = document.getElementById('botao-jogar');
const telaSelecaoTema = document.getElementById('tela-selecao-tema');
const botoesTema = document.querySelectorAll('.botao-tema');
const telaQuiz = document.getElementById('tela-quiz');
const textoPergunta = document.getElementById('texto-pergunta');
const containerOpcoes = document.getElementById('container-opcoes');
const botaoProxima = document.getElementById('botao-proxima');
const telaPontuacao = document.getElementById('tela-pontuacao');
const pontuacaoFinal = document.getElementById('pontuacao-final');
const botaoReiniciar = document.getElementById('botao-reiniciar');

let temaAtual = '';
let perguntasAtuais = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;

const dadosQuiz = {
    biologia: [
        {
            pergunta: "Qual o maior órgão do corpo humano?",
            opcoes: ["Coração", "Pele", "Cérebro", "Fígado"],
            resposta: "Pele"
        },
        {
            pergunta: "Qual o processo pelo qual as plantas produzem seu próprio alimento?",
            opcoes: ["Respiração", "Transpiração", "Fotossíntese", "Germinação"],
            resposta: "Fotossíntese"
        },
        {
            pergunta: "Qual o nome do processo de divisão celular que resulta em duas células-filhas idênticas?",
            opcoes: ["Meiose", "Mitose", "Osmose", "Fagocitose"],
            resposta: "Mitose"
        }
    ],
    geografia: [
        {
            pergunta: "Qual o maior oceano do mundo?",
            opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
            resposta: "Pacífico"
        },
        {
            pergunta: "Qual o país com a maior população do mundo?",
            opcoes: ["Índia", "Estados Unidos", "China", "Indonésia"],
            resposta: "China"
        },
        {
            pergunta: "Qual o deserto mais quente do mundo?",
            opcoes: ["Saara", "Atacama", "Gobi", "Kalahari"],
            resposta: "Saara"
        }
    ],
    espaco: [
        {
            pergunta: "Qual o planeta mais próximo do Sol?",
            opcoes: ["Vênus", "Marte", "Mercúrio", "Júpiter"],
            resposta: "Mercúrio"
        },
        {
            pergunta: "Qual a galáxia onde está localizado o nosso Sistema Solar?",
            opcoes: ["Andrômeda", "Via Láctea", "Triângulo", "Cigarro"],
            resposta: "Via Láctea"
        },
        {
            pergunta: "Qual o nome do primeiro homem a pisar na Lua?",
            opcoes: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
            resposta: "Neil Armstrong"
        }
    ]
};

// Função para mostrar uma seção e esconder as outras
function mostrarTela(idTela) {
    document.querySelectorAll('.secao-quiz').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(idTela).classList.add('ativa');
}

// Evento do botão "Jogar" na tela inicial
botaoJogar.addEventListener('click', () => {
    mostrarTela('tela-selecao-tema');
});

// Eventos dos botões de tema
botoesTema.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        temaAtual = evento.target.dataset.tema;
        perguntasAtuais = dadosQuiz[temaAtual];
        indicePerguntaAtual = 0;
        pontuacao = 0;
        mostrarTela('tela-quiz');
        carregarPergunta();
    });
});

// Função para carregar uma pergunta
function carregarPergunta() {
    // Limpa opções anteriores e desabilita o botão "Próxima Pergunta"
    containerOpcoes.innerHTML = '';
    botaoProxima.disabled = true;
    botaoProxima.classList.remove('correta', 'incorreta'); // Limpa cores anteriores

    if (indicePerguntaAtual < perguntasAtuais.length) {
        const pergunta = perguntasAtuais[indicePerguntaAtual];
        textoPergunta.textContent = pergunta.pergunta;

        pergunta.opcoes.forEach(opcao => {
            const botao = document.createElement('button');
            botao.textContent = opcao;
            botao.classList.add('botao-opcao');
            botao.addEventListener('click', () => selecionarOpcao(botao, opcao, pergunta.resposta));
            containerOpcoes.appendChild(botao);
        });
    } else {
        // Todas as perguntas foram respondidas, mostra a tela de pontuação
        mostrarPontuacao();
    }
}

// Função para selecionar uma opção
function selecionarOpcao(botaoSelecionado, opcaoSelecionada, respostaCorreta) {
    // Desabilita todas as opções para evitar múltiplos cliques
    Array.from(containerOpcoes.children).forEach(botao => {
        botao.disabled = true;
    });

    if (opcaoSelecionada === respostaCorreta) {
        botaoSelecionado.classList.add('correta');
        pontuacao++;
    } else {
        botaoSelecionado.classList.add('incorreta');
        // Opcional: mostrar a resposta correta
        Array.from(containerOpcoes.children).forEach(botao => {
            if (botao.textContent === respostaCorreta) {
                botao.classList.add('correta');
            }
        });
    }
    botaoProxima.disabled = false; // Habilita o botão para a próxima pergunta
}

// Evento do botão "Próxima Pergunta"
botaoProxima.addEventListener('click', () => {
    indicePerguntaAtual++;
    carregarPergunta();
});

// Função para exibir a pontuação final
function mostrarPontuacao() {
    pontuacaoFinal.textContent = `Você acertou ${pontuacao} de ${perguntasAtuais.length} perguntas!`;
    mostrarTela('tela-pontuacao');
}

// Evento do botão "Jogar Novamente"
botaoReiniciar.addEventListener('click', () => {
    mostrarTela('tela-inicial');
});

// Inicia o quiz mostrando a tela inicial
mostrarTela('tela-inicial');
