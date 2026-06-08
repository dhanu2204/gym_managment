import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Chatbot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Chatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); 
  const [input, setInput] = useState(''); 
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Gym Buddy. Ask me anything about workouts, diet, or fitness!", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; 
    
    const userMessage = input.trim();
    // Add user message to UI immediately
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `You are a highly motivating, knowledgeable, and friendly personal trainer. Keep your answers concise, practical, and easy to read. Do not use markdown formatting like **bold** or asterisks. Answer this question: ${userMessage}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiText = response.text();

        setMessages(prev => [...prev, { text: aiText, isUser: false }]);
    } catch (error) {
        console.error("Gemini Error:", error);
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to my brain right now. Try again later!", isUser: false }]);
    } finally {
        setIsLoading(false);
    }
  };

  
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div className="chatbot-wrapper">
      
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '✖' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          
          <div className="chatbot-header">
            <h3>🤖 AI Gym Buddy</h3>
            <button className="close-btn" onClick={toggleChat}>X</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isUser ? 'user-msg' : 'ai-msg'}`}>
                {msg.text}
              </div>
            ))}
            
            {isLoading && (
              <div className="message ai-msg">
                <em>Thinking...</em>
              </div>
            )}
            {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about workouts or diet..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? '...' : 'Send'}
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
