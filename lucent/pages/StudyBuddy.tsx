import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import SendIcon from '../components/icons/SendIcon';
import AILoadingIndicator from '../components/AILoadingIndicator';

const AI_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l.34 3.03a1.5 1.5 0 0 0 1.9 1.45l3.03-.34 1.45 1.9-3.03.34a1.5 1.5 0 0 0-1.45 1.9l.34 3.03-1.9 1.45-.34-3.03a1.5 1.5 0 0 0-1.9-1.45l-3.03.34-1.45-1.9 3.03-.34a1.5 1.5 0 0 0 1.45-1.9zM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/></svg>`;

const promptSuggestions = [
  "Explain quantum computing in simple terms",
  "Summarize the main causes of World War I",
  "Create a 5-question quiz about the Krebs cycle",
];

const parseInline = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const MarkdownRenderer: React.FC<{ content: string }> = memo(({ content }) => {
  const parsedContent = useMemo(() => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, index) => (
              <li key={index}>{parseInline(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, lineIndex) => {
      if (line.trim().startsWith('* ')) {
        listItems.push(line.trim().substring(2));
      } else {
        flushList();
        elements.push(<p key={`p-${lineIndex}`}>{parseInline(line)}</p>);
      }
    });

    flushList();

    return elements;
  }, [content]);

  return <div className="prose prose-sm dark:prose-invert max-w-none text-text-primary-light dark:text-text-primary-dark">{parsedContent}</div>;
});


const StudyBuddy: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "You are 'Lucida', a friendly and encouraging AI study buddy. Your goal is to help students understand complex topics. Explain concepts clearly, use analogies, and break down difficult ideas into smaller, easy-to-digest parts. When asked for answers to potential homework, guide the user to the answer rather than providing it directly. Keep your responses concise and easy to read by using formatting like markdown (e.g., **bold**, *italics*, and '*' for lists).",
        },
      });
      setChat(newChat);

      setMessages([{
        id: Date.now(),
        authorId: 'ai',
        authorName: 'Lucida',
        authorAvatar: AI_AVATAR,
        content: 'Hi! I\'m Lucida, your AI Study Buddy. How can I help you learn today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);

    } catch (e) {
        console.error(e);
        setError("Failed to initialize the AI Study Buddy. Please ensure the API key is configured correctly.");
    }
  }, []);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      authorId: 'me',
      authorName: 'You',
      authorAvatar: 'https://picsum.photos/id/237/100/100', // Placeholder user avatar
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: messageText });
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        authorId: 'ai',
        authorName: 'Lucida',
        authorAvatar: AI_AVATAR,
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error("Error sending message to Gemini API:", e);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        authorId: 'ai',
        authorName: 'Lucida',
        authorAvatar: AI_AVATAR,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Could not get a response from the AI. Please check your connection or API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">AI Study Buddy</h3>
      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Chat with Lucida to help you with your studies.</p>
      
      <div className="mt-8 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft flex flex-col h-[70vh]">
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-start gap-4 ${msg.authorId === 'me' ? 'flex-row-reverse' : ''}`}>
                <img src={msg.authorAvatar} alt={msg.authorName} className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className={`rounded-lg px-4 py-3 max-w-lg shadow-soft ${msg.authorId === 'me' ? 'bg-primary text-white' : 'bg-background-light dark:bg-border-dark'}`}>
                  <p className="font-bold text-sm mb-1">{msg.authorId === 'me' ? 'You' : msg.authorName}</p>
                  <MarkdownRenderer content={msg.content} />
                </div>
              </div>
            ))}
            {isLoading && <AILoadingIndicator avatar={AI_AVATAR} />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {messages.length <= 1 && !isLoading && (
            <div className="p-6 pt-0 flex flex-wrap gap-2 justify-center">
                {promptSuggestions.map(prompt => (
                    <button 
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-3 py-1.5 text-sm bg-primary/10 dark:bg-primary/20 text-primary-hover dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }} className="flex items-center space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isLoading ? "Waiting for response..." : "Ask Lucida anything..."}
              className="flex-grow px-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading || !!error}
              aria-label="Your message"
            />
            <button 
              type="submit" 
              className="p-3 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
              disabled={!userInput.trim() || isLoading}
              aria-label="Send message"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;