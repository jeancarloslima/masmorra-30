const telaEscolherNome = document.getElementById("tela-escolher-nome");
const telaEscolherClasse = document.getElementById("tela-escolher-classe");
const telaJogo = document.getElementById("tela-jogo");
const inputNome = document.getElementById("nome");
const botaoAvancaTela1 = document.getElementById("avanca-tela1");
const botoesEscolherClasse = document.querySelectorAll(".tela-escolher-classe-botao");
const botaoAvancaTela2 = document.getElementById("avanca-tela2");
const nomeJogadorCampo = document.getElementById("nome-jogador");
const rodapeMenu = document.getElementById("rodape-jogo-menu");
const rodapeMenuCombate = document.getElementById("rodape-jogo-combate");
const rodapeMenuFeiticos = document.getElementById("rodape-jogo-feiticos");
const rodapeMenuBolsa = document.getElementById("rodape-jogo-bolsa");
const botaoAbreCombate = document.getElementById("btn-abre-combate");
const botaoAbreFeiticos = document.getElementById("btn-abre-feiticos");
const botaoAbreBolsa = document.getElementById("btn-abre-bolsa");
const botaoFoge = document.getElementById("btn-foge");
const botoesVoltar = document.querySelectorAll(".btn-voltar");
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

function constroiJogador() {
    jogador = {
        nome,
        classe,
        vida: 5,
        forca: 5,
        magia: 5,
        velocidade: 5,
        armadura: 5
    }
    
    nomeJogadorCampo.textContent = nome;
}
