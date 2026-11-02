// Simulado DETRAN
// =====================================

// Variáveis globais
let questoes = [];
let questaoAtual = 0;
let respostas = [];
let certezas = [];
let modo = "prova";
let tempoInicio = null;
let cronometro = null;

// Utilitários
// ===========

function embaralharArray(array) {
  const novoArray = [...array];
  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }
  return novoArray;
}

// A alternativa correta não pode ficar sempre na mesma posição
function embaralharOpcoes(questao) {
  const ordem = embaralharArray(questao.opcoes.map((_, indice) => indice));
  return {
    ...questao,
    opcoes: ordem.map((indice) => questao.opcoes[indice]),
    resposta: ordem.indexOf(questao.resposta),
  };
}

function adicionarAnimacao(elemento, animacao) {
  elemento.classList.add(animacao);
  setTimeout(() => {
    elemento.classList.remove(animacao);
  }, 500);
}

function formatarTempo(milissegundos) {
  const minutos = Math.floor(milissegundos / 60000);
  const segundos = Math.floor((milissegundos % 60000) / 1000);
  return `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}`;
}

// Controle do Simulado
// ====================

function iniciarSimulado(modoEscolhido = "prova") {
  // Preparar dados - agora com mais questões disponíveis
  modo = modoEscolhido;
  questoes = embaralharArray(baseQuestoes).slice(0, 30).map(embaralharOpcoes);
  questaoAtual = 0;
  respostas = new Array(30).fill(null);
  certezas = new Array(30).fill(null);
  tempoInicio = new Date();
  document.getElementById("tempo").textContent = "00:00";
  document.getElementById("rotulo-modo").textContent =
    modo === "treino" ? "Treino" : "Prova";

  // Transição de telas
  const telaInicial = document.getElementById("tela-inicial");
  const telaSimulado = document.getElementById("tela-simulado");

  adicionarAnimacao(telaInicial, "slide-in-left");

  setTimeout(() => {
    telaInicial.classList.add("hidden");
    telaSimulado.classList.remove("hidden");
    document.body.classList.add("em-simulado");
    window.scrollTo(0, 0);
  }, 300);

  // Iniciar cronômetro
  iniciarCronometro();

  // Carregar primeira questão
  carregarQuestao();

  console.log("🚀 Simulado iniciado com sucesso!");
}

function iniciarCronometro() {
  cronometro = setInterval(() => {
    const agora = new Date();
    const diferenca = agora - tempoInicio;
    document.getElementById("tempo").textContent = formatarTempo(diferenca);
  }, 1000);
}

function carregarQuestao() {
  const questao = questoes[questaoAtual];
  const cardQuestao = document.getElementById("card-questao");

  // Animação de transição
  adicionarAnimacao(cardQuestao, "fade-in");

  // Atualizar informações
  document.getElementById("questao-atual").textContent = questaoAtual + 1;
  document.getElementById("tema-questao").textContent = questao.tema;
  document.getElementById("texto-questao").textContent = questao.pergunta;
  atualizarEstrada();

  // Adicionar imagem se existir
  adicionarImagemQuestao(questao);

  // Criar botões de opção
  criarBotoesOpcao(questao);

  // Atualizar certeza, correção e navegação
  atualizarSeletorCerteza();
  atualizarCorrecao();
  atualizarBotoesNavegacao();

  // Levar o foco para o início da nova questão
  window.scrollTo(0, 0);
  document.getElementById("texto-questao").focus({ preventScroll: true });
}

function atualizarEstrada() {
  const estrada = document.getElementById("estrada");
  estrada.style.setProperty("--avanco", questaoAtual / (questoes.length - 1));
  estrada.setAttribute("aria-valuenow", questaoAtual + 1);
}

function questaoCorrigida() {
  return modo === "treino" && certezas[questaoAtual] !== null;
}

function adicionarImagemQuestao(questao) {
  const textoQuestao = document.getElementById("texto-questao");

  // Remover imagem anterior se existir
  const imagemAnterior =
    textoQuestao.parentNode.querySelector(".questao-imagem");
  if (imagemAnterior) {
    imagemAnterior.remove();
  }

  // Adicionar nova imagem se a questão tiver uma
  if (questao.imagem) {
    const containerImagem = document.createElement("div");
    containerImagem.className = "questao-imagem mb-4 has-text-centered";

    const imagem = document.createElement("img");
    imagem.src = questao.imagem;
    imagem.alt = "Imagem da questão";

    // Adicionar placeholder caso a imagem não carregue
    imagem.onerror = function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+";
      this.alt =
        "Imagem não encontrada - Adicione a imagem no caminho especificado";
      this.style.border = "2px dashed #ccc";
    };

    containerImagem.appendChild(imagem);

    // Inserir a imagem antes do texto da pergunta
    textoQuestao.parentNode.insertBefore(containerImagem, textoQuestao);

    // Animar entrada da imagem
    setTimeout(() => {
      adicionarAnimacao(containerImagem, "fade-in");
    }, 200);
  }
}

