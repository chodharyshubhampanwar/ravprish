import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAnswer, TestResult, MockTest, Option } from "../types/test";

interface TestState {
  mockTest: MockTest | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, UserAnswer>;
  startTime: number | null; // timestamp when the test started
  elapsedTime: number; // time spent in seconds (calculated from startTime)
  testResult: TestResult | null;
  isTestComplete: boolean;
  isTestStarted: boolean;

  setMockTest: (test: MockTest) => void;
  startTest: () => void;
  setElapsedTime: (time: number) => void;
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void; // handle select/deselect
  toggleMarkQuestion: (questionId: string) => void;
  completeTest: (result: TestResult) => void;
  resetTestData: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      mockTest: null,
      currentQuestionIndex: 0,
      userAnswers: {},
      startTime: null,
      elapsedTime: 0,
      testResult: null,
      isTestComplete: false,
      isTestStarted: false,

      // Set the test data without using the API timer.
      setMockTest: (test) =>
        set({
          mockTest: test,
        }),

      // Start the test by recording the current timestamp.
      // If a startTime already exists (from a refresh), we do not override it.
      startTest: () => {
        if (!get().startTime) {
          set({
            startTime: Date.now(),
            isTestStarted: true,
          });
        }
      },

      // Update the elapsed time (to be called periodically, e.g., via a setInterval)
      setElapsedTime: (time) =>
        set({
          elapsedTime: time,
        }),

      setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

      // Update the user's answer for a question.
      setAnswer: (questionId, answer) =>
        set((state) => {
          const currentSelected = state.userAnswers[questionId]?.selectedOption;
          let selectedOption: keyof Option | undefined;

          // Deselect if the same option is clicked again.
          if (currentSelected === (answer as keyof Option)) {
            selectedOption = undefined;
          } else {
            selectedOption = answer as keyof Option;
          }

          return {
            userAnswers: {
              ...state.userAnswers,
              [questionId]: {
                ...state.userAnswers[questionId],
                questionId,
                selectedOption,
                isMarked: state.userAnswers[questionId]?.isMarked || false,
              },
            },
          };
        }),

      // Toggle the mark on a question.
      toggleMarkQuestion: (questionId) =>
        set((state) => ({
          userAnswers: {
            ...state.userAnswers,
            [questionId]: {
              ...state.userAnswers[questionId],
              questionId,
              isMarked: !state.userAnswers[questionId]?.isMarked,
            },
          },
        })),

      // Mark the test as complete and store the result.
      completeTest: (result) =>
        set({
          testResult: result,
          isTestComplete: true,
        }),

      // Reset all test data.
      resetTestData: () =>
        set({
          mockTest: null,
          currentQuestionIndex: 0,
          userAnswers: {},
          startTime: null,
          elapsedTime: 0,
          testResult: null,
          isTestComplete: false,
          isTestStarted: false,
        }),
    }),
    {
      name: "test-storage", // key used in localStorage
    }
  )
);
