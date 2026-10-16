import { MarketCondition, MarketTypeItem, QuizQuestion, VeoPromptPreset } from '../types/market';

export const CURRICULUM_TEXT = {
  title: 'الدليل التعليمي المعتمد لدرس السوق',
  grade: 'مادة الاقتصاد والمناجمنت - المرحلة الثانوية',
  definition: {
    official: 'هو المكان الذي يلتقي فيه البائعون والمشترون سواء بصفة مباشرة أو عن طريق الوسطاء (تجار الجملة، تجار التجزئة) لتبادل السلع والخدمات.',
    breakdown: [
      {
        title: 'أطراف السوق',
        desc: 'يلتقي فيه البائعون (العارضون) والمشترون (الطالبون) لتحديد الأسعار والكميات.',
      },
      {
        title: 'طريقة اللقاء',
        desc: 'إما مباشرة وجهاً لوجه في مكان مادي، أو غير مباشرة عن طريق وسطاء أو منصات رقمية حديثة.',
      },
      {
        title: 'دور الوسطاء',
        desc: 'تجار الجملة وتجار التجزئة والسماسرة الذين يسهلون نقل وتبادل السلع والخدمات بين المنتج والمستهلك.',
      },
      {
        title: 'محل التبادل',
        desc: 'تبادل السلع المادية (الملموسة) والخدمات (غير الملموسة) بمقابل نقدي متفق عليه.',
      },
    ],
  },
  forms: {
    competition: {
      name: 'المنافسة الكاملة أو التامة',
      subtitle: 'السوق المثالي التي تتحدد فيه الأسعار بتفاعل قوى العرض والطلب الحرة',
      conditions: [
        {
          id: 'c1',
          name: 'كثرة البائعين والمشترين',
          description: 'وجود عدد كبير جداً من البائعين والمشترين لنفس السلعة.',
          importance: 'تمنع أي فرد أو جماعة صغيرة من فرض إرادتها على السوق.',
          iconName: 'Users',
        },
        {
          id: 'c2',
          name: 'صغر حجم العرض والطلب الفردي',
          description: 'صغر حجم عرض كل بائع وصغر طلب كل مشتري (لا أحد يؤثر على السوق بمفرده).',
          importance: 'كل متعامل يعتبر "متلقياً للسعر" (Price Taker) وليس محدداً له.',
          iconName: 'PieChart',
        },
        {
          id: 'c3',
          name: 'المعرفة التامة بظروف السوق',
          description: 'المعرفة التامة والشفافة بظروف السوق من حيث (حجم العرض، حجم الطلب، والأسعار السائدة).',
          importance: 'الشفافية تمنع استغلال نقص المعلومات أو فرض أسعار غير مبررة.',
          iconName: 'Eye',
        },
        {
          id: 'c4',
          name: 'تجانس السلع وسعر موحد',
          description: 'تجانس السلع تماثلاً تاماً ووجود سعر موحد للسلعة الواحدة.',
          importance: 'المستهلك لا يفرق بين سلعة بائع وآخر، وبالتالي لا مجال لرفع السعر.',
          iconName: 'Layers',
        },
        {
          id: 'c5',
          name: 'حرية الدخول والخروج',
          description: 'حرية الدخول والخروج من السوق لأي منتج أو مشترٍ دون عوائق إدارية أو قانونية أو مالية.',
          importance: 'تضمن عودة التوازن التلقائي للأسعار والأرباح العادية للمنتجين.',
          iconName: 'DoorOpen',
        },
      ] as MarketCondition[],
    },
    monopoly: {
      name: 'الاحتكار (Monopoly)',
      subtitle: 'غياب المنافسة وسيطرة طرف واحد على ميزان السوق',
      description: 'سوق يكون فيها بائع واحد يتحكم في عرض السلعة وسعرها، أو مشتري واحد يتحكم في طلب السلعة وسعرها.',
      types: [
        {
          title: 'احتكار البيع (Monopoly)',
          desc: 'وجود منتج أو بائع وحيد للسلعة أو الخدمة دون وجود بديل قريب لها، مما يمنحه سلطة تحديد السعر والكمية (Price Maker).',
          example: 'شركة الكهرباء الوطنية أو تزويد المياه الصالحة للشرب.',
        },
        {
          title: 'احتكار الشراء (Monopsony)',
          desc: 'وجود مشترٍ وحيد يقابله عدد من البائعين، مما يتيح له فرض أسعار الشراء وشروطه.',
          example: 'الدولة عندما تكون المشتري الوحيد لمحصول التبغ أو الأسلحة العسكرية من المصانع.',
        },
      ],
      features: [
        'غياب المنافسة تماماً',
        'وجود حواجز دخول قوية جداً (قانونية، اقتصادية، أو تكنولوجية)',
        'السلعة المحتكرة لا توجد لها بدائل قريبة',
        'المحتكر هو صانع السعر (Price Maker)',
      ],
    },
  },
};

