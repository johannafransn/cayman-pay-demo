import { useState } from 'react';
import { StatusBar } from '../../components/StatusBar';
import { remitQuote, local, usd2, METHODS, type DeliveryMethod, type Recipient } from '../../lib/remit';

interface Props {
  recipient: Recipient;
  sendUsd: number;
  onBack: () => void;
  onConfirm: (method: DeliveryMethod) => void;
}

export const WorkerQuote = ({ recipient, sendUsd, onBack, onConfirm }: Props) => {
  const [method, setMethod] = useState<DeliveryMethod>('bank');
  const [processing, setProcessing] = useState(false);
  const q = remitQuote(sendUsd, recipient);
  const cur = recipient.currency;

  const confirm = () => {
    setProcessing(true);
    setTimeout(() => onConfirm(method), 1600);
  };

  return (
    <div className="screen checkout">
      <div className="hero">
        <StatusBar />
        <button className="backrow" onClick={onBack}>
          ‹ Back
        </button>
        <div className="merchant">
          To {recipient.name} · {recipient.city}, {recipient.country} {recipient.flag}
        </div>
        <div className="amount">
          <span className="cur">US$</span>
          {sendUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="sub">You send · they receive {cur} at the real rate</div>
      </div>

      <div className="body">
        <div className="ratecard">
          <div className="rrow">
            <span className="l">
              Western Union <b>· ~7.5%</b>
            </span>
            <span className="r strike">{local(q.wuDeliver, cur)}</span>
          </div>
          <div className="rrow">
            <span className="l">
              Real rate <b>· {recipient.rate}</b>
            </span>
            <span className="r">{local(q.realDeliver, cur)}</span>
          </div>
          <div className="rrow">
            <span className="l">
              Par fee <b>· 1%</b>
            </span>
            <span className="r">−{local(q.feeLocal, cur)}</span>
          </div>
          <div className="rdiv" />
          <div className="rrow total">
            <span className="l">
              <b>They receive</b>
            </span>
            <span className="r peg">{local(q.deliver, cur)}</span>
          </div>
        </div>

        <div className="methodwrap">
          <div className="methodhead">
            How {recipient.name} receives it
            <span className="methodnote">final leg · set per corridor</span>
          </div>
          <div className="methods">
            {METHODS.map((m) => (
              <button
                key={m.id}
                className={`method ${method === m.id ? 'on' : ''}`}
                onClick={() => setMethod(m.id)}
              >
                <span className="em">{m.emoji}</span>
                <span className="ml">{m.label}</span>
                <span className="mn">{m.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="savechip">
          <span className="l">Saved vs. Western Union</span>
          <span className="r">{local(q.savedLocal, cur)}</span>
        </div>

        <div className="foot">
          <button className="btn" onClick={confirm}>
            Send {usd2(sendUsd)}
          </button>
          <div className="hint">Cayman → {recipient.city} in minutes.</div>
        </div>
      </div>

      {processing && (
        <div className="processing">
          <div className="processbox">
            <div className="spinner" />
            <div className="ptext">Sending to {recipient.city}…</div>
          </div>
        </div>
      )}
    </div>
  );
};
