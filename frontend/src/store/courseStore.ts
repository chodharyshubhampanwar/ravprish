import { create } from "zustand";
import { Goal, Course } from "../types/course";

interface CourseStore {
  selectedGoal: Goal | null;
  selectedCourse: Course | null;
  setSelectedGoal: (goal: Goal | null) => void;
  setSelectedCourse: (course: Course | null) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  selectedGoal: null,
  selectedCourse: null,
  setSelectedGoal: (goal) => set({ selectedGoal: goal, selectedCourse: null }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));