export const MARKET_TYPES: MarketTypeItem[] = [
  {
    id: 'goods_and_services',
    title: 'سوق السلع والخدمات',
    definition: 'يلتقي فيه عارضو السلع والخدمات مع طالبيها.',
    parties: {
      suppliers: 'المنتجون، المزارعون، المصنعون، ومقدمو الخدمات (المؤسسات الخدمية).',
      demanders: 'المستهلكون، الأسر، والشركات الباحثة عن منتجات استهلاكية أو إنتاجية.',
      intermediaries: 'تجار الجملة وتجار التجزئة والوكلاء والمنصات التجارية.',
    },
    examples: ['سوق الخضر والفواكه', 'سوق السيارات والمركبات', 'سوق العقارات السكنية', 'سوق الخدمات الصحية والتعليمية'],
    icon: 'ShoppingBag',
    color: 'emerald',
  },
  {
    id: 'labor',
    title: 'سوق العمل',
    definition: 'يلتقي فيه عارضو العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات).',
    parties: {
      suppliers: 'اليد العاملة (الأفراد في السن القانونية القادرون والراغبون في العمل بمقابل أجر).',
      demanders: 'المؤسسات الاقتصادية، الإدارات العمومية، الشركات الخاصة، وأصحاب المشاريع.',
      intermediaries: 'وكالات التشغيل والتوظيف، منصات التوظيف المهنية، ومكاتب الموارد البشرية.',
    },
    examples: ['مهندسون وأطباء يتقدمون لوظائف بالمستشفيات والشركات', 'مسابقات التوظيف العمومي في الإدارات', 'سوق العمالة الحرفية والمهنية'],
    icon: 'Briefcase',
    color: 'blue',
  },
  {
    id: 'financial',
    title: 'سوق الأوراق المالية',
    definition: 'يلتقي فيه البائعون والمشترون للأوراق المالية (أسهم وسندات) عن طريق سماسرة أو مؤسسات عاملة.',
    parties: {
      suppliers: 'الشركات والحكومات المصدرة للأسهم والسندات لجمع التمويل ورؤوس الأموال.',
      demanders: 'المستثمرون، الأفراد، وصناديق الاستثمار الراغبون في توظيف مدخراتهم لتحقيق عوائد.',
      intermediaries: 'سماسرة البورصة، شركات الوساطة المالية، البنوك الاستثمارية، وهيئات تنظيم الأسواق المالية.',
    },
    examples: ['تداول الأسهم في بورصة الجزائر أو البورصات العالمية', 'طرح واكتتاب السندات الحكومية لتمويل المشاريع', 'صناديق الاستثمار المتداولة'],
    icon: 'TrendingUp',
    color: 'amber',
  },
];

