import React, { useState } from 'react';
import { CURRICULUM_TEXT, MARKET_TYPES } from '../data/curriculumData';
import { 
  Building2, 
  ShoppingBag, 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Users, 
  PieChart, 
  Eye, 
  Layers, 
  DoorOpen, 
  Sparkles,
  ArrowLeftRight,
  Info,
  Scale
} from 'lucide-react';

interface LessonOverviewProps {
  onGoToSimulator: () => void;
  onGoToVideo: (presetId?: string) => void;
}

export const LessonOverview: React.FC<LessonOverviewProps> = ({ onGoToSimulator, onGoToVideo }) => {
  const [activeSection, setActiveSection] = useState<'all' | 'definition' | 'types' | 'forms'>('all');
  const [selectedType, setSelectedType] = useState<string>('goods_and_services');

  const conditionIcons: Record<string, React.ReactNode> = {
    c1: <Users className="w-5 h-5 text-indigo-400" />,
    c2: <PieChart className="w-5 h-5 text-teal-400" />,
    c3: <Eye className="w-5 h-5 text-cyan-400" />,
    c4: <Layers className="w-5 h-5 text-amber-400" />,
    c5: <DoorOpen className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الدليل التعليمي المعتمد • إعداد وتقديم: الأستاذ مشري عبد الصمد</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-snug">
            درس <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">السوق</span>: المفهوم، الأنواع، والأشكال الاقتصادية
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            دليل تعليمي تفاعلي متكامل يُفصّل أركان السوق الثلاثة الرئيسية بدقة بيداغوجية، مُعزّز بمختبر لمحاكاة آليات المنافسة والاحتكار، وإمكانية توليد مشاهد فيديو تعليمية سينمائية فائقة الجودة بواسطة نموذج <span className="text-emerald-400 font-bold">Veo 3</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToSimulator}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-600/25 flex items-center gap-2 cursor-pointer"
            >
              <Scale className="w-4 h-4" />
              <span>جرّب محاكي السوق التفاعلي</span>
            </button>
            <button
              onClick={() => onGoToVideo('preset_goods')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>توليد فيديو تعليمي بـ Veo 3</span>
            </button>
          </div>
        </div>

        {/* Quick Filter buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-medium">
          <span className="text-slate-400 self-center ml-2">الانتقال السريع:</span>
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSection === 'all' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            كل الدرس
          </button>
          <button
            onClick={() => setActiveSection('definition')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSection === 'definition' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            1. تعريف السوق
          </button>
          <button
            onClick={() => setActiveSection('types')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSection === 'types' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            2. أنواع السوق (3 أنواع)
          </button>
          <button
            onClick={() => setActiveSection('forms')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSection === 'forms' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            3. أشكال السوق (المنافسة التامة & الاحتكار)
          </button>
        </div>
      </section>

      {/* SECTION 1: DEFINITION */}
      {(activeSection === 'all' || activeSection === 'definition') && (
        <section id="section-definition" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-lg">
              1
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">تعريف السوق</h3>
              <p className="text-xs sm:text-sm text-slate-400">النص البيداغوجي المعتمد وتحليله الهيكلي</p>
            </div>
          </div>

          {/* Official Definition Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border-2 border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-emerald-500 text-slate-950 text-[11px] font-black px-4 py-1 rounded-br-xl uppercase tracking-wider">
              النص المعتمد رسمياً
            </div>
            <blockquote className="text-lg sm:text-2xl font-bold text-white leading-relaxed pt-3 pb-2 text-right">
              &quot;{CURRICULUM_TEXT.definition.official}&quot;
            </blockquote>
            <p className="text-xs sm:text-sm text-emerald-400 mt-2 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>هذا هو التعريف المقرر للحفظ والاستشهاد به في الاختبارات وامتحانات شهادة البكالوريا.</span>
            </p>
          </div>

          {/* Interactive Breakdown Diagram of Definition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRICULUM_TEXT.definition.breakdown.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 font-bold flex items-center justify-center text-sm mb-3">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Visual Channel: Direct vs Intermediaries */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
              <span>قنوات التقاء البائعين والمشترين (مباشر مقابل عبر وسطاء)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-xs font-bold text-emerald-400 block mb-1">الالتقاء المباشر</span>
                <p className="text-xs text-slate-300 mb-2">يلتقي فيه البائع والمشتري وجهاً لوجه دون أي وسيط (مثل الشراء المباشر من المزرعة أو المتجر المباشر للمصنع).</p>
                <div className="flex items-center justify-between text-xs font-semibold py-2 px-3 rounded bg-slate-900/80 text-slate-200">
                  <span>البائع (المنتج)</span>
                  <span className="text-emerald-400 font-mono">── تبادل مباشر ──►</span>
                  <span>المشتري (المستهلك)</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-xs font-bold text-teal-400 block mb-1">عن طريق الوسطاء</span>
                <p className="text-xs text-slate-300 mb-2">تدخل حلقات وسيطة كـ تجار الجملة وتجار التجزئة لتوزيع وتوصيل السلع عبر شبكات واسعة.</p>
                <div className="flex items-center justify-between text-[11px] font-semibold py-2 px-2 rounded bg-slate-900/80 text-slate-200 overflow-x-auto">
                  <span>المنتج</span>
                  <span className="text-slate-500 font-mono">→</span>
                  <span className="text-teal-300 font-bold">تاجر جملة</span>
                  <span className="text-slate-500 font-mono">→</span>
                  <span className="text-emerald-300 font-bold">تاجر تجزئة</span>
                  <span className="text-slate-500 font-mono">→</span>
                  <span>المستهلك</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: TYPES OF MARKET */}
      {(activeSection === 'all' || activeSection === 'types') && (
        <section id="section-types" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-lg">
              2
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">أنواع السوق (3 أنواع رئيسية)</h3>
              <p className="text-xs sm:text-sm text-slate-400">سوق السلع والخدمات • سوق العمل • سوق الأوراق المالية</p>
            </div>
          </div>

          {/* Type Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MARKET_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              const icons = {
                goods_and_services: <ShoppingBag className="w-5 h-5" />,
                labor: <Briefcase className="w-5 h-5" />,
                financial: <TrendingUp className="w-5 h-5" />,
              };
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border text-right transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <span className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>
                      {icons[type.id as keyof typeof icons]}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {type.id === 'goods_and_services' ? 'أ' : type.id === 'labor' ? 'ب' : 'ج'}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {type.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                      {type.examples[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed View of Selected Market Type */}
          {(() => {
            const current = MARKET_TYPES.find((t) => t.id === selectedType) || MARKET_TYPES[0];
            return (
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      توضيح تفصيلي وفق الدليل
                    </span>
                    <h4 className="text-2xl font-black text-white">{current.title}</h4>
                  </div>
                  <button
                    onClick={() => onGoToVideo(
                      current.id === 'goods_and_services' ? 'preset_goods' : current.id === 'labor' ? 'preset_labor' : 'preset_finance'
                    )}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>توليد فيديو توضيحي لهذا السوق (Veo 3)</span>
                  </button>
                </div>

                {/* Definition callout */}
                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80">
                  <span className="text-xs font-bold text-slate-400 block mb-1">التعريف المقرر:</span>
                  <p className="text-base font-bold text-white leading-relaxed">
                    &quot;{current.definition}&quot;
                  </p>
                </div>

                {/* Structural Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">1. جانب العرض (العارضون)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.parties.suppliers}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">2. جانب الطلب (الطالبون)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.parties.demanders}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 block mb-1">3. الوسطاء وأسلوب التبادل</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{current.parties.intermediaries}</p>
                  </div>
                </div>

                {/* Real-world Examples */}
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    أمثلة واقعية وفق المقرر:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {current.examples.map((ex, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700">
                        • {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Comparative Summary Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3">نوع السوق</th>
                  <th className="p-3">طرف العرض (من يعرض؟)</th>
                  <th className="p-3">طرف الطلب (من يطلب؟)</th>
                  <th className="p-3">موضوع التبادل والمقابل</th>
                  <th className="p-3">أمثلة مقررة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-emerald-400">سوق السلع والخدمات</td>
                  <td className="p-3">المنتجون ومقدمو الخدمات</td>
                  <td className="p-3">المستهلكون والأسر والمؤسسات</td>
                  <td className="p-3">سلع استهلاكية وخدمات مقابل أسعار نقدية</td>
                  <td className="p-3 font-medium text-slate-400">سوق الخضر، سوق السيارات</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">سوق العمل</td>
                  <td className="p-3">أشخاص في سن قانونية ويرغبون في العمل</td>
                  <td className="p-3">المؤسسات والإدارات وأرباب العمل</td>
                  <td className="p-3">الجهد الذهني والعضلي مقابل الأجر والراتب</td>
                  <td className="p-3 font-medium text-slate-400">وظائف الشركات، مسابقات الإدارة</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">سوق الأوراق المالية</td>
                  <td className="p-3">بائعو الأسهم والسندات (مصدرو الأوراق)</td>
                  <td className="p-3">مشترو الأسهم والسندات (المستثمرون)</td>
                  <td className="p-3">حصص ملكية وديون عبر سماسرة ومؤسسات عاملة</td>
                  <td className="p-3 font-medium text-slate-400">تداول أسهم البورصة، السندات</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 3: MARKET FORMS (PERFECT COMPETITION & MONOPOLY) */}
      {(activeSection === 'all' || activeSection === 'forms') && (
        <section id="section-forms" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-lg">
              3
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">أشكال السوق</h3>
              <p className="text-xs sm:text-sm text-slate-400">أ- المنافسة الكاملة أو التامة • ب- الاحتكار</p>
            </div>
          </div>

          {/* Form A: Perfect Competition and its 5 conditions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  الشكل الأول (أ)
                </span>
                <h4 className="text-2xl font-black text-white">{CURRICULUM_TEXT.forms.competition.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{CURRICULUM_TEXT.forms.competition.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  5 شروط أساسية
                </span>
                <button
                  onClick={onGoToSimulator}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  اختبر الشروط في المحاكي
                </button>
              </div>
            </div>

            {/* The 5 Conditions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CURRICULUM_TEXT.forms.competition.conditions.map((cond, idx) => (
                <div 
                  key={cond.id}
                  className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center">
                        {conditionIcons[cond.id]}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        الشرط 0{idx + 1}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white mb-2">{cond.name}</h5>
                    <p className="text-xs text-emerald-400 font-semibold mb-2">
                      &quot;{cond.description}&quot;
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-900 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-bold block mb-0.5">الأثر الاقتصادي:</span>
                    {cond.importance}
                  </div>
                </div>
              ))}

              {/* Summary Card for the 5 conditions */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/50 to-slate-950 border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                    <Info className="w-4 h-4" />
                    <span>قاعدة بيداغوجية هامة</span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-2">
                    تلازم الشروط الخمسة معاً
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    إذا اختل شرط واحد فقط من الشروط الخمسة (مثل عدم تجانس السلعة أو وجود عوائق دخول أو قدرة بائع على التأثير)، يتحول السوق مباشرة من منافسة تامة إلى منافسة غير تامة (احتكار قلة أو احتكار مطلق).
                  </p>
                </div>
                <button
                  onClick={onGoToSimulator}
                  className="mt-4 w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition text-center cursor-pointer"
                >
                  افتح المحاكي التفاعلي للشروط 🧪
                </button>
              </div>
            </div>
          </div>

          {/* Form B: Monopoly */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  الشكل الثاني (ب)
                </span>
                <h4 className="text-2xl font-black text-white">{CURRICULUM_TEXT.forms.monopoly.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{CURRICULUM_TEXT.forms.monopoly.subtitle}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>السيطرة والتحكم بالسعر</span>
              </span>
            </div>

            {/* Official Definition */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-xs font-bold text-amber-400 block mb-1">التعريف المقرر للاحتكار:</span>
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                &quot;{CURRICULUM_TEXT.forms.monopoly.description}&quot;
              </p>
            </div>

            {/* Breakdown: Monopoly vs Monopsony */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CURRICULUM_TEXT.forms.monopoly.types.map((type, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h5 className="text-base font-bold text-white">{type.title}</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{type.desc}</p>
                  <div className="p-2.5 rounded bg-slate-900 text-[11px] text-amber-300 border border-amber-500/20">
                    <span className="font-bold text-slate-400">مثال توضيحي: </span>
                    {type.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Distinctive Features */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                الخصائص والنتائج الجوهرية للاحتكار:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {CURRICULUM_TEXT.forms.monopoly.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
