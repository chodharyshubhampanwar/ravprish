// hooks/useChapter.ts
import { useQuery } from "react-query";
import { courseService } from "../services/courseService";
import { Chapter } from "../types/course";

export const useChapter = (chapterId: string | undefined) => {
  const { data: chapter, isLoading } = useQuery<Chapter>({
    queryKey: ["chapter", chapterId],
    queryFn: () => (chapterId ? courseService.getChapterById(chapterId) : Promise.reject()),
    enabled: !!chapterId,
  });

  return { chapter, isLoading };
};