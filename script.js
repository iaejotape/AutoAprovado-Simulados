// Simulado DETRAN - JavaScript Avançado
// =====================================

// Variáveis globais
let questoes = [];
let questaoAtual = 0;
let respostas = [];
let tempoInicio = null;
let cronometro = null;

// Base de questões do simulado (expandida)
const baseQuestoes = [
    {
        pergunta: "Qual é a velocidade máxima permitida em vias urbanas, salvo sinalização em contrário?",
        opcoes: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
        resposta: 2
    },
    {
        pergunta: "O que significa a placa de trânsito com fundo azul e símbolo branco?",
        opcoes: ["Proibição", "Advertência", "Regulamentação", "Indicação"],
        resposta: 3
    },
    {
        pergunta: "Em caso de acidente de trânsito com vítimas, a primeira providência é:",
        opcoes: ["Remover o veículo da via", "Sinalizar o local", "Prestar socorro às vítimas", "Chamar a polícia"],
        resposta: 2
    },
    {
        pergunta: "A distância mínima para estacionar antes de uma esquina é de:",
        opcoes: ["3 metros", "5 metros", "8 metros", "10 metros"],
        resposta: 1
    },
    {
        pergunta: "O condutor que dirigir sob a influência de álcool comete infração:",
        opcoes: ["Leve", "Média", "Grave", "Gravíssima"],
        resposta: 3
    },
    {
        pergunta: "A faixa de pedestres deve ser respeitada pelo condutor, que deve:",
        opcoes: ["Acelerar para passar rapidamente", "Parar antes da faixa se houver pedestres", "Buzinar para avisar os pedestres", "Passar devagar ao lado dos pedestres"],
        resposta: 1
    },
    {
        pergunta: "O uso do cinto de segurança é obrigatório para:",
        opcoes: ["Apenas o motorista", "Motorista e passageiro da frente", "Todos os ocupantes do veículo", "Apenas em viagens longas"],
        resposta: 2
    },
    {
        pergunta: "Em uma via de mão dupla sem sinalização, a velocidade máxima é:",
        opcoes: ["40 km/h", "60 km/h", "80 km/h", "100 km/h"],
        resposta: 1
    },
    {
        pergunta: "O que fazer ao se aproximar de um cruzamento com semáforo amarelo intermitente?",
        opcoes: ["Parar obrigatoriamente", "Acelerar para passar", "Reduzir a velocidade e prosseguir com cuidado", "Aguardar ficar verde"],
        resposta: 2
    },
    {
        pergunta: "A ultrapassagem é proibida:",
        opcoes: ["Apenas em curvas", "Em pontes, viadutos e túneis", "Apenas à noite", "Apenas em dias chuvosos"],
        resposta: 1
    },
    {
        pergunta: "O triângulo de segurança deve ser colocado a que distância do veículo?",
        opcoes: ["10 metros", "20 metros", "30 metros", "50 metros"],
        resposta: 2
    },
    {
        pergunta: "A Carteira Nacional de Habilitação tem validade de:",
        opcoes: ["3 anos", "5 anos", "10 anos", "Varia conforme a idade"],
        resposta: 3
    },
    {
        pergunta: "Em caso de aquaplanagem, o condutor deve:",
        opcoes: ["Acelerar para sair rapidamente", "Frear bruscamente", "Manter o volante firme e tirar o pé do acelerador", "Virar o volante rapidamente"],
        resposta: 2
    },
    {
        pergunta: "O que significa a luz vermelha do semáforo?",
        opcoes: ["Atenção, prepare-se para parar", "Pare obrigatoriamente", "Siga com cuidado", "Pode prosseguir"],
        resposta: 1
    },
    {
        pergunta: "A inspeção veicular é obrigatória a cada:",
        opcoes: ["6 meses", "1 ano", "2 anos", "Varia conforme o estado"],
        resposta: 3
    },
    {
        pergunta: "Em uma rotatória, tem preferência:",
        opcoes: ["Quem vem da direita", "Quem vem da esquerda", "Quem já está na rotatória", "O veículo maior"],
        resposta: 2
    },
    {
        pergunta: "O condutor deve usar farol baixo:",
        opcoes: ["Apenas à noite", "Durante o dia em rodovias", "Apenas em túneis", "Somente quando chove"],
        resposta: 1
    },
    {
        pergunta: "A idade mínima para obter a CNH categoria B é:",
        opcoes: ["16 anos", "18 anos", "21 anos", "25 anos"],
        resposta: 1
    },
    {
        pergunta: "Em caso de pane seca (falta de combustível), o condutor deve:",
        opcoes: ["Deixar o carro na via", "Empurrar o veículo", "Sinalizar e remover o veículo da via", "Pedir ajuda para outros motoristas"],
        resposta: 2
    },
    {
        pergunta: "O que é direção defensiva?",
        opcoes: ["Dirigir sempre devagar", "Dirigir de forma a evitar acidentes", "Dirigir apenas de dia", "Dirigir sem usar o freio"],
        resposta: 1
    },
    {
        pergunta: "A placa R-1 significa:",
        opcoes: ["Proibido virar à esquerda", "Parada obrigatória", "Proibido seguir em frente", "Velocidade máxima"],
        resposta: 1
    },
    {
        pergunta: "Em caso de derrapagem, o condutor deve:",
        opcoes: ["Virar o volante no sentido contrário", "Frear com força", "Virar o volante no mesmo sentido da derrapagem", "Acelerar"],
        resposta: 2
    },
    {
        pergunta: "A cor amarela na sinalização de trânsito indica:",
        opcoes: ["Proibição", "Advertência", "Obrigação", "Informação"],
        resposta: 1
    },
    {
        pergunta: "O exame toxicológico é obrigatório para condutores:",
        opcoes: ["De todas as categorias", "Apenas categoria A", "Categorias C, D e E", "Apenas categoria B"],
        resposta: 2
    },
    {
        pergunta: "A distância de seguimento deve ser:",
        opcoes: ["Sempre 2 metros", "Proporcional à velocidade", "Sempre 10 metros", "Não há regra específica"],
        resposta: 1
    },
    {
        pergunta: "Em uma via com ciclofaixa, o motorista:",
        opcoes: ["Pode usar a faixa livremente", "Não pode invadir a ciclofaixa", "Pode usar apenas para ultrapassar", "Pode estacionar na ciclofaixa"],
        resposta: 1
    },
    {
        pergunta: "O que fazer ao avistar uma ambulância com sirene ligada?",
        opcoes: ["Acelerar para sair da frente", "Parar imediatamente", "Dar passagem com segurança", "Ignorar e continuar"],
        resposta: 2
    },
    {
        pergunta: "A renovação da CNH deve ser feita:",
        opcoes: ["Apenas quando vence", "30 dias antes do vencimento", "Até 30 dias após o vencimento", "A qualquer momento"],
        resposta: 1
    },
    {
        pergunta: "Em caso de chuva forte, o condutor deve:",
        opcoes: ["Acelerar para chegar logo", "Manter a velocidade normal", "Reduzir a velocidade e aumentar a distância", "Parar na via"],
        resposta: 2
    },
    {
        pergunta: "A função do ABS no veículo é:",
        opcoes: ["Aumentar a velocidade", "Evitar o travamento das rodas na frenagem", "Economizar combustível", "Melhorar o conforto"],
        resposta: 1
    }
];

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

