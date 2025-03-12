// hooks/useCompleteChapter.ts
import { useMutation, useQueryClient } from "react-query";
import { courseService } from "@/services/courseService";

interface CompleteChapterInput {
  userId: string;
  topicId: string;
  chapterId: string;
  completed: boolean;
  progress: number;
}

export const useCompleteChapter = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CompleteChapterInput) => courseService.completeChapter(data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["userProgress", variables.userId]);
      },
    }
  );
};
