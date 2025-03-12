import { api } from "../lib/axios";
import { UserGoal } from "../types/course";

const getUserGoals = async (userId: string): Promise<UserGoal[]> => {
  const response = await api.get<UserGoal[]>(`/user-goals/${userId}`);
  return response.data;
};

const assignGoal = async (userId: string, goalId: string): Promise<UserGoal> => {
  const response = await api.post<UserGoal>("/assign-goal", { userId, goalId });
  return response.data;
};

const removeUserGoal = async (userGoalId: string): Promise<void> => {
  console.log("userGoalId", userGoalId);
  await api.delete(`/user-goals/${userGoalId}`);
};

export const userGoalService = {
  getUserGoals,
  assignGoal,
  removeUserGoal,
};
