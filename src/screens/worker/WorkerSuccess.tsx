import { motion } from 'framer-motion';
import { Check } from '../../components/icons';
import { remitQuote, local, usd2, METHODS, type DeliveryMethod, type Recipient } from '../../lib/remit';

interface Props {
  recipient: Recipient | null;
  sendUsd: number;
  method: DeliveryMethod;
  onDone: () => void;
}

export const WorkerSuccess = ({ recipient, sendUsd, method, onDone }: Props) => {
  if (!recipient) return null;
  const q = remitQuote(sendUsd, recipient);
  const m = METHODS.find((x) => x.id === method) ?? METHODS[0];
  return (
    <div className="screen success">
      <motion.div
        className="check"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 }}
      >
        <div className="inner">
          <Check />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18 }}
        style={{ width: '100%' }}
      >
        <h1>On its way to {recipient.name}</h1>
        <div className="paid">
          {usd2(sendUsd)} → {local(q.deliver, recipient.currency)}
        </div>

        <div className="savedpill">
          <div className="big">+{local(q.savedLocal, recipient.currency)} more</div>
          <div className="cap">
            {q.savedPct.toFixed(1)}% cheaper than Western Union ({local(q.wuDeliver, recipient.currency)})
          </div>
        </div>

        <div className="matchline">
          {m.emoji} {m.label} in {recipient.city} · {m.note}
        </div>
      </motion.div>

      <div className="done">
        <button className="btn" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
};
