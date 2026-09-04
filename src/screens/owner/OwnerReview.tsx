import { useState } from 'react';
import { StatusBar } from '../../components/StatusBar';
import { BUSINESS, payrollTotal, usd2, type Worker } from '../../lib/pay';

interface Props {
  workers: Worker[];
  onBack: () => void;
  onConfirm: () => void;
}

export const OwnerReview = ({ workers, onBack, onConfirm }: Props) => {
  const [processing, setProcessing] = useState(false);
  const total = payrollTotal(workers);
  const many = workers.length > 1;

  const confirm = () => {
    setProcessing(true);
    setTimeout(onConfirm, 1500);
  };

  return (
    <div className="screen checkout">
      <div className="hero">
        <StatusBar />
        <button className="backrow" onClick={onBack}>
          ‹ Back
        </button>
        <div className="merchant">{BUSINESS.name} · Payroll</div>
        <div className="amount">
          <span className="cur">US$</span>
          {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="sub">Paying {many ? `${workers.length} workers` : workers[0].name} instantly</div>
      </div>

      <div className="body">
        <div className="ratecard">
          {workers.map((w) => (
            <div className="rrow" key={w.id}>
              <span className="l">
                {w.flag} <b>{w.name}</b>
              </span>
              <span className="r">{usd2(w.wage)}</span>
            </div>
          ))}
          <div className="rdiv" />
          <div className="rrow total">
            <span className="l">
              <b>Total</b>
            </span>
            <span className="r peg">{usd2(total)}</span>
          </div>
        </div>

        <div className="savechip">
          <span className="l">No wire fees · arrives instantly</span>
          <span className="r">US$0.00</span>
        </div>

        <div className="foot">
          <button className="btn" onClick={confirm}>
            Confirm &amp; pay {usd2(total)}
          </button>
          <div className="hint">Workers can send it home cheaper than Western Union.</div>
        </div>
      </div>

      {processing && (
        <div className="processing">
          <div className="processbox">
            <div className="spinner" />
            <div className="ptext">Paying your team…</div>
          </div>
        </div>
      )}
    </div>
  );
};
