import { useWebHaptics } from 'web-haptics/react';

/**
 * Thin wrapper around useWebHaptics with EthanOS-specific presets.
 * Silently no-ops on desktop, only vibrates on mobile devices.
 */
export const useHaptics = () => {
  const { trigger } = useWebHaptics();

  return {
    // Short tap : icon clicks, button presses
    tap: () => trigger(30),

    // Decisive tap : window open, navigation
    nudge: () => trigger('nudge'),

    // Positive confirmation : unlock, send, success
    success: () => trigger('success'),

    // Error : wrong password, bad command
    error: () => trigger('error'),

    // Subtle : close window, minor dismiss
    soft: () => trigger('soft'),
  };
};
