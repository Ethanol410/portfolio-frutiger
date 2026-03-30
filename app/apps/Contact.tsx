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
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-3 shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.75) 0%,rgba(224,242,255,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.6)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', boxShadow: '0 2px 6px rgba(14,165,233,0.35)' }}
        >
          <Mail size={14} className="text-white" />
        </div>
        <span className="font-bold text-sky-900 text-sm">Nouveau Message</span>
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
            <label className="text-[11px] font-bold text-sky-500 uppercase tracking-wider">À :</label>
            <div
              className="text-sky-700 px-3 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(125,211,252,0.35)' }}
            >
              {portfolio.email}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-sky-500 uppercase tracking-wider">Votre Nom :</label>
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
            <label className="text-[11px] font-bold text-sky-500 uppercase tracking-wider">Votre Email :</label>
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
            <label className="text-[11px] font-bold text-sky-500 uppercase tracking-wider">Sujet :</label>
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
            <label className="text-[11px] font-bold text-sky-500 uppercase tracking-wider">Message :</label>
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
              className="disabled:opacity-60 text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 10px rgba(14,165,233,0.4)' }}
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
