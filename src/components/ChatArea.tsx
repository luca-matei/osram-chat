import Message from './Message';
import ChatInput from './ChatInput';
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isWaitingForResponse: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onQuickQuery: (query: string) => void;
}

export default function ChatArea({ messages, input, isLoading, isWaitingForResponse, onInputChange, onSubmit, onReset, onQuickQuery }: ChatAreaProps) {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(messages);
  const [isResetting, setIsResetting] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setDisplayedMessages([]);
        setIsResetting(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayedMessages(messages);
    }
  }, [messages, isResetting]);

  useEffect(() => {
    if (isWaitingForResponse) {
      const timer = setTimeout(() => {
        setShowThinking(true);
      }, 100); // Small delay to ensure user message is rendered
      return () => clearTimeout(timer);
    } else {
      setShowThinking(false);
    }
  }, [isWaitingForResponse]);

  const handleReset = () => {
    setIsResetting(true);
    onReset();
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-r-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayedMessages.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full text-center p-8 transition-opacity duration-300 ${isResetting ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">Welcome to OSRAM Chat</h2>
            <p className="text-[#2C3E50]/80 max-w-md">
              Ask me anything about OSRAM products. I can help you find information about specifications, 
              product numbers, and suitable applications for different lighting solutions.
            </p>
          </div>
        ) : (
          <div className={`transition-opacity duration-300 ${isResetting ? 'opacity-0' : 'opacity-100'}`}>
            {displayedMessages.map((message, index) => (
              <Message key={index} role={message.role} content={message.content} />
            ))}
            {showThinking && (
              <div className="flex items-center space-x-2 p-4 rounded-lg bg-white">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onReset={handleReset}
        onQuickQuery={onQuickQuery}
      />
    </div>
  );
} 