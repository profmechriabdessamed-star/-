export type TabType = 'lesson' | 'simulator' | 'veo_video' | 'quiz' | 'tutor' | 'summary';

export interface MarketCondition {
  id: string;
  name: string;
  description: string;
  importance: string;
  iconName: string;
}

export interface MarketTypeItem {
  id: string;
  title: string;
  definition: string;
  parties: {
    suppliers: string;
    demanders: string;
    intermediaries?: string;
  };
  examples: string[];
  icon: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export interface VeoPromptPreset {
  id: string;
  title: string;
  category: 'goods' | 'labor' | 'finance' | 'competition' | 'monopoly';
  prompt: string;
  recommendedAspect: '16:9' | '9:16';
  description: string;
}

export interface VideoGenerationJob {
  operationName: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  createdAt: number;
  status: 'pending' | 'completed' | 'failed';
  videoBlobUrl?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}
