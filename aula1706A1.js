const diviniciar = document.getElementById("diviniciar") // Vai controlar a tela inicial e introduzir o jogo.
const divareajogo = document.getElementById("areajogo") // Jogo foi introduzido e vamos para as perguntas.
const perguntas = [
    "Qual é o maior deserto do mundo?",
    "Qual é a capital do Brasil?",
    "Qual é a capital da Austrália?",
    "Qual é o país com maior população no mundo?",
    "Qual a linha imaginária que atravessa o Brasil?",
    "Qual o oceano que banha o Brasil?"
] // Crei um array na const para manipular as perguntas na function "abrirareajogo".
let indiceperguntas = 0

function iniciarjogo() {
    fecharbotaoinicio()
    abrirareajogo()
}

function fecharbotaoinicio() {
    diviniciar.innerHTML = ""
} // Uma contante JS que puxa a <div> do HTML. Essa função faz o botão inicial sumir, pois ela está ativada pra exibir algo no lugar: nada.

function abrirareajogo() {
    divareajogo.classList.add("active")

    let botaodepergunta = document.createElement("button")
    botaodepergunta.textContent = perguntas[indiceperguntas]
    botaodepergunta.classList.add("answer-btn")
    areaperguntas.appendChild(botaodepergunta)
} // Essa função puxa o class="tela-container" do HTML, que está ligado ao css e no css ativou outra class: class="tela-container.active".
// Faz um let e cria um botão com o JS no HTML, manipula qual pergunta vai aparecer puxando do array e exibe a pergunta puxando o ID da <div>.

function proximapergunta() {
    indiceperguntas++
    if (indiceperguntas < perguntas.length)
        abrirareajogo()
    else
    alert("Não existe mais perguntas")
}