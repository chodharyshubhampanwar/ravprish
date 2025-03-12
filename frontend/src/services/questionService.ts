import { api } from "../lib/axios";
import { Question, QuestionResult } from "@/types/question";

class QuestionService {
  private static instance: QuestionService;

  static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  async getQuestion(questionId: string): Promise<Question> {
    const response = await api.get<Question>(`/question/${questionId}`);
    return response.data;
  }

  async getAllQuestions(): Promise<Question[]> {
    const response = await api.get<Question[]>("/questions");
    return response.data;
  }

  async submitAnswer(
    questionId: string,
    answer: string
  ): Promise<QuestionResult> {
    const response = await api.post<QuestionResult>(
      `/questions/${questionId}/submit`,
      {
        answer,
      }
    );
    return response.data;
  }
}

export const questionService = QuestionService.getInstance();
