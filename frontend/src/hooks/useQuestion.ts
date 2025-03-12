import { useQuery, useMutation } from "react-query";
import { questionService } from "@/services/questionService";
import { Question, QuestionResult } from "@/types/question";

export const useQuestions = () => {
  return useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: () => questionService.getAllQuestions(),
  });
};

export const useQuestion = (questionId: string | undefined) => {
  return useQuery<Question, Error>({
    queryKey: ["question", questionId],
    queryFn: () => {
      if (!questionId) throw new Error("Question ID is required");
      return questionService.getQuestion(questionId);
    },
    enabled: Boolean(questionId),
  });
};

export const useSubmitAnswer = () => {
  return useMutation<
    QuestionResult,
    Error,
    { questionId: string; answer: string }
  >({
    mutationFn: ({ questionId, answer }) =>
      questionService.submitAnswer(questionId, answer),
  });
};
