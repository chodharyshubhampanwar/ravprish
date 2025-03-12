// src/hooks/testHooks.ts
import { useQuery } from "react-query";
import { testService } from "../services/testService";
import { MockTest } from "../types/test";

export const useTests = () => {
  return useQuery<MockTest[], Error>({
    queryKey: ["tests"],
    queryFn: async () => await testService.getAllTests(),
  });
};

export const useTest = (testId: string | undefined) => {
  return useQuery<MockTest, Error>({
    queryKey: ["test", testId],
    queryFn: async () => {
      if (!testId) throw new Error("No test ID provided");
      return await testService.getMockTest(testId);
    },
    enabled: Boolean(testId),
  });
};
