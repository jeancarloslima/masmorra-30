const telaEscolherNome = document.getElementById("tela-escolher-nome");
const telaEscolherClasse = document.getElementById("tela-escolher-classe");
const telaJogo = document.getElementById("tela-jogo");
const telaDorme = document.getElementById("tela-dorme");
const telaMorte = document.getElementById("tela-morte");
const inputNome = document.getElementById("nome");
const botaoAvancaTela1 = document.getElementById("avanca-tela1");
const botoesEscolherClasse = document.querySelectorAll(".tela-escolher-classe-botao");
const botaoAvancaTela2 = document.getElementById("avanca-tela2");
const elementoNumeroDias = document.getElementById("numero-dias");
const elementoNumeroInimigos = document.getElementById("numero-inimigos");
const containerInimigo = document.getElementById("inimigo");
const nomeJogadorCampo = document.getElementById("nome-jogador");
const vidaJogadorRestante = document.getElementById("vida-restante-jogador");
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
const listaDeInimigos = ["ladrão", "morcego"];
let dias = 30;
let inimigo;
let inimigos = 5;
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

botaoFoge.addEventListener("click", () => {
    delete inimigo;
    containerInimigo.innerHTML = "";
    verificaInimigos();
})

botoesVoltar.forEach((botao) => {
    botao.addEventListener("click", () => {
        botao.parentElement.style.display = "none";
        rodapeMenu.style.display = "flex";
    })
})

botoesCombate.forEach((botao) => {
    botao.addEventListener("click", () => {
        const nomeGolpe = botao.querySelector(".nome-golpe");

        if (nomeGolpe) {
            jogador.combate(nomeGolpe.textContent);
        };
    })
})

constroiJogador();
function constroiJogador() {
    jogador = {
        nome,
        classe,
        vidaTotal: 20,
        vidaAtual: 20,
        forca: 8,
        magia: 2,
        velocidade: 7,
        armadura: 10,
        experiencia: 0,

        combate: function (golpe) {
            switch (golpe) {
                case "espadada":
                    const numeroAleatorio = Number((Math.random() + 1).toFixed(1));
                    const dano = Math.round(this.forca * numeroAleatorio);

                    if (dano >= inimigo.armadura) {
                        inimigo.vidaAtual -= (dano - inimigo.armadura);
                    }

                    inimigo.atualizar();
                    inimigo.combate();
                    break;
            }
        },

        atualizar: function () {
            vidaJogadorCampo.textContent = `${this.vidaAtual} / ${this.vidaTotal}`;
            vidaJogadorRestante.style.width = `${((this.vidaAtual / this.vidaTotal) * 10) * 20}px`;

            if (this.vidaAtual <= 0) {
                this.morrer();
            }
        },

        morrer: function () {
            vidaJogadorCampo.textContent = `0 / ${this.vidaTotal}`;
            vidaJogadorRestante.style.width = "0px";

            setTimeout(() => {
                telaJogo.style.display = "none";
                telaMorte.style.display = "flex";
            }, 1300);
        }
    }

    nomeJogadorCampo.textContent = nome;
    jogador.atualizar();
}

function Inimigo(nome) {
    this.nome = nome;
    this.vidaTotal = 7;
    this.vidaAtual = 7;
    this.forca = 6;
    this.magia = 5;
    this.velocidade = 5;
    this.armadura = 5;

    this.constroi = function () {
        constroiInimigo();
    }

    this.combate = function () {
        let golpe = "espadada";

        switch (golpe) {
            case "espadada":
                const numeroAleatorio = Number((Math.random() + 1).toFixed(1));
                const dano = Math.round(this.forca * numeroAleatorio);

                if (dano >= jogador.armadura) {
                    jogador.vidaAtual -= (dano - jogador.armadura);
                }

                jogador.atualizar();
                break;
        }
    }

    this.atualizar = function () {
        const vidaInimigoCampo = document.getElementById("vida-inimigo");
        const vidaInimigoRestante = document.getElementById("vida-restante-inimigo");

        vidaInimigoCampo.textContent = `${this.vidaAtual} / ${this.vidaTotal}`;
        vidaInimigoRestante.style.width = `${((this.vidaAtual / this.vidaTotal) * 10) * 20}px`;

        if (this.vidaAtual <= 0) {
            this.morrer();
        }
    }

    this.morrer = function () {
        const vidaInimigoCampo = document.getElementById("vida-inimigo");
        const vidaInimigoRestante = document.getElementById("vida-restante-inimigo");

        vidaInimigoCampo.textContent = `0 / ${this.vidaTotal}`;
        vidaInimigoRestante.style.width = "0px";

        setTimeout(() => {
            delete inimigo;
            containerInimigo.innerHTML = "";
            verificaInimigos();
        }, 1000);
    }

    let multiplicador;

    switch (nome) {
        case "ladrão":
            multiplicador = 5;
            this.forca += 3;
            break;
        case "morcego":
            multiplicador = 3;
            break;
    }

    const numeroAleatorio = Math.floor(Math.random() * multiplicador);

    this.vidaAtual += numeroAleatorio;
    this.vidaTotal += numeroAleatorio;
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
    vidaRestante.id = "vida-restante-inimigo";

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

function geraNovoInimigo() {
    const numeroAleatorio = Math.floor(Math.random() * listaDeInimigos.length);
    const inimigoEscolhido = listaDeInimigos[numeroAleatorio];
    inimigo = new Inimigo(inimigoEscolhido);
    inimigo.constroi();
}

geraNovoInimigo();

function verificaInimigos() {
    if (inimigos > 1) {
        inimigos--;
        elementoNumeroInimigos.textContent = `${inimigos}/5`;
        geraNovoInimigo();
    } else {
        telaJogo.style.display = "none";
        telaDorme.style.display = "flex";

        inimigos = 5;
        elementoNumeroInimigos.textContent = `${inimigos}/5`;

        passaDia();
        geraNovoInimigo();
    }
}

function passaDia() {
    if (dias > 1) {
        dias--;
        elementoNumeroDias.textContent = `${dias} dias`;
    }

    setTimeout(() => {
        telaJogo.style.display = "flex";
        telaDorme.style.display = "none";
    }, 2000);
}