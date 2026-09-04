import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WorkerHome } from './screens/worker/WorkerHome';
import { WorkerSend } from './screens/worker/WorkerSend';
import { WorkerQuote } from './screens/worker/WorkerQuote';
import { WorkerSuccess } from './screens/worker/WorkerSuccess';
import { DEFAULT_RECIPIENT, type DeliveryMethod, type Recipient } from './lib/remit';

type Screen = 'home' | 'send' | 'quote' | 'success';

const variants = {
  enter: { x: '100%', opacity: 0.6 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-24%', opacity: 0 },
};

export const WorkerApp = ({ onLogout }: { onLogout: () => void }) => {
  const [screen, setScreen] = useState<Screen>('home');
  const [recipient, setRecipient] = useState<Recipient>(DEFAULT_RECIPIENT);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState<DeliveryMethod>('bank');

  const render = () => {
    switch (screen) {
      case 'home':
        return (
          <WorkerHome
            onSend={(r) => {
              setRecipient(r);
              setAmount(0);
              setScreen('send');
            }}
            onLogout={onLogout}
          />
        );
      case 'send':
        return (
          <WorkerSend
            recipient={recipient}
            onBack={() => setScreen('home')}
            onReview={(value) => {
              setAmount(value);
              setScreen('quote');
            }}
          />
        );
      case 'quote':
        return (
          <WorkerQuote
            recipient={recipient}
            sendUsd={amount}
            onBack={() => setScreen('send')}
            onConfirm={(m) => {
              setMethod(m);
              setScreen('success');
            }}
          />
        );
      case 'success':
        return (
          <WorkerSuccess recipient={recipient} sendUsd={amount} method={method} onDone={() => setScreen('home')} />
        );
    }
  };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={screen}
        className="screen"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: 'spring', stiffness: 420, damping: 40 }}
      >
        {render()}
      </motion.div>
    </AnimatePresence>
  );
};
