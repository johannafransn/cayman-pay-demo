import { useState } from 'react';
import { StatusBar } from '../../components/StatusBar';
import { remitQuote, local, type Recipient } from '../../lib/remit';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

const withCommas = (raw: string): string => {
  if (raw === '') return '0';
  const [int, dec] = raw.split('.');
  const i = (int || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec !== undefined ? `${i}.${dec}` : i;
};

interface Props {
  recipient: Recipient;
  onBack: () => void;
  onReview: (value: number) => void;
}

export const WorkerSend = ({ recipient, onBack, onReview }: Props) => {
  const [raw, setRaw] = useState('');

  const press = (k: string) => {
    setRaw((cur) => {
      if (k === '⌫') return cur.slice(0, -1);
      if (k === '.') return cur.includes('.') ? cur : cur === '' ? '0.' : cur + '.';
      if (cur.includes('.') && cur.split('.')[1].length >= 2) return cur;
      if (cur === '0') return k;
      if (cur.replace('.', '').length >= 7) return cur;
      return cur + k;
    });
  };

  const value = raw === '' || raw === '.' ? 0 : parseFloat(raw);
  const q = remitQuote(value, recipient);
  const display = withCommas(raw);

  return (
    <div className="screen enter">
      <StatusBar />
      <div className="top">
        <div className="brandrow">
          <button className="backrow" onClick={onBack}>
            ‹ Back
          </button>
          <span className="eyebrow">Send money home</span>
        </div>
      </div>

      <div className="merchcard">
        <div className="em">{recipient.flag}</div>
        <div>
          <div className="n">{recipient.name}</div>
          <div className="c">
            {recipient.relation} · {recipient.city}, {recipient.country}
          </div>
        </div>
      </div>

      <div className="amountwrap">
        <div className="cur">You send · USD</div>
        <div className={`big ${value === 0 ? 'zero' : ''}`}>{display}</div>
        <div className="conv">
          {value > 0 ? `≈ ${local(q.realDeliver, recipient.currency)} they receive` : 'Enter the amount to send'}
        </div>
      </div>

      <div className="keypad">
        {KEYS.map((k) => (
          <button key={k} className="key" onClick={() => press(k)}>
            {k}
          </button>
        ))}
      </div>

      <div className="foot">
        <button className="btn" disabled={value <= 0} onClick={() => onReview(value)}>
          Continue
        </button>
      </div>
    </div>
  );
};