function criarBotoesOpcao(questao) {
  const container = document.getElementById("opcoes-questao");
  container.innerHTML = "";

  questao.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.className = "button option-button";
    botao.innerHTML = `
            <span class="opcao-letra">${String.fromCharCode(65 + index)}</span>
            <span class="opcao-texto">${opcao}</span>
        `;

    // Event listener
    botao.addEventListener("click", () => selecionarOpcao(index, botao));

    container.appendChild(botao);
  });

  atualizarEstadoOpcoes();
}

function atualizarEstadoOpcoes() {
  const questao = questoes[questaoAtual];
  const corrigida = questaoCorrigida();

  document.querySelectorAll(".option-button").forEach((botao, index) => {
    const selecionada = respostas[questaoAtual] === index;
    const correta = corrigida && index === questao.resposta;
    const errada = corrigida && selecionada && !correta;

    botao.classList.toggle("selected", selecionada && !corrigida);
    botao.classList.toggle("correta", correta);
    botao.classList.toggle("errada", errada);
    botao.disabled = corrigida;
    botao.setAttribute("aria-pressed", selecionada);

    // Certo e errado também têm ícone, para não depender só da cor
    botao.querySelector(".opcao-marca")?.remove();
    if (correta || errada) {
      botao.insertAdjacentHTML(
        "beforeend",
        `<span class="opcao-marca">
            <i class="fas ${correta ? "fa-circle-check" : "fa-circle-xmark"}" aria-hidden="true"></i>
            <span class="is-sr-only">${correta ? "Resposta correta" : "Sua resposta, incorreta"}</span>
        </span>`
      );
    }
  });
}

function selecionarOpcao(index, botaoSelecionado) {
  if (questaoCorrigida()) return;

  // A certeza vale para a alternativa marcada: trocar de alternativa zera
  if (respostas[questaoAtual] !== index) {
    certezas[questaoAtual] = null;
  }

  // Marcar nova seleção
  respostas[questaoAtual] = index;
  atualizarEstadoOpcoes();
  atualizarSeletorCerteza();

  console.log(`✅ Resposta selecionada: ${String.fromCharCode(65 + index)}`);
}

// Certeza e Correção
// ==================

function atualizarSeletorCerteza() {
  const seletor = document.getElementById("seletor-certeza");
  const respondida = respostas[questaoAtual] !== null;

  // A prova real só tem as alternativas: o seletor é exclusivo do treino
  seletor.classList.toggle(
    "hidden",
    modo !== "treino" || !respondida || questaoCorrigida()
  );
  document
    .getElementById("btn-certeza")
    .setAttribute("aria-pressed", certezas[questaoAtual] === "certeza");
  document
    .getElementById("btn-chute")
    .setAttribute("aria-pressed", certezas[questaoAtual] === "chute");
}

function definirCerteza(valor) {
  if (
    modo !== "treino" ||
    respostas[questaoAtual] === null ||
    questaoCorrigida()
  )
    return;

  certezas[questaoAtual] = valor;
  atualizarSeletorCerteza();
  atualizarEstadoOpcoes();
  atualizarCorrecao();
  atualizarBotoesNavegacao();

  // Mostrar as alternativas corrigidas acima do painel
  reservarEspacoDoca();
  const painelRota = document.getElementById("painel-rota");
  const opcoes = document.getElementById("opcoes-questao");
  window.scrollTo(
    0,
    window.scrollY +
      opcoes.getBoundingClientRect().top -
      painelRota.offsetHeight -
      12
  );

  if (respostas[questaoAtual] !== questoes[questaoAtual].resposta) {
    adicionarAnimacao(document.getElementById("carro"), "desvio");
  }

  const ultimaQuestao = questaoAtual === questoes.length - 1;
  document
    .getElementById(ultimaQuestao ? "btn-finalizar" : "btn-proxima")
    .focus({ preventScroll: true });
}

