import React, { useState } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Send, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

type Status = 'idle' | 'sending' | 'success' | 'error';

export const ContactApp = () => {
  const { addNotification } = useOSStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      addNotification({
        title: 'Message envoyé !',
        message: `Votre message a bien été envoyé à ${portfolio.email}.`,
        type: 'success',
      });
    } catch {
      setStatus('error');
      addNotification({
        title: "Erreur d'envoi",
        message: "Le message n'a pas pu être envoyé. Réessayez.",
        type: 'error',
      });
    }
  };

  return (
    <div className="h-full flex flex-col aero-app">
      {/* Header aqua glossy */}
      <div
        className="px-4 py-3 flex items-center gap-3 shrink-0"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center relative overflow-hidden shrink-0"
          style={{ background: 'linear-gradient(160deg,#5bbef5 0%,#2196f3 55%,#0d6fba 100%)', boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.55) 0%,transparent 100%)' }} />
          <Mail size={13} className="text-white relative z-10" />
        </div>
        <div>
          <div className="font-bold text-[13px] text-blue-950">Nouveau Message</div>
          <div className="text-[10px] text-blue-700/70">Envoi direct à ma boîte mail</div>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <CheckCircle size={48} className="text-green-500" />
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Message envoyé !</h3>
            <p className="text-sm text-gray-500">Je reviendrai vers vous dès que possible.</p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="px-5 py-2 text-white rounded-full text-sm font-medium transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
          >
            Nouveau message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">À :</label>
            <div
              className="text-sky-700 px-3 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(125,211,252,0.35)' }}
            >
              {portfolio.email}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Votre Nom :</label>
            <input
              required
              className="px-3 py-2 rounded-xl text-sm text-sky-900 outline-none transition-all placeholder:text-sky-300"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(125,211,252,0.4)' }}
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Votre Email :</label>
            <input
              required
              type="email"
              className="px-3 py-2 rounded-xl text-sm text-sky-900 outline-none transition-all placeholder:text-sky-300"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(125,211,252,0.4)' }}
              placeholder="jean@exemple.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Sujet :</label>
            <input
              required
              className="px-3 py-2 rounded-xl text-sm text-sky-900 outline-none transition-all placeholder:text-sky-300"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(125,211,252,0.4)' }}
              placeholder="Offre de stage / Freelance..."
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 min-h-[150px]">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Message :</label>
            <textarea
              required
              className="flex-1 px-3 py-2 rounded-xl text-sm text-sky-900 outline-none transition-all resize-none placeholder:text-sky-300"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(125,211,252,0.4)' }}
              placeholder={`Bonjour ${portfolio.name}, j'ai adoré votre portfolio...`}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <div
              className="flex items-center gap-2 text-red-600 text-sm px-3 py-2 rounded-xl"
              style={{ background: 'rgba(254,226,226,0.7)', border: '1px solid rgba(252,165,165,0.5)' }}
            >
              <AlertCircle size={14} />
              Erreur lors de l'envoi. Veuillez réessayer.
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="disabled:opacity-60 text-white px-6 py-2 font-semibold text-sm flex items-center gap-2 btn-aero-glossy"
            >
              {status === 'sending' ? (
                <><Loader2 size={16} className="animate-spin" /> Envoi...</>
              ) : (
                <><Send size={16} /> Envoyer</>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
