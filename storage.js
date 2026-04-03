/**
 * Game Data Storage Manager
 * Handles saving/loading game progress to browser localStorage
 */

const STORAGE_KEY = 'escape_the_future_game';

// Default game state structure
const DEFAULT_STATE = {
  unlocked: [true, false, false, false, false],
  scores: {},
  subs: {},
  xp: 2400,
  achs: ['first_solve'],
  settings: {
    sfx: true,
    music: true,
    timer: true,
    hints: true,
    difficulty: 'normal',
  },
  lastPlayed: null,
  playtime: 0,
  version: '1.0',
};

/**
 * Initialize storage - creates default data if not exists
 */
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    console.log('Game storage initialized');
  }
};

/**
 * Save game state to localStorage
 * @param {Object} gameState - The game state object to save
 */
export const saveGameState = (gameState) => {
  try {
    const stateToSave = {
      unlocked: gameState.unlocked,
      scores: gameState.scores,
      subs: gameState.subs,
      xp: gameState.xp,
      achs: gameState.achs,
      settings: gameState.settings,
      lastPlayed: new Date().toISOString(),
      playtime: gameState.playtime || 0,
      version: DEFAULT_STATE.version,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    console.log('Game state saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save game state:', error);
    return false;
  }
};

/**
 * Load game state from localStorage
 * @returns {Object} The saved game state or default state
 */
export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      initializeStorage();
      return DEFAULT_STATE;
    }
    const parsedState = JSON.parse(savedState);
    // Merge with defaults in case of missing properties
    return { ...DEFAULT_STATE, ...parsedState };
  } catch (error) {
    console.error('Failed to load game state:', error);
    console.log('Resetting to default state');
    return DEFAULT_STATE;
  }
};

/**
 * Save specific game properties
 * @param {string} key - Property key
 * @param {any} value - Property value
 */
export const saveProperty = (key, value) => {
  try {
    const currentState = loadGameState();
    currentState[key] = value;
    currentState.lastPlayed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    return true;
  } catch (error) {
    console.error(`Failed to save property ${key}:`, error);
    return false;
  }
};

/**
 * Get a specific game property
 * @param {string} key - Property key
 * @param {any} defaultValue - Default value if property doesn't exist
 */
export const getProperty = (key, defaultValue = null) => {
  try {
    const state = loadGameState();
    return state[key] !== undefined ? state[key] : defaultValue;
  } catch (error) {
    console.error(`Failed to get property ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Clear all game data (reset to defaults)
 */
export const clearGameData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    initializeStorage();
    console.log('Game data cleared and reset to defaults');
    return true;
  } catch (error) {
    console.error('Failed to clear game data:', error);
    return false;
  }
};

/**
 * Export game data as JSON (for backup)
 * @returns {string} JSON string of game data
 */
export const exportGameData = () => {
  try {
    const state = loadGameState();
    return JSON.stringify(state, null, 2);
  } catch (error) {
    console.error('Failed to export game data:', error);
    return null;
  }
};

/**
 * Import game data from JSON
 * @param {string} jsonData - JSON string of game data
 */
export const importGameData = (jsonData) => {
  try {
    const importedState = JSON.parse(jsonData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(importedState));
    console.log('Game data imported successfully');
    return true;
  } catch (error) {
    console.error('Failed to import game data:', error);
    return false;
  }
};

/**
 * Get storage usage statistics
 * @returns {Object} Storage stats
 */
export const getStorageStats = () => {
  try {
    const state = loadGameState();
    const dataSize = new Blob([JSON.stringify(state)]).size;
    return {
      dataSize: `${(dataSize / 1024).toFixed(2)} KB`,
      lastPlayed: state.lastPlayed,
      totalLevels: state.unlocked.length,
      completedLevels: Object.keys(state.scores).length,
      totalXP: state.xp,
      achievements: state.achs.length,
    };
  } catch (error) {
    console.error('Failed to get storage stats:', error);
    return null;
  }
};
