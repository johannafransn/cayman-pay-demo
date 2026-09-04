// A little wave mark for the "Par" brand — two peg lines the tide settles between.
export const Mark = ({ color = '#fff' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M2 14c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path d="M12 3v5M8.5 5.5 12 8l3.5-2.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = ({ color = '#0096C7' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5 9.5 18 20 6.5" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Chevron = () => <span className="chev">›</span>;

// Line icons for the landing page — white by default, sit on the blue gradient / tiles.
const line = (color: string) => ({
  fill: 'none' as const,
  stroke: color,
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const Building = ({ color = '#fff' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" {...line(color)}>
    <path d="M3 21h18" />
    <path d="M6 21V5.5A1.5 1.5 0 0 1 7.5 4h6A1.5 1.5 0 0 1 15 5.5V21" />
    <path d="M15 10h2.5A1.5 1.5 0 0 1 19 11.5V21" />
    <path d="M9 8h1.5M9 12h1.5M9 16h1.5" />
  </svg>
);

export const Money = ({ color = '#fff' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" {...line(color)}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
    <circle cx="12" cy="12" r="2.4" />
    <path d="M5.5 12h.01M18.5 12h.01" />
  </svg>
);

export const Globe = ({ color = '#fff' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" {...line(color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.7 2.6 2.7 15.4 0 18M12 3c-2.7 2.6-2.7 15.4 0 18" />
  </svg>
);

export const Person = ({ color = '#fff' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" {...line(color)}>
    <circle cx="12" cy="8" r="3.3" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </svg>
);
