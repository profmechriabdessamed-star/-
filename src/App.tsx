import React, { useState } from 'react';
import { TabType } from './types/market';
import { Navbar } from './components/Navbar';
import { LessonOverview } from './components/LessonOverview';
import { MarketSimulator } from './components/MarketSimulator';
import { VeoVideoStudio } from './components/VeoVideoStudio';
import { QuizSection } from './components/QuizSection';
import { AITutorChat } from './components/AITutorChat';
import { MindMapSummary } from './components/MindMapSummary';
import { Bot, Sparkles, BookOpen, Video, Cpu, School, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('lesson');
  const [targetPresetId, setTargetPresetId] = useState<string | undefined>(undefined);

  const handleGoToVideo = (presetId?: string) => {
    setTargetPresetId(presetId);
    setActiveTab('veo_video');
  };

  const handleGoToSimulator = () => {
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenTutor={() => setActiveTab('tutor')} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'lesson' && (
          <LessonOverview 
            onGoToSimulator={handleGoToSimulator} 
            onGoToVideo={handleGoToVideo} 
          />
        )}

        {activeTab === 'simulator' && (
          <MarketSimulator />
        )}

        {activeTab === 'veo_video' && (
          <VeoVideoStudio initialPresetId={targetPresetId} />
        )}

        {activeTab === 'quiz' && (
          <QuizSection />
        )}

        {activeTab === 'tutor' && (
          <AITutorChat />
        )}

        {activeTab === 'summary' && (
          <MindMapSummary />
        )}
      </main>

      {/* Floating Fast Action AI Tutor Trigger (when on other tabs) */}
      {activeTab !== 'tutor' && (
        <button
          onClick={() => setActiveTab('tutor')}
          className="fixed bottom-6 left-6 z-30 p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border border-emerald-400/30"
          title="اسأل الأستاذ مشري عبد الصمد"
        >
          <Bot className="w-5 h-5 text-emerald-200" />
          <span className="hidden sm:inline">اسأل الأستاذ مشري عبد الصمد</span>
          <span className="sm:hidden font-mono text-xs">أ. مشري</span>
        </button>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 font-semibold">
            <span className="flex items-center gap-1 text-emerald-400">
              <School className="w-4 h-4" />
              <span>الدليل التعليمي المعتمد لدرس السوق</span>
            </span>
            <span>•</span>
            <span className="text-emerald-300 font-bold">إشراف وإعداد: الأستاذ مشري عبد الصمد</span>
            <span>•</span>
            <span>مقرر مادة الاقتصاد والمناجمنت</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-indigo-400">
              <Video className="w-3.5 h-3.5" />
              <span>توليد الفيديو بنموذج Veo 3 Fast Preview</span>
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            تطبيق تعليمي متكامل للتعليم الثانوي والباكالوريا • 1- تعريف السوق • 2- أنواع السوق (السلع والخدمات، العمل، الأوراق المالية) • 3- أشكال السوق (المنافسة التامة الـ 5 شروط، والاحتكار)
          </p>
        </div>
      </footer>
    </div>
  );
}
