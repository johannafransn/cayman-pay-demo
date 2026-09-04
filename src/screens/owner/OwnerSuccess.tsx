import { motion } from 'framer-motion';
import { Check } from '../../components/icons';
import { payrollTotal, usd2, type Worker } from '../../lib/pay';

interface Props {
  workers: Worker[];
  onDone: () => void;
}

export const OwnerSuccess = ({ workers, onDone }: Props) => {
  const total = payrollTotal(workers);
  const many = workers.length > 1;
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
        <h1>{many ? 'Payroll sent' : `${workers[0].name} paid`}</h1>
        <div className="paid">
          {many ? `${workers.length} workers paid · ${usd2(total)}` : usd2(total)}
        </div>

        <div className="savedpill">
          <div className="big">Instant</div>
          <div className="cap">No wire fees — your team already has the money</div>
        </div>

        <div className="matchline">They can now send it home from their {'Par'} account</div>
      </motion.div>

      <div className="done">
        <button className="btn" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
};
