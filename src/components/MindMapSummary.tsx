import React, { useState } from 'react';
import { CURRICULUM_TEXT, MARKET_TYPES } from '../data/curriculumData';
import { 
  Printer, 
  Sparkles, 
  GitFork, 
  CheckCircle, 
  HelpCircle, 
  BookOpen, 
  RotateCw,
  Layers,
  Users,
  Briefcase,
  TrendingUp,
  ShieldAlert,
  Scale
} from 'lucide-react';

export const MindMapSummary: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const flashcards = [
    {
      id: 1,
      front: 'ما هو تعريف السوق وفق الدليل التعليمي؟',
      back: CURRICULUM_TEXT.definition.official,
      tag: 'تعريف',
    },
    {
      id: 2,
      front: 'ما هي أنواع السوق الثلاثة؟',
      back: '1) سوق السلع والخدمات\n2) سوق العمل\n3) سوق الأوراق المالية',
      tag: 'أنواع السوق',
    },
    {
      id: 3,
      front: 'ما هي الشروط الخمسة للمنافسة الكاملة أو التامة؟',
      back: '1) كثرة البائعين والمشترين\n2) صغر حجم العرض والطلب الفردي\n3) المعرفة التامة بظروف السوق\n4) تجانس السلع وسعر موحد\n5) حرية الدخول والخروج من السوق',
      tag: 'المنافسة التامة',
    },
    {
      id: 4,
      front: 'ما هو تعريف الاحتكار في مقرر الاقتصاد؟',
      back: CURRICULUM_TEXT.forms.monopoly.description,
      tag: 'الاحتكار',
    },
    {
      id: 5,
      front: 'من هم أطراف سوق العمل وموضوع التبادل؟',
      back: 'يلتقي فيه عارضو العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات) بمقابل الأجر.',
      tag: 'سوق العمل',
    },
    {
      id: 6,
      front: 'ما دور السماسرة والمؤسسات في سوق الأوراق المالية؟',
      back: 'هم الوسطاء الماليون الذين يسهلون التقاء بائعي ومشتري الأوراق المالية (الأسهم والسندات) وفق اللوائح.',
      tag: 'سوق الأوراق المالية',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header with Print Action */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <GitFork className="w-3.5 h-3.5" />
            <span>المخطط الذهني والمطوية الدراسية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            خريطة المفاهيم وبطاقات المراجعة السريعة
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            ملخص تركيبي بصري لدرس السوق قابل للطباعة والحفظ لمراجعة الامتحانات • إعداد: الأستاذ مشري عبد الصمد.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-slate-700 cursor-pointer shadow-md"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>طباعة المطوية / PDF</span>
        </button>
      </div>

      {/* Visual Mind Map Structure */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-8">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>الخريطة المفاهيمية الشاملة لدرس السوق</span>
        </h3>

        {/* Root Node */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-600/30 text-center px-8">
            درس السوق
          </div>
          <div className="w-0.5 h-8 bg-slate-700" />

          {/* Three Main Branches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Branch 1: Definition */}
            <div className="space-y-3 p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">المحور الأول (1)</span>
                <h4 className="text-base font-black text-white mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>تعريف السوق</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                  هو المكان الذي يلتقي فيه البائعون والمشترون مباشرة أو عن طريق الوسطاء (تجار جملة وتجزئة) لتبادل السلع والخدمات.
                </p>
              </div>

              <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                <div>• التقاء مباشر (وجهاً لوجه)</div>
                <div>• التقاء غير مباشر (تجار جملة، تجار تجزئة)</div>
                <div>• محل التبادل: سلع وخدمات بمقابل نقدي</div>
              </div>
            </div>

            {/* Branch 2: Market Types */}
            <div className="space-y-3 p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-teal-400 font-bold block mb-1">المحور الثاني (2)</span>
                <h4 className="text-base font-black text-white mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span>أنواع السوق (3)</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400 block mb-0.5">أ- سوق السلع والخدمات</strong>
                    <span className="text-slate-300">عارضو السلع مع طالبيها (سوق الخضر، سوق السيارات).</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-blue-400 block mb-0.5">ب- سوق العمل</strong>
                    <span className="text-slate-300">أشخاص في سن قانونية مع المؤسسات والإدارات بمقابل الأجر.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400 block mb-0.5">ج- سوق الأوراق المالية</strong>
                    <span className="text-slate-300">تداول الأسهم والسندات عبر سماسرة ومؤسسات عاملة.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch 3: Market Forms */}
            <div className="space-y-3 p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">المحور الثالث (3)</span>
                <h4 className="text-base font-black text-white mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span>أشكال السوق</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                    <strong className="text-emerald-400 block mb-1">أ- المنافسة الكاملة أو التامة</strong>
                    <ul className="text-slate-300 space-y-0.5 text-[11px]">
                      <li>1. كثرة البائعين والمشترين</li>
                      <li>2. صغر حجم العرض والطلب الفردي</li>
                      <li>3. المعرفة التامة بظروف السوق</li>
                      <li>4. تجانس السلع وسعر موحد</li>
                      <li>5. حرية الدخول والخروج من السوق</li>
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30">
                    <strong className="text-amber-400 block mb-1">ب- الاحتكار</strong>
                    <span className="text-slate-300 text-[11px] block">
                      بائع واحد يتحكم بالعرض والسعر، أو مشتري واحد يتحكم بالطلب والسعر.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Flashcards */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>بطاقات الحفظ والاستذكار التفاعلية (اضغط لقلب البطاقة)</span>
          </h3>
          <span className="text-xs text-slate-400">6 بطاقات ذكية</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card) => {
            const isFlipped = flippedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setFlippedCard(isFlipped ? null : card.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 min-h-[190px] flex flex-col justify-between cursor-pointer select-none ${
                  isFlipped
                    ? 'bg-gradient-to-br from-emerald-950/60 to-slate-950 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                      {card.tag}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
                      <RotateCw className="w-3 h-3" />
                      {isFlipped ? 'الإجابة' : 'السؤال'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-line">
                    {isFlipped ? card.back : card.front}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>اضغط للقلب</span>
                  <span>#{card.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
