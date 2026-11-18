<div align="center">

# 🌐 ComfyUI-Global-Translation

**Tradução multilíngue da interface do ComfyUI**

> Adiciona traduções a nós, blueprints e subgrafos de fluxos de trabalho, menus, configurações e interfaces de nós de terceiros no idioma selecionado no ComfyUI.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.5.3-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#uso)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · **Português** · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Autor: **猪的飞行梦** — Este projeto é uma modificação baseada em [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) e [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation). Agradecimento especial aos autores por sua contribuição excepcional à comunidade open source. Este projeto continuará de código aberto.

</div>

---

## Índice

- [Visão geral](#visão-geral)
- [Recursos principais](#recursos-principais)
- [Prévia](#prévia)
- [Instalação](#instalação)
- [Uso](#uso)
- [Abrangência da tradução](#abrangência-da-tradução)
- [Arquitetura](#arquitetura)
- [Observações](#observações)
- [Registro de alterações](#registro-de-alterações)
- [Comunidade e suporte](#comunidade-e-suporte)
- [Licença](#licença)
- [Isenção de responsabilidade](#isenção-de-responsabilidade)

---

## Visão geral

O ComfyUI-Global-Translation é um plugin de tradução multilíngue da interface. Ele segue o idioma escolhido no ComfyUI (Configurações → Geral → `Comfy.Locale`) e adiciona traduções a nós, menus, painel de configurações, gerenciador e interfaces de nós de terceiros. Também traduz textos da interface que os nós de terceiros atualizam dinamicamente. A interface do plugin tem suporte a 15 idiomas, e a cobertura depende do dicionário de cada idioma.

### Por que escolher este plugin?

| Recurso | Este plugin | Outros plugins de tradução |
|------|--------|-------------|
| Compatível com tradução oficial | ✅ Adiciona traduções no idioma selecionado no ComfyUI | ❌ Pode entrar em conflito |
| Funções do menu de contexto | ✅ Continuam funcionando após traduzir | ❌ Algumas funções quebram |
| Compatível com UI antiga e nova | ✅ Arquitetura de botão duplo | ❌ Suporta apenas uma versão |
| Ativar ou desativar a tradução | ✅ Ao alternar, a página é recarregada | — |
| Proteção de títulos personalizados | ✅ Não sobrepõe edições do usuário | ❌ Podem ser sobrescritos |

---

## Recursos principais

### 🎯 Sistema de tradução inteligente

- **Detecção inteligente** — reconhece automaticamente o texto já traduzido, evitando traduções repetidas e recursão infinita
- **Compatibilidade nativa** — coexiste perfeitamente com a tradução oficial do ComfyUI sem interferências mútuas
- **Consciência de contexto** — aplica a estratégia mais adequada conforme o tipo de elemento (nós, menus, widgets etc.)
- **Combinação de traduções** — as traduções do mesmo nó são combinadas campo a campo. Quando é possível identificar o plugin que fornece o nó, o dicionário dele tem prioridade
- **Tradução de painéis personalizados** — traduz botões, rótulos de controles, textos de orientação e janelas pop-up dos painéis dos nós
- **Tradução do menu de contexto** — o menu exibe as traduções. Ações como desconectar e renomear continuam usando os itens e valores originais

### 🎨 Interface de usuário bonita

- **Controle em pílula segmentada** — um interruptor arredondado em forma de pílula com um controle deslizante azul que desliza suavemente entre os segmentos "ligado/desligado", visual moderno
- **Efeito arco-íris** — em estado ativo exibe uma fluida animação de gradiente de arco-íris
- **Design cinza minimalista** — em estado inativo emprega um elegante gradiente cinza
- **Modo nativo discreto** — opcionalmente uma paleta sóbria coerente com o tema padrão do ComfyUI
- **Feedback em tempo real** — o texto e a cor do botão refletem instantaneamente o estado atual da tradução

### 🔧 Gestão flexível da tradução

- **Alternância em tempo real** — ativar/desativar a tradução sem reiniciar
- **Estado persistente** — as configurações são salvas automaticamente e sobrevivem a reinícios
- **Integração ao painel de configurações** — configurar o estilo do interruptor e a tradução das opções suspensas nas configurações do ComfyUI (o idioma segue a configuração oficial do ComfyUI)
- **Interruptor por plugin** — ativa ou desativa as traduções dos nós por arquivo
- **Atualização dos dicionários** — recarregue a página após adicionar ou alterar um arquivo de tradução

### 🛡️ Estável e confiável

- **Tratamento robusto de exceções** — todas as operações críticas são protegidas
- **Tolerância a erros nos dicionários** — o plugin ignora dicionários ilegíveis ou com estrutura incorreta e registra seus nomes no log
- **Proteção do conteúdo do usuário** — preserva textos editáveis, prompts e nomes de arquivos e pastas da barra lateral de fluxos de trabalho
- **Compatibilidade multi-versão** — suporta as interfaces antiga e nova do ComfyUI

---

## Prévia
São exibidos apenas os efeitos em chinês e inglês; para os demais idiomas, alterne e verifique você mesmo. O interruptor segue a configuração de idioma do ComfyUI.

### Botões de ativação da tradução

<img width="150" height="100" alt="interruptor-zh-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="interruptor-en-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="interruptor-zh-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="interruptor-en-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="interruptor-zh-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="interruptor-en-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Interface de gerenciamento

<img width="2000" height="1500" alt="tela-de-configuracoes" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="tela-de-configuracoes-en" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Instalação

### Método 1: clone via Git (recomendado)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Reinicie o ComfyUI após a instalação.

#### Método 1 — passo a passo detalhado para iniciantes:

1. Abra a pasta de plugins `ComfyUI\custom_nodes`
2. No Win11, clique direito em uma área vazia e escolha "Abrir no Terminal". No Win10, digite `cmd` na barra de endereços e pressione Enter.
3. Clique em **Code** no canto superior direito desta página e copie o endereço (você também pode copiar a URL)
4. No terminal digite `git clone `, cole o endereço e pressione Enter. Exemplo: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Instalação concluída, reinicie o ComfyUI. (Se a instalação falhar, ative um proxy/VPN e tente novamente.)



### Método 2: ComfyUI Manager

1. Abra o ComfyUI Manager
2. Mude os dados para: Canal (remoto)
3. Clique em Gerenciador de nós
4. Pesquise **猪的飞行梦**
5. Clique em Instalar e reinicie o ComfyUI

### Método 3: download manual (não recomendado, sem atualizações)

1. Na página do GitHub clique em **Code → Download ZIP**
2. Extraia em `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. Reinicie o ComfyUI

---

## Uso

### Interruptor de tradução

Clique no interruptor de tradução na barra de ferramentas para alternar seu estado. Com o teclado, use Tab para selecionar o botão e pressione Enter ou Espaço para alternar. Após salvar a alteração, a página é recarregada automaticamente.

- **Tradução ativada** — o botão mostra "tradução ativada" e o texto da interface é traduzido para o idioma atual (segue a configuração de idioma oficial do ComfyUI)
- **Tradução desativada** — o botão mostra «tradução desativada» e restaura os textos originais do ComfyUI e dos nós de terceiros

### Idioma de tradução

O idioma de tradução não é mais definido dentro do plugin; ele **segue automaticamente a configuração de idioma oficial do ComfyUI** (Configurações → Geral → Idioma / `Comfy.Locale`):

- Corresponde a todos os idiomas oficialmente suportados: chinês simplificado, chinês tradicional, inglês, japonês, coreano, russo, francês, alemão, espanhol, italiano, português (Brasil), turco, árabe, persa, hebraico; idiomas não cobertos recorrem ao inglês
- Após alternar o idioma oficial nas configurações do ComfyUI, a página recarrega automaticamente; a tradução e os textos do plugin se aplicam juntos, sem reinício manual

### Painel de configurações

Em ComfyUI Configurações → «🌐 Configurações de tradução» há duas opções. Os textos de interface são localizados no idioma atual (15 idiomas) com uma ordem de seções coerente em todos os idiomas:

| Opção | Descrição | Escolhas |
|-------|------|------|
| 🎨 Estilo do interruptor | Escolha a aparência; redesenha na hora sem recarregar | pill (pílula segmentada) / gradient (arco-íris) / plain (nativo discreto) |
| 📋 Opções suspensas | Se traduz também o texto das opções dos menus suspensos COMBO | Ligado / Desligado (recarrega automaticamente ao alterar) |

O **Gerenciador de tradução de plugins**, abaixo das opções, mostra os arquivos de tradução de nós disponíveis. Desmarque um arquivo para desativar suas traduções. Quando a lista for carregada e houver itens selecionáveis, clique em «Salvar e recarregar». As desativações de outros idiomas são preservadas. Se o salvamento falhar, o painel exibe um aviso e permite tentar novamente.

### Referência de estilos de botão

| Estilo | Ligado | Desligado | Ideal para |
|-----|---------|---------|----------|
| **Pílula segmentada** | Controle azul sobre o segmento "ligado", texto branco em negrito | Controle azul deslizado para "desligado", texto cinza | Moderno e minimalista, estado num relance |
| **Gradiente arco-íris** | Animação de arco-íris fluida, branco em negrito | Animação cinza fluida, texto escuro em negrito | Quer algo chamativo |
| **Nativo discreto** | Fundo da cor do tema do ComfyUI | Fundo escuro, texto cinza | Quer se integrar à interface |

> Clique em qualquer parte do botão em forma de pílula para alternar o estado. Depois de salvar a alteração, o controle deslizante passa para o novo estado e a página é recarregada. Se o salvamento falhar, o estado anterior é mantido e você pode tentar novamente.

---

## Abrangência da tradução

### O que é traduzido

| Categoria | Cobertura | Status |
|------|---------|------|
| **Nomes dos nós** | Títulos e nomes de exibição de todos os nós do fluxo de trabalho | ✅ |
| **Propriedades dos nós** | Portas de entrada/saída, rótulos de widgets, descrições | ✅ |
| **Blueprints e subgrafos** | Títulos de blueprints e subgrafos de modelos oficiais com entradas no dicionário, além de portas expostas, rótulos de widgets e textos de orientação dos subgrafos oficiais e personalizados | ✅ |
| **Menus** | Menu principal, menu de contexto, menus de clique direito | ✅ |
| **Painel de configurações** | A caixa de diálogo de configurações do ComfyUI | ✅ |
| **Gerenciador** | A interface do ComfyUI Manager | ✅ |
| **Biblioteca de modelos** | Nomes de modelos de fluxo de trabalho | ✅ |
| **Elementos de interface** | Botões, rótulos, dicas de ferramenta, caixa de busca | ✅ |
| **Painéis personalizados** | Botões, rótulos, menus suspensos, dicas, pop-ups em painéis DOM criados pelos nós | ✅ |
| **Informações da fila** | Texto dinâmico como o tamanho da fila | ✅ |

### Estrutura dos arquivos de tradução

```
pt-BR/
├── Nodes/          # Tradução dos nós (título, entradas, saídas, widgets, painéis personalizados)
│   └── internal.json
├── Categories/     # Tradução das categorias dos nós
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Tradução de menus e interface
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── ComfyUI-子图.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Os demais diretórios de idioma (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `it-IT/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) compartilham a mesma estrutura e carregam conforme o idioma atual; o `en-US/` serve para devolver os nós de plugins não chineses ao inglês.

### Adicionar traduções personalizadas

Crie um arquivo JSON em `pt-BR/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Nome de exibição do nó",
    "inputs": {
      "input_name": "tradução do nome de entrada"
    },
    "outputs": {
      "output_name": "tradução do nome de saída"
    },
    "widgets": {
      "widget_name": "tradução do nome do widget"
    },
    "ui": {
      "English text in panel": "texto traduzido no painel"
    }
  }
}
```

> **Dicas de redação**
>
> - As chaves de `widgets` devem usar o **nome real** do widget (o nome do parâmetro no código-fonte, ex. `target_language`), não o display_name exibido na tela (ex. `Target Language`). Para plugins de API V3 (io.Schema), escreva ambas as chaves — nome real e display_name — para melhor compatibilidade
> - O campo `ui` traduz o texto inglês dentro dos painéis personalizados do nó (criados via `addDOMWidget`): a chave é o inglês exibido na tela, o valor é a tradução
> - Não adicione "traduções idênticas" (valor igual à chave, ex. `"cfg": "cfg"`) — elas não fazem sentido
> - Confira a grafia das chaves; uma chave diferente do código-fonte (ex. um `t` a mais em `perturb_atttn`) fará o widget não ser traduzido silenciosamente

Crie um arquivo JSON em `pt-BR/Menus/` para adicionar traduções de menus:

```json
{
  "English Menu Text": "texto do menu traduzido",
  "Another Item": "outro item"
}
```

A raiz de cada arquivo de dicionário deve ser um objeto JSON. Quando não há tradução válida, o texto original é exibido. Arquivos que não podem ser lidos ou têm estrutura incorreta são ignorados e registrados no log. Os dicionários são ordenados por nome de arquivo. Quando uma chave aparece em vários arquivos, vale a tradução do último arquivo nessa ordem. Se o plugin que fornece o nó for identificado, o dicionário dele tem prioridade e as demais entradas preenchem os campos que faltam.

> Após adicionar, alterar ou remover um dicionário, recarregue a página do navegador para aplicar as mudanças. Depois de atualizar o plugin, reinicie o ComfyUI e recarregue a página.

### Tradução de blueprints e subgrafos

Na barra lateral esquerda, abra **Nós → Comfy Blueprints** e arraste um blueprint para o canvas. Você também pode abrir diretamente um modelo oficial ou um fluxo de trabalho próprio que contenha subgrafos. O canvas tradicional e a nova interface de nós traduzem as portas expostas, os rótulos dos widgets e os textos de orientação nos campos de texto no idioma atual, incluindo os controles expostos de subgrafos aninhados.

- Os títulos dos blueprints oficiais e dos subgrafos reconhecidos de modelos oficiais são buscados em `Menus/` no idioma atual. Os subgrafos personalizados preservam os títulos escolhidos pelo usuário. O dicionário em chinês simplificado contém exemplos de títulos e termos compartilhados. [ComfyUI-子图.json](zh-CN/Menus/ComfyUI-子图.json)
- Cada componente exposto usa primeiro a tradução do campo correspondente no nó interno. Se ela não estiver disponível, o plugin procura o nome de exibição completo em `pt-BR/Menus/`, considerando variações de maiúsculas, minúsculas, espaços, sublinhados e hífens. Vários subgrafos podem reutilizar a mesma entrada.
- Quando portas de entrada e saída precisarem de traduções diferentes, use os prefixos `input.` e `output.` no dicionário compartilhado. Por exemplo, `output.depth_colored` pode exibir a saída de mesmo nome como «Mapa de profundidade em cores». O fluxo de trabalho preserva os títulos, os nomes das portas e os valores dos parâmetros originais.

---

## Arquitetura

### Estrutura geral

```
┌──────────────────────────────────────────────────────┐
│                Programa principal do ComfyUI          │
│                                                        │
│  Back-end Python (__init__.py)   Front JS (js/)        │
│  ├─ Rotas de API HTTP            ├─ main.js (motor)    │
│  ├─ Compilação da tradução       ├─ MenuTranslate.js   │
│  └─ Persistência de config.      └─ utils.js (ajudas)  │
│         │                             │                │
│         ▼                             ▼                │
│   Dados de tradução pt-BR/       MutationObserver      │
│   ├─ Nodes/*.json              tradução DOM ao vivo    │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Técnicas principais

| Técnica | Descrição |
|------|------|
| **Menu de contexto nativo** | Traduz os rótulos depois que o ComfyUI monta o menu. Os itens, os callbacks e os valores dos menus suspensos preservam seus dados originais |
| **Arquitetura de botão duplo** | Suporta tanto o antigo `.comfy-menu` quanto o novo `.comfyui-menu` |
| **Monitoramento com MutationObserver** | Detecta mudanças na interface e reúne em uma única verificação as alterações do mesmo grupo de menus |
| **translatedValueSet** | Usa um Set para verificar em O(1) se um texto já foi traduzido, evitando processamentos repetidos |
| **Proteção de nós folha** | Atribui `innerText` apenas a nós sem filhos, protegendo a vinculação de eventos do Vue |
| **Cache de traduções** | Compila e compacta as traduções em segundo plano e reutiliza o resultado se os dicionários e itens desativados forem os mesmos |
| **Cache de correspondências de subgrafos** | Reutiliza a correspondência de cada subgrafo e refaz a busca quando o nome do grafo ou os identificadores das portas expostas mudam |
| **Transferência com Gzip** | Envia os dados compactados quando o navegador aceita Gzip para reduzir o volume transferido |

> Para todos os detalhes técnicos, consulte [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Observações

### Compatibilidade

- **Conflitos entre plugins de tradução** — este plugin entra em conflito com outros plugins de tradução (ex. AIGODLIKE-ComfyUI-Translation); desinstale-os antes de usar
- **Plugin com conflito conhecido** — o `ComfyUI Browser` pode apresentar problemas de compatibilidade
- **Navegadores suportados** — recomendados Chrome, Edge e 360 Browser; os demais não foram suficientemente testados

### Quando as traduções não são atualizadas

- **A tradução antiga ainda aparece depois de recarregar a página.** Algumas ferramentas de sincronização sobrescrevem os dicionários e preservam o tamanho, a data de modificação e os metadados da pasta. O plugin pode continuar usando o cache anterior. Reinicie o ComfyUI para ler os dicionários novamente.
- **O novo texto de uma janela pop-up continua em inglês.** Algumas janelas atualizam o texto de status depois de abrir. O novo texto pode ficar temporariamente em inglês.
- **Uma porta exposta mantém o rótulo antigo após mudar uma conexão no subgrafo.** A conexão ao novo nó entra em vigor imediatamente. Salve e reabra o fluxo de trabalho para atualizar a tradução da porta.

### Requisitos

| Componente | Requisito |
|------|------|
| ComfyUI | Versão mais recente (compatível com UI antiga e nova) |
| Python | 3.8+ |
| Navegador | Chrome / Edge (recomendado) |

---

## Registro de alterações

### 2026-11-18

- Adicionada a tradução dos componentes expostos de subgrafos em modelos oficiais e em fluxos de trabalho próprios, incluindo subgrafos aninhados e controles recém-expostos. O dicionário em chinês simplificado inclui o título de «Texto para imagem (MiniMax H3 Image)» e os termos de aprimoramento de prompt.
- A tradução dos nós comuns, menus e blueprints da biblioteca continua disponível se o catálogo de modelos estiver ausente ou com problemas. Os controles adicionados no mesmo grupo compartilham uma atualização do canvas.
- Corrigidos o menu de contexto do canvas tradicional, as traduções ausentes em menus dinâmicos e os valores duplicados dos controles deslizantes. São preservados os prompts, os nomes escolhidos pelo usuário e os valores das opções dos menus suspensos.
- Corrigido um problema que podia apagar itens desativados no gerenciador de traduções. O interruptor aceita comandos de teclado e é possível tentar salvar novamente se houver falha.
- Corrigido um problema em que um dicionário inválido podia deixar o pacote de idioma inteiro sem traduções. Foi definida a ordem de prioridade de chaves repetidas e foram completadas a detecção dos pacotes de idioma e as verificações de entradas ausentes.
- As traduções são compiladas em segundo plano e reutilizadas a partir do cache. As alterações do mesmo grupo de menus são verificadas juntas, reduzindo as buscas repetidas de traduções para subgrafos.
- Corrigidos o reaproveitamento de traduções antigas após salvar o dicionário por substituição no Windows, a falha do pacote inteiro quando a pasta de dicionários fica temporariamente ilegível e as traduções ausentes nas dicas dos controles de menu recém-adicionados.

### 2026-11-17

- Adicionada a tradução dos blueprints oficiais com os dicionários dos nós internos e de menus compartilhados. O recurso abrange títulos, portas, rótulos de widgets e textos de orientação nos campos. Foram corrigidos casos de traduções ausentes ao inserir um blueprint pela biblioteca de nós, ao reabri-lo após renomear e salvar, e nos títulos e campos de texto da nova interface.

### 2026-11-16

- As traduções de nós, categorias, menus e configurações foram alinhadas à tradução oficial do ComfyUI em chinês simplificado. Também foram adicionados rótulos de portas que faltavam em alguns nós integrados.
- Os rótulos `Latent` e `采样` foram padronizados em chinês simplificado. Os rótulos de amostragem dos nós integrados também foram padronizados em outros 13 idiomas, mantendo a numeração das portas.
- Corrigidas as traduções ausentes quando o texto da interface é atualizado. Foram adicionados textos em chinês simplificado para as configurações de ferramentas do VNCCS UniCanvas e os avisos do SAM. As traduções específicas de cada nó têm prioridade, e os valores das opções dos menus suspensos são protegidos. ([#13](https://github.com/a63976659/ComfyUI-Global-Translation/issues/13))
- Corrigido um erro que podia interromper o carregamento de fluxos de trabalho quando os rótulos dos nós continham valores não textuais. Os controles associados são traduzidos após a renomeação de entradas dinâmicas. ([#14](https://github.com/a63976659/ComfyUI-Global-Translation/issues/14), [#15](https://github.com/a63976659/ComfyUI-Global-Translation/issues/15))

### 2026-11-11

- Foram completadas as traduções em chinês simplificado dos nós locais e de parceiros e corrigida a exibição de portas dinâmicas, controles e prompts em Generate Text V2, Qwen Image 2.1 e MiniMax H3.

### 2026-09-24

- Correção de um problema de segurança: uma requisição manipulada podia fazer o plugin ler arquivos fora da sua pasta; agora ele só lê os arquivos de tradução dentro da própria pasta

### 2026-09-21

**Adicionados árabe (ar-SA), persa (fa-IR) e hebraico (he-IL)**

- Traduções concluídas para três idiomas RTL (da direita para a esquerda) cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `ar-SA` / `fa-IR` / `he-IL` para ativá-los automaticamente

**Posicionamento do botão de tradução aprimorado no novo ComfyUI**

- O botão agora é inserido prioritariamente na barra de comandos (na mesma linha do botão de configurações do ComfyUI-Manager); se a âncora não estiver pronta na inicialização, o watchdog o realoca automaticamente quando disponível. Adicionados proteção contra piscamento antes da montagem e recálculo automático da posição do controle deslizante da cápsula após a montagem

### 2026-09-20

**Adicionado japonês (ja-JP)**

- Tradução para japonês concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `ja-JP`

**Adicionado espanhol (es-ES)**

- Tradução para espanhol concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `es-ES`

**Adicionado coreano (ko-KR)**

- Tradução para coreano concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `ko-KR`

**Adicionado turco (tr-TR)**

- Tradução para turco concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `tr-TR`

**Adicionado italiano (it-IT)**

- Tradução para italiano concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `it-IT`

**Adicionado português do Brasil (pt-BR)**

- Tradução para português (Brasil) concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `pt-BR`

**Adicionado alemão (de-DE)**

- Tradução para alemão concluída cobrindo nós, categorias, menus e painel de configurações; defina o idioma oficial do ComfyUI como `de-DE`

### 2026-09-19

**O idioma segue a configuração oficial**

- Removida a opção "idioma de tradução" dentro do plugin; o idioma agora segue automaticamente a configuração de idioma oficial do ComfyUI (`Comfy.Locale`)
- Após alternar o idioma oficial, a página recarrega automaticamente; a tradução e os textos do plugin se aplicam juntos, sem reinício manual

**Interface de configuração multilíngue e layout unificado**

- Os rótulos do interruptor e a interface de configurações cobrem 15 idiomas (incluindo chinês tradicional e os idiomas RTL árabe, persa e hebraico); idiomas desconhecidos recorrem ao inglês
- A ordem das seções do painel de configurações é coerente em todos os idiomas: estilo do interruptor → opções suspensas → gerenciador de tradução; os cabeçalhos de seção são traduzidos
- O painel "Gerenciador de tradução de plugins" não é mais retraduzido pelo dicionário e sempre corresponde ao idioma atual da interface
- O rótulo do estado ligado do interruptor remove o sufixo `(código de idioma)`, mantendo apenas o texto

### 2026-09-12

- Corrigida a perda de tradução quando vários arquivos contêm o mesmo nó; agora eles se mesclam de forma complementar
- Adicionada a tradução de painéis personalizados dos nós: botões, rótulos, menus suspensos, dicas e pop-ups agora são traduzidos
- Corrigidos os nomes das portas que ficavam em inglês após "converter um widget em entrada"
- Adicionado um guardião de tradução: nós criados depois também recebem tradução
- Agradecimento a 石头 (Q:34720803) pela otimização

### 2026-09-07

- Corrigido: na lista "Fluxos de trabalho" da barra lateral, seus próprios nomes de fluxo eram traduzidos por engano; agora são preservados como estão

### 2026-08-20

- Adicionado o estilo de interruptor "pílula segmentada", com um controle deslizante azul que desliza entre ligado e desligado para um estado num relance

### 2026-07-27

**Correção: a tradução de widgets de nós da API V3 não funcionava**

- Corrigida a ausência de tradução de widgets em plugins escritos com API V3 (io.Schema), ex. ComfyUI-qwenmultiangle
- **Causa**: os nós V3 frequentemente declaram um `display_name` inglês para um widget (name `horizontal_angle`, label `Horizontal Angle`); a detecção antiga tratava "label ≠ name" como tradução nativa e o ignorava
- **Solução**: `isAlreadyTranslated` adiciona uma comparação normalizada — um label que é apenas uma forma embelezada do name (diferenças de maiúsculas/espaços/underscores/hífens) não é considerado traduzido

**Correção: traduções idênticas contaminavam o conjunto de textos traduzidos**

- Corrigido que certos widgets (ex. `cfg`) não eram traduzidos em nenhum nó
- **Causa**: alguns arquivos continham "traduções idênticas" (ex. `"cfg": "cfg"`); uma vez que seu valor entrava em `translatedValueSet`, o nome em inglês era interpretado incorretamente como "já traduzido" e bloqueava globalmente a tradução desse nome
- **Solução**: ao construir o conjunto, pular entradas cujo valor é igual à sua chave

**Correções nos arquivos de tradução**

- Corrigidos erros de digitação nas chaves do ComfyUI-LTXVideo (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Adicionadas chaves de nomes reais de widgets ausentes no ComfyUI-qwenmultiangle (`target_language`, `prompt`)

### 2026-04-08

**Correção: funções do menu de contexto quebradas**

- Corrigido um grave bug em que, com a tradução ativada, as ações "desconectar" e "renomear porta" do menu de contexto da porta de saída deixavam de responder
- **Causa**: o LiteGraph distribui os callbacks pela correspondência do `value.content` em inglês; após a tradução, a correspondência falhava
- **Solução**: implementado o envoltório de callbacks (Callback Wrapping) — o inglês é restaurado temporariamente no instante de execução do callback e depois a tradução é recolocada, conciliando a exibição traduzida e o funcionamento correto
- Envolve tanto `value.callback` (individual) quanto `options.callback` (compartilhado)
- Adicionada a proteção `_originalContent` contra sobrescrita por tradução múltipla, para que o menu da tela não perca seu valor original ao passar duas vezes pelo fluxo

**Correção: a tradução do DOM quebrava a vinculação de eventos**

- Corrigido que a atribuição de `innerText` em `replaceText` destruía elementos filhos e ouvintes Vue/PrimeVue
- **Solução**: adicionada a verificação de nó folha `target.children.length === 0`, atribuindo `innerText` apenas a nós sem filhos

### 2025-12-20

**Renomeação**

- O plugin renomeado de `ComfyUI-Translation-node` para `ComfyUI-Chinese-Translation`
- Nome de exibição alterado de "Translation Node" para "中文翻译" para refletir melhor o posicionamento do plugin

**Melhorias**

- Reformulado para uma arquitetura de arquivos multilíngue (versão 2.0)
- Adicionado um painel de configurações para definir idioma e estilo do botão nas configurações do ComfyUI
- Adicionada a opção de estilo de UI nativo discreto
- Corrigida a perda das configurações de ícone após reiniciar (agradecimento ao membro da comunidade 幻影 pelo relatório)

---

## Comunidade e suporte

**Página do autor**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Grupo da comunidade**

- **Grupo QQ do ComfyUI**: `202018000`

**Feedback e contribuição**

- **Relatar bugs**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Contribuir com traduções**: PRs que adicionam arquivos de tradução são bem-vindos

**Apoie o autor**

Se o plugin for útil para você, considere dar uma ⭐ Star e apoiar o autor:

- **Apoiar**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Licença

Este projeto é publicado como código aberto sob a [Licença MIT](LICENSE).

Copyright (c) 2025 猪的飞行梦

Qualquer pessoa é livre para copiar, modificar e distribuir este projeto, desde que mantenha o aviso original de direitos autorais. Consulte o arquivo [LICENSE](LICENSE) para detalhes.

---

## Isenção de responsabilidade

Esta tradução e o conteúdo compartilhado estão sujeitos ao seguinte:

**Natureza não comercial**

Esta tradução é um trabalho pessoal e não remunerado; nenhuma compensação ou benefício comercial foi recebido. Ela se destina exclusivamente ao aprendizado, à troca e ao compartilhamento de conhecimento.

**Sem garantia de precisão**

A tradução se esforça para ser fiel ao original, mas não garante precisão, integridade, atualidade ou adequação a um fim. Qualquer risco e consequência decorrentes do uso ou da dependência desta tradução correm por conta do usuário.

**Pertencimento da fonte original**

Os direitos autorais dos materiais originais em que esta tradução se baseia (incluindo, mas não se limitando a, textos, imagens e vídeos) pertencem aos respectivos autores ou titulares originais. Esta tradução não reivindica nenhum direito sobre o conteúdo original.

**Recomenda-se consultar o original**

Para decisões importantes, efeito legal, implementação técnica ou julgamento profissional, consulte e baseie-se obrigatoriamente na versão original oficial, e não nesta tradução.

**Reserva de direitos**

Se um titular considerar que esta tradução viola seus direitos legítimos, entre em contato comigo o quanto antes e eu a removerei ou a tratarei prontamente.
