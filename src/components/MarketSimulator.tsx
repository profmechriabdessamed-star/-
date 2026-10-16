import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  Users, 
  PieChart, 
  Eye, 
  Layers, 
  DoorOpen, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  TrendingUp,
  Sliders,
  Award
} from 'lucide-react';

export const MarketSimulator: React.FC = () => {
  // Simulator Controls
  const [sellersCount, setSellersCount] = useState<number>(350);
  const [buyersCount, setBuyersCount] = useState<number>(600);
  const [individualShareSmall, setIndividualShareSmall] = useState<boolean>(true);
  const [transparency, setTransparency] = useState<number>(95);
  const [homogeneity, setHomogeneity] = useState<number>(95);
  const [freedomOfEntry, setFreedomOfEntry] = useState<number>(90);

  // Pre-configured Economic Presets
  const applyPreset = (preset: 'perfect_comp' | 'monopoly_seller' | 'monopsony_buyer' | 'vegetable_market') => {
    switch (preset) {
      case 'perfect_comp':
        setSellersCount(500);
        setBuyersCount(1000);
        setIndividualShareSmall(true);
        setTransparency(100);
        setHomogeneity(100);
        setFreedomOfEntry(100);
        break;
      case 'monopoly_seller':
        setSellersCount(1);
        setBuyersCount(1000);
        setIndividualShareSmall(false);
        setTransparency(30);
        setHomogeneity(100);
        setFreedomOfEntry(5);
        break;
      case 'monopsony_buyer':
        setSellersCount(250);
        setBuyersCount(1);
        setIndividualShareSmall(false);
        setTransparency(40);
        setHomogeneity(90);
        setFreedomOfEntry(20);
        break;
      case 'vegetable_market':
        setSellersCount(120);
        setBuyersCount(800);
        setIndividualShareSmall(true);
        setTransparency(85);
        setHomogeneity(80);
        setFreedomOfEntry(95);
        break;
    }
  };

  // Conditions Check Logic based on curriculum
  const condition1 = sellersCount >= 80 && buyersCount >= 80;
  const condition2 = individualShareSmall;
  const condition3 = transparency >= 75;
  const condition4 = homogeneity >= 80;
  const condition5 = freedomOfEntry >= 75;

  const conditionsList = [
    {
      id: 1,
      name: 'كثرة البائعين والمشترين',
      desc: 'وجود عدد كبير جداً من البائعين والمشترين لنفس السلعة',
      met: condition1,
      statusText: condition1 ? `متحقق (${sellersCount} بائع و ${buyersCount} مشترٍ)` : 'غير متحقق (العدد قليل)',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 2,
      name: 'صغر حجم العرض والطلب الفردي',
      desc: 'صغر حجم عرض كل بائع وصغر طلب كل مشتري (لا أحد يؤثر على السوق)',
      met: condition2,
      statusText: condition2 ? 'متحقق (الجميع متلقون للسعر Price Takers)' : 'غير متحقق (يوجد طرف ذو حصة ضخمة مؤثرة)',
      icon: <PieChart className="w-4 h-4" />,
    },
    {
      id: 3,
      name: 'المعرفة التامة بظروف السوق',
      desc: 'الشفافية التامة في معرفة العرض والطلب والأسعار السائدة',
      met: condition3,
      statusText: condition3 ? `متحقق (${transparency}% شفافية)` : `غير كافٍ (${transparency}% معلومات غير مكتملة)`,
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: 4,
      name: 'تجانس السلع وسعر موحد',
      desc: 'تجانس السلع تماثلاً تاماً ووجود سعر موحد للسلعة الواحدة',
      met: condition4,
      statusText: condition4 ? `متحقق (${homogeneity}% تماثل تام)` : `غير متحقق (${homogeneity}% سلع متمايزة وغير موحدة)`,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 5,
      name: 'حرية الدخول والخروج',
      desc: 'حرية الدخول والخروج دون عوائق إدارية أو مالية أو احتكارية',
      met: condition5,
      statusText: condition5 ? `متحقق (${freedomOfEntry}% حرية تامة)` : `غير متحقق (${freedomOfEntry}% عوائق دخول مانعة)`,
      icon: <DoorOpen className="w-4 h-4" />,
    },
  ];

  const metCount = conditionsList.filter((c) => c.met).length;

  // Diagnosis of Market Structure
  const marketDiagnosis = useMemo(() => {
    if (sellersCount === 1) {
      return {
        title: 'احتكار بيع (Monopoly)',
        type: 'monopoly',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        description: 'بائع واحد فقط يتحكم في عرض السلعة وسعرها (صانع السعر Price Maker). يغيب التنافس تماماً، وتكون الأسعار أعلى من السعر التوازني الطبيعي مع تقييد الكميات المعروضة لتعظيم الأرباح الاحتكارية.',
        priceLevel: 'مرتفع جداً (سعر احتكاري)',
        quantityLevel: 'مقيد ومحدود',
      };
    }
    if (buyersCount === 1) {
      return {
        title: 'احتكار شراء (Monopsony)',
        type: 'monopsony',
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        description: 'مشتري واحد فقط يتحكم في طلب السلعة وسعرها ويواجه عدة عارضين، مما يمكنه من الضغط على الأسعار وخفضها لأدنى مستوى وفرض شروطه.',
        priceLevel: 'منخفض جداً (مفروض من المشتري الوحيد)',
        quantityLevel: 'خاضع لطلب المشتري الوحيد',
      };
    }
    if (metCount === 5) {
      return {
        title: 'المنافسة الكاملة أو التامة (Perfect Competition)',
        type: 'perfect',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        description: 'تحققت الشروط الخمسة المقررة في الدليل التعليمي! يتحدد السعر تلقائياً عند نقطة تقاطع منحنى العرض مع منحنى الطلب، ويستحيل على أي بائع أو مشترٍ التلاعب بالسعر بمفرده.',
        priceLevel: 'سعر توازني عادل وموحد للجميع',
        quantityLevel: 'أعلى كمية إنتاج ممكنة بكفاءة',
      };
    }
    if (sellersCount <= 8) {
      return {
        title: 'احتكار قلة (Oligopoly)',
        type: 'oligopoly',
        badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        description: 'عدد محدود جداً من البائعين الكبار يسيطرون على السوق. تؤثر قرارات كل بائع على البقية، مع احتمال التنسيق أو حرب الأسعار.',
        priceLevel: 'فوق المتوسط',
        quantityLevel: 'متوسط',
      };
    }
    return {
      title: 'منافسة غير تامة / منافسة احتكارية',
      type: 'imperfect',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      description: `اختل ${5 - metCount} من شروط المنافسة التامة (مثل تمايز السلع أو نقص الشفافية). السوق يتصف بالمنافسة ولكن بأسعار متفاوتة وهوامش ربحية متباينة.`,
      priceLevel: 'متفاوت حسب العلامة والسلعة',
      quantityLevel: 'مرتفع',
    };
  }, [sellersCount, buyersCount, metCount]);

  // Dynamic price and quantity estimations for graphical display
  const simulatedPrice = useMemo(() => {
    if (sellersCount === 1) return 180; // High monopoly price
    if (buyersCount === 1) return 40;  // Low monopsony price
    // Inverse relationship with competition
    const base = 100;
    const compEffect = Math.min(sellersCount, 300) / 10;
    return Math.max(60, Math.round(base - compEffect * 0.8));
  }, [sellersCount, buyersCount]);

  const simulatedQuantity = useMemo(() => {
    if (sellersCount === 1) return 250;
    if (buyersCount === 1) return 200;
    return Math.round(Math.min(1000, 400 + sellersCount * 0.8 + buyersCount * 0.3));
  }, [sellersCount, buyersCount]);

  return (
    <div className="space-y-8">
      {/* Simulator Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>مختبر الاقتصاد التفاعلي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              محاكي <span className="text-teal-400">شروط المنافسة التامة والاحتكار</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              تحكم في عدد البائعين والمشترين وشروط التجانس والشفافية وحرية الدخول، وشاهد كيف يتغير شكل السوق وتوازنه وسعره فورياً وفق الدليل التعليمي المعتمد.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('perfect_comp')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition cursor-pointer"
            >
              المنافسة التامة (5 شروط)
            </button>
            <button
              onClick={() => applyPreset('monopoly_seller')}
              className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/40 text-xs font-bold transition cursor-pointer"
            >
              احتكار بيع (بائع واحد)
            </button>
            <button
              onClick={() => applyPreset('monopsony_buyer')}
              className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer"
            >
              احتكار شراء (مشترٍ واحد)
            </button>
            <button
              onClick={() => applyPreset('vegetable_market')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition cursor-pointer"
            >
              سوق الخضر والسلع
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Variables Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span>متغيرات شروط السوق الخمسة</span>
              </h3>
              <button
                onClick={() => applyPreset('perfect_comp')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة ضبط للشروط المثالية</span>
              </button>
            </div>

            {/* Variable 1: Number of Sellers */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>عدد البائعين (العارضين في السوق):</span>
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                  sellersCount === 1 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-white'
                }`}>
                  {sellersCount === 1 ? 'بائع واحد فقط (احتكار بيع!)' : `${sellersCount} بائع`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={sellersCount}
                onChange={(e) => setSellersCount(parseInt(e.target.value, 10))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 (احتكار تام)</span>
                <span>5-10 (احتكار قلة)</span>
                <span>500+ (كثرة البائعين)</span>
              </div>
            </div>

            {/* Variable 2: Number of Buyers */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>عدد المشترين (الطالبين في السوق):</span>
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                  buyersCount === 1 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-white'
                }`}>
                  {buyersCount === 1 ? 'مشتري واحد فقط (احتكار شراء!)' : `${buyersCount} مشترٍ`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="1000"
                step="1"
                value={buyersCount}
                onChange={(e) => setBuyersCount(parseInt(e.target.value, 10))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 (احتكار شراء)</span>
                <span>100 (متوسط)</span>
                <span>1000+ (كثرة المشترين)</span>
              </div>
            </div>

            {/* Variable 3: Individual Share (Price Taker vs Price Maker) */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-white block mb-0.5 flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5 text-teal-400" />
                  <span>صغر حجم عرض وطلب كل طرف (لا تأثير فردي على السعر)</span>
                </span>
                <p className="text-[11px] text-slate-400">
                  هل كل متعامل متلقٍ للسعر (Price Taker) ولا يملك قوة لتغيير سعر السوق؟
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIndividualShareSmall(!individualShareSmall)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  individualShareSmall
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                {individualShareSmall ? 'نعم (حجم صغير وغير مؤثر)' : 'لا (يوجد طرف ذو نفوذ ضخم)'}
              </button>
            </div>

            {/* Variable 4: Transparency & Market Information */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>المعرفة التامة والشفافية بظروف السوق:</span>
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                  {transparency}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={transparency}
                onChange={(e) => setTransparency(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (أسرار واحتكار معلومات)</span>
                <span>100% (شفافية تامة لجميع الأطراف)</span>
              </div>
            </div>

            {/* Variable 5: Product Homogeneity & Single Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>تجانس السلع وتماثلها وسعرها الموحد:</span>
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                  {homogeneity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={homogeneity}
                onChange={(e) => setHomogeneity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (سلع متمايزة/ماركات مختلفة)</span>
                <span>100% (سلعة متطابقة تماماً وسعر موحد)</span>
              </div>
            </div>

            {/* Variable 6: Freedom of Entry & Exit */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <DoorOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>حرية الدخول والخروج من السوق:</span>
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                  {freedomOfEntry}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={freedomOfEntry}
                onChange={(e) => setFreedomOfEntry(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (حواجز قانونية واقتصادية مانعة)</span>
                <span>100% (حرية دخول وخروج كاملة)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Diagnosis & Equilibrium Diagram (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Market Structure Diagnosis Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              التشخيص الاقتصادي الفوري لشكل السوق:
            </span>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white">{marketDiagnosis.title}</h4>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${marketDiagnosis.badgeColor}`}>
                  {marketDiagnosis.type === 'perfect' ? 'مثالي' : 'غير تام'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {marketDiagnosis.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">مستوى السعر التقديري:</span>
                  <span className="font-bold text-teal-400">{marketDiagnosis.priceLevel} ({simulatedPrice} دج)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">الكمية المتداولة:</span>
                  <span className="font-bold text-white">{marketDiagnosis.quantityLevel} ({simulatedQuantity} وحدة)</span>
                </div>
              </div>
            </div>

            {/* Checklist of the 5 Conditions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300">
                  فحص شروط المنافسة التامة الـ 5:
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {metCount} من 5 محققة
                </span>
              </div>

              <div className="space-y-1.5">
                {conditionsList.map((cond) => (
                  <div
                    key={cond.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 transition ${
                      cond.met
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cond.met ? 'text-emerald-400' : 'text-slate-600'}>
                        {cond.icon}
                      </span>
                      <span className="font-semibold text-white">{cond.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono">{cond.statusText}</span>
                      {cond.met ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {metCount === 5 && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  أحسنت! السوق الآن في حالة <strong>منافسة كاملة وتامة</strong> كما ينص الدليل البيداغوجي.
                </span>
              </div>
            )}
          </div>

          {/* Visual Market Diagram (Supply & Demand Curve Representation) */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>مخطط توازن السوق (العرض والطلب)</span>
            </h4>

            {/* SVG Interactive Visual Chart */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <svg viewBox="0 0 300 180" className="w-full max-w-[280px] h-auto overflow-visible">
                {/* Axes */}
                <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="150" x2="280" y2="150" stroke="#475569" strokeWidth="2" />
                <text x="15" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">السعر (P)</text>
                <text x="230" y="168" fill="#94a3b8" fontSize="10" fontWeight="bold">الكمية (Q)</text>

                {/* Demand Curve (D) - Downward sloping */}
                <line x1="50" y1="35" x2="260" y2="140" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="none" />
                <text x="265" y="145" fill="#38bdf8" fontSize="10" fontWeight="bold">الطلب (D)</text>

                {/* Supply Curve (S) - Shifts based on sellers */}
                {/* As sellers increase, supply curve shifts right/downward lowering price */}
                {(() => {
                  const shift = sellersCount === 1 ? 0 : Math.min(sellersCount, 400) * 0.15;
                  const x1 = 50 + shift;
                  const y1 = 140;
                  const x2 = 250 + shift * 0.4;
                  const y2 = 35;

                  // Equilibrium intersection approx
                  const eqX = sellersCount === 1 ? 120 : 160 + shift * 0.2;
                  const eqY = sellersCount === 1 ? 70 : 95 - shift * 0.1;

                  return (
                    <>
                      <line 
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2} 
                        stroke="#10b981" 
                        strokeWidth="2.5" 
                      />
                      <text x={x2 - 10} y={y2 - 8} fill="#10b981" fontSize="10" fontWeight="bold">العرض (S)</text>

                      {/* Equilibrium Point */}
                      <circle cx={eqX} cy={eqY} r="5" fill={sellersCount === 1 ? '#ef4444' : '#10b981'} />
                      <line x1="30" y1={eqY} x2={eqX} y2={eqY} stroke="#94a3b8" strokeDasharray="3 3" />
                      <line x1={eqX} y1={eqY} x2={eqX} y2="150" stroke="#94a3b8" strokeDasharray="3 3" />
                      <text x={eqX + 8} y={eqY - 4} fill="#ffffff" fontSize="9" fontWeight="bold">
                        {sellersCount === 1 ? 'نقطة الاحتكار' : 'نقطة التوازن'}
                      </text>
                    </>
                  );
                })()}
              </svg>

              <div className="mt-3 flex items-center justify-between w-full text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                  <span>منحنى الطلب</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  <span>منحنى العرض</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                  <span>نقطة توازن السوق</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
