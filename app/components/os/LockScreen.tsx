import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useOSStore } from '@/app/store/useOSStore';
import { portfolio } from '@/app/data/portfolio';
import { motion } from 'framer-motion';
import { useHaptics } from '@/app/hooks/useHaptics';

export const LockScreen = () => {
  const { setLocked, wallpaper } = useOSStore();
  const [time, setTime] = useState(new Date());
  const { success: hapticSuccess } = useHaptics();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    hapticSuccess();
    setLocked(false);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: -1000, opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cover bg-center text-white cursor-pointer"
      style={{ backgroundImage: `url('${wallpaper}')` }}
      onClick={handleUnlock}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Date et Heure */}
        <div className="text-center mb-8">
            <div className="text-7xl font-light tracking-tight">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xl font-medium mt-2">
                {time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
        </div>

        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl">
            <Image src={portfolio.avatar} alt={portfolio.name} fill className="object-cover" sizes="128px" />
        </div>

        {/* Nom Utilisateur */}
        <h2 className="text-2xl font-semibold">{portfolio.name}</h2>

        {/* Hint */}
        <p className="text-sm text-white/60 mt-2">Cliquez pour accéder au bureau</p>
      </div>
    </motion.div>
  );
};