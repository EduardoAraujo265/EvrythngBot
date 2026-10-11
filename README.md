# 🤖 Bot Clima & Cotação

Bot de Discord (discord.js v14) com slash commands:

| Comando | O que faz |
|---|---|
| `/clima cidade:<nome>` | Clima atual, máx/mín, umidade, vento e chance de chuva |
| `/cotacao [moeda]` | Dólar e/ou Bitcoin em reais, com variação do dia |
| `/cep cep:<cep>` | Endereço completo a partir do CEP, com link para o mapa |
| `/cnpj cnpj:<cnpj>` | Dados públicos da empresa: situação, atividade, porte, capital e endereço |
| `/feriados [ano]` | Feriados nacionais do ano e quanto falta para o próximo |
| `/fipe codigo:<codigo>` | Preço do veículo na tabela FIPE, por ano/modelo |

## Como adicionar no seu Servidor
1. Convide o Bot do criador para seu servidor usando [esse link](https://discord.com/oauth2/authorize?client_id=1558626368898605247)
2. Aproveite o Bot sem precisar rodar localmente!


## APIs (gratuitas, sem chave)
- **Open-Meteo**: geocoding + previsão do tempo
- **AwesomeAPI**: cotações USD-BRL e BTC-BRL
- **BrasilAPI**: CEP, CNPJ, feriados nacionais e tabela FIPE

## Como rodar
1. Crie uma aplicação em https://discord.com/developers/applications, adicione um Bot e copie o token.
2. Convide o bot com os escopos `bot` e `applications.commands`.
3. `cp .env.example .env` e preencha as variáveis.
4. Instale, registre os comandos e inicie:
   ```bash
   npm install
   npm run deploy
   npm start
   ```
## Estrutura

```
├── scripts/
│   └── deploy-commands.js     # registra os slash commands no Discord
└── src/
    ├── index.js               # ponto de entrada: monta o client e faz login
    ├── config/                # variáveis de ambiente, constantes, caminhos
    ├── core/                  # criação do client e loaders de comandos/eventos
    ├── events/                # um arquivo por evento do Discord
    ├── commands/              # slash commands, agrupados por categoria
    │   ├── weather/           # /clima
    │   ├── finance/           # /cotacao
    │   └── brasil/            # /cep, /cnpj, /feriados, /fipe
    ├── services/              # acesso às APIs externas (sem nada de Discord)
    │   ├── weather/
    │   ├── quotes/
    │   └── brasilapi/         # client.js + um arquivo por endpoint
    ├── embeds/                # montagem das mensagens visuais (EmbedBuilder)
    └── utils/                 # cache, http, formatação, erros, helpers
```

## Fluxo de um comando
`commands/` (recebe a interação) → `services/` (busca e trata os dados) → `embeds/` (monta a resposta).
Erros de entrada ou "não encontrado" são lançados como `UserError` (a mensagem vai direto ao usuário);
qualquer outro erro vira uma mensagem genérica em `events/interactionCreate.js`.

## Como adicionar um novo comando
1. Crie `src/commands/<categoria>/<nome>.js` exportando `data` e `execute`.
2. Se precisar de uma API nova, crie `src/services/<nome>/index.js`.
3. Rode `npm run deploy` para registrar.

Não precisa mexer em mais nenhum arquivo: os loaders descobrem tudo sozinhos.
