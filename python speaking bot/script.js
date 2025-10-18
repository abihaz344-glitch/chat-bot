// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;
let speechEnabled = true;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
}

// DOM Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');
const voiceIndicator = document.getElementById('voice-indicator');
const clearChatBtn = document.getElementById('clear-chat');
const toggleSpeechBtn = document.getElementById('toggle-speech');

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

if (voiceBtn && recognition) {
    voiceBtn.addEventListener('click', toggleVoiceRecognition);
} else if (voiceBtn) {
    voiceBtn.disabled = true;
    voiceBtn.title = 'Speech recognition not supported in this browser';
}

clearChatBtn.addEventListener('click', clearChat);
toggleSpeechBtn.addEventListener('click', toggleSpeech);

// Send Message Function
function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Clear welcome message
    const welcomeMsg = chatBox.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.remove();

    // Display user message
    addMessage(message, 'user');
    userInput.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Send to backend
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        removeTypingIndicator();
        const botReply = data.reply;
        addMessage(botReply, 'bot');
        
        if (speechEnabled) {
            speak(botReply);
        }
    })
    .catch(error => {
        removeTypingIndicator();
        addErrorMessage("Could not connect to the server. Please make sure the backend is running.");
        console.error("Error:", error);
    });
}

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const iconDiv = document.createElement('div');
    iconDiv.className = 'message-icon';
    iconDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<span class="teddy-icon">🧸</span>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(iconDiv);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Speech Recognition Functions
function toggleVoiceRecognition() {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    if (!recognition) return;
    
    isListening = true;
    voiceBtn.classList.add('listening');
    voiceIndicator.classList.remove('hidden');
    
    recognition.start();
}

function stopListening() {
    if (!recognition) return;
    
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceIndicator.classList.add('hidden');
    
    recognition.stop();
}

// Speech Recognition Event Handlers
if (recognition) {
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        stopListening();
        sendMessage();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
        
        if (event.error === 'no-speech') {
            addErrorMessage('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
            addErrorMessage('Microphone access denied. Please allow microphone access.');
        }
    };

    recognition.onend = () => {
        stopListening();
    };
}

// Text-to-Speech Function
function speak(text) {
    if (!speechEnabled) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower for clarity
    utterance.pitch = 1.5;  // Much higher pitch for girly voice
    utterance.volume = 1;
    
    // Get available voices and prioritize Hazel voice
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find the best female voice (prioritize Microsoft Zira for Windows)
    const femaleVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('zira') ||
         voice.name.toLowerCase().includes('hazel') ||
         voice.name.toLowerCase().includes('samantha') ||
         voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('girl'))
    );
    
    // Final fallback to any English voice
    const preferredVoice = femaleVoice ||
                          voices.find(voice => voice.lang.startsWith('en')) || 
                          voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    window.speechSynthesis.speak(utterance);
}

// Load voices when they're available
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

// Toggle Speech On/Off
function toggleSpeech() {
    speechEnabled = !speechEnabled;
    
    if (speechEnabled) {
        toggleSpeechBtn.classList.add('active');
        toggleSpeechBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        toggleSpeechBtn.classList.remove('active');
        toggleSpeechBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        window.speechSynthesis.cancel();
    }
}

// Clear Chat Function
function clearChat() {
    chatBox.innerHTML = `
        <div class="welcome-message">
            <span class="teddy-icon-large">🧸</span>
            <p>Hi Abiha! I'm ANA, your friendly AI assistant. You can type or speak to me!</p>
        </div>
    `;
}

// Typing Indicator Functions
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    const iconDiv = document.createElement('div');
    iconDiv.className = 'message-icon';
    iconDiv.innerHTML = '<span class="teddy-icon">🧸</span>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    typingDiv.appendChild(iconDiv);
    typingDiv.appendChild(contentDiv);
    chatBox.appendChild(typingDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Error Message Function
function addErrorMessage(text) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = text;
    chatBox.appendChild(errorDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
