import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const CURRICULUM_GUIDE = `[الدليل التعليمي المعتمد لدرس السوق]:
1- تعريف السوق: هو المكان الذي يلتقي فيه البائعون والمشترون سواء بصفة مباشرة أو عن طريق الوسطاء (تجار الجملة، تجار التجزئة) لتبادل السلع والخدمات.

2- أنواع السوق:
أ- سوق السلع والخدمات: يلتقي فيه عارضو السلع والخدمات مع طالبيها (مثال: سوق الخضر، سوق السيارات).
ب- سوق العمل: يلتقي فيه عارضو العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات).
ج- سوق الأوراق المالية: يلتقي فيه البائعون والمشترون للأوراق المالية (أسهم وسندات) عن طريق سماسرة أو مؤسسات عاملة.

3- أشكال السوق:
أ- المنافسة الكاملة أو التامة: شروطها:
- وجود عدد كبير جداً من البائعين والمشترين لنفس السلعة.
- صغر حجم عرض كل بائع وصغر طلب كل مشتري (لا أحد يؤثر على السوق).
- المعرفة التامة بظروف السوق (عرض، طلب، أسعار).
- تجانس السلع ووجود سعر موحد للسلعة الواحدة.
- حرية الدخول والخروج من السوق.
ب- الاحتكار: سوق يكون فيها بائع واحد يتحكم في عرض السلعة وسعرها، أو مشتري واحد يتحكم في طلب السلعة وسعرها.`;

  // --- Video Generation using veo-3.1-fast-generate-preview ---
  app.post('/api/generate-video', async (req, res) => {
    try {
      const { prompt, aspectRatio = '16:9', resolution = '720p' } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const validAspectRatios = ['16:9', '9:16'];
      const targetAspect = validAspectRatios.includes(aspectRatio) ? aspectRatio : '16:9';

      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: resolution === '1080p' ? '1080p' : '720p',
          aspectRatio: targetAspect,
        },
      });

      return res.json({
        operationName: operation.name,
        aspectRatio: targetAspect,
        prompt,
      });
    } catch (error: any) {
      console.error('Error generating video:', error);
      const errMsg = error?.message || String(error);
      const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota') || error?.status === 429;
      
      if (isQuota) {
        return res.status(429).json({
          error: 'QUOTA_EXCEEDED',
          isQuotaExceeded: true,
          message: 'تم تجاوز الحصة المخصصة لنموذج Veo 3 على حسابك (Quota 429). تم تفعيل المحاكاة البصرية التعليمية التفاعلية للمشهد لتتمكن من متابعة الدرس دون انقطاع.',
        });
      }

      return res.status(500).json({
        error: error.message || 'Failed to initiate video generation',
      });
    }
  });

  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      return res.json({
        done: Boolean(updated.done),
        error: updated.error || null,
      });
    } catch (error: any) {
      console.error('Error checking video status:', error);
      const errMsg = error?.message || String(error);
      const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota');
      return res.status(isQuota ? 429 : 500).json({
        error: isQuota ? 'QUOTA_EXCEEDED' : (error.message || 'Failed to check video status'),
        isQuotaExceeded: isQuota,
      });
    }
  });

  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(404).json({ error: 'Video URI not found or video not ready' });
      }

      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey },
      });

      if (!videoRes.ok) {
        return res.status(videoRes.status).json({
          error: `Failed to fetch video: ${videoRes.statusText}`,
        });
      }

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'inline; filename="market-lesson-video.mp4"');
      
      const buffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error: any) {
      console.error('Error downloading video:', error);
      const errMsg = error?.message || String(error);
      const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota');
      return res.status(isQuota ? 429 : 500).json({
        error: isQuota ? 'QUOTA_EXCEEDED' : (error.message || 'Failed to download video'),
        isQuotaExceeded: isQuota,
      });
    }
  });

  // --- AI Educational Tutor using gemini-3.8-flash ---
  app.post('/api/tutor', async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const promptContext = history.length > 0 
        ? history.map((h: any) => `${h.role === 'user' ? 'الطالب' : 'الأستاذ مشري عبد الصمد'}: ${h.text}`).join('\n') + `\nالطالب: ${message}\nالأستاذ مشري عبد الصمد:`
        : `سؤال الطالب: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContext,
        config: {
          systemInstruction: `أنت الأستاذ مشري عبد الصمد، أستاذ وخبير تربوي متميز في مادة الاقتصاد والمناجمنت لطلاب المرحلة الثانوية والباكالوريا.
مهمتك الأساسية هي الإجابة عن كل استفسارات وأسئلة الطلاب المتعلقة بدرس "السوق"، مع الالتزام التام والكامل بالدليل التعليمي المعتمد التالي:

${CURRICULUM_GUIDE}

إرشادات الإجابة:
- خاطب الطالب بأسلوب تربوي مشجع وأنت الأستاذ مشري عبد الصمد.
- اشرح بلغة عربية فصحى مبسطة، دقيقة علمياً وبيداغوجياً.
- عند مناقشة المنافسة التامة، ركّز على شروطها الخمسة:
  1) وجود عدد كبير جداً من البائعين والمشترين لنفس السلعة
  2) صغر حجم عرض كل بائع وصغر طلب كل مشتري (لا أحد يؤثر على السوق)
  3) المعرفة التامة بظروف السوق (عرض، طلب، أسعار)
  4) تجانس السلع ووجود سعر موحد
  5) حرية الدخول والخروج من السوق
