import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageSquare, 
  Bot, 
  Mail, 
  FileSearch, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Invoice, BookingRow } from '../types';

interface SmartAssistantProps {
  invoices: Invoice[];
  bookings: BookingRow[];
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ invoices, bookings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";

      const context = `You are a smart logistics assistant for "Nile Fleet Logistics". 
      You have access to ${invoices.length} invoices and ${bookings.length} booking records.
      The user is asking: "${userMessage}"
      Provide a helpful, professional response. If they ask for an email draft, provide it. 
      If they ask for a summary, provide it.`;

      const response = await ai.models.generateContent({
        model,
        contents: context,
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("AI Assistant failed:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to my brain right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: Mail, label: 'Draft Payment Reminder', prompt: 'Draft a polite payment reminder email for a customer.' },
    { icon: FileSearch, label: 'Summarize This Month', prompt: 'Summarize the logistics performance for the current month.' },
    { icon: Zap, label: 'Optimization Tips', prompt: 'Give me 3 tips to optimize my logistics operations based on typical data.' },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-slate-900/40 transition-all hover:scale-110 z-50 group border border-white/10"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] flex items-end justify-end p-8 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md h-[700px] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 duration-500 border border-slate-200">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-400">Cortex Assistant</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="space-y-8">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Sparkles className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">System Ready</h4>
                    <p className="text-sm font-medium text-slate-500 max-w-[200px] mx-auto">Query the logistics network for insights or automation tasks.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Protocol Presets</p>
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(action.prompt);
                        }}
                        className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group shadow-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                            <action.icon className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                          </div>
                          <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{action.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-5 rounded-3xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="EXECUTE QUERY..."
                  className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black tracking-widest uppercase focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!query.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 disabled:opacity-50 transition-all active:scale-90"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartAssistant;
