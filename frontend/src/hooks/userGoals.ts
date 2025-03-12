import { useQuery, useMutation, useQueryClient } from "react-query";
import { courseService } from "../services/courseService";
import { Goal } from "../types/course";

export const useGoals = () => {
  const queryClient = useQueryClient();

  const { data: goals, isLoading } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: () => courseService.getGoals(),
  });

  const createGoal = useMutation({
    mutationFn: courseService.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  });

  return { goals, isLoading, createGoal };
};
