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
