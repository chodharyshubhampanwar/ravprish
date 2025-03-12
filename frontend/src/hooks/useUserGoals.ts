import { useQuery, useMutation, useQueryClient } from "react-query";
import { userGoalService } from "../services/goalService";
import { UserGoal } from "../types/course";


export const useUserGoals = (supabaseUserId: string) => {
  const queryClient = useQueryClient();

  const {
    data: userGoals,
    isLoading: userGoalsLoading,
    error: userGoalsError,
    isError: userGoalsIsError
  } = useQuery<UserGoal[], Error>({  // specify Error type
    queryKey: ["userGoals",supabaseUserId],
    queryFn: () => userGoalService.getUserGoals(supabaseUserId),
    enabled: !!supabaseUserId,
  });

  const assignGoalMutation = useMutation({
    mutationFn: ({ supabaseUserId, goalId }: { supabaseUserId: string; goalId: string }) =>
      userGoalService.assignGoal(supabaseUserId, goalId),
    onSuccess: () => {
      queryClient.invalidateQueries(["userGoals", supabaseUserId]);
    },
  });

  const removeGoalMutation = useMutation({
    mutationFn: (userGoalId: string) => userGoalService.removeUserGoal(userGoalId),
    onSuccess: () => {
      queryClient.invalidateQueries(["userGoals"]);
    },
  });

  return {
    userGoals,
    userGoalsLoading,
    userGoalsError,
    userGoalsIsError,
    assignGoalMutation,
    removeGoalMutation,
  };
};


