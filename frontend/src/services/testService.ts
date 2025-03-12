import { api } from "../lib/axios";
import { MockTest } from "../types/test";

class TestService {
  private static instance: TestService;

  static getInstance(): TestService {
    if (!TestService.instance) {
      TestService.instance = new TestService();
    }
    return TestService.instance;
  }

  async getMockTest(testId: string): Promise<MockTest> {
    if (!testId) {
      throw new Error("Test ID is required");
    }

    const response = await api.get<MockTest>(`/test/${testId}`);
    return response.data;
  }

  async getAllTests(): Promise<MockTest[]> {
    const response = await api.get<MockTest[]>("/tests");
    return response.data;
  }

  async submitTest(testId: string, answers: Record<string, string>) {
    if (!testId) {
      throw new Error("Test ID is required");
    }

    const response = await api.post(`/mock-test/${testId}/submit`, { answers });
    return response.data;
  }
}

export const testService = TestService.getInstance();
