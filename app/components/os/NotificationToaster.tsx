import React, { useEffect, useRef } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { useHaptics } from '@/app/hooks/useHaptics';

export const NotificationToaster = () => {
  const { notifications, removeNotification } = useOSStore();
  const { nudge, error: hapticError } = useHaptics();
  const prevCountRef = useRef(notifications.length);

  useEffect(() => {
    if (notifications.length > prevCountRef.current) {
      const latest = notifications[notifications.length - 1];
      latest?.type === 'error' ? hapticError() : nudge();
    }
    prevCountRef.current = notifications.length;
  }, [notifications.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="fixed top-4 right-4 z-[10000] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="pointer-events-auto w-80 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg rounded-lg p-3 flex gap-3 items-start"
          >
            <div className={`mt-1 ${notif.type === 'success' ? 'text-green-500' : notif.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
              {notif.type === 'success' ? <CheckCircle size={20} /> : notif.type === 'error' ? <AlertCircle size={20} /> : <Bell size={20} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-800">{notif.title}</h4>
              <p className="text-xs text-gray-600 leading-tight">{notif.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer la notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
