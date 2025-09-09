import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage, WebSource } from '../types';
import SendIcon from '../components/icons/SendIcon';
import LinkIcon from '../components/icons/LinkIcon';
import AILoadingIndicator from '../components/AILoadingIndicator';

const AI_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.84 4.417c.56-1.04 2.26-1.04 2.82 0l.44 1.03c.2.46.6.82 1.08.97l1.1.34c1.1.34 1.56 1.63.78 2.4l-.8.78c-.37.36-.54.87-.45 1.35l.2 1.13c.17 1.1-.9 2.05-1.96 1.6l-1.1-.47c-.48-.2-.98-.2-1.46 0l-1.1.47c-1.05.45-2.13-.5-1.96-1.6l.2-1.13c.09-.48-.08-1-.45-1.35l-.8-.78c-.78-.78-.32-2.06.78-2.4l1.1-.34c.48-.15.88-.5 1.08-.97l.44-1.03ZM12 12.75a.75.75 0 0 0-.75.75v5.5a.75.75 0 0 0 1.5 0v-5.5a.75.75 0 0 0-.75-.75Z M9.75 15a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" /></svg>`;

const promptSuggestions = [
  "What are the latest developments in renewable energy?",
  "Summarize the key points of the latest UN climate report",
  "Who won the Nobel Prize in Physics last year?",
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


const AIResearcher: React.FC = () => {
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
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are a helpful AI research assistant. Your goal is to provide accurate, up-to-date information by searching the web. Answer the user's questions clearly and concisely, using markdown for formatting (e.g., **bold**, *italics*, and '*' for lists). You can also answer follow-up questions.",
        },
      });
      setChat(newChat);

      setMessages([{
        id: Date.now(),
        authorId: 'ai',
        authorName: 'AI Researcher',
        authorAvatar: AI_AVATAR,
        content: "Hello! I'm your AI Research Assistant. Ask me anything, and I'll search the web for the most up-to-date information.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);

    } catch (e) {
        console.error(e);
        setError("Failed to initialize the AI Researcher. Please ensure the API key is configured correctly.");
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
      authorAvatar: 'https://picsum.photos/id/237/100/100',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: messageText });
      
      const sourceMap = new Map<string, WebSource>();
      response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sourceMap.set(chunk.web.uri, { title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri });
        }
      });
      const sources = Array.from(sourceMap.values());
      
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        authorId: 'ai',
        authorName: 'AI Researcher',
        authorAvatar: AI_AVATAR,
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: sources,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error("Error sending message to Gemini API:", e);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        authorId: 'ai',
        authorName: 'AI Researcher',
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
      <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">AI Researcher</h3>
      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Get up-to-date, sourced answers from across the web.</p>
      
      <div className="mt-8 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft flex flex-col h-[70vh]">
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-start gap-4 ${msg.authorId === 'me' ? 'flex-row-reverse' : ''}`}>
                <img src={msg.authorAvatar} alt={msg.authorName} className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className={`rounded-lg px-4 py-3 max-w-lg shadow-soft ${msg.authorId === 'me' ? 'bg-primary text-white' : 'bg-background-light dark:bg-border-dark'}`}>
                  <p className="font-bold text-sm mb-1">{msg.authorId === 'me' ? 'You' : msg.authorName}</p>
                  <MarkdownRenderer content={msg.content} />
                  {msg.sources && msg.sources.length > 0 && (
                     <div className="mt-4 pt-3 border-t border-border-light/50 dark:border-border-dark/50">
                        <h4 className="text-xs font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark mb-2">Sources</h4>
                        <ul className="space-y-1.5">
                            {msg.sources.map((source, index) => (
                                <li key={index} className="flex items-start">
                                    <LinkIcon className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark mr-2 mt-0.5 flex-shrink-0" />
                                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-text-accent-light dark:text-text-accent-dark hover:underline break-all">
                                        {source.title || new URL(source.uri).hostname}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                  )}
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
              placeholder={isLoading ? "Searching the web..." : "Ask a follow-up or new question..."}
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

export default AIResearcher;