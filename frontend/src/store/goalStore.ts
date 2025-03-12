import { create } from "zustand";
import { UserGoal, Goal } from "../types/course";

interface GoalStore {
  userGoals: UserGoal[];
  selectedGoal: Goal | null;
  setUserGoals: (userGoals: UserGoal[]) => void;
  addUserGoal: (userGoal: UserGoal) => void;
  removeUserGoal: (userGoalId: string) => void;
  setSelectedGoal: (goal: Goal | null) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  userGoals: [],
  selectedGoal: null,
  setUserGoals: (userGoals: UserGoal[]) => set({ userGoals }),
  addUserGoal: (userGoal: UserGoal) =>
    set((state) => ({ userGoals: [...state.userGoals, userGoal] })),
  removeUserGoal: (userGoalId: string) =>
    set((state) => ({
      userGoals: state.userGoals.filter((ug) => ug.id !== userGoalId),
    })),
  setSelectedGoal: (goal: Goal | null) => set({ selectedGoal: goal }),
}));
