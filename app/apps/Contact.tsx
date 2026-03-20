import React, { useState } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Send, Mail } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

export const ContactApp = () => {
  const { addNotification } = useOSStore();
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailtoUrl = `mailto:${portfolio.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Bonjour ${portfolio.name},\n\nJe m'appelle ${formData.name}.\n\n${formData.message}\n\nCordialement,\n${formData.name}`)}`;
    window.open(mailtoUrl, '_blank');

    addNotification({
      title: "Client mail ouvert",
      message: `Votre message a été préparé pour ${portfolio.email}.`,
      type: 'success'
    });

    setFormData({ name: '', subject: '', message: '' });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header style "Mail" */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2 text-gray-700 font-bold text-lg">
          <Mail className="text-blue-600" /> Nouveau Message
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">À :</label>
          <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded text-sm border border-transparent">
            {portfolio.email}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">De (Votre Nom) :</label>
          <input
            required
            className="bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Jean Dupont"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
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

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Send size={16} /> Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};
