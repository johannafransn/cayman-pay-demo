import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Login } from './screens/Login';
import { WorkerApp } from './WorkerApp';
import { OwnerApp } from './OwnerApp';

type Role = 'worker' | 'owner' | null;

export default function App() {
  const [role, setRole] = useState<Role>(null);

  const render = () => {
    if (role === 'worker') return <WorkerApp onLogout={() => setRole(null)} />;
    if (role === 'owner') return <OwnerApp onLogout={() => setRole(null)} />;
    return <Login onPick={setRole} />;
  };

  return (
    <div className="stage">
      <div className="phone">
        <AnimatePresence mode="wait">
          <motion.div
            key={role ?? 'login'}
            style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
