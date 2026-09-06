# Runway

**One question, one number: how many days until this wallet runs out of money.**

Paste a BNB Chain, Ethereum, Base, or Solana address. Runway pulls the current balance and the last 90 days of outflows, and shows you the actual day count — not a dashboard full of numbers you have to interpret yourself.

## The problem

Most treasury dashboards show balance and transaction history separately and leave the math to you. By the time a team or a trader has manually reconstructed burn rate from a block explorer, the number is already stale.

## What it does

- Pulls live balance across chains via Paybox's portfolio data
- Pulls 90 days of outflow history via BscScan, Etherscan/Basescan, or Solscan depending on the chain
- Computes average daily burn and divides it into current balance
- Shows the top 3 categories draining the wallet (gas, a specific token, a specific counterparty)
- Ships with a live BNB Chain demo wallet preloaded — see a real result with zero clicks

## Stack

Next.js 14, TypeScript, Tailwind, Recharts, wagmi/viem, Paybox MCP tools. No database — every number on screen is a live API response, computed client-side.

## Run it locally

```bash      
git clone https://github.com/<your-username>/runway-agent
cd runway-agent
npm install
cp .env.example .env.local   # add BSCSCAN_API_KEY, ETHERSCAN_API_KEY
npm run dev
```

## Live demo

[runway-agent.vercel.app](#) — replace with your actual Vercel URL once deployed.

## Docs

Full API and methodology docs at `/docs` inside the running app.
