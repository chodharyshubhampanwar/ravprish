export interface Question {
  id: string;
  content: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  marks: number;
  quizId: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizState {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, string>;
  loading: boolean;
}

export interface QuizContextType {
  state: QuizState;
  isLoading: boolean;
  error: unknown;
  createQuizAttempt: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  dispatch: React.Dispatch<QuizAction>;
  quiz: Quiz | null;
  startQuiz: () => void;
}

export type QuizAction =
  | { type: "SET_QUIZ"; payload: Quiz }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ANSWER"; payload: { questionId: string; answer: string } }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "SET_IS_STARTED"; payload: boolean }
  | { type: "SET_ATTEMPT"; payload: QuizAttempt };

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  responses: QuizResponse[];
}

export interface QuizResponse {
  questionId: string;
  answer?: string;
  status: "ANSWERED" | "SKIPPED" | "MARKED";
  isCorrect?: boolean;
}

export interface QuizState {
  isStarted: boolean;
  currentAttempt: QuizAttempt | null;
  currentQuestionIndex: number;
  timeRemaining: number;
}

export interface QuizResult {
  questionId: string;
  answer: string;
  status: string;
}

export interface QuizScore {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
