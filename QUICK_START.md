# Quick Start Commands

## Running Your Game with Storage

### Development (Live editing with hot reload)
```bash
npm run dev
```
Then open: `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized files in `/dist` folder

### Preview Production Build
```bash
npm run preview
```
Test the production build locally

### Lint Check
```bash
npm run lint
```
Check for code issues

---

## Storage System API (For Console Use)

### Import these in DevTools Console:
```javascript
import { loadGameState, saveGameState, clearGameData, exportGameData, getStorageStats } from '/src/storage.js'
```

### Quick Commands:
```javascript
// Check if storage works
loadGameState()

// View stats
getStorageStats()

// Export backup
console.log(exportGameData())

// Full reset
clearGameData()
```

---

## What Saves Automatically

- Unlocked levels ✓
- Level scores ✓
- Solutions submitted ✓
- XP earned ✓
- Achievements ✓
- Settings/preferences ✓
- Last played time ✓

Every **30 seconds** + on **page close**

---

## Troubleshoot

| Problem | Solution |
|---------|----------|
| Progress not saving | DEV: Check console for errors. PROD: Re-build with `npm run build` |
| Want to reset | Open console and run `clearGameData()` |
| Need backup | Run `console.log(exportGameData())` and save the output |
| Building fails | Run `npm install` to ensure all dependencies are installed |

---

## File Structure
```
src/
  ├── storage.js          ← Storage manager (new)
  ├── useGameStorage.js   ← Auto-save hook (new)
  ├── App.jsx             ← Updated with storage
  ├── main.jsx
  ├── App.css
  ├── index.css
  └── assets/
```

---

## Next Steps

1. ✅ Storage system is installed
2. ✅ Auto-save configured
3. Run `npm run dev` to test
4. Play the game - progress saves automatically
5. Check the full guide in `DATA_STORAGE_GUIDE.md`
