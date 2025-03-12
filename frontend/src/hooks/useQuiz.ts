import { useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';

export const useQuiz = (quizId: string) => {
  const { fetchQuiz, loading, error, quiz } = useQuizStore();

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId, fetchQuiz]);

  return {
    quiz,
    isLoading: loading,
    error
  };
};
