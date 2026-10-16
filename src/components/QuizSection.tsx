import React, { useState } from 'react';
import { BASELINE_QUIZ } from '../data/curriculumData';
import { QuizQuestion } from '../types/market';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  BookCheck,
  Brain,
  AlertCircle
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(BASELINE_QUIZ);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [filterTopic, setFilterTopic] = useState<string>('all');

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const isAnswered = selectedAnswers[currentIndex] !== undefined;
  const selectedOption = selectedAnswers[currentIndex];
  const isCorrect = isAnswered && selectedOption === currentQ.correctIndex;

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => questions[parseInt(qIdx, 10)]?.correctIndex === ansIdx
  ).length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return; // Prevent changing answer once selected
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: idx,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(Boolean(selectedAnswers[currentIndex + 1] !== undefined));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
  };

  const handleGenerateAIQuiz = async () => {
    setIsGeneratingQuiz(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: filterTopic,
          count: 4,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'فشل توليد أسئلة جديدة.');
      }

      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        const formatted: QuizQuestion[] = data.questions.map((q: any, i: number) => ({
          id: `ai_q_${Date.now()}_${i}`,
          category: 'ذكاء اصطناعي (Gemini 3.8 Flash)',
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        }));

        setQuestions(formatted);
        setSelectedAnswers({});
        setCurrentIndex(0);
        setShowExplanation(false);
      }
    } catch (err: any) {
      setGenerationError(err.message || 'تعذر توليد الأسئلة حالياً.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <BookCheck className="w-3.5 h-3.5" />
              <span>التقويم الذاتي والاختبارات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              بنك الأسئلة واختبارات درس السوق
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              أسئلة مطابقة لمعايير امتحانات البكالوريا والتعليم الثانوي لترسيخ التعريف والأنواع والشروط الخمسة للمنافسة التامة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateAIQuiz}
              disabled={isGeneratingQuiz}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingQuiz ? 'animate-spin' : ''}`} />
              <span>{isGeneratingQuiz ? 'جارٍ التوليد بـ Gemini...' : 'توليد أسئلة جديدة بالـ AI'}</span>
            </button>
          </div>
        </div>

        {generationError && (
          <div className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{generationError}</span>
          </div>
        )}

        {/* Progress & Score Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            السؤال رقم <strong className="text-white font-mono">{currentIndex + 1}</strong> من{' '}
            <span className="font-mono">{totalQuestions}</span>
          </span>

          <div className="flex items-center gap-4">
            <span>
              الإجابات الصحيحة:{' '}
              <strong className="text-emerald-400 font-mono text-sm">{correctCount}</strong> /{' '}
              <span className="font-mono">{Object.keys(selectedAnswers).length}</span>
            </span>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
            {currentQ.category || 'درس السوق'}
          </span>
          <span className="text-xs font-mono text-slate-500">
            #{currentIndex + 1}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white leading-relaxed text-right">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isThisSelected = selectedOption === idx;
            const isThisCorrect = idx === currentQ.correctIndex;

            let buttonStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';
            let icon = null;

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm shadow-emerald-500/20';
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyle = 'bg-red-950/40 border-red-500 text-red-200';
                icon = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-right transition flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    isThisSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx === 0 ? 'أ' : idx === 1 ? 'ب' : idx === 2 ? 'ج' : 'د'}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">{option}</span>
                </div>

                {icon}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <div className={`p-5 rounded-xl border transition-all duration-300 space-y-2 ${
            isCorrect
              ? 'bg-emerald-950/20 border-emerald-500/40'
              : 'bg-amber-950/20 border-amber-500/40'
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>إجابة صحيحة ومطابقة للدليل!</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>الشرح البيداغوجي وفق الدليل المعتمد:</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
            <span>السؤال السابق</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:hover:bg-emerald-600 text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>السؤال التالي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Trophy Card */}
      {Object.keys(selectedAnswers).length === totalQuestions && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-white">
            اكتمل الاختبار! نتيجتك: {correctCount} من {totalQuestions} ({Math.round((correctCount / totalQuestions) * 100)}%)
          </h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {correctCount === totalQuestions
              ? 'ممتاز جداً! أنت متمكن تماماً من تعريف السوق وأنواعه وشروط المنافسة التامة والاحتكار.'
              : 'عمل جيد! راجع المفاهيم والشروط في صفحة شرح الدرس، أو اسأل الأستاذ الذكي لمزيد من التوضيح.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
            >
              إعادة الاختبار
            </button>
            <button
              onClick={handleGenerateAIQuiz}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
            >
              توليد دفعة جديدة من الأسئلة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
