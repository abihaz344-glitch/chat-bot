# 🤖 AI Speaking Assistant

A modern, responsive AI chatbot with **speech recognition** and **text-to-speech** capabilities. Talk to your AI assistant using your voice or type messages!

## ✨ Features

- 🎤 **Voice Input**: Click the microphone button and speak to the bot
- 🔊 **Voice Output**: Bot responds with natural speech synthesis
- 🎨 **Modern Responsive UI**: Beautiful gradient design that works on all devices
- 🤖 **AI-Powered**: Choose between Google Gemini or OpenAI for intelligent conversations
- 💬 **Smart Fallback**: Works even without API key using pattern-based responses
- 🔄 **Flexible AI**: Switch between AI providers easily via configuration
- 🎯 **Real-time Typing Indicator**: See when the bot is thinking
- 🗑️ **Clear Chat**: Reset conversation anytime
- 🔇 **Toggle Speech**: Control voice output on/off

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. (Optional) Configure AI Provider

For AI-powered responses, you can choose between **Google Gemini** (free tier available) or **OpenAI** (paid).

#### Setup with .env file (Recommended)

1. **Copy the example environment file:**
   ```bash
   # Windows
   copy .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

2. **Edit `.env` and add your API key:**
   
   **For Google Gemini (Free):**
   - Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   ```env
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **For OpenAI (Paid):**
   - Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_actual_api_key_here
   ```

> **Note**: The bot works without an API key using smart pattern-based responses!

### 3. Start the Backend Server

```bash
python app.py
```

You should see:
```
==================================================
[*] ANA - AI Speaking Bot Server Starting...
==================================================
[+] AI Provider: Google Gemini (or OpenAI)

[*] Server running on http://127.0.0.1:5000
==================================================
```

### 4. Open the Frontend

Open `index.html` in your web browser (Chrome, Edge, or Firefox recommended for best speech recognition support)

## 🎮 How to Use

1. **Type a Message**: Enter text in the input box and press Enter or click Send
2. **Voice Input**: Click the 🎤 microphone button and speak when prompted
3. **Toggle Voice Output**: Click the 🔊 speaker icon to enable/disable voice responses
4. **Clear Chat**: Click the 🗑️ trash icon to start a fresh conversation

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Web Speech API (Speech Recognition & Synthesis)
- Font Awesome Icons
- Responsive Design (Mobile-first)

### Backend
- Python 3.8+
- Flask (Web Framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- Google Generative AI (Gemini API)
- OpenAI API (GPT-3.5/GPT-4)
- Python-dotenv (Environment Configuration)

## 🌟 Features in Detail

### Speech Recognition
- Click-to-talk interface
- Visual feedback when listening
- Automatic message sending after speech
- Error handling for microphone permissions

### Text-to-Speech
- Natural voice synthesis
- Adjustable rate, pitch, and volume
- Automatic voice selection based on language
- Toggle on/off functionality

### Responsive Design
- Works on desktop, tablet, and mobile
- Smooth animations and transitions
- Modern gradient UI
- Custom scrollbar styling

### AI Integration
- **Multiple AI Providers**: Choose between Google Gemini or OpenAI
- **Context-aware conversations**: Maintains conversation history
- **Smart System Prompts**: Optimized for friendly, concise responses
- **Intelligent fallback**: Pattern-based responses when AI is unavailable
- **Conversation Memory**: Keeps last 5 exchanges for context

## 📱 Browser Compatibility

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Speech Recognition | ✅ | ✅ | ❌ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |
| General UI | ✅ | ✅ | ✅ | ✅ |

> **Note**: Firefox doesn't support Web Speech Recognition API. Voice input won't work, but typing and voice output will.

## 🔧 Troubleshooting

### "Could not connect to the server"
- Make sure the Flask backend is running (`python app.py`)
- Check that the server is on port 5000
- Verify CORS is enabled

### "Microphone access denied"
- Allow microphone permissions in your browser
- Check browser settings for site permissions
- Try using HTTPS if on a remote server

### "Speech recognition not supported"
- Use Chrome, Edge, or Safari browser
- Update your browser to the latest version
- Check if browser supports Web Speech API

### No AI responses (using simple responses)
- API key not configured in `.env` file
- Check your API key:
  - Gemini: [Google AI Studio](https://makersuite.google.com/app/apikey)
  - OpenAI: [OpenAI Platform](https://platform.openai.com/api-keys)
- Verify `AI_PROVIDER` matches your configured key
- Check internet connection

## 📝 Example Conversations

```
You: Hello!
Bot: Hello! How can I assist you today?

You: What can you do?
Bot: I can have conversations with you! You can type messages or use the 
     microphone to speak to me. I'll respond with both text and voice.

You: Tell me a joke
Bot: Why did the AI go to therapy? Because it had too many deep learning issues! 😄

You: What time is it?
Bot: The current time is 02:30 PM.
```

## 🔐 Security Notes

- **Never commit `.env` file** to version control (already in `.gitignore`)
- Use `.env` file for API keys (not hardcoded in code)
- Keep dependencies updated regularly
- Enable HTTPS for production deployment
- Rotate API keys periodically

## 🚀 Future Enhancements

- [ ] Multi-language support
- [ ] Voice selection options
- [ ] Chat export functionality
- [ ] Dark/Light theme toggle
- [x] ✅ Integration with multiple AI models (Gemini, OpenAI)
- [ ] Add Claude/Anthropic support
- [ ] User authentication
- [ ] Chat history persistence
- [ ] Custom personality settings

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests. All contributions are welcome!

---

Made with ❤️ by Your Name

**Enjoy chatting with your AI Speaking Assistant! 🎉**