- عند الحديث عن الاحتكار، بيّن الفرق بين احتكار البيع واحتكار الشراء.
- عند الحديث عن أنواع السوق، وضح الفرق بين سوق السلع والخدمات، سوق العمل، وسوق الأوراق المالية وأطراف كل سوق ووسطائه.
- استخدم التنسيق المنظم والنقاط والأمثلة التوضيحية المشوقة.`,
        },
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Error in tutor endpoint:', error);
      // Helpful fallback response based on curriculum guide
      return res.json({
        reply: `مرحباً بك، معك الأستاذ مشري عبد الصمد. وفق [الدليل التعليمي المعتمد لدرس السوق]:
1- تعريف السوق: هو المكان الذي يلتقي فيه البائعون والمشترون سواء بصفة مباشرة أو عن طريق الوسطاء (تجار الجملة، تجار التجزئة) لتبادل السلع والخدمات.
2- أنواع السوق:
• سوق السلع والخدمات: التقاء عارضي السلع والخدمات مع طالبيها (سوق الخضر، سوق السيارات).
• سوق العمل: التقاء عارضي العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات) بمقابل الأجر.
• سوق الأوراق المالية: التقاء بائعي ومشتري الأوراق المالية (أسهم وسندات) عن طريق سماسرة أو مؤسسات عاملة.
3- أشكال السوق:
• المنافسة التامة: (1. كثرة البائعين والمشترين، 2. صغر حجم العرض والطلب الفردي، 3. المعرفة التامة بظروف السوق، 4. تجانس السلع وسعر موحد، 5. حرية الدخول والخروج).
• الاحتكار: بائع واحد يتحكم في العرض والسعر، أو مشتري واحد يتحكم في طلب السلعة وسعرها.`,
      });
    }
  });

  // --- Dynamic Exam / Quiz Question Generator using gemini-3.8-flash ---
  app.post('/api/generate-quiz', async (req, res) => {
    try {
      const { topic = 'all', count = 3 } = req.body;
      
      const prompt = `أنشئ ${count} أسئلة اختبار اختيار من متعدد (QCM) حول درس السوق استناداً إلى الدليل التعليمي:
الموضوع المحدد: ${topic === 'all' ? 'كامل درس السوق (التعريف، الأنواع الثلاثة، وأشكال السوق: شروط المنافسة التامة والاحتكار)' : topic}.
يرجى إرجاع النتيجة بصيغة JSON حصراً على شكل مصفوفة من الكائنات كالتالي:
[
  {
    "question": "نص السؤال الدقيق",
    "options": ["الخيار 1", "الخيار 2", "الخيار 3", "الخيار 4"],
    "correctIndex": 0,
    "explanation": "شرح تربوي دقيق مستند للدليل التعليمي لماذا هذه الإجابة صحيحة"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: `أنت واضع اختبارات مادة الاقتصاد لشهادة البكالوريا والتعليم الثانوي، ملتزم بالدليل المعتمد لدرس السوق.`,
        },
      });

      const text = response.text || '[]';
      const parsed = JSON.parse(text);
      return res.json({ questions: parsed });
    } catch (error: any) {
      console.error('Error in quiz generation, falling back to curated bank:', error);
      // Fallback questions ensuring quiz never fails
      const fallbackQuestions = [
        {
          question: "أي من التالي يمثل أحد الشروط الخمسة للمنافسة التامة وفق الدليل المعتمد؟",
          options: [
            "وجود بائع وحيد يتحكم في السعر",
            "تجانس السلع ووجود سعر موحد للسلعة الواحدة",
            "فرض رسوم دخول باهظة لمنع المنافسين",
            "حجب أسعار السلع عن المشترين"
          ],
          correctIndex: 1,
          explanation: "وفق الدليل التعليمي، من شروط المنافسة التامة: تجانس السلع ووجود سعر موحد للسلعة الواحدة."
        },
        {
          question: "في سوق العمل، من هم عارضو العمل حسب المقرر؟",
          options: [
            "المؤسسات والإدارات الحكومية",
            "أشخاص في سن قانونية ويرغبون في العمل",
            "سماسرة البورصة والوسطاء الماليون",
            "تجار الجملة وتجار التجزئة"
          ],
          correctIndex: 1,
          explanation: "سوق العمل يلتقي فيه عارضو العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات)."
        },
        {
          question: "ماذا يترتب على غياب شرط 'حرية الدخول والخروج من السوق'؟",
          options: [
            "تتحول السوق من منافسة تامة إلى سوق احتكارية أو احتكار قلة",
            "تنخفض الأسعار فوراً إلى الصفر",
            "تتوقف المؤسسات عن دفع أجور العمال",
            "تتحول السوق إلى سوق أوراق مالية"
          ],
          correctIndex: 0,
          explanation: "المنافسة التامة تشترط تلازم الشروط الـ 5، وإذا سقط شرط حرية الدخول بوجود عوائق، يصبح السوق احتكارياً."
        }
      ];
      return res.json({ questions: fallbackQuestions });
    }
  });

  // --- Vite Dev or Production Static Files ---
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Educational Market Platform server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