export const VEO_PRESETS: VeoPromptPreset[] = [
  {
    id: 'preset_goods',
    title: 'سوق السلع والخدمات: حركة البيع والشراء والوسطاء',
    category: 'goods',
    recommendedAspect: '16:9',
    description: 'مشهد عالي الدقة يوضح التقاء تجار الجملة وتجزئة الخضر والفواكه مع الزبائن.',
    prompt: 'Cinematic high-definition educational video of a vibrant bustling modern goods and food market. Vendors, wholesalers, and retail buyers negotiating fresh produce, organic vegetables and goods. Warm daylight, cinematic depth of field, clear economic exchange concept, professional documentary style, 4k look.',
  },
  {
    id: 'preset_labor',
    title: 'سوق العمل: التقاء طالبي العمل والمؤسسات',
    category: 'labor',
    recommendedAspect: '16:9',
    description: 'مشهد احترافي يوضح مقابلة توظيف بين طالب عمل مؤهل وإدارة شركة حديثة.',
    prompt: 'Professional corporate recruitment scene in a bright modern office. A qualified job seeker candidate shaking hands with HR managers across a sleek conference table with resumes and digital tablets. Clear representation of the labor market concept, clean lighting, 4k cinematic.',
  },
  {
    id: 'preset_finance',
    title: 'سوق الأوراق المالية: تداول الأسهم والسندات عبر السماسرة',
    category: 'finance',
    recommendedAspect: '16:9',
    description: 'مشهد مالي متحرك لشاشات البورصة وسماسرة الأوراق المالية والتحليل البياني.',
    prompt: 'A futuristic clean stock exchange floor with brokers monitoring dynamic financial securities screens. Stock charts, bond indices, green and blue data streams showing market equilibrium and trades through certified brokers. Professional financial documentary style.',
  },
  {
    id: 'preset_competition',
    title: 'المنافسة التامة: شروط تجانس السلعة وحرية السوق',
    category: 'competition',
    recommendedAspect: '16:9',
    description: 'تمثيل بصري إيضاحي لوفرة البائعين وتجانس السلعة وشفافية الأسعار بدون تأثير فردي.',
    prompt: 'A pristine open marketplace with dozens of symmetrical merchant stalls offering perfectly identical fresh golden apples, clear price tags clearly visible, customers moving freely without barriers. Visual metaphor for perfect competition and complete market transparency.',
  },
  {
    id: 'preset_monopoly',
    title: 'الاحتكار: بائع وحيد يتحكم في العرض والسعر',
    category: 'monopoly',
    recommendedAspect: '9:16',
    description: 'مشهد سينمائي طولي (Reels/Shorts) يوضح السيطرة الاحتكارية لبائع وحيد.',
    prompt: 'Dramatic vertical 9:16 framing showing a single dominant tower or solitary supplier controlling the exclusive supply of a vital resource, while a queue of buyers look up at the lone price board. Powerful educational visualization of monopoly and price setter power.',
  },
  {
    id: 'preset_mobile_goods',
    title: 'سوق التجزئة والجملة السريع (مقطع طولي للريلز)',
    category: 'goods',
    recommendedAspect: '9:16',
    description: 'مقطع فيديو تعليمي طولي 9:16 لشرح مفهوم الوسطاء (تجار الجملة والتجزئة).',
    prompt: 'Fast-paced vertical 9:16 educational reel visual showing the supply chain journey: farmer wholesale crates moving to retail supermarket shelves, hands exchanging goods for payments, smooth camera motion, vivid colors, educational explainer aesthetic.',
  },
];

