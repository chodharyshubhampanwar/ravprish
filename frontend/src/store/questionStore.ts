import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question, UserQuestionAnswer, QuestionResult } from "@/types/question";

// interface QuestionState {
//   currentQuestion: Question | null;
//   currentQuestionIndex: number;
//   userAnswers: Record<string, UserQuestionAnswer>;
//   startTime: number | null;
//   result: QuestionResult | null;
//   isComplete: boolean;

//   setQuestion: (question: Question) => void;
//   setCurrentQuestionIndex: (index: number) => void;
//   setAnswer: (questionId: string, answer: string) => void;
//   toggleMarkQuestion: (questionId: string) => void;
//   setResult: (result: QuestionResult) => void;
//   reset: () => void;
// }

// export const useQuestionStore = create<QuestionState>()(
//   persist(
//     (set) => ({
//       currentQuestion: null,
//       currentQuestionIndex: 0,
//       userAnswers: {},
//       startTime: null,
//       result: null,
//       isComplete: false,

//       setQuestion: (question) => set({ currentQuestion: question }),

//       setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

//       setAnswer: (questionId, answer) =>
//         set((state) => ({
//           userAnswers: {
//             ...state.userAnswers,
//             [questionId]: {
//               questionId,
//               selectedOption: answer,
//               isMarked: state.userAnswers[questionId]?.isMarked ?? false,
//             },
//           },
//         })),

//       toggleMarkQuestion: (questionId) =>
//         set((state) => ({
//           userAnswers: {
//             ...state.userAnswers,
//             [questionId]: {
//               ...state.userAnswers[questionId],
//               questionId,
//               isMarked: !state.userAnswers[questionId]?.isMarked,
//             },
//           },
//         })),

//       setResult: (result) => set({ result, isComplete: true }),

//       reset: () =>
//         set({
//           currentQuestion: null,
//           currentQuestionIndex: 0,
//           userAnswers: {},
//           startTime: null,
//           result: null,
//           isComplete: false,
//         }),
//     }),
//     {
//       name: "question-storage",
//     }
//   )
// );

interface QuestionState {
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, UserQuestionAnswer>;
  startTime: number;
  result: QuestionResult | null;
  isComplete: boolean;

  setQuestion: (question: Question) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  setResult: (result: QuestionResult) => void;
  reset: () => void;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set) => ({
      currentQuestion: null,
      currentQuestionIndex: 0,
      userAnswers: {},
      startTime: Date.now(),
      result: null,
      isComplete: false,

      setQuestion: (question) =>
        set({
          currentQuestion: question,
          startTime: Date.now(),
        }),

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          userAnswers: {
            ...state.userAnswers,
            [questionId]: {
              questionId,
              selectedOption: answer,
              isMarked: false,
            },
          },
        })),

      setResult: (result) => set({ result, isComplete: true }),

      reset: () =>
        set({
          currentQuestion: null,
          currentQuestionIndex: 0,
          userAnswers: {},
          startTime: Date.now(),
          result: null,
          isComplete: false,
        }),
    }),
    {
      name: "question-storage",
    }
  )
);
