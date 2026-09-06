# Runway — Docs

## What this is

Runway answers one question: at current spend, how many days until this wallet runs out of money. It's not a general portfolio tracker. It's a single calculation, shown once, backed by real data.

## Supported chains

- **BNB Chain** (chain ID 56) — default
- **Ethereum**
- **Base**
- **Solana**

BNB Chain is first in the chain switcher and the default demo wallet. The other three are supported with the same logic, just a different explorer API underneath.

## Where the data comes from

**Balance** — pulled live via Paybox's `get_portfolio` tool, which returns token balances across all four supported chains for a given address. Balances are converted to USD at current spot price at request time. Nothing is cached across sessions; every load is a fresh call.

**Transaction history** — pulled from a chain-specific block explorer API:

| Chain | Source |
|---|---|
| BNB Chain | BscScan API |
| Ethereum | Etherscan API |
| Base | Basescan API |
| Solana | Solscan public API |

All three EVM explorers share one request format, so the app uses a single fetch function that swaps its base URL based on the connected `chainId`. Solana uses a separate fetch path since its transaction model isn't account-based in the same way.

History is pulled for the trailing 90 days from the moment of the request and cached in memory for the length of the session — the same address won't trigger a second API call unless the page is reloaded or a new address is entered.

## How runway is calculated

1. Sum every outgoing transaction's USD value over the trailing 90 days — transfers out, the outgoing side of swaps, and gas spent.
2. Divide that sum by 90 to get **average daily burn**.
3. Divide current USD balance by average daily burn to get **runway in days**.

```
runway_days = current_balance_usd / (sum_of_90_day_outflows_usd / 90)
```

If average daily burn is effectively zero — a dormant or receive-only wallet — the app shows "No significant outflow detected" rather than an infinite or undefined number.

If the wallet has zero balance and zero history, the app shows "This wallet has no activity to analyze" rather than attempting the division.

## What the category breakdown means

The three categories shown below the chart are the three highest-USD-value outflow buckets from the same 90-day window used for the burn calculation:

1. **Gas** — total network fees paid across all outgoing transactions.
2. **Top token by outflow** — the single ERC-20/BEP-20/SPL token with the highest total USD value sent out, shown by symbol.
3. **Top counterparty** — the single address that received the highest total USD value, shown truncated (first 6 / last 4 characters) with a label indicating it's a wallet address, not a name Runway has independently verified.

These are computed from the same transaction data as the burn rate, not a separate estimate — the numbers in the breakdown and the numbers in the chart will always be internally consistent.

## Error and edge-case handling

| Situation | What's shown |
|---|---|
| Invalid address format | "That doesn't look like a wallet address" |
| Valid address, zero balance and history | "This wallet has no activity to analyze" |
| Valid wallet, no outflows in 90 days | "No significant outflow detected" |
| Explorer API rate-limited | "Data provider is rate-limited, try again shortly" |
| Any API request fails outright | An inline, styled error specific to which data source failed — balance or history — not a generic failure message |

## Environment variables

```
BSCSCAN_API_KEY=
ETHERSCAN_API_KEY=
BASESCAN_API_KEY=
```

Solscan's public endpoint used here doesn't require a key. Paybox access is handled through the connector, not a standalone API key.

## Architecture notes

No database. No server-side persistence. Every number on screen traces back to a live API response made during that session — balances and history are recomputed on each page load or new address entry, cached only for the duration of that single session to avoid redundant calls to rate-limited free-tier APIs.
