# Estrutura de Imagens do Simulado

## 📁 Organização das Pastas

### `/placas/` - Placas de Trânsito
Imagens das placas de sinalização de trânsito:

**Regulamentação (R):**
- `pare.svg` - Placa R-1 (Parada obrigatória)
- `proibido-estacionar.svg` - Placa R-6a (Proibido estacionar)
- `preferencial.png` - Placa R-2 (Dê a preferência)
- `velocidade-maxima-60.png` - Placa R-19 (Velocidade máxima)
- `proibido-virar-esquerda.png` - Placa R-5 (Proibido virar à esquerda)
- `proibido-ultrapassar.svg` - Placa R-7 (Proibido ultrapassar)

**Advertência (A):**
- `curva-direita.png` - Placa A-2a (Curva acentuada à direita)
- `semaforo-a-frente.png` - Placa A-16 (Semáforo à frente)

### `/situacoes/` - Situações de Trânsito
Imagens representando situações reais no trânsito:

- `faixa-pedestres.png` - Pedestres atravessando na faixa
- `rotatoria.png` - Entrada em rotatória
- `conversao-esquerda.png` - Conversão à esquerda
- `ultrapassagem-proibida.png` - Situação de ultrapassagem proibida

### `/pavimento/` - Marcações Viárias
Imagens das marcações no pavimento:

- `linha-continua.png` - Linha contínua (ultrapassagem proibida)
- `seta-mudanca-faixa.png` - Seta indicando mudança de faixa
- `area-de-conflito.png` - Área de conflito em cruzamentos

## 📏 Especificações das Imagens

### Formato
- **Formato recomendado:** PNG ou JPG
- **Qualidade:** Alta resolução para boa visualização
- **Fundo:** Preferencialmente transparente (PNG) ou branco

### Dimensões
- **Largura máxima:** 800px
- **Altura máxima:** 600px
- **Proporção:** 4:3 ou 16:9 para melhor visualização
- **Tamanho do arquivo:** Máximo 500KB por imagem

### Qualidade Visual
- **Clareza:** Imagens nítidas e bem definidas
- **Contraste:** Bom contraste para facilitar identificação
- **Iluminação:** Imagens com boa iluminação
- **Enquadramento:** Foco no elemento principal (placa, situação, etc.)

## 🎨 Diretrizes de Estilo

### Placas de Trânsito
- Fotografar placas reais ou usar imagens oficiais do CONTRAN
- Manter proporções e cores originais
- Evitar reflexos ou sombras que dificultem a leitura
- Enquadrar apenas a placa, sem muito fundo

### Situações de Trânsito
- Usar imagens representativas e educativas
- Mostrar claramente a situação problema
- Evitar imagens ambíguas ou confusas
- Preferir situações urbanas típicas do Brasil

### Marcações Viárias
- Fotografar de cima (vista aérea quando possível)
- Mostrar claramente o padrão da marcação
- Boa definição das linhas e símbolos
- Contexto suficiente para entendimento

## 🔄 Como Adicionar Novas Imagens

1. **Salve a imagem** na pasta apropriada
2. **Nomeie o arquivo** de forma descritiva (sem espaços, use hífens)
3. **Verifique as dimensões** e qualidade
4. **Teste no simulado** para garantir que carrega corretamente

## 📝 Exemplo de Nomenclatura

```
Correto: ❌ pare.png
Correto: ❌ velocidade-maxima-60.png
Correto: ❌ faixa-de-pedestres.png

Evitar: ❌ Placa PARE.PNG
Evitar: ❌ velocidade maxima 60 km.jpg
Evitar: ❌ IMG_001.png
```

## 🚀 Status das Imagens

### ✅ Implementadas no Código
- Todas as imagens listadas acima já estão referenciadas no código
- O sistema detecta automaticamente se a imagem existe
- Placeholder automático para imagens não encontradas

### 📋 Para Adicionar
- Adicione as imagens físicas nas pastas correspondentes
- O simulado funcionará automaticamente com as novas imagens
- Teste cada imagem no navegador para garantir funcionamento

---

**Nota:** As imagens não estão incluídas neste repositório. Você deve adicionar as imagens reais nos caminhos especificados para que apareçam corretamente no simulado.