// Reservar espaço para a doca fixa não cobrir o conteúdo
function reservarEspacoDoca() {
  const doca = document.getElementById("doca-questao");
  document.getElementById("conteudo-questao").style.paddingBottom = `${
    doca.offsetHeight + 20
  }px`;
}

function atualizarCorrecao() {
  const painel = document.getElementById("painel-correcao");
  const corrigida = questaoCorrigida();
  painel.classList.toggle("hidden", !corrigida);
  if (!corrigida) return;

  const questao = questoes[questaoAtual];
  const resposta = respostas[questaoAtual];
  const acertou = resposta === questao.resposta;
  const chutou = certezas[questaoAtual] === "chute";

  let titulo = "Resposta certa";
  let nota = "Você sabia mesmo. Siga em frente!";
  if (acertou && chutou) {
    titulo = "Acertou no chute";
    nota = "Vale revisar: ela fica marcada como chute na sua revisão.";
  } else if (!acertou && chutou) {
    titulo = "Resposta errada";
    nota = "Você chutou, e tudo bem. Agora já sabe esta.";
  } else if (!acertou) {
    titulo = "Resposta errada";
    nota = "Você tinha certeza, então vale prestar atenção nesta.";
  }

  painel.classList.toggle("errou", !acertou);
  document.getElementById("correcao-icone").className = `fas ${
    acertou ? "fa-circle-check" : "fa-circle-xmark"
  }`;
  document.getElementById("correcao-titulo").textContent = titulo;
  document.getElementById("correcao-nota").textContent = nota;

  const suaResposta = document.getElementById("correcao-sua-resposta");
  suaResposta.classList.toggle("hidden", acertou);
  suaResposta.textContent = `Sua resposta: ${
    String.fromCharCode(65 + resposta)
  }) ${questao.opcoes[resposta]}`;
  document.getElementById("correcao-resposta-certa").textContent = `Correta: ${
    String.fromCharCode(65 + questao.resposta)
  }) ${questao.opcoes[questao.resposta]}`;

  const explicacao = document.getElementById("correcao-explicacao");
  explicacao.classList.toggle("hidden", !questao.explicacao);
  explicacao.textContent = questao.explicacao || "";
}

// Navegação
// =========

function proximaQuestao() {
  if (questaoAtual < questoes.length - 1) {
    questaoAtual++;
    carregarQuestao();
    console.log(`➡️ Avançou para questão ${questaoAtual + 1}`);
  }
}

function questaoAnterior() {
  if (questaoAtual > 0) {
    questaoAtual--;
    carregarQuestao();
    console.log(`⬅️ Voltou para questão ${questaoAtual + 1}`);
  }
}

function podeAvancar() {
  return modo !== "treino" || questaoCorrigida();
}

function sairDoSimulado() {
  document.getElementById("dialogo-sair").showModal();
}

function confirmarSaida() {
  document.getElementById("dialogo-sair").close();
  reiniciarSimulado();
}

function atualizarBotoesNavegacao() {
  const btnAnterior = document.getElementById("btn-anterior");
  const btnProxima = document.getElementById("btn-proxima");
  const btnFinalizar = document.getElementById("btn-finalizar");

  // Botão anterior
  btnAnterior.disabled = questaoAtual === 0;

  // No treino, só avança depois da correção
  btnProxima.disabled = !podeAvancar();
  btnFinalizar.disabled = !podeAvancar();

  // Botão próxima/finalizar
  if (questaoAtual === questoes.length - 1) {
    btnProxima.classList.add("hidden");
    btnFinalizar.classList.remove("hidden");
  } else {
    btnProxima.classList.remove("hidden");
    btnFinalizar.classList.add("hidden");
  }
}

// Finalização e Resultados
// ========================

const MINIMO_ACERTOS = 20; // Resolução Contran 1.020/2025

function finalizarSimulado() {
  // Parar cronômetro
  clearInterval(cronometro);

  // Calcular resultados
  const resultados = calcularResultados();
  mostrarResultados(resultados);

  // Transição para tela de resultados
  document.getElementById("tela-simulado").classList.add("hidden");
  document.getElementById("tela-resultado").classList.remove("hidden");
  document.body.classList.remove("em-simulado");
  window.scrollTo(0, 0);
  document.getElementById("titulo-resultado").focus({ preventScroll: true });

  console.log("🏁 Simulado finalizado!", resultados);
}

