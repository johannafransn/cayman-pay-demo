// Idea 2 (Matt's) — remittance from Cayman to abroad.
//
// A worker in Cayman receives wages, then sends part home. Traditional providers
// (Western Union et al.) take a heavy all-in cut on small transfers. Par routes over
// the Cayman → US partner-bank rail at the real FX rate for a flat 1% fee.
//
// The FINAL LEG is deliberately a choice: bank deposit, cash pickup, mobile money, or
// a USDC wallet — because how the recipient actually takes the money varies by corridor
// and isn't settled yet. Showing it as a selectable step lets the demo speak to any of them.

export type DeliveryMethod = 'bank' | 'cash' | 'mobile' | 'crypto';

export interface Method {
  id: DeliveryMethod;
  label: string;
  emoji: string;
  note: string;
}

export const METHODS: Method[] = [
  { id: 'bank', label: 'Bank deposit', emoji: '🏦', note: '1–2 days' },
  { id: 'cash', label: 'Cash pickup', emoji: '💵', note: 'In minutes' },
  { id: 'mobile', label: 'Mobile money', emoji: '📲', note: 'Instant' },
  { id: 'crypto', label: 'USDC wallet', emoji: '🪙', note: 'Instant' },
];

export interface Recipient {
  id: string;
  name: string;
  relation: string;
  city: string;
  country: string;
  flag: string;
  currency: string;
  rate: number; // local currency per 1 USD
}

export const RECIPIENTS: Recipient[] = [
  { id: 'mom', name: 'Mom', relation: 'Mother', city: 'Kingston', country: 'Jamaica', flag: '🇯🇲', currency: 'JMD', rate: 158 },
  { id: 'jomar', name: 'Jomar Reyes', relation: 'Brother', city: 'Cebu', country: 'Philippines', flag: '🇵🇭', currency: 'PHP', rate: 58 },
  { id: 'lucia', name: 'Lucía', relation: 'Sister', city: 'La Ceiba', country: 'Honduras', flag: '🇭🇳', currency: 'HNL', rate: 25 },
];

export const DEFAULT_RECIPIENT = RECIPIENTS[0];

export const EMPLOYEE = {
  name: 'Marcus Bodden',
  role: 'Carpenter · Ironshore Construction',
  emoji: '👷',
  balanceUsd: 1850.0,
  sentThisYear: 4120.0,
  savedThisYear: 286.0,
};

export const SERVICE_FEE = 0.01; // Par's flat 1%
export const WU_COST = 0.075; // typical traditional-remittance all-in cost

export interface RemitQuote {
  sendUsd: number;
  recipient: Recipient;
  realDeliver: number; // local currency at 0 fee
  feeUsd: number;
  feeLocal: number;
  deliver: number; // local currency the recipient receives via Par
  wuDeliver: number; // local currency via Western Union
  savedLocal: number;
  savedUsd: number;
  savedPct: number; // vs the amount sent
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

export const remitQuote = (sendUsd: number, r: Recipient): RemitQuote => {
  const s = Number.isFinite(sendUsd) && sendUsd > 0 ? sendUsd : 0;
  const realDeliver = round2(s * r.rate);
  const feeUsd = round2(s * SERVICE_FEE);
  const feeLocal = round2(feeUsd * r.rate);
  const deliver = round2((s - feeUsd) * r.rate);
  const wuDeliver = round2(s * (1 - WU_COST) * r.rate);
  const savedLocal = round2(deliver - wuDeliver);
  const savedUsd = round2(s - feeUsd - s * (1 - WU_COST));
  const savedPct = s > 0 ? (savedUsd / s) * 100 : 0;
  return { sendUsd: s, recipient: r, realDeliver, feeUsd, feeLocal, deliver, wuDeliver, savedLocal, savedUsd, savedPct };
};

export const usd2 = (n: number): string =>
  `US$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Local remittance amounts are large (e.g. JMD 78,210) — show whole units.
export const local = (n: number, cur: string): string =>
  `${cur} ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
