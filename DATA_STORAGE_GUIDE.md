# Game Data Storage Setup Guide

## What Was Implemented

Your game now has a **complete localStorage-based data persistence system** that automatically saves and loads your game progress.

### Files Created:

1. **`src/storage.js`** - Core storage management system
   - Handles saving/loading game state
   - Auto-initializes storage
   - Provides backup/export functionality
   - Manages all game data (levels, scores, XP, achievements, settings)

2. **`src/useGameStorage.js`** - React hook for auto-save
   - Auto-saves every 30 seconds
   - Saves on page unload
   - Integrates seamlessly with your React component

3. **`src/App.jsx`** - Updated with storage integration
   - Loads saved game state on startup
   - Initializes storage on mount
   - All state is now persistent

## What Gets Saved

Your game automatically saves:
- ✅ Unlocked levels
- ✅ Level scores
- ✅ Submissions/solutions (subs)
- ✅ Total XP points
- ✅ Achievements
- ✅ Settings (volume, timer, hints, difficulty)
- ✅ Last played timestamp
- ✅ Playtime tracking

## Steps to Run Successfully

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This will start Vite on `http://localhost:5173` (or similar port)

### 3. Build for Production
```bash
npm build
```

### 4. Preview Production Build
```bash
npm run preview
```

## How the Storage Works

### Automatic Features:
- **Auto-save every 30 seconds** - Your progress is saved continuously
- **On unload save** - When you close the page, final state is saved
- **First-time init** - Storage automatically creates default state on first play
- **Error recovery** - If data is corrupted, it resets to safe defaults

### Storage Details:
- **Location**: Browser's localStorage (persists across browser restarts)
- **Size**: ~2-5 KB per save file
- **Capacity**: Browser allows up to 5-10 MB (plenty of room)
- **Scope**: Per-domain (your game data is tied to this domain only)

## Testing the Storage System

### In Browser Console, You Can:

```javascript
// View all saved data
localStorage.getItem('escape_the_future_game')

// Load current state
import { loadGameState } from './storage.js'
const state = loadGameState()
console.log(state)

// View storage statistics
import { getStorageStats } from './storage.js'
console.log(getStorageStats())

// Export game data (for backup)
import { exportGameData } from './storage.js'
const backup = exportGameData()
console.log(backup)

// Clear all data (reset to defaults)
import { clearGameData } from './storage.js'
clearGameData()

// Manually save
import { saveGameState } from './storage.js'
saveGameState(currentGameState)
```

## Available Storage Functions

### In Your Code:

```javascript
import { 
  loadGameState,      // Load all saved data
  saveGameState,      // Save entire game state
  saveProperty,       // Save single property
  getProperty,        // Get single property
  clearGameData,      // Reset to defaults
  exportGameData,     // Get JSON backup
  importGameData,     // Restore from JSON
  getStorageStats     // View usage stats
} from './storage.js'
```

## Important Notes

1. **First Run**: When you first run the game, it will create default storage with Level 1 unlocked
2. **Cross-Tab Sync**: Currently each tab has its own storage (can be enhanced for multi-tab sync)
3. **Browser Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
4. **Offline Ready**: Game works completely offline - no internet needed for storage
5. **No Server Needed**: All data stored locally on user's device (for multiplayer, you'd need a backend)

## Common Issues & Fixes

### Issue: Progress not saving
**Solution**: Check browser console for errors. Ensure localStorage is enabled in browser settings.

### Issue: Storage full error
**Solution**: This is rare. Export your data, clear storage, and reimport.

### Issue: Need to reset game
**Solution**: Open browser console and run:
```javascript
import { clearGameData } from './storage.js'
clearGameData()
```

### Issue: Want to backup progress
**Solution**: Export from console:
```javascript
import { exportGameData } from './storage.js'
const backup = exportGameData()
console.log(backup)  // Copy this text to save
```

To restore:
```javascript
import { importGameData } from './storage.js'
importGameData(backupJsonText)
```

## Future Enhancements (Optional)

If you want to add more features later:
- [ ] Sync data across browser tabs
- [ ] Cloud backup to Firebase/Discord
- [ ] Multiple save slots
- [ ] Manual save/load UI in settings menu
- [ ] Migration to IndexedDB for larger storage
- [ ] Server-side storage for multiplayer

## Troubleshooting

If something goes wrong:

1. **Check console**: Open DevTools (F12 or right-click → Inspect) and look for errors
2. **Clear cache**: Sometimes old code caches cause issues
3. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Check localStorage**: In DevTools → Application → localStorage → look for 'escape_the_future_game'

## Ready to Go!

Your game is now set up with persistent storage. Just run `npm run dev` and play! All your progress will be automatically saved.

Need help? Check the browser console for any messages about storage status.
