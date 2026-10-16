import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  Briefcase, 
  TrendingUp, 
  Scale, 
  ShieldAlert,
  Info
} from 'lucide-react';

interface InteractiveScenePlayerProps {
  category: 'goods' | 'labor' | 'finance' | 'competition' | 'monopoly';
  aspectRatio: '16:9' | '9:16';
  onRetryVeo?: () => void;
}

export const InteractiveScenePlayer: React.FC<InteractiveScenePlayerProps> = ({
  category,
  aspectRatio,
  onRetryVeo,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Subtitles / Economic Explanations aligned with animation progress
  const getSubtitle = () => {
    switch (category) {
      case 'goods':
        if (progress < 30) return 'المرحلة 1: تجار الجملة يفرغون السلع (الخضر والفواكه) في السوق المركزي.';
        if (progress < 70) return 'المرحلة 2: تجار التجزئة يعرضون السلع على المستهلكين للتفاوض المباشر.';
        return 'المرحلة 3: تبادل السلع والخدمات بالمقابل النقدي المحدد بقوى العرض والطلب.';
      case 'labor':
        if (progress < 35) return 'المرحلة 1: عارضو العمل (أشخاص في سن قانونية) يقدمون مؤهلاتهم وسيرهم الذاتية.';
        if (progress < 70) return 'المرحلة 2: طالبي العمل (المؤسسات والإدارات) تجري مقابلات التوظيف لتحديد الكفاءة.';
        return 'المرحلة 3: إبرام عقد العمل وتحديد الأجر العادل مقابل الجهد المبذول.';
      case 'finance':
        if (progress < 30) return 'المرحلة 1: طرح وتداول الأسهم والسندات عبر شاشات البورصة الإلكترونية.';
        if (progress < 70) return 'المرحلة 2: السماسرة والمؤسسات العاملة يتوسطون لتنفيذ أوامر البيع والشراء.';
        return 'المرحلة 3: تحديد أسعار الأوراق المالية بشفافية تامة ومتابعة حركة التداول.';
      case 'competition':
        if (progress < 25) return 'الشرط 1 و 2: كثرة البائعين والمشترين وصغر حصة كل طرف (الجميع متلقون للسعر).';
        if (progress < 55) return 'الشرط 3: الشفافية والمعرفة التامة بظروف السوق والأسعار دون حجب معلومات.';
        if (progress < 80) return 'الشرط 4: تجانس السلع تماماً ووجود سعر موحد للسلعة الواحدة.';
        return 'الشرط 5: حرية تامة في الدخول والخروج من السوق دون أي عوائق إدارية أو مالية.';
      case 'monopoly':
        if (progress < 40) return 'الاحتكار: وجود بائع واحد فقط يتحكم في العرض الكلي للسلعة.';
        if (progress < 75) return 'صانع السعر (Price Maker): المحتكر يحدد السعر بمفرده لتعظيم أرباحه لانعدام البدائل.';
        return 'حواجز مانعة: غياب المنافسة تماماً واستحالة دخول منافسين جدد للسوق.';
      default:
        return 'مشهد تعليمي متحرك يوضح آليات السوق الاقتصادي.';
    }
  };

  return (
    <div className={`w-full relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-between ${
      aspectRatio === '9:16' ? 'max-w-[340px] mx-auto min-h-[480px]' : 'min-h-[360px]'
    }`}>
      {/* Top Banner Status */}
      <div className="w-full px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">المشهد التعليمي البصري التفاعلي</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {aspectRatio}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
            مُحاكاة بيداغوجية
          </span>
        </div>
      </div>

      {/* Main Dynamic Graphic Stage */}
      <div className="w-full flex-1 flex items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Dynamic Graphic based on Category */}
        {category === 'goods' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px]">
            {/* Background Market Stalls */}
            <rect x="0" y="0" width="400" height="240" fill="#090d16" />
            <line x1="0" y1="180" x2="400" y2="180" stroke="#1e293b" strokeWidth="3" />

            {/* Wholesale Truck moving */}
            <g transform={`translate(${Math.min(180, (progress * 2.5) % 360) - 80}, 110)`}>
              <rect x="0" y="20" width="75" height="40" rx="4" fill="#0284c7" />
              <rect x="65" y="30" width="25" height="30" rx="2" fill="#38bdf8" />
              <circle cx="20" cy="62" r="8" fill="#334155" />
              <circle cx="70" cy="62" r="8" fill="#334155" />
              <text x="8" y="44" fill="#ffffff" fontSize="9" fontWeight="bold">تاجر جملة</text>
            </g>

            {/* Retail Stalls */}
            <g transform="translate(190, 80)">
              {/* Canopy */}
              <polygon points="0,35 45,15 90,35" fill="#10b981" />
              <rect x="10" y="35" width="70" height="50" fill="#1e293b" stroke="#334155" />
              <text x="18" y="55" fill="#34d399" fontSize="9" fontWeight="bold">تاجر تجزئة</text>
              {/* Vegetables crates */}
              <circle cx="25" cy="70" r="5" fill="#ef4444" />
              <circle cx="38" cy="70" r="5" fill="#f59e0b" />
              <circle cx="51" cy="70" r="5" fill="#22c55e" />
              <circle cx="64" cy="70" r="5" fill="#eab308" />
            </g>

            {/* Buyers Approaching */}
            <g transform={`translate(${350 - ((progress * 1.2) % 100)}, 130)`}>
              <circle cx="0" cy="0" r="8" fill="#f8fafc" />
              <rect x="-6" y="8" width="12" height="25" rx="3" fill="#6366f1" />
              <text x="-12" y="-12" fill="#cbd5e1" fontSize="8">مشتري</text>
            </g>

            {/* Floating Price Tag */}
            <g transform="translate(225, 40)">
              <rect x="0" y="0" width="60" height="20" rx="4" fill="#10b981" />
              <text x="6" y="14" fill="#022c22" fontSize="9" fontWeight="bold">سعر موحد: 120 دج</text>
            </g>
          </svg>
        )}

        {category === 'labor' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px]">
            <rect x="0" y="0" width="400" height="240" fill="#090d16" />
            <line x1="0" y1="190" x2="400" y2="190" stroke="#1e293b" strokeWidth="3" />

            {/* Office Table */}
            <rect x="130" y="130" width="140" height="55" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="175" y="115" width="40" height="20" rx="2" fill="#475569" />
            <text x="180" y="128" fill="#e2e8f0" fontSize="8">عقد عمل</text>

            {/* HR Manager (Demand of Labor) */}
            <g transform="translate(90, 110)">
              <circle cx="0" cy="0" r="12" fill="#f8fafc" />
              <rect x="-12" y="12" width="24" height="40" rx="4" fill="#2563eb" />
              <text x="-25" y="-16" fill="#93c5fd" fontSize="9" fontWeight="bold">طالب العمل (المؤسسة)</text>
            </g>

            {/* Job Seeker (Supply of Labor) */}
            <g transform={`translate(${290 - Math.min(20, progress * 0.4)}, 110)`}>
              <circle cx="0" cy="0" r="12" fill="#f8fafc" />
              <rect x="-12" y="12" width="24" height="40" rx="4" fill="#10b981" />
              <text x="-30" y="-16" fill="#6ee7b7" fontSize="9" fontWeight="bold">عارض العمل (باحث عن عمل)</text>
              {/* CV paper */}
              <rect x="-18" y="20" width="12" height="16" fill="#ffffff" rx="1" />
            </g>

            {/* Handshake & Wage Symbol */}
            {progress > 50 && (
              <g transform="translate(170, 75)">
                <rect x="0" y="0" width="70" height="25" rx="6" fill="#10b981" />
                <text x="8" y="16" fill="#064e3b" fontSize="9" fontWeight="bold">الأجر المتفق عليه</text>
              </g>
            )}
          </svg>
        )}

        {category === 'finance' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px]">
            <rect x="0" y="0" width="400" height="240" fill="#050b14" />
            
            {/* Stock Board Grid */}
            <line x1="30" y1="30" x2="370" y2="30" stroke="#1e293b" />
            <line x1="30" y1="90" x2="370" y2="90" stroke="#1e293b" />
            <line x1="30" y1="150" x2="370" y2="150" stroke="#1e293b" />

            {/* Candlestick Charts (Dynamic) */}
            <g transform="translate(40, 20)">
              {/* Bar 1 */}
              <line x1="30" y1="140" x2="30" y2="60" stroke="#10b981" strokeWidth="2" />
              <rect x="22" y="75" width="16" height="40" fill="#10b981" />

              {/* Bar 2 */}
              <line x1="70" y1="130" x2="70" y2="80" stroke="#ef4444" strokeWidth="2" />
              <rect x="62" y="90" width="16" height="30" fill="#ef4444" />

              {/* Bar 3 */}
              <line x1="110" y1="150" x2="110" y2="50" stroke="#10b981" strokeWidth="2" />
              <rect x="102" y="60" width="16" height="65" fill="#10b981" />

              {/* Dynamic Ticker Line */}
              <path 
                d={`M 140 100 Q 180 ${70 + Math.sin(progress * 0.1) * 20} 220 ${90 - Math.cos(progress * 0.1) * 15} T 300 ${60 + Math.sin(progress * 0.1) * 10}`} 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="3" 
              />
            </g>

            {/* Brokers and Traders */}
            <rect x="30" y="175" width="340" height="45" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="50" y="202" fill="#38bdf8" fontSize="10" fontWeight="bold">سماسرة البورصة:</text>
            <text x="145" y="202" fill="#94a3b8" fontSize="9">تنفيذ صفقات الأسهم والسندات بين البائعين والمشترين</text>
          </svg>
        )}

        {category === 'competition' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px]">
            <rect x="0" y="0" width="400" height="240" fill="#051210" />
            
            {/* 5 Pillars of Perfect Competition */}
            <g transform="translate(20, 40)">
              {/* Cond 1 */}
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="65" height="120" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="8" y="25" fill="#a7f3d0" fontSize="9" fontWeight="bold">1. كثرة</text>
                <text x="8" y="40" fill="#ffffff" fontSize="8">البائعين</text>
                <text x="8" y="52" fill="#ffffff" fontSize="8">والمشترين</text>
                <circle cx="32" cy="85" r="14" fill="#10b981" />
                <text x="24" y="89" fill="#022c22" fontSize="9" fontWeight="bold">100+</text>
              </g>

              {/* Cond 2 */}
              <g transform="translate(72, 0)">
                <rect x="0" y="0" width="65" height="120" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="8" y="25" fill="#a7f3d0" fontSize="9" fontWeight="bold">2. صغر الحجم</text>
                <text x="8" y="40" fill="#ffffff" fontSize="8">لا أحد يؤثر</text>
                <text x="8" y="52" fill="#ffffff" fontSize="8">على السوق</text>
                <circle cx="32" cy="85" r="6" fill="#34d399" />
              </g>

              {/* Cond 3 */}
              <g transform="translate(144, 0)">
                <rect x="0" y="0" width="65" height="120" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="8" y="25" fill="#a7f3d0" fontSize="9" fontWeight="bold">3. الشفافية</text>
                <text x="8" y="40" fill="#ffffff" fontSize="8">معرفة تامة</text>
                <text x="8" y="52" fill="#ffffff" fontSize="8">بالأسعار</text>
                <rect x="18" y="75" width="30" height="20" rx="2" fill="#38bdf8" />
                <text x="22" y="88" fill="#082f49" fontSize="8">علم تام</text>
              </g>

              {/* Cond 4 */}
              <g transform="translate(216, 0)">
                <rect x="0" y="0" width="65" height="120" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="8" y="25" fill="#a7f3d0" fontSize="9" fontWeight="bold">4. التجانس</text>
                <text x="8" y="40" fill="#ffffff" fontSize="8">سلعة متماثلة</text>
                <text x="8" y="52" fill="#ffffff" fontSize="8">وسعر موحد</text>
                <circle cx="25" cy="85" r="7" fill="#ef4444" />
                <circle cx="42" cy="85" r="7" fill="#ef4444" />
              </g>

              {/* Cond 5 */}
              <g transform="translate(288, 0)">
                <rect x="0" y="0" width="65" height="120" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="8" y="25" fill="#a7f3d0" fontSize="9" fontWeight="bold">5. حرية السوق</text>
                <text x="8" y="40" fill="#ffffff" fontSize="8">دخول وخروج</text>
                <text x="8" y="52" fill="#ffffff" fontSize="8">دون حواجز</text>
                <path d="M 22 75 L 42 75 M 34 68 L 42 75 L 34 82" stroke="#34d399" strokeWidth="2.5" fill="none" />
              </g>
            </g>

            <rect x="20" y="180" width="355" height="30" rx="6" fill="#022c22" stroke="#059669" />
            <text x="70" y="200" fill="#34d399" fontSize="10" fontWeight="bold">تلازم الشروط الـ 5 = سوق منافسة تامة مثالي</text>
          </svg>
        )}

        {category === 'monopoly' && (
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px]">
            <rect x="0" y="0" width="400" height="240" fill="#120606" />

            {/* Dominant Fortress / Monopolist Tower */}
            <g transform="translate(60, 40)">
              <rect x="0" y="20" width="90" height="120" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
              <text x="12" y="45" fill="#fecaca" fontSize="10" fontWeight="bold">بائع وحيد</text>
              <text x="10" y="62" fill="#ffffff" fontSize="8">(احتكار بيع)</text>
              
              {/* Lever Controlling Price */}
              <circle cx="45" cy="90" r="14" fill="#dc2626" />
              <text x="25" y="94" fill="#ffffff" fontSize="8" fontWeight="bold">صانع السعر</text>
            </g>

            {/* High Price Tag */}
            <g transform="translate(180, 50)">
              <rect x="0" y="0" width="80" height="30" rx="6" fill="#dc2626" />
              <text x="8" y="20" fill="#ffffff" fontSize="10" fontWeight="bold">سعر احتكاري مرتفع</text>
            </g>

            {/* Buyers in Long Queue */}
            <g transform="translate(190, 120)">
              <line x1="0" y1="40" x2="190" y2="40" stroke="#334155" strokeWidth="2" />
              {[0, 35, 70, 105, 140].map((x, i) => (
                <g key={i} transform={`translate(${x}, 15)`}>
                  <circle cx="0" cy="0" r="7" fill="#f8fafc" />
                  <rect x="-5" y="7" width="10" height="18" rx="2" fill="#475569" />
                </g>
              ))}
              <text x="10" y="65" fill="#f87171" fontSize="9">طابور المشترين (لا توجد بدائل قريبة للسلعة)</text>
            </g>
          </svg>
        )}
      </div>

      {/* Subtitles Overlay Bar */}
      <div className="w-full bg-slate-900/95 border-t border-slate-800 p-3 text-right">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>الشرح البيداغوجي المتزامن:</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">{progress}%</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
          {getSubtitle()}
        </p>
      </div>

      {/* Player Controls Bar */}
      <div className="w-full bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition cursor-pointer"
            title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => setProgress(0)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
            title="إعادة المشهد من البداية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Bar */}
        <div className="flex-1 max-w-xs mx-2">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Retry Veo Button if provided */}
        {onRetryVeo && (
          <button
            onClick={onRetryVeo}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">توليد عبر Veo 3</span>
            <span className="sm:hidden">Veo 3</span>
          </button>
        )}
      </div>
    </div>
  );
};
