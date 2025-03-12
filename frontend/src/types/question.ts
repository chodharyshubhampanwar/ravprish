export interface Step {
  id: string;
  order: number;
  content: string;
  imageUrl?: string;
  questionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  content: string;
  options: Record<string, string>;
  optionsKeys: string[];
  imageUrl?: string;
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  sectionId: string | null;
  subject: string;
  topic: string;
  grade: string;
  board: string;
  steps: Step[];
}

export interface UserQuestionAnswer {
  questionId: string;
  selectedOption?: string;
  isMarked: boolean;
}

export interface QuestionResult {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number;
}
