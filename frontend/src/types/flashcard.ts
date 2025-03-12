export interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cards: Card[];
  tags: string[];
  grade?: string;
  subject?: string;
  board?: string;
}

export interface StudyState {
  currentDeckId: string | null
  currentCardIndex: number
  isFlipped: boolean
  showAnswer: boolean
}

export interface FlashcardStore {
  // Auth State
  user: { id: string; email: string } | null
  setUser: (user: { id: string; email: string } | null) => void

  // Study State
  studyState: StudyState
  setCurrentDeck: (deckId: string) => void
  nextCard: () => void
  previousCard: () => void
  flipCard: () => void
  resetStudyState: () => void

  // UI State
  isCreateModalOpen: boolean
  setCreateModalOpen: (isOpen: boolean) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}
