# 🤖 Bot Clima & Cotação

Bot de Discord (discord.js v14) com slash commands:

| Comando | O que faz |
|---|---|
| `/clima cidade:<nome>` | Clima atual, máx/mín, umidade, vento e chance de chuva |
| `/cotacao [moeda]` | Dólar e/ou Bitcoin em reais, com variação do dia |

## APIs (gratuitas, sem chave)
- **Open-Meteo**: geocoding + previsão do tempo
- **AwesomeAPI**: cotações USD-BRL e BTC-BRL

## Como rodar
1. Crie uma aplicação em https://discord.com/developers/applications, adicione um Bot e copie o token.
2. Convide o bot com os escopos `bot` e `applications.commands`.
3. `cp .env.example .env` e preencha as variáveis.
4. Instale e registre os comandos:
   ```bash
   npm install
   npm run deploy
   npm start
   ```

## Estrutura
```
src/
├── index.js              # cliente, carregamento de comandos, tratamento de erros
├── deploy-commands.js    # registra os slash commands na API do Discord
├── commands/             # um arquivo por comando (clima, cotacao)
└── services/             # acesso às APIs externas + cache em memória
```
