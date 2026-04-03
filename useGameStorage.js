/**
 * useGameStorage Hook
 * Provides easy access to game storage with auto-save functionality
 */

import { useEffect, useCallback } from 'react';
import { 
  loadGameState, 
  saveGameState, 
  initializeStorage 
} from './storage';

export const useGameStorage = (
  unlocked,
  scores,
  subs,
  xp,
  achs,
  settings
) => {
  // Initialize storage on mount
  useEffect(() => {
    initializeStorage();
    console.log('Game storage initialized on mount');
  }, []);

  // Auto-save every 30 seconds when state changes
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const currentState = {
        unlocked,
        scores,
        subs,
        xp,
        achs,
        settings,
        playtime: 0, // You can enhance this to track actual playtime
      };
      saveGameState(currentState);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [unlocked, scores, subs, xp, achs, settings]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentState = {
        unlocked,
        scores,
        subs,
        xp,
        achs,
        settings,
      };
      saveGameState(currentState);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unlocked, scores, subs, xp, achs, settings]);

  // Load saved state
  const loadSavedState = useCallback(() => {
    return loadGameState();
  }, []);

  return { loadSavedState };
};
