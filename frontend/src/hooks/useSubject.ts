import { useQuery } from "react-query";
import { courseService } from "../services/courseService";
import { Subject } from "../types/course";

export const useSubject = (subjectId: string | undefined) => {
  const { data: subject, isLoading } = useQuery<Subject>({
    queryKey: ["subject", subjectId],
    queryFn: () => (subjectId ? courseService.getSubjectById(subjectId) : Promise.reject()),
    enabled: !!subjectId,
  });

  return { subject, isLoading };
};