export const BASELINE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'تعريف السوق',
    question: 'ما هو التعريف المعتمد للسوق في مقرر مادة الاقتصاد؟',
    options: [
      'هو مجرد متجر كبير يبيع السلع بالتجزئة للزبائن.',
      'هو المكان الذي يلتقي فيه البائعون والمشترون مباشرة أو عبر وسطاء لتبادل السلع والخدمات.',
      'هو مؤسسة حكومية مخصصة لفرض الضرائب وتحديد أسعار السلع.',
      'هو مكان مخصص فقط لبيع الأوراق المالية والأسهم.',
    ],
    correctIndex: 1,
    explanation: 'وفق الدليل التعليمي: السوق هو المكان الذي يلتقي فيه البائعون والمشترون سواء بصفة مباشرة أو عن طريق الوسطاء (تجار الجملة، تجار التجزئة) لتبادل السلع والخدمات.',
  },
  {
    id: 'q2',
    category: 'أنواع السوق',
    question: 'في أي نوع من الأسواق يلتقي عارضو العمل مع طالبي العمل؟',
    options: [
      'سوق السلع والخدمات',
      'سوق الأوراق المالية',
      'سوق العمل',
      'سوق المنافسة التامة',
    ],
    correctIndex: 2,
    explanation: 'سوق العمل يلتقي فيه عارضو العمل (أشخاص في سن قانونية ويرغبون في العمل) مع طالبي العمل (المؤسسات، الإدارات).',
  },
  {
    id: 'q3',
    category: 'أشكال السوق',
    question: 'كم عدد الشروط الأساسية لقيام سوق المنافسة الكاملة أو التامة في الدليل التعليمي؟',
    options: [
      'شرطان فقط',
      '3 شروط',
      '5 شروط متكاملة',
      '7 شروط',
    ],
    correctIndex: 2,
    explanation: 'شروط المنافسة التامة 5 شروط: كثرة البائعين والمشترين، صغر حجم عرض وطلب كل طرف، المعرفة التامة بظروف السوق، تجانس السلع وسعر موحد، وحرية الدخول والخروج من السوق.',
  },
  {
    id: 'q4',
    category: 'أشكال السوق',
    question: 'ماذا يعني شرط "صغر حجم عرض كل بائع وصغر طلب كل مشتري" في المنافسة التامة؟',
    options: [
      'أن البائعين مفلسون ولا يستطيعون البيع.',
      'أن البضائع رديئة الجودة وقليلة الإنتاج.',
      'أنه لا يستطيع أي طرف بمفرده التأثير على سعر وتوازن السوق.',
      'أن السوق مغلق أمام المستثمرين الجدد.',
    ],
    correctIndex: 2,
    explanation: 'صغر الحجم النسبي لكل بائع ومشترٍ يعني أن حصة كل واحد منهم ضئيلة جداً، وبالتالي لا يملك أي بائع أو مشترٍ قوة سوقية لتغيير السعر بمفرده، فيكونون مستقبلي أسعار.',
  },
  {
    id: 'q5',
    category: 'أنواع السوق',
    question: 'من هم الأطراف والوسطاء في "سوق الأوراق المالية" حسب الدليل؟',
    options: [
      'الفلاحون والمستهلكون عبر تجار الجملة.',
      'البائعون والمشترون للأسهم والسندات عن طريق سماسرة أو مؤسسات عاملة.',
      'العمال والمدراء عبر وكالات التوظيف.',
      'أصحاب المصانع والموزعون بدون وسطاء.',
    ],
    correctIndex: 1,
    explanation: 'سوق الأوراق المالية يلتقي فيه البائعون والمشترون للأوراق المالية (أسهم وسندات) عن طريق سماسرة أو مؤسسات عاملة ومرخصة.',
  },
  {
    id: 'q6',
    category: 'الاحتكار',
    question: 'ما هو تعريف الاحتكار وفق الدليل المعتمد؟',
    options: [
      'سوق فيه مئات البائعين يتنافسون بحرية على أفضل جودة.',
      'سوق يكون فيها بائع واحد يتحكم في عرض السلعة وسعرها، أو مشتري واحد يتحكم في طلب السلعة وسعرها.',
      'سوق مخصص لبيع السندات الحكومية فقط بسعر الفائدة الثابت.',
      'حالة توازن اقتصادي تتطابق فيها الأسعار بين جميع المتاجر.',
    ],
    correctIndex: 1,
    explanation: 'الاحتكار: سوق يكون فيها بائع واحد يتحكم في عرض السلعة وسعرها (احتكار بيع)، أو مشتري واحد يتحكم في طلب السلعة وسعرها (احتكار شراء).',
  },
];
