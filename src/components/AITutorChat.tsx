import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/market';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  BookOpen
} from 'lucide-react';

export const AITutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      role: 'assistant',
      text: 'أهلاً بك يا بطل! أنا أستاذك مشري عبد الصمد، أستاذ مادة الاقتصاد والمناجمنت، متخصص في شرح "درس السوق" وفق الدليل التعليمي المعتمد. يمكنك سؤالي عن تعريف السوق، أطرافه ووسطاؤه، أنواعه الثلاثة، أو الشروط الخمسة للمنافسة التامة ومفهوم الاحتكار. كيف أساعدك اليوم؟',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    'اشرح لي شروط المنافسة التامة الـ 5 بالتفصيل وبأمثلة بسيطة.',
    'ما الفرق بين سوق السلع والخدمات وسوق العمل؟',
    'ما هو دور الوسطاء (تجار الجملة والتجزئة) في تعريف السوق؟',
    'ما هو الفرق بين احتكار البيع واحتكار الشراء؟',
    'كيف يتأثر السعر إذا اختل شرط تجانس السلع؟',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setError(null);
    setInput('');

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'تعذر الحصول على رد من الأستاذ.');
      }

      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'عذراً، لم أستطع الإجابة.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init_reset',
        role: 'assistant',
        text: 'مرحباً بك مجدداً مع الأستاذ مشري عبد الصمد! تفضل بطرح أي سؤال أو استفسار حول درس السوق.',
        timestamp: Date.now(),
      },
    ]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>الأستاذ مشري عبد الصمد</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                مادة الاقتصاد والمناجمنت
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              المساعد البيداغوجي الذكي المعتمد لدرس السوق للإجابة وشرح المسائل الاقتصادية
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>بدء محادثة جديدة</span>
        </button>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>أسئلة شائعة في الامتحانات (اضغط للسؤال فوراً):</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-xs py-1.5 px-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-300 transition text-right cursor-pointer disabled:opacity-50"
            >
              • {q}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Chat Messages Box */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isBot = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                isBot ? 'items-start' : 'items-start flex-row-reverse'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isBot
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                    : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                  isBot
                    ? 'bg-slate-950/80 border border-slate-800 text-slate-100 rounded-tr-none'
                    : 'bg-emerald-700 text-white rounded-tl-none font-medium'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>الأستاذ مشري عبد الصمد يفكر ويستخرج الإجابة من الدليل التعليمي...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={isLoading}
          placeholder="اكتب سؤالك هنا للأستاذ مشري عبد الصمد حول درس السوق..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
        >
          <span>إرسال</span>
          <Send className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>
    </div>
  );
};
