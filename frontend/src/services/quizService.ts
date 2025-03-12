import { api } from "../lib/axios";
import { Quiz, QuizAttempt, QuizResult } from "../types/quiz";

export const quizService = {
  getQuiz: async (quizId: string): Promise<Quiz> => {
    const { data } = await api.get<Quiz>(`/quiz/${quizId}`);
    return data;
  },

  createQuizAttempt: async (quizId: string): Promise<QuizAttempt> => {
    const { data } = await api.post<QuizAttempt>(`/quiz/${quizId}/attempt`);
    return data;
  },

  submitQuizAnswer: async (
    quizId: string,
    attemptId: string,
    payload: {
      questionId: string;
      answer: string;
      status: string;
    }
  ): Promise<QuizResult> => {
    const { data } = await api.post<QuizResult>(
      `/quiz/${quizId}/attempt/${attemptId}`,
      payload
    );
    return data;
  }
};
