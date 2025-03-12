// src/store/useStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../types/auth";

interface StudyState {
  currentDeckId: string | null;
  currentCardIndex: number;
  isFlipped: boolean;
  showAnswer: boolean;
}

interface UIState {
  isCreateModalOpen: boolean;
  isDarkMode: boolean;
}

interface FlashcardStore {
  // Auth State
  user: User | null;
  setUser: (user: User | null) => void;

  // Study State
  studyState: StudyState;
  setCurrentDeck: (deckId: string) => void;
  nextCard: () => void;
  previousCard: () => void;
  flipCard: () => void;
  resetStudyState: () => void;

  // UI State
  ui: UIState;
  setCreateModalOpen: (isOpen: boolean) => void;
  toggleDarkMode: () => void;
}

const initialStudyState: StudyState = {
  currentDeckId: null,
  currentCardIndex: 0,
  isFlipped: false,
  showAnswer: false,
};

const initialUIState: UIState = {
  isCreateModalOpen: false,
  isDarkMode: false,
};

export const useFlashCardStore = create<FlashcardStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),

        studyState: initialStudyState,
        setCurrentDeck: (deckId) =>
          set({ studyState: { ...initialStudyState, currentDeckId: deckId } }),
        nextCard: () =>
          set((state) => ({
            studyState: {
              ...state.studyState,
              currentCardIndex: state.studyState.currentCardIndex + 1,
              isFlipped: false,
            },
          })),
        previousCard: () =>
          set((state) => ({
            studyState: {
              ...state.studyState,
              currentCardIndex: Math.max(0, state.studyState.currentCardIndex - 1),
              isFlipped: false,
            },
          })),
        flipCard: () =>
          set((state) => ({
            studyState: { ...state.studyState, isFlipped: !state.studyState.isFlipped },
          })),
        resetStudyState: () => set({ studyState: initialStudyState }),

        ui: initialUIState,
        setCreateModalOpen: (isOpen) =>
          set((state) => ({ ui: { ...state.ui, isCreateModalOpen: isOpen } })),
        toggleDarkMode: () =>
          set((state) => ({ ui: { ...state.ui, isDarkMode: !state.ui.isDarkMode } })),
      }),
      {
        name: "flashcard-storage",
        partialize: (state) => ({ ui: { isDarkMode: state.ui.isDarkMode } }),
      }
    )
  )
);