function adicionarAnimacao(elemento, animacao) {
    elemento.classList.add(animacao);
    setTimeout(() => {
        elemento.classList.remove(animacao);
    }, 500);
}

function formatarTempo(milissegundos) {
    const minutos = Math.floor(milissegundos / 60000);
    const segundos = Math.floor((milissegundos % 60000) / 1000);
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Controle do Simulado
// ====================

function iniciarSimulado() {
    // Preparar dados
    questoes = embaralharArray(baseQuestoes).slice(0, 30);
    questaoAtual = 0;
    respostas = new Array(30).fill(null);
    tempoInicio = new Date();
    
    // Transição de telas
    const telaInicial = document.getElementById('tela-inicial');
    const telaSimulado = document.getElementById('tela-simulado');
    
    adicionarAnimacao(telaInicial, 'slide-in-left');
    
    setTimeout(() => {
        telaInicial.classList.add('hidden');
        telaSimulado.classList.remove('hidden');
        adicionarAnimacao(telaSimulado, 'slide-in-right');
    }, 300);
    
    // Iniciar cronômetro
    iniciarCronometro();
    
    // Carregar primeira questão
    carregarQuestao();
    
    // Atualizar interface
    document.getElementById('btn-iniciar').style.display = 'none';
    
    console.log('🚀 Simulado iniciado com sucesso!');
}

function iniciarCronometro() {
    cronometro = setInterval(() => {
        const agora = new Date();
        const diferenca = agora - tempoInicio;
        document.getElementById('tempo').textContent = formatarTempo(diferenca);
    }, 1000);
}

function carregarQuestao() {
    const questao = questoes[questaoAtual];
    const cardQuestao = document.getElementById('card-questao');
    
    // Animação de transição
    adicionarAnimacao(cardQuestao, 'fade-in');
    
    // Atualizar informações
    document.getElementById('questao-atual').textContent = questaoAtual + 1;
    document.getElementById('titulo-questao').textContent = `Questão ${questaoAtual + 1}`;
    document.getElementById('texto-questao').textContent = questao.pergunta;
    document.getElementById('barra-progresso').value = questaoAtual + 1;
    
    // Criar botões de opção
    criarBotoesOpcao(questao);
    
    // Atualizar navegação
    atualizarBotoesNavegacao();
}

function criarBotoesOpcao(questao) {
    const container = document.getElementById('opcoes-questao');
    container.innerHTML = '';
    
    questao.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.className = 'button option-button is-fullwidth';
        botao.innerHTML = `
            <div style="display: flex; align-items: center; text-align: left;">
                <span style="background: rgba(0,0,0,0.1); border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">
                    ${String.fromCharCode(65 + index)}
                </span>
                <span style="flex: 1;">${opcao}</span>
            </div>
        `;
        
        // Verificar se já foi selecionada
        if (respostas[questaoAtual] === index) {
            botao.classList.add('selected');
        }
        
        // Event listener
        botao.addEventListener('click', () => selecionarOpcao(index, botao));
        
        container.appendChild(botao);
        
        // Animação de entrada
        setTimeout(() => {
            adicionarAnimacao(botao, 'slide-in-right');
        }, index * 100);
    });
}

