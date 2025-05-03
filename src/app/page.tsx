'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import Footer from '@/components/Footer';

export default function Home() {
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfsLoading, setIsPdfsLoading] = useState(true);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  useEffect(() => {
    // Fetch PDFs from the API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sources`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPdfs(data.pdfs);
        setIsPdfsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching PDFs:', err);
        setIsPdfsLoading(false);
      });
  }, []);

  const processQuery = async (query: string) => {
    // Add user message
    const userMessage = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsWaitingForResponse(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      
      // Add initial empty assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsWaitingForResponse(false);
      
      // Simulate streaming effect with the actual response
      let currentText = '';
      for (let i = 0; i < data.answer.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        currentText += data.answer[i];
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: currentText }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
      setIsWaitingForResponse(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await processQuery(input);
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <div className="flex-1 flex">
        <div className="w-full max-w-7xl mx-auto flex h-[calc(100vh-4rem)] my-2">
          <Sidebar pdfs={pdfs} isPdfsLoading={isPdfsLoading} />
          <ChatArea
            messages={messages}
            input={input}
            isLoading={isLoading}
            isWaitingForResponse={isWaitingForResponse}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onQuickQuery={processQuery}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
