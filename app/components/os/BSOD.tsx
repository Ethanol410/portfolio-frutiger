import React, { useEffect } from 'react';

interface BSODProps {
  onRestart: () => void;
}

export const BSOD = ({ onRestart }: BSODProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  return (
    <div className="fixed inset-0 bg-[#0078d7] z-[999999] text-white p-16 font-mono flex flex-col items-start select-none cursor-none">
      <div className="text-9xl mb-8">:(</div>
      <h1 className="text-4xl mb-8">Votre ordinateur a rencontré un problème et doit redémarrer.</h1>
      <p className="text-xl mb-8">Nous collectons simplement des informations relatives aux erreurs, puis nous redémarrerons l'ordinateur pour vous.</p>
      
      <div className="text-lg mb-8">
        0% achevé
      </div>

      <div className="mt-auto flex items-center gap-4">
        <div className="w-24 h-24 bg-white p-2">
            <div className="w-full h-full bg-black/10 grid grid-cols-4 gap-1">
                <div className="bg-black col-span-2 row-span-2"></div>
                <div className="bg-black col-start-4"></div>
                <div className="bg-black row-start-3"></div>
            </div>
        </div>
        <div className="text-sm">
          <p>Pour en savoir plus, vous pouvez rechercher cette erreur en ligne ultérieurement : FATAL_PORTFOLIO_ERROR</p>
        </div>
      </div>
    </div>
  );
};