function selecionarOpcao(index, botaoSelecionado) {
    // Remover seleções anteriores
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Marcar nova seleção
    botaoSelecionado.classList.add('selected');
    respostas[questaoAtual] = index;
    
    console.log(`✅ Resposta selecionada: ${String.fromCharCode(65 + index)}`);
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

function atualizarBotoesNavegacao() {
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const btnFinalizar = document.getElementById('btn-finalizar');
    
    // Botão anterior
    btnAnterior.disabled = questaoAtual === 0;
    
    // Botão próxima/finalizar
    if (questaoAtual === questoes.length - 1) {
        btnProxima.classList.add('hidden');
        btnFinalizar.classList.remove('hidden');
    } else {
        btnProxima.classList.remove('hidden');
        btnFinalizar.classList.add('hidden');
    }
}

// Finalização e Resultados
// ========================

function finalizarSimulado() {
    // Parar cronômetro
    clearInterval(cronometro);
    
    // Calcular resultados
    const resultados = calcularResultados();
    
    // Transição para tela de resultados
    const telaSimulado = document.getElementById('tela-simulado');
    const telaResultado = document.getElementById('tela-resultado');
    
    adicionarAnimacao(telaSimulado, 'slide-in-left');
    
    setTimeout(() => {
        telaSimulado.classList.add('hidden');
        telaResultado.classList.remove('hidden');
        adicionarAnimacao(telaResultado, 'slide-in-right');
        
        // Mostrar resultados com animação
        setTimeout(() => {
            mostrarResultados(resultados);
        }, 300);
    }, 300);
    
    console.log('🏁 Simulado finalizado!', resultados);
}

function calcularResultados() {
    let acertos = 0;
    let erros = 0;
    
    for (let i = 0; i < questoes.length; i++) {
        if (respostas[i] === questoes[i].resposta) {
            acertos++;
        } else {
            erros++;
        }
    }
    
    const percentual = Math.round((acertos / questoes.length) * 100);
    const aprovado = percentual >= 70;
    const tempoTotal = calcularTempoTotal();
    
    return { acertos, erros, percentual, aprovado, tempoTotal };
}

function calcularTempoTotal() {
    const agora = new Date();
    const diferenca = agora - tempoInicio;
    const minutos = Math.floor(diferenca / 60000);
    const segundos = Math.floor((diferenca % 60000) / 1000);
    return { minutos, segundos, texto: `${minutos}min ${segundos}s` };
}

function mostrarResultados(resultados) {
    const { acertos, erros, percentual, aprovado, tempoTotal } = resultados;
    
    // Atualizar elementos básicos
    document.getElementById('pontuacao-display').textContent = `${acertos}/30`;
    document.getElementById('total-acertos').textContent = acertos;
    document.getElementById('total-erros').textContent = erros;
    document.getElementById('percentual').textContent = `${percentual}%`;
    document.getElementById('tempo-total').textContent = tempoTotal.texto;
    
    // Configurar círculo de pontuação
    const circulo = document.getElementById('circulo-pontuacao');
    const titulo = document.getElementById('titulo-resultado');
    const subtitulo = document.getElementById('subtitulo-resultado');
    const icone = document.getElementById('icone-resultado');
    const status = document.getElementById('status-aprovacao');
    const mensagem = document.getElementById('mensagem-aprovacao');
    
    if (aprovado) {
        // Aprovado
        circulo.className = 'score-circle approved';
        titulo.textContent = 'Parabéns! 🎉';
        subtitulo.textContent = 'Você foi APROVADO!';
        icone.className = 'fas fa-trophy has-text-warning';
        status.className = 'notification is-success';
        
        let mensagemAprovacao = '';
        if (percentual >= 90) {
            mensagemAprovacao = `
                <i class="fas fa-star mr-2"></i>
                <strong>EXCELENTE!</strong> Com ${percentual}% de aproveitamento, você demonstrou 
                domínio excepcional das regras de trânsito. Está mais que preparado para a prova oficial!
            `;
        } else if (percentual >= 80) {
            mensagemAprovacao = `
                <i class="fas fa-check-circle mr-2"></i>
                <strong>MUITO BOM!</strong> Com ${percentual}% de aproveitamento, você está bem preparado. 
                Continue praticando para manter a excelência!
            `;
        } else {
            mensagemAprovacao = `
                <i class="fas fa-check-circle mr-2"></i>
                <strong>APROVADO!</strong> Você atingiu ${percentual}% de aproveitamento. 
                Continue estudando para manter o conhecimento sempre atualizado!
            `;
        }
        mensagem.innerHTML = mensagemAprovacao;
    } else {
        // Reprovado
        circulo.className = 'score-circle failed';
        titulo.textContent = 'Não desista! 💪';
        subtitulo.textContent = 'Continue estudando';
        icone.className = 'fas fa-heart has-text-danger';
        status.className = 'notification is-warning';
        
        let mensagemReprovacao = '';
        if (percentual >= 60) {
            mensagemReprovacao = `
                <i class="fas fa-thumbs-up mr-2"></i>
                <strong>Você está quase lá!</strong> Com ${percentual}% de aproveitamento, 
                precisa de apenas mais alguns acertos. Revise os erros e tente novamente!
            `;
        } else if (percentual >= 40) {
            mensagemReprovacao = `
                <i class="fas fa-book mr-2"></i>
                <strong>Continue estudando!</strong> Com ${percentual}% de aproveitamento, 
                você precisa revisar mais o conteúdo. Foque nos temas que errou mais!
            `;
        } else {
            mensagemReprovacao = `
                <i class="fas fa-graduation-cap mr-2"></i>
                <strong>Precisa de mais estudo!</strong> Com ${percentual}% de aproveitamento, 
                recomendamos revisar todo o conteúdo antes de tentar novamente.
            `;
        }
        mensagem.innerHTML = mensagemReprovacao;
    }
    
    // Animações dos números
    animarContadores();
}

function animarContadores() {
    const elementos = [
        { id: 'total-acertos', valor: parseInt(document.getElementById('total-acertos').textContent) },
        { id: 'total-erros', valor: parseInt(document.getElementById('total-erros').textContent) },
        { id: 'percentual', valor: parseInt(document.getElementById('percentual').textContent.replace('%', '')) }
    ];
    
    elementos.forEach(({ id, valor }) => {
        const elemento = document.getElementById(id);
        let contador = 0;
        const incremento = valor / 30; // 30 frames de animação
        
        const intervalo = setInterval(() => {
            contador += incremento;
            if (contador >= valor) {
                contador = valor;
                clearInterval(intervalo);
            }
            
            if (id === 'percentual') {
                elemento.textContent = Math.floor(contador) + '%';
            } else {
                elemento.textContent = Math.floor(contador);
            }
        }, 50);
    });
}

// Revisão
// =======

function verRevisao() {
    gerarListaRevisao();
    
    const telaResultado = document.getElementById('tela-resultado');
    const telaRevisao = document.getElementById('tela-revisao');
    
    adicionarAnimacao(telaResultado, 'slide-in-left');
    
    setTimeout(() => {
        telaResultado.classList.add('hidden');
        telaRevisao.classList.remove('hidden');
        adicionarAnimacao(telaRevisao, 'slide-in-right');
    }, 300);
}

function voltarResultado() {
    const telaRevisao = document.getElementById('tela-revisao');
    const telaResultado = document.getElementById('tela-resultado');
    
    adicionarAnimacao(telaRevisao, 'slide-in-right');
    
    setTimeout(() => {
        telaRevisao.classList.add('hidden');
        telaResultado.classList.remove('hidden');
        adicionarAnimacao(telaResultado, 'slide-in-left');
    }, 300);
}

function gerarListaRevisao() {
    const container = document.getElementById('lista-revisao');
    container.innerHTML = '';
    
    questoes.forEach((questao, index) => {
        const respostaUsuario = respostas[index];
        const respostaCorreta = questao.resposta;
        const acertou = respostaUsuario === respostaCorreta;
        
        const item = document.createElement('div');
        item.className = 'modern-card card mb-4';
        
        item.innerHTML = `
            <div class="card-content">
                <div class="level mb-3">
                    <div class="level-left">
                        <div class="level-item">
                            <span class="tag is-large ${acertou ? 'is-success' : 'is-danger'}">
                                <i class="fas ${acertou ? 'fa-check' : 'fa-times'} mr-2"></i>
                                Questão ${index + 1}
                            </span>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <span class="tag is-light is-large">
                                ${acertou ? '✅ ACERTOU' : '❌ ERROU'}
                            </span>
                        </div>
                    </div>
                </div>
                
                <p class="is-size-5 has-text-weight-semibold mb-4">${questao.pergunta}</p>
                
                <div class="columns">
                    <div class="column is-6">
                        <div class="box ${acertou ? 'has-background-success-light' : 'has-background-danger-light'}">
                            <p class="heading has-text-weight-bold">Sua resposta:</p>
                            <p class="is-size-6">
                                ${respostaUsuario !== null ? 
                                    `<strong>${String.fromCharCode(65 + respostaUsuario)})</strong> ${questao.opcoes[respostaUsuario]}` : 
                                    '<em>Não respondida</em>'}
                            </p>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="box has-background-success-light">
                            <p class="heading has-text-weight-bold">Resposta correta:</p>
                            <p class="is-size-6">
                                <strong>${String.fromCharCode(65 + respostaCorreta)})</strong> ${questao.opcoes[respostaCorreta]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(item);
        
        // Animação de entrada
        setTimeout(() => {
            adicionarAnimacao(item, 'fade-in');
        }, index * 100);
    });
}

// Reiniciar
// =========

function reiniciarSimulado() {
    // Resetar variáveis
    questoes = [];
    questaoAtual = 0;
    respostas = [];
    tempoInicio = null;
    
    if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
    }
    
    // Transição para tela inicial
    const telaAtual = document.querySelector('section:not(.hidden)');
    const telaInicial = document.getElementById('tela-inicial');
    
    adicionarAnimacao(telaAtual, 'slide-in-right');
    
    setTimeout(() => {
        // Esconder todas as telas
        document.querySelectorAll('section').forEach(secao => {
            secao.classList.add('hidden');
        });
        
        // Mostrar tela inicial
        telaInicial.classList.remove('hidden');
        adicionarAnimacao(telaInicial, 'slide-in-left');
        
        // Restaurar botão do header
        document.getElementById('btn-iniciar').style.display = 'inline-flex';
    }, 300);
    
    console.log('🔄 Simulado reiniciado');
}

// Event Listeners
// ===============

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (document.getElementById('tela-simulado').classList.contains('hidden')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            if (!document.getElementById('btn-anterior').disabled) {
                questaoAnterior();
            }
            break;
        case 'ArrowRight':
            if (questaoAtual < questoes.length - 1) {
                proximaQuestao();
            }
            break;
        case '1':
        case '2':
        case '3':
        case '4':
            const opcaoIndex = parseInt(e.key) - 1;
            const botoes = document.querySelectorAll('.option-button');
            if (botoes[opcaoIndex] && !botoes[opcaoIndex].disabled) {
                selecionarOpcao(opcaoIndex, botoes[opcaoIndex]);
            }
            break;
        case 'Enter':
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

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Simulado DETRAN carregado com sucesso!');
    console.log('📋 Funcionalidades disponíveis:');
    console.log('   • Navegação por teclado (setas, números 1-4, Enter)');
    console.log('   • Feedback visual em tempo real');
    console.log('   • Animações suaves');
    console.log('   • Cronômetro automático');
    console.log('   • Revisão detalhada');
    console.log('   • Design responsivo');
    
    // Adicionar efeitos de hover nos botões
    document.querySelectorAll('.nav-button').forEach(botao => {
        botao.addEventListener('mouseenter', () => {
            adicionarAnimacao(botao, 'fade-in');
        });
    });
});

