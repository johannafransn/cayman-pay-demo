// Company-owner side — an employer runs payroll straight into workers' Par accounts.
// Instant, no wire fees, and each worker can then send money home cheaper than WU.

export interface Worker {
  id: string;
  name: string;
  role: string;
  flag: string;
  country: string;
  wage: number; // this period's pay, in USD
}

export const BUSINESS = {
  name: 'Ironshore Construction',
  category: 'Construction · George Town',
  emoji: '🏗️',
  payrollUsd: 48000.0,
  savedThisMonth: 1240.0, // fees the team avoided by getting paid + sending here
};

export const TEAM: Worker[] = [
  { id: 'marcus', name: 'Marcus Bodden', role: 'Carpenter', flag: '🇯🇲', country: 'Jamaica', wage: 920 },
  { id: 'jomar', name: 'Jomar Reyes', role: 'Steel fixer', flag: '🇵🇭', country: 'Philippines', wage: 880 },
  { id: 'lucia', name: 'Lucía Herrera', role: 'Painter', flag: '🇭🇳', country: 'Honduras', wage: 760 },
  { id: 'devon', name: 'Devon Green', role: 'Mason', flag: '🇯🇲', country: 'Jamaica', wage: 900 },
  { id: 'rakesh', name: 'Rakesh Patel', role: 'Electrician', flag: '🇮🇳', country: 'India', wage: 1050 },
];

export const payrollTotal = (workers: Worker[]): number =>
  Math.round(workers.reduce((sum, w) => sum + w.wage, 0) * 100) / 100;

export const usd2 = (n: number): string =>
  `US$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
