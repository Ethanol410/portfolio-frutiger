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
      <div className="aero-card border-b p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-gray-700 font-bold text-lg">
          <Mail className="text-blue-600" /> Nouveau Message
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
            className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Nouveau message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">À :</label>
            <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded text-sm border border-transparent">
              {portfolio.email}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Votre Nom :</label>
            <input
              required
              className="bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Votre Email :</label>
            <input
              required
              type="email"
              className="bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="jean@exemple.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Sujet :</label>
            <input
              required
              className="bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Offre de stage / Freelance..."
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 min-h-[150px]">
            <label className="text-xs font-bold text-gray-500 uppercase">Message :</label>
            <textarea
              required
              className="flex-1 bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder={`Bonjour ${portfolio.name}, j'ai adoré votre portfolio...`}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
              <AlertCircle size={14} />
              Erreur lors de l'envoi. Veuillez réessayer.
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-md transition-all"
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
