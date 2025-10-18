from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.')
CORS(app)

# Configure AI providers (set API keys in .env file)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini").lower()  # Options: gemini, openai

# Initialize chat history
chat_history = []

# OpenAI configuration
openai_client = None
if AI_PROVIDER == "openai" and OPENAI_API_KEY:
    try:
        from openai import OpenAI
        openai_client = OpenAI(api_key=OPENAI_API_KEY)
    except ImportError:
        print("[!] OpenAI library not installed. Install with: pip install openai")
        AI_PROVIDER = "gemini"

def get_gemini_response(user_message):
    """Get response from Gemini AI"""
    try:
        if not GEMINI_API_KEY:
            return None
        
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        
        # Enhanced system context for ANA
        system_context = """You are ANA, a friendly AI assistant represented by a teddy bear. You are speaking to Abiha. 
        Be warm, helpful, and conversational. Keep responses concise but informative (2-4 sentences usually). 
        Occasionally address Abiha by name. Be supportive and encouraging. Show personality while being professional."""
        
        # Create context with chat history
        context = system_context + "\n\n"
        if chat_history:
            context += "Previous conversation:\n"
            context += "\n".join([f"Abiha: {msg['user']}\nANA: {msg['bot']}" for msg in chat_history[-5:]])
            context += "\n\n"
        
        prompt = f"{context}Abiha: {user_message}\nANA:"
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini AI Error: {e}")
        return None

def get_openai_response(user_message):
    """Get response from OpenAI"""
    try:
        if not openai_client:
            return None
        
        # Build conversation history for OpenAI
        messages = [
            {
                "role": "system",
                "content": """You are ANA, a friendly AI assistant represented by a teddy bear. You are speaking to Abiha. 
                Be warm, helpful, and conversational. Keep responses concise but informative (2-4 sentences usually). 
                Occasionally address Abiha by name. Be supportive and encouraging. Show personality while being professional."""
            }
        ]
        
        # Add recent chat history
        for msg in chat_history[-5:]:
            messages.append({"role": "user", "content": msg['user']})
            messages.append({"role": "assistant", "content": msg['bot']})
        
        # Add current message
        messages.append({"role": "user", "content": user_message})
        
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=200
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI Error: {e}")
        return None

def get_ai_response(user_message):
    """Get AI response based on configured provider"""
    if AI_PROVIDER == "openai":
        return get_openai_response(user_message)
    else:
        return get_gemini_response(user_message)

def get_simple_response(user_message):
    """Fallback simple response when AI is not available"""
    user_message = user_message.lower()
    
    # Greeting responses
    if any(word in user_message for word in ["hello", "hi", "hey", "greetings"]):
        return "Hello Abiha! How can I assist you today?"
    
    # How are you
    elif any(phrase in user_message for phrase in ["how are you", "how's it going", "what's up"]):
        return "I'm doing great, Abiha! Thanks for asking. How can I help you today?"
    
    # Name questions
    elif any(phrase in user_message for phrase in ["your name", "who are you", "what are you"]):
        return "I'm ANA, your friendly AI assistant! I can chat with you using text or voice, Abiha!"
    
    # Capabilities
    elif any(word in user_message for word in ["what can you do", "your capabilities", "help me"]):
        return "I can have conversations with you, Abiha! You can type messages or use the microphone to speak to me. I'll respond with both text and voice."
    
    # Thank you
    elif any(word in user_message for word in ["thank", "thanks", "appreciate"]):
        return "You're welcome! I'm happy to help. Is there anything else you'd like to know?"
    
    # Goodbye
    elif any(word in user_message for word in ["bye", "goodbye", "see you", "later"]):
        return "Goodbye! Have a wonderful day. Come back anytime!"
    
    # Time
    elif "time" in user_message:
        from datetime import datetime
        current_time = datetime.now().strftime("%I:%M %p")
        return f"The current time is {current_time}."
    
    # Date
    elif "date" in user_message or "today" in user_message:
        from datetime import datetime
        current_date = datetime.now().strftime("%B %d, %Y")
        return f"Today is {current_date}."
    
    # Jokes
    elif "joke" in user_message or "funny" in user_message:
        return "Why did the AI go to therapy? Because it had too many deep learning issues! 😄"
    
    # Default response
    else:
        return "I understand, Abiha. Could you tell me more about what you'd like to know?"

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    
    if not user_message:
        return jsonify({"reply": "Please say something!"})
    
    # Try AI response first, fallback to simple response
    reply = get_ai_response(user_message)
    
    if reply is None:
        reply = get_simple_response(user_message)
    
    # Store in chat history
    chat_history.append({"user": user_message, "bot": reply})
    
    # Keep only last 10 exchanges
    if len(chat_history) > 10:
        chat_history.pop(0)
    
    return jsonify({"reply": reply})

@app.route("/clear", methods=["POST"])
def clear_history():
    """Clear chat history"""
    chat_history.clear()
    return jsonify({"status": "cleared"})

@app.route("/")
def home():
    """Serve the main HTML page"""
    return send_from_directory('.', 'index.html')

@app.route("/<path:path>")
def serve_static(path):
    """Serve static files (CSS, JS, etc.)"""
    if path.startswith('chat') or path.startswith('clear'):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory('.', path)

if __name__ == "__main__":
    print("\n" + "="*50)
    print("[*] ANA - AI Speaking Bot Server Starting...")
    print("="*50)
    
    # Check AI configuration
    if AI_PROVIDER == "openai":
        if OPENAI_API_KEY and openai_client:
            print("[+] AI Provider: OpenAI (GPT-3.5)")
        else:
            print("[!] OpenAI selected but API key not configured")
            print("[*] Falling back to simple responses")
    elif AI_PROVIDER == "gemini":
        if GEMINI_API_KEY:
            print("[+] AI Provider: Google Gemini")
        else:
            print("[!] Gemini API key not set")
            print("[*] Falling back to simple responses")
    else:
        print(f"[!] Unknown AI provider: {AI_PROVIDER}")
        print("[*] Using simple responses")
    
    if not (GEMINI_API_KEY or OPENAI_API_KEY):
        print("\n[i] To enable AI responses:")
        print("    1. Create a .env file in the project directory")
        print("    2. Add: GEMINI_API_KEY=your_key OR OPENAI_API_KEY=your_key")
        print("    3. Add: AI_PROVIDER=gemini OR AI_PROVIDER=openai")
    
    print("\n[*] Server running on http://127.0.0.1:5000")
    print("="*50 + "\n")
    app.run(debug=True)
