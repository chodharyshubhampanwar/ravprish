// import { useQuery, useMutation, useQueryClient } from "react-query";
// import { courseService } from "../services/courseService";
// import type { UserProgressResponse, UpdateTopicProgressInput } from "../types/course";

// export const useUserProgress = (userId?: string) => {
//   return useQuery<UserProgressResponse>(
//     ["userProgress", userId],
//     () => courseService.getUserProgress(userId!),
//     {
//       enabled: !!userId,
//     }
//   );
// };


// export const useUpdateTopicProgress = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (data: UpdateTopicProgressInput) => courseService.updateTopicProgress(data),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("userProgress");
//       },
//     }
//   );
// };




// hooks/useProgress.ts
// Contains React Query hooks for user progress.

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { courseService } from '@/services/courseService';
import type {
  TopicProgressInput,
  UserProgressResponse,
  TopicProgress,
} from '@/types/course';

export const useUserProgress = (userId?: string) => {
  return useQuery<UserProgressResponse>(
    ['userProgress', userId],
    () => courseService.getUserProgress(userId!),
    {
      enabled: !!userId,
      staleTime: 5000,
      refetchOnWindowFocus: true,
    }
  );
};

export const useUpdateTopicProgress = () => {
  const queryClient = useQueryClient();

  return useMutation<TopicProgress, Error, TopicProgressInput>(
    (data) => courseService.updateTopicProgress(data),
    {
      onSuccess: (_, variables) => {
        // Optionally re-fetch:
        queryClient.invalidateQueries(['userProgress', variables.userId]);

        // Or do an immediate optimistic update:
        queryClient.setQueryData<UserProgressResponse | undefined>(
          ['userProgress', variables.userId],
          (oldData) => {
            if (!oldData) return undefined;

            // Update or insert the topic progress in the cache
            const updatedTopicProgress = oldData.topicProgress.map((p) =>
              p.topicId === variables.topicId
                ? {
                    ...p,
                    completed: variables.completed,
                    progress: variables.progress,
                    completedAt: variables.completed
                      ? new Date().toISOString()
                      : undefined,
                  }
                : p
            );

            // If this topic wasn’t in the array, push it in
            if (!updatedTopicProgress.some((p) => p.topicId === variables.topicId)) {
              updatedTopicProgress.push({
                id: Date.now().toString(), // Temporary ID for client caching
                userId: variables.userId,
                topicId: variables.topicId,
                completed: variables.completed,
                progress: variables.progress,
                completedAt: variables.completed
                  ? new Date().toISOString()
                  : undefined,
              });
            }

            return { ...oldData, topicProgress: updatedTopicProgress };
          }
        );
      },
    }
  );
};

export const useTopicProgress = (userId: string, topicId: string) => {
  const { data } = useUserProgress(userId);
  const progressData = data?.topicProgress.find((p) => p.topicId === topicId);

  return {
    isCompleted: !!progressData?.completed,
    progress: progressData?.progress || 0,
  };
};
