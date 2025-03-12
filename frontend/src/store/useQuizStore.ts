import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Quiz, QuizAttempt, QuizState } from '../types/quiz';
import { quizService } from '../services/quizService';

interface QuizStore extends QuizState {
  setQuiz: (quiz: Quiz | null) => void;
  setLoading: (loading: boolean) => void;
  setAnswer: (questionId: string, answer: string) => void;
  setCurrentQuestion: (index: number) => void;
  setIsStarted: (isStarted: boolean) => void;
  setAttempt: (attempt: QuizAttempt | null) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  startQuiz: (quizId: string) => Promise<void>;
  fetchQuiz: (quizId: string) => Promise<void>;
  error : string | null;
}

export const useQuizStore = create<QuizStore>()(
  devtools(
    (set, get) => ({
      quiz: null,
      currentQuestionIndex: 0,
      userAnswers: {},
      loading: false,
      isStarted: false,
      currentAttempt: null,
      timeRemaining: 0,
      error: null,

      setQuiz: (quiz) => set({ quiz }),
      setLoading: (loading) => set({ loading }),
      setAnswer: (questionId, answer) =>
        set((state) => ({
          userAnswers: { ...state.userAnswers, [questionId]: answer }
        })),
      setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
      setIsStarted: (isStarted) => set({ isStarted }),
      setAttempt: (attempt) => set({ currentAttempt: attempt }),

      nextQuestion: () => {
        const { quiz, currentQuestionIndex } = get();
        if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      startQuiz: async (quizId) => {
        set({ loading: true });
        try {
          const attempt = await quizService.createQuizAttempt(quizId);
          set({
            isStarted: true,
            currentAttempt: attempt,
            error: null
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to start quiz' });
        } finally {
          set({ loading: false });
        }
      },

      fetchQuiz: async (quizId) => {
        set({ loading: true });
        try {
          const quiz = await quizService.getQuiz(quizId);
          set({ quiz, error: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch quiz' });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: 'quiz-store' }
  )
);