function calcularResultados() {
  let acertos = 0;
  let erros = 0;
  let emBranco = 0;
  let chutes = 0;
  let acertosNoChute = 0;

  for (let i = 0; i < questoes.length; i++) {
    const acertou = respostas[i] === questoes[i].resposta;

    if (acertou) {
      acertos++;
    } else if (respostas[i] === null) {
      emBranco++;
    } else {
      erros++;
    }

    if (certezas[i] === "chute") {
      chutes++;
      if (acertou) acertosNoChute++;
    }
  }

  const aprovado = acertos >= MINIMO_ACERTOS;
  const tempoTotal = calcularTempoTotal();

  return { acertos, erros, emBranco, chutes, acertosNoChute, aprovado, tempoTotal };
}

function calcularTempoTotal() {
  const agora = new Date();
  const diferenca = agora - tempoInicio;
  const minutos = Math.floor(diferenca / 60000);
  const segundos = Math.floor((diferenca % 60000) / 1000);
  return { minutos, segundos, texto: `${minutos}min ${segundos}s` };
}

function montarMensagemResultado({ acertos, acertosNoChute, aprovado }) {
  if (!aprovado) {
    const faltam = MINIMO_ACERTOS - acertos;
    const falta = faltam === 1 ? "Faltou 1 acerto" : `Faltaram ${faltam} acertos`;
    return `${falta} para chegar aos ${MINIMO_ACERTOS}. Revise as questões e tente de novo.`;
  }

  const folga = acertos - MINIMO_ACERTOS;
  let mensagem =
    acertos === questoes.length
      ? "Você acertou todas as questões."
      : folga === 0
      ? `Você fez exatamente os ${MINIMO_ACERTOS} acertos necessários.`
      : `Você passou da marca de ${MINIMO_ACERTOS} com ${folga} ${
          folga === 1 ? "acerto" : "acertos"
        } de folga.`;

  // Aprovação que depende de chute não é segurança para a prova real
  const semChutes = acertos - acertosNoChute;
  if (semChutes < MINIMO_ACERTOS) {
    mensagem += ` Mas sem os chutes certos seriam ${semChutes}: vale revisar essas questões.`;
  }
  return mensagem;
}

function mostrarResultados(resultados) {
  const { acertos, erros, emBranco, chutes, aprovado, tempoTotal } = resultados;

  document.getElementById("pontuacao-display").textContent = acertos;
  document.getElementById("total-erros").textContent = erros;
  document.getElementById("total-branco").textContent = emBranco;
  document.getElementById("rotulo-dado-modo").textContent =
    modo === "treino" ? "Chutes" : "Aproveitamento";
  document.getElementById("dado-modo").textContent =
    modo === "treino"
      ? chutes
      : `${Math.round((acertos / questoes.length) * 100)}%`;
  document.getElementById("tempo-total").textContent = tempoTotal.texto;
  document.getElementById("mensagem-aprovacao").textContent =
    montarMensagemResultado(resultados);

  const faltam = MINIMO_ACERTOS - acertos;
  const titulo = document.getElementById("titulo-resultado");
  titulo.textContent = aprovado
    ? "Aprovado"
    : faltam <= 3
    ? "Quase lá"
    : "Ainda não foi";
  titulo.classList.toggle("aprovado", aprovado);
  document
    .getElementById("sinal-pontuacao")
    .classList.toggle("aprovado", aprovado);

  // O carrinho para na pista conforme o número de acertos
  document
    .getElementById("estrada-resultado")
    .style.setProperty("--avanco", acertos / questoes.length);
}

// Revisão
// =======

function verRevisao() {
  gerarListaRevisao();

  const telaResultado = document.getElementById("tela-resultado");
  const telaRevisao = document.getElementById("tela-revisao");

  adicionarAnimacao(telaResultado, "slide-in-left");

  setTimeout(() => {
    telaResultado.classList.add("hidden");
    telaRevisao.classList.remove("hidden");
    window.scrollTo(0, 0);
    adicionarAnimacao(telaRevisao, "slide-in-right");
  }, 300);
}

function voltarResultado() {
  const telaRevisao = document.getElementById("tela-revisao");
  const telaResultado = document.getElementById("tela-resultado");

  adicionarAnimacao(telaRevisao, "slide-in-right");

  setTimeout(() => {
    telaRevisao.classList.add("hidden");
    telaResultado.classList.remove("hidden");
    window.scrollTo(0, 0);
    adicionarAnimacao(telaResultado, "slide-in-left");
  }, 300);
}

