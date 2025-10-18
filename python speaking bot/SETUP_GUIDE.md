# 🚀 Quick Setup Guide for ANA AI Bot

## Step 1: Install Dependencies

Open terminal/command prompt in the project directory and run:

```bash
pip install -r requirements.txt
```

## Step 2: Get Your API Key (Choose One)

### Option A: Google Gemini (FREE ✨)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your key

### Option B: OpenAI (Paid 💰)
1. Visit: https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy your key

## Step 3: Configure Your Bot

### Windows:
```bash
copy .env.example .env
notepad .env
```

### Mac/Linux:
```bash
cp .env.example .env
nano .env
```

### Edit the .env file:

**For Gemini:**
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=paste_your_actual_key_here
```

**For OpenAI:**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=paste_your_actual_key_here
```

## Step 4: Start the Server

```bash
python app.py
```

You should see:
```
==================================================
[*] ANA - AI Speaking Bot Server Starting...
==================================================
[+] AI Provider: Google Gemini
[*] Server running on http://127.0.0.1:5000
==================================================
```

## Step 5: Open the Interface

1. Double-click `index.html` (or right-click → Open with → Chrome/Edge)
2. Allow microphone permissions when prompted
3. Start chatting! 🎉

## 🆘 Troubleshooting

### Server won't start?
- Make sure Python is installed: `python --version`
- Check all dependencies installed: `pip install -r requirements.txt`

### "Using simple responses" message?
- Your .env file might not be configured correctly
- Make sure the API key is pasted without quotes
- Check that AI_PROVIDER matches your chosen service

### Voice not working?
- Use Chrome, Edge, or Safari (Firefox doesn't support voice input)
- Allow microphone permissions
- Click the microphone button before speaking

---

**That's it! You're ready to chat with ANA! 🧸**
