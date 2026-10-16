import React from 'react';
import { TabType } from '../types/market';
import { BookOpen, Cpu, Video, CheckCircle2, Bot, FileText, Sparkles, School } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenTutor }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'lesson', label: 'شرح الدرس والمحاور', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'simulator', label: 'مختبر محاكاة السوق', icon: <Cpu className="w-4 h-4" /> },
    { id: 'veo_video', label: 'استوديو فيديو Veo 3', icon: <Video className="w-4 h-4" />, badge: 'AI Video' },
    { id: 'quiz', label: 'بنك الأسئلة والاختبار', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'tutor', label: 'الأستاذ مشري عبد الصمد', icon: <Bot className="w-4 h-4" /> },
    { id: 'summary', label: 'الملخص والخرائط', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Curriculum Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  منصة درس السوق
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    الدليل المعتمد
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                مقرر مادة الاقتصاد والمناجمنت • إشراف الأستاذ مشري عبد الصمد
              </p>
            </div>
          </div>

          {/* Quick AI Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTutor}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition shadow-sm cursor-pointer"
              title="اسأل الأستاذ مشري عبد الصمد حول درس السوق"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">اسأل الأستاذ مشري عبد الصمد</span>
              <span className="sm:hidden">أ. مشري</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex space-x-1 space-x-reverse overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
