import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function AIAssistantModule({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am your LifeKit AI Assistant (Powered by Gemini). You can ask me to add notes, manage tasks, or help organize your day.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `I've noted that! "${currentInput}". I'll process this command. Soon I will be fully integrated to directly add this to your Tasks and Notes via voice and text!` 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col z-50 overflow-hidden transform transition-all animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">Gemini Assistant</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-sm' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
        <div className="flex-1 relative">
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="rounded-full bg-slate-50 pr-10 border-slate-200 focus-visible:ring-emerald-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        <Button onClick={handleSend} className="rounded-full w-10 h-10 p-0 bg-emerald-600 hover:bg-emerald-700 shrink-0 shadow-md">
          <Send className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full w-10 h-10 p-0 shrink-0 border-emerald-200 text-emerald-600 hover:bg-emerald-50">
          <Mic className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