function gerarListaRevisao() {
  const container = document.getElementById("lista-revisao");
  container.innerHTML = "";

  questoes.forEach((questao, index) => {
    const respostaUsuario = respostas[index];
    const respostaCorreta = questao.resposta;
    const acertou = respostaUsuario === respostaCorreta;
    const emBranco = respostaUsuario === null;
    const formatarOpcao = (opcao) =>
      `<strong>${String.fromCharCode(65 + opcao)})</strong> ${questao.opcoes[opcao]}`;

    const item = document.createElement("article");
    item.className = `item-revisao ${acertou ? "acertou" : "errou"}`;

    item.innerHTML = `
            <div class="item-revisao-topo">
                <span class="item-revisao-numero">Questão ${index + 1}</span>
                <span class="item-revisao-status">
                    <i class="fas ${acertou ? "fa-circle-check" : "fa-circle-xmark"}" aria-hidden="true"></i>
                    ${acertou ? "Acertou" : emBranco ? "Em branco" : "Errou"}
                </span>
                ${
                  certezas[index] === "chute"
                    ? `<span class="item-revisao-chute">Chute</span>`
                    : ""
                }
            </div>
            ${
              questao.imagem
                ? `<img class="item-revisao-imagem" src="${questao.imagem}" alt="Imagem da questão">`
                : ""
            }
            <p class="item-revisao-pergunta">${questao.pergunta}</p>
            ${
              !acertou && !emBranco
                ? `<p class="item-revisao-resposta">Sua resposta: ${formatarOpcao(respostaUsuario)}</p>`
                : ""
            }
            <p class="item-revisao-resposta">Correta: ${formatarOpcao(respostaCorreta)}</p>
            ${
              questao.explicacao
                ? `<p class="item-revisao-explicacao">${questao.explicacao}</p>`
                : ""
            }
        `;

    container.appendChild(item);
  });
}

// Reiniciar
// =========

function reiniciarSimulado() {
  // Resetar variáveis
  questoes = [];
  questaoAtual = 0;
  respostas = [];
  certezas = [];
  tempoInicio = null;

  if (cronometro) {
    clearInterval(cronometro);
    cronometro = null;
  }

  // Transição para tela inicial
  const telaAtual = document.querySelector("section:not(.hidden)");
  const telaInicial = document.getElementById("tela-inicial");

  adicionarAnimacao(telaAtual, "slide-in-right");

  setTimeout(() => {
    // Esconder todas as telas
    document.querySelectorAll("section").forEach((secao) => {
      secao.classList.add("hidden");
    });

    // Mostrar tela inicial
    document.body.classList.remove("em-simulado");
    window.scrollTo(0, 0);
    telaInicial.classList.remove("hidden");
    adicionarAnimacao(telaInicial, "slide-in-left");
  }, 300);

  console.log("🔄 Simulado reiniciado");
}

// Event Listeners
// ===============

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  if (document.getElementById("tela-simulado").classList.contains("hidden"))
    return;
  if (document.getElementById("dialogo-sair").open) return;

  switch (e.key) {
    case "ArrowLeft":
      if (!document.getElementById("btn-anterior").disabled) {
        questaoAnterior();
      }
      break;
    case "ArrowRight":
      if (questaoAtual < questoes.length - 1 && podeAvancar()) {
        proximaQuestao();
      }
      break;
    case "c":
    case "C":
      definirCerteza("certeza");
      break;
    case "x":
    case "X":
      definirCerteza("chute");
      break;
    case "1":
    case "2":
    case "3":
    case "4":
      const opcaoIndex = parseInt(e.key) - 1;
      const botoes = document.querySelectorAll(".option-button");
      if (botoes[opcaoIndex] && !botoes[opcaoIndex].disabled) {
        selecionarOpcao(opcaoIndex, botoes[opcaoIndex]);
      }
      break;
    case "Enter":
      // Em um botão com foco, o próprio clique já faz a ação
      if (e.target.closest("button") || !podeAvancar()) break;
      if (questaoAtual === questoes.length - 1) {
        finalizarSimulado();
      } else {
        proximaQuestao();
      }
      break;
  }
});

// Inicialização
// =============

document.addEventListener("DOMContentLoaded", () => {
  console.log("🎯 Simulado DETRAN carregado com sucesso!");
  console.log("📋 Funcionalidades disponíveis:");
  console.log("   • Navegação por teclado (setas, números 1-4, Enter)");
  console.log("   • Feedback visual em tempo real");
  console.log("   • Animações suaves");
  console.log("   • Cronômetro automático");
  console.log("   • Revisão detalhada");
  console.log("   • Design responsivo");

  new ResizeObserver(reservarEspacoDoca).observe(
    document.getElementById("doca-questao")
  );
});
