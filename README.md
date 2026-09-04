# Par — get paid, send money home

A **client-facing demo** of a Cayman payments app with two sides:

- **Company owners** pay their workers instantly, with no wire fees.
- **Workers** receive their pay and send money abroad — cheaper and faster than Western Union.

No backend, no real logic — everything is static demo pages so it can be walked through in a
meeting or shared as a link.

**▶ Live demo: https://johannafransn.github.io/cayman-pay-demo/**

> On desktop the app renders inside a phone frame; on a phone (or installed as a PWA) it fills
> the screen like a native app. Portrait only.

## The idea

This is **idea 2** from the memo _"The Rate Nobody Pays"_ — a way to move money along the chain
that today runs on cash and Western Union:

1. A Cayman **employer pays a worker** → straight into the worker's Par balance (instant, no fee).
2. The **worker sends money abroad** from that balance → settles at the real FX rate for a flat
   1% fee, versus a ~7.5% all-in cost through a traditional agent.
3. The recipient collects it however the corridor works — **bank deposit, cash pickup, mobile
   money, or a USDC wallet** (a deliberately selectable last leg).

The two roles are chosen on a **login screen** ("I'm a worker" / "I'm a company owner").

## Flows

- **Login** → pick a role.
- **Worker:** `Home` (balance, recent pay in/out, recipients) → `Send` (amount) → `Quote`
  (vs. Western Union + delivery method) → `Success`.
- **Owner:** `Home` (payroll balance + team) → `Run payroll` or tap a worker → `Review`
  → `Success` (paid instantly).

Data & economics live in [`src/lib/remit.ts`](src/lib/remit.ts) (worker remittance) and
[`src/lib/pay.ts`](src/lib/pay.ts) (employer payroll) — all placeholders, easy to edit.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build (dist/) with service worker + manifest
pnpm preview    # serve the built PWA locally
```

## Stack

Vite · React 18 · TypeScript · framer-motion · vite-plugin-pwa. No backend, no network calls.
Deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

## Status

A **demo / prototype for gauging interest** — not a production system, and not legal, financial,
or regulatory advice. FX rates, fees and delivery mechanics are illustrative placeholders.
