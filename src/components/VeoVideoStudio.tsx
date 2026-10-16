import React, { useState, useEffect, useRef } from 'react';
import { VEO_PRESETS } from '../data/curriculumData';
import { VeoPromptPreset } from '../types/market';
import { InteractiveScenePlayer } from './InteractiveScenePlayer';
import { 
  Video, 
  Sparkles, 
  Play, 
  Download, 
  RotateCw, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Maximize2,
  Film,
  Monitor,
  Smartphone,
  Sliders,
  Clock,
  HelpCircle,
  ExternalLink,
  Tv
} from 'lucide-react';

interface GeneratedVideoItem {
  id: string;
  operationName: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  status: 'generating' | 'completed' | 'failed';
  videoUrl?: string;
  createdAt: number;
  error?: string;
}

interface VeoVideoStudioProps {
  initialPresetId?: string;
}

export const VeoVideoStudio: React.FC<VeoVideoStudioProps> = ({ initialPresetId }) => {
  const [selectedPreset, setSelectedPreset] = useState<VeoPromptPreset | null>(
    initialPresetId 
      ? VEO_PRESETS.find(p => p.id === initialPresetId) || VEO_PRESETS[0]
      : VEO_PRESETS[0]
  );
  const [prompt, setPrompt] = useState<string>(selectedPreset?.prompt || VEO_PRESETS[0].prompt);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>(selectedPreset?.recommendedAspect || '16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<GeneratedVideoItem | null>(null);
  const [videoHistory, setVideoHistory] = useState<GeneratedVideoItem[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isQuotaError, setIsQuotaError] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<'veo' | 'simulation'>('veo');

  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // When initialPresetId changes from parent
  useEffect(() => {
    if (initialPresetId) {
      const p = VEO_PRESETS.find(item => item.id === initialPresetId);
      if (p) {
        setSelectedPreset(p);
        setPrompt(p.prompt);
        setAspectRatio(p.recommendedAspect);
      }
    }
  }, [initialPresetId]);

  // Clean up polling timer
  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
      }
    };
  }, []);

  const educationalTrivia = [
    'نموذج Veo 3 يُنشئ إطارات المشهد الاقتصادي بالاعتماد على الوصف الدقيق للحركة والإنارة.',
    'في المنافسة التامة، تجانس السلع يعني أن المستهلك لا يستطيع التمييز بين سلعة بائع وآخر.',
    'سوق العمل يجمع بين حاملي المهارات الباحثين عن عمل، وممثلي الشركات الباحثين عن كفاءات.',
    'في البورصة وسوق الأوراق المالية، يتم تداول الأسهم كحصص ملكية والسندات كقروض استثمارية عبر سماسرة معتمدين.',
    'الاحتكار يمنح البائع القدرة على تحديد السعر نظراً لانعدام البدائل ووجود حواجز دخول مانعة.',
  ];

  const [triviaIndex, setTriviaIndex] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setTriviaIndex((prev) => (prev + 1) % educationalTrivia.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleSelectPreset = (preset: VeoPromptPreset) => {
    setSelectedPreset(preset);
    setPrompt(preset.prompt);
    setAspectRatio(preset.recommendedAspect);
    setGeneralError(null);
    setIsQuotaError(false);
  };

  const handleStartGeneration = async () => {
    if (!prompt.trim()) {
      setGeneralError('يرجى إدخال أو اختيار نص لوصف المشهد المراد توليده.');
      return;
    }

    setGeneralError(null);
    setIsQuotaError(false);
    setIsGenerating(true);
    setDisplayMode('veo');
    setCurrentStep('جارٍ إرسال الطلب إلى نموذج veo-3.1-fast-generate-preview...');

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          resolution,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        if (res.status === 429 || data.isQuotaExceeded || data.error === 'QUOTA_EXCEEDED') {
          setIsQuotaError(true);
          setDisplayMode('simulation');
          setIsGenerating(false);
          setGeneralError(data.message || 'تم الوصول إلى الحد الأقصى لحصة توليد الفيديو (Quota 429).');
          return;
        }
        throw new Error(data.message || data.error || 'تعذر بدء عملية التوليد.');
      }

      const operationName = data.operationName;
      const newVideoItem: GeneratedVideoItem = {
        id: `vid_${Date.now()}`,
        operationName,
        prompt,
        aspectRatio,
        status: 'generating',
        createdAt: Date.now(),
      };

      setActiveVideo(newVideoItem);
      setVideoHistory((prev) => [newVideoItem, ...prev]);

      startPolling(operationName, newVideoItem.id);
    } catch (err: any) {
      setIsGenerating(false);
      const errMsg = err?.message || String(err);
      if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
        setIsQuotaError(true);
        setDisplayMode('simulation');
        setGeneralError('تم تجاوز حصة الحساب لنموذج Veo 3 (Quota 429). تم تفعيل المشهد البصري التعليمي التفاعلي لمتابعة الشرح.');
      } else {
        setGeneralError(errMsg || 'حدث خطأ أثناء التواصل مع خادم الفيديو.');
      }
    }
  };

  const startPolling = (operationName: string, videoId: string) => {
    let attempts = 0;
    const maxAttempts = 60; // Up to 5-6 minutes

    pollingTimerRef.current = setInterval(async () => {
      attempts++;
      setCurrentStep(`نموذج Veo 3 يركّب تفاصيل المشهد السينمائي... (الفحص ${attempts})`);

      try {
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });

        const statusData = await res.json();

        if (res.status === 429 || statusData.isQuotaExceeded || statusData.error === 'QUOTA_EXCEEDED') {
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          setIsGenerating(false);
          setIsQuotaError(true);
          setDisplayMode('simulation');
          setGeneralError('تم الوصول إلى الحد الأقصى للحصة المتاحة لنموذج Veo 3.');
          updateVideoItem(videoId, { status: 'failed', error: 'Quota exceeded' });
          return;
        }

        if (statusData.error) {
          throw new Error(statusData.error.message || 'فشلت معالجة الفيديو في Veo');
        }

        if (statusData.done) {
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          setCurrentStep('اكتمل التوليد! جارٍ تحميل وتجهيز البث...');
          await downloadVideo(operationName, videoId);
        }

        if (attempts >= maxAttempts) {
          if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
          throw new Error('استغرقت عملية التوليد وقتاً أطول من المتوقع، يرجى إعادة المحاولة.');
        }
      } catch (pollErr: any) {
        if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
        setIsGenerating(false);
        const pMsg = pollErr?.message || String(pollErr);
        if (pMsg.includes('429') || pMsg.includes('quota')) {
          setIsQuotaError(true);
          setDisplayMode('simulation');
        }
        setGeneralError(pMsg || 'خطأ أثناء فحص حالة الفيديو.');
        updateVideoItem(videoId, { status: 'failed', error: pMsg });
      }
    }, 6000);
  };

  const downloadVideo = async (operationName: string, videoId: string) => {
    try {
      const res = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'تعذر تحميل ملف الفيديو النهائي.');
      }

      const blob = await res.blob();
      const videoBlobUrl = URL.createObjectURL(blob);

      const updatedFields: Partial<GeneratedVideoItem> = {
        status: 'completed',
        videoUrl: videoBlobUrl,
      };

      updateVideoItem(videoId, updatedFields);
      setActiveVideo((prev) => (prev ? { ...prev, ...updatedFields } : null));
      setDisplayMode('veo');
      setIsGenerating(false);
      setCurrentStep('');
    } catch (dlErr: any) {
      setIsGenerating(false);
      setGeneralError(dlErr.message || 'تعذر تحميل الفيديو.');
      updateVideoItem(videoId, { status: 'failed', error: dlErr.message });
    }
  };

  const updateVideoItem = (id: string, updates: Partial<GeneratedVideoItem>) => {
    setVideoHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>محرك التوليد البصري الذكي: Veo 3 Fast Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              استوديو توليد الفيديو التعليمي بـ <span className="text-indigo-400 font-mono">veo-3.1-fast-generate-preview</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              قم بإنشاء مقاطع فيديو إيضاحية مذهلة لشرح مفاهيم درس السوق (سوق السلع، سوق العمل، البورصة، وشروط المنافسة التامة والاحتكار) بأبعاد 16:9 أو 9:16.
            </p>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-slate-300 font-semibold">Veo 3 Fast Preview</span>
          </div>
        </div>
      </div>

      {/* Quota Exceeded Notification Card */}
      {isQuotaError && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border-2 border-amber-500/50 text-amber-200 text-xs sm:text-sm space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-amber-400 text-base">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>تنبيه: تم الوصول إلى حد الحصة لنموذج Veo 3 (Quota 429)</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Rate Limit / Resource Exhausted
            </span>
          </div>

          <p className="leading-relaxed text-slate-300">
            تم استهلاك الحصة المجانية الحالية لنموذج <strong>veo-3.1-fast-generate-preview</strong> على حسابك. لا تقلق! قمنا فوراً بتشغيل <strong className="text-emerald-400">المشهد التعليمي البصري التفاعلي المتزامن</strong> أدناه لتتمكن أنت وطلابك من مشاهدة وشرح الدرس بصرياً دون أي توقف.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                setDisplayMode('simulation');
                setGeneralError(null);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Tv className="w-4 h-4" />
              <span>عرض المشهد البصري التعليمي الآن</span>
            </button>

            <button
              onClick={handleStartGeneration}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>إعادة محاولة Veo 3</span>
            </button>

            <a
              href="https://ai.google.dev/gemini-api/docs/rate-limits"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 underline underline-offset-4"
            >
              <span>تفاصيل الحصص في Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {generalError && !isQuotaError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <div className="flex-1">
            <span className="font-bold">تنبيه: </span>
            {generalError}
          </div>
        </div>
      )}

      {/* Main Studio Grid: Left Controls & Presets / Right Video Player & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Prompts Library */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>قوالب ومواضيع الدرس الجاهزة للتوليد</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">اختر نموذجاً للبدء</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {VEO_PRESETS.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3.5 rounded-xl border text-right transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          preset.recommendedAspect === '16:9' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-pink-500/20 text-pink-400'
                        }`}>
                          {preset.recommendedAspect === '16:9' ? '16:9 أفقي' : '9:16 طولي'}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {preset.category === 'goods' ? 'سلع وخدمات' : preset.category === 'labor' ? 'عمل' : preset.category === 'finance' ? 'أوراق مالية' : preset.category === 'competition' ? 'منافسة' : 'احتكار'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug">{preset.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-2">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Editor & Settings */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                نص وصف المشهد (Prompt):
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                rows={4}
                dir="auto"
                placeholder="صف المشهد الاقتصادي المراد توليده بدقة (باللغة العربية أو الإنجليزية)..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-indigo-500 focus:outline-none transition leading-relaxed disabled:opacity-50"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>نصيحة: الأوصاف السينمائية الإيضاحية بالإنجليزية أو العربية الفصحى تعطي أفضل النتائج في Veo 3.</span>
              </p>
            </div>

            {/* Parameters: Aspect Ratio & Resolution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              {/* Aspect Ratio Selector */}
              <div>
                <span className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>نسبة الأبعاد (Aspect Ratio):</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    disabled={isGenerating}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      aspectRatio === '16:9'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>16:9 أفقي</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    disabled={isGenerating}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      aspectRatio === '9:16'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>9:16 طولي (Reels)</span>
                  </button>
                </div>
              </div>

              {/* Resolution Selector */}
              <div>
                <span className="block text-xs font-bold text-slate-300 mb-2">
                  الدقة (Resolution):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setResolution('720p')}
                    disabled={isGenerating}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      resolution === '720p'
                        ? 'bg-slate-800 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    720p (سريع وموصى به)
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolution('1080p')}
                    disabled={isGenerating}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      resolution === '1080p'
                        ? 'bg-slate-800 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    1080p Full HD
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleStartGeneration}
              disabled={isGenerating}
              className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition flex items-center justify-center gap-3 shadow-xl cursor-pointer ${
                isGenerating
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>جارٍ التوليد بواسطة Veo 3...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                  <span>ابدأ توليد الفيديو التعليمي الآن</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Video Player & Processing Column (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              {/* Display mode tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setDisplayMode('veo')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    displayMode === 'veo'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>مشغل Veo 3</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('simulation')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    displayMode === 'simulation'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>المشهد التفاعلي</span>
                </button>
              </div>

              {activeVideo?.status === 'completed' && displayMode === 'veo' && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  جاهز للعرض
                </span>
              )}
            </div>

            {/* Video Viewport */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[320px]">
              {displayMode === 'simulation' ? (
                /* Fallback Interactive Scene Player */
                <InteractiveScenePlayer
                  category={selectedPreset?.category || 'goods'}
                  aspectRatio={aspectRatio}
                  onRetryVeo={handleStartGeneration}
                />
              ) : isGenerating ? (
                /* Generating Loading View */
                <div className="p-6 text-center space-y-4 max-w-sm">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin flex items-center justify-center">
                      <Film className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Veo 3 يعمل الآن على مشهدك
                    </h4>
                    <p className="text-xs text-indigo-400 font-mono">{currentStep}</p>
                  </div>

                  {/* Trivia box while waiting */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>فائدة تعليمية أثناء الانتظار:</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed transition-all duration-300">
                      {educationalTrivia[triviaIndex]}
                    </p>
                  </div>
                </div>
              ) : activeVideo?.videoUrl ? (
                /* Video Player */
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <video
                    ref={videoRef}
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    loop
                    className={`w-full max-h-[460px] object-contain rounded-xl ${
                      activeVideo.aspectRatio === '9:16' ? 'max-w-[280px]' : ''
                    }`}
                  />
                </div>
              ) : (
                /* Interactive Scene / Default view */
                <InteractiveScenePlayer
                  category={selectedPreset?.category || 'goods'}
                  aspectRatio={aspectRatio}
                  onRetryVeo={handleStartGeneration}
                />
              )}
            </div>

            {/* Video Action Bar when Veo video is loaded */}
            {activeVideo?.videoUrl && displayMode === 'veo' && (
              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href={activeVideo.videoUrl}
                  download="market-lesson-veo3.mp4"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الفيديو (MP4)</span>
                </a>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }
                  }}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ملء الشاشة</span>
                </button>
              </div>
            )}
          </div>

          {/* History of generated videos in session */}
          {videoHistory.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>سجل المقاطع في هذه الجلسة ({videoHistory.length})</span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {videoHistory.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      if (vid.videoUrl) {
                        setActiveVideo(vid);
                        setDisplayMode('veo');
                      }
                    }}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-3 transition cursor-pointer ${
                      activeVideo?.id === vid.id && displayMode === 'veo'
                        ? 'bg-slate-800 border-indigo-500/60 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 text-indigo-400 font-bold">
                        <Play className="w-3 h-3 fill-current" />
                      </span>
                      <span className="truncate max-w-[200px] font-medium">{vid.prompt}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                        {vid.aspectRatio}
                      </span>
                      {vid.status === 'completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : vid.status === 'generating' ? (
                        <RotateCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
