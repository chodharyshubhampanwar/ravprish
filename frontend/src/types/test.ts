export interface Option {
  a: string;
  b: string;
  c: string;
  d: string;
}

export interface Question {
  id: string;
  content: string;
  options: Record<string, string>;
  marks: number;
  negativeMarks: number;
  explanation?: string;
  correctAnswer?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  subject: string; // NEW field for filtering
  grade: string; // NEW field for filtering
  board: string; // NEW field for filtering
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  topics?: string[]; // optional extra categorization
}

export interface UserAnswer {
  questionId: string;
  selectedOption?: keyof Option;
  isMarked: boolean;
}

export interface TestResult {
  correct: number;
  incorrect: number;
  unanswered: number;
  totalMarks: number;
}
