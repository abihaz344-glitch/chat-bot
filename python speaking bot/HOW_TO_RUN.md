# 🎀 ANA Speaking Bot - Girl Voice Edition

## ✅ What Was Fixed

### 1. **Girl Voice Configuration**
- Increased pitch to **1.5** for a more feminine, girly voice
- Prioritizes Microsoft Zira (Windows) and other female voices
- Rate set to 0.9 for clearer speech

### 2. **Server Errors Fixed**
- Fixed Flask route conflicts that caused errors
- Proper static file serving
- CORS configuration for cross-origin requests
- Fixed route ordering to prevent 404 errors

## 🚀 How to Run (Multiple Ways)

### Method 1: Command Line
```bash
cd "c:\Users\dell\OneDrive\Desktop\python speaking bot"
python app.py
```
Then open: http://127.0.0.1:5000

### Method 2: VS Code
1. Open the project folder in VS Code
2. Open terminal in VS Code (Ctrl + `)
3. Run: `python app.py`
4. Click on the localhost link that appears

### Method 3: Double-Click (Easy!)
Create a file named `start.bat` with:
```batch
@echo off
cd "c:\Users\dell\OneDrive\Desktop\python speaking bot"
python app.py
pause
```
Then double-click `start.bat` to run!

## 🎤 Features

- **Girl Voice**: High-pitched feminine voice for responses
- **Voice Input**: Click the microphone to speak
- **Text Input**: Type messages normally
- **Toggle Speech**: Click volume icon to enable/disable voice
- **Clear Chat**: Click trash icon to clear conversation

## 📝 Voice Settings (in script.js)

```javascript
utterance.pitch = 1.5;  // Higher = more girly (range: 0-2)
utterance.rate = 0.9;   // Speed (0.1-10)
```

You can adjust these values for different voice effects!

## 🔧 Common Errors & Solutions

### Error: "Address already in use"
**Solution**: Another app is using port 5000
```bash
# Kill existing Python process
taskkill /F /IM python.exe
# Then run again
python app.py
```

### Error: "No module named flask"
**Solution**: Install requirements
```bash
pip install -r requirements.txt
```

### Voice Not Working?
- Check browser permissions for microphone
- Make sure you're using Chrome, Edge, or Firefox
- Check volume is not muted

## 🎨 Customization

Want to change the voice even more? Edit `script.js` line 160-161:
- `utterance.pitch = 1.5;` → Try 1.8 for even higher
- `utterance.rate = 0.9;` → Try 0.8 for slower

## ✨ Enjoy Your Girl Voice AI Bot!
