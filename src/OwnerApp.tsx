import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OwnerHome } from './screens/owner/OwnerHome';
import { OwnerReview } from './screens/owner/OwnerReview';
import { OwnerSuccess } from './screens/owner/OwnerSuccess';
import { TEAM, type Worker } from './lib/pay';

type Screen = 'home' | 'review' | 'success';

const variants = {
  enter: { x: '100%', opacity: 0.6 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-24%', opacity: 0 },
};

export const OwnerApp = ({ onLogout }: { onLogout: () => void }) => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selected, setSelected] = useState<Worker[]>(TEAM);

  const render = () => {
    switch (screen) {
      case 'home':
        return (
          <OwnerHome
            onRunPayroll={() => {
              setSelected(TEAM);
              setScreen('review');
            }}
            onPayOne={(w) => {
              setSelected([w]);
              setScreen('review');
            }}
            onLogout={onLogout}
          />
        );
      case 'review':
        return <OwnerReview workers={selected} onBack={() => setScreen('home')} onConfirm={() => setScreen('success')} />;
      case 'success':
        return <OwnerSuccess workers={selected} onDone={() => setScreen('home')} />;
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
