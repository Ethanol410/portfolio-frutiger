import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { ArrowRight, Lock } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';
import { motion } from 'framer-motion';
import { useHaptics } from '@/app/hooks/useHaptics';

export const LockScreen = () => {
  const { setLocked, wallpaper } = useOSStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());
  const { error: hapticError, success: hapticSuccess } = useHaptics();

  // Horloge en temps réel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Mot de passe fictif (ou vide pour laisser entrer tout le monde)
    if (password === "" || password === "admin") {
        hapticSuccess();
        setLocked(false);
    } else {
        hapticError();
        setError(true);
        setTimeout(() => setError(false), 500);
        setPassword("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -1000, opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      {/* Backdrop Blur pour l'effet verre */}
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
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl">
            <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
        </div>

        {/* Nom Utilisateur */}
        <h2 className="text-2xl font-semibold">{portfolio.name}</h2>

        {/* Champ Mot de Passe */}
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className={`flex items-center bg-white/20 border border-white/30 rounded px-2 py-1 backdrop-blur-sm transition-transform ${error ? 'animate-shake border-red-400' : ''}`}>
                <input 
                    type="password" 
                    placeholder="Mot de passe"
                    className="bg-transparent border-none outline-none text-white placeholder-gray-300 px-2 py-1 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
                <button type="submit" className="p-1 hover:bg-white/20 rounded">
                    <ArrowRight size={20} />
                </button>
            </div>
            {error && <span className="text-xs text-red-300 font-medium">Mot de passe incorrect</span>}
            <span className="text-xs text-gray-300 mt-2 hidden sm:inline">Appuyez sur Entrée pour vous connecter</span>
            <span className="text-xs text-gray-300 mt-2 sm:hidden">Laissez vide et appuyez sur →</span>
        </form>
      </div>

      {/* Footer info */}
      <div className="absolute bottom-8 flex items-center gap-2 text-white/50 text-sm">
        <Lock size={14} /> Système Sécurisé
      </div>

      {/* Animation Shake pour l'erreur (à ajouter dans ton globals.css si tu veux, sinon c'est pas grave) */}
      <style jsx global>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake {
            animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
};