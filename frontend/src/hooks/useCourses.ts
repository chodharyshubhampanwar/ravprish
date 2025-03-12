// import { useQuery } from "react-query";
// import { courseService } from "../services/courseService";
// import { Course } from "../types/course";
// import { useCourseStore } from "../store/courseStore";

// export const useCourses = () => {
//   const selectedGoal = useCourseStore((state) => state.selectedGoal);
//   const goalId = selectedGoal?.id;

//   const { data: courses, isLoading } = useQuery<Course[]>({
//     queryKey: ["courses", goalId],
//     queryFn: () => (goalId ? courseService.getCoursesByGoal(goalId) : Promise.resolve([])),
//     enabled: !!goalId,
//   });

//   return { courses, isLoading };
// };

// useCourses.ts
import { useQuery } from "react-query";
import { courseService } from "../services/courseService";
import { Course } from "../types/course";

export const useCourses = (goalId?: string) => {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["courses", goalId],
    queryFn: () => {
      if (!goalId) return Promise.resolve([]);
      return courseService.getCoursesByGoal(goalId);
    },
    enabled: !!goalId,
  });

  return { courses, isLoading };
};
