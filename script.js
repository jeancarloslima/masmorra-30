const telaEscolherNome = document.getElementById("tela-escolher-nome");
const telaEscolherClasse = document.getElementById("tela-escolher-classe");
const telaJogo = document.getElementById("tela-jogo");
const inputNome = document.getElementById("nome");
const botaoAvancaTela1 = document.getElementById("avanca-tela1");
const botoesEscolherClasse = document.querySelectorAll(".tela-escolher-classe-botao");
const botaoAvancaTela2 = document.getElementById("avanca-tela2");
const containerInimigo = document.getElementById("inimigo");
const nomeJogadorCampo = document.getElementById("nome-jogador");
const vidaJogadorCampo = document.getElementById("vida-jogador");
const rodapeMenu = document.getElementById("rodape-jogo-menu");
const rodapeMenuCombate = document.getElementById("rodape-jogo-combate");
const rodapeMenuFeiticos = document.getElementById("rodape-jogo-feiticos");
const rodapeMenuBolsa = document.getElementById("rodape-jogo-bolsa");
const botaoAbreCombate = document.getElementById("btn-abre-combate");
const botaoAbreFeiticos = document.getElementById("btn-abre-feiticos");
const botaoAbreBolsa = document.getElementById("btn-abre-bolsa");
const botaoFoge = document.getElementById("btn-foge");
const botoesVoltar = document.querySelectorAll(".btn-voltar");
const botoesCombate = document.querySelectorAll(".rodape-jogo-combate-botao");
let dias;
let inimigos;
let jogador;
let nome;
let classe;

inputNome.addEventListener("input", () => {
    if (inputNome.value !== "") {
        botaoAvancaTela1.style.pointerEvents = "all";
    } else {
        botaoAvancaTela1.style.pointerEvents = "none";
    }
})

botaoAvancaTela1.addEventListener("click", () => {
    telaEscolherNome.style.display = "none";
    telaEscolherClasse.style.display = "flex";

    nome = inputNome.value.toLowerCase();
});

botoesEscolherClasse.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesEscolherClasse.forEach((outroBotao) => {
            outroBotao.classList.remove("selecionado");
        })

        botao.classList.add("selecionado");

        classe = botao.textContent.toLowerCase();

        botaoAvancaTela2.style.pointerEvents = "all";
    })
});

botaoAvancaTela2.addEventListener("click", () => {
    telaEscolherClasse.style.display = "none";
    telaJogo.style.display = "flex";

    constroiJogador();
});

botaoAbreCombate.addEventListener("click", () => {
    rodapeMenu.style.display = "none";
    rodapeMenuCombate.style.display = "flex";
})

botaoAbreFeiticos.addEventListener("click", () => {
    rodapeMenu.style.display = "none";
    rodapeMenuFeiticos.style.display = "flex";
})

botaoAbreBolsa.addEventListener("click", () => {
    rodapeMenu.style.display = "none";
    rodapeMenuBolsa.style.display = "flex";
})

botoesVoltar.forEach((botao) => {
    botao.addEventListener("click", () => {
        botao.parentElement.style.display = "none";
        rodapeMenu.style.display = "flex";
    })
})

botoesCombate.forEach((botao) => {
    botao.addEventListener("click", () => {
        jogador.combate(botao.textContent);
    })
})

function constroiJogador() {
    jogador = {
        nome,
        classe,
        vidaTotal: 5,
        vidaAtual: 5,
        forca: 5,
        magia: 5,
        velocidade: 5,
        armadura: 5,

        combate: function (golpe) {
            switch (golpe) {
                case "espadada":
                    inimigo.vidaAtual -= (jogador.forca - inimigo.armadura);
                break;
            }
        }
    }

    nomeJogadorCampo.textContent = nome;
    vidaJogadorCampo.textContent = `${jogador.vidaAtual} / ${jogador.vidaTotal}`
}

function Inimigo(nome, minVida, maxVida, minDano, maxDano) {
    this.nome = nome;
    this.vidaTotal = 5;
    this.vidaAtual = 5;
    this.forca = 5;
    this.magia = 5;
    this.velocidade = 5;
    this.armadura = 5;
    this.constroi = function () {
        constroiInimigo();
    }
}

function constroiInimigo() {
    containerInimigo.innerHTML = "";

    const nomeInimigo = document.createElement("h3");
    nomeInimigo.classList.add("nome-personagem");
    nomeInimigo.id = "nome-inimigo";
    nomeInimigo.textContent = inimigo.nome;

    const containerBarraDeVida = document.createElement("div");
    containerBarraDeVida.classList.add("barra-de-vida-container");
    containerBarraDeVida.id = "barra-de-vida-inimigo";

    const barraDeVida = document.createElement("div");
    barraDeVida.classList.add("barra-de-vida");

    const vidaRestante = document.createElement("div");
    vidaRestante.classList.add("vida-restante");

    const numeroVidaElemento = document.createElement("span");
    numeroVidaElemento.classList.add("numero-vida");
    numeroVidaElemento.id = "vida-inimigo";
    numeroVidaElemento.textContent = `${inimigo.vidaAtual} / ${inimigo.vidaTotal}`;

    const imagemInimigo = document.createElement("img");
    imagemInimigo.src = "images/cavaleiro.png";
    imagemInimigo.alt = "Imagem de um inimigo";
    imagemInimigo.classList.add("imagem-personagem");

    barraDeVida.appendChild(vidaRestante);
    containerBarraDeVida.append(barraDeVida, numeroVidaElemento);
    containerInimigo.append(nomeInimigo, containerBarraDeVida, imagemInimigo);
}

const inimigo = new Inimigo("Lucas");
inimigo.constroi();