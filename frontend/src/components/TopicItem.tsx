// TopicItem.tsx
import React, { useCallback } from "react";
import { useUpdateTopicProgress, useTopicProgress } from "../hooks/useProgress";
import { Topic } from "../types/course";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TopicItemProps {
  topic: Topic;
  userId: string;
  onPlay?: (url: string) => void;
  isPlaying?: boolean;
  hideCompletionButton?: boolean;
}

export const TopicItem: React.FC<TopicItemProps> = ({
  topic,
  userId,
  hideCompletionButton = false,
}) => {
  const { mutate: updateProgress, isLoading: isUpdating } =
    useUpdateTopicProgress();
  const { isCompleted } = useTopicProgress(userId, topic.id);

  // Extract YouTube video ID from URL.
  const extractYouTubeID = (url: string): string | null => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = topic.videoUrl ? extractYouTubeID(topic.videoUrl) : null;

  const handleMarkDone = useCallback(() => {
    if (isCompleted) return;
    updateProgress({
      userId,
      topicId: topic.id,
      completed: true,
      progress: 100,
    });
  }, [updateProgress, userId, topic.id, isCompleted]);

  return (
    <div className="mb-8 border-b pb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{topic.name}</h3>
        <div className="flex items-center gap-4">
          {/* Render the per‑topic completion button only if not hidden */}
          {!hideCompletionButton &&
            (isUpdating ? (
              <div className="px-4 py-2">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                onClick={handleMarkDone}
                disabled={isCompleted}
                className={`px-4 py-2 rounded ${
                  isCompleted
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isCompleted ? "Completed" : "Mark as Complete"}
              </button>
            ))}
        </div>
      </div>

      {/* YouTube video embed */}
      {videoId && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={topic.name}
            className="w-full h-64 sm:h-96"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

// import React, { useCallback } from "react";
// import { useUpdateTopicProgress, useTopicProgress } from "../hooks/useProgress";
// import { Topic } from "../types/course";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import { PlayIcon } from "@heroicons/react/24/solid";

// interface TopicItemProps {
//   topic: Topic;
//   userId: string;
//   onPlay?: (url: string) => void;
//   isPlaying?: boolean;
//   hideCompletionButton?: boolean;
// }

// export const TopicItem: React.FC<TopicItemProps> = ({
//   topic,
//   userId,
//   hideCompletionButton = false,
// }) => {
//   const { mutate: updateProgress, isLoading: isUpdating } =
//     useUpdateTopicProgress();
//   const { isCompleted, progress = 0 } = useTopicProgress(userId, topic.id);

//   // Extract YouTube video ID from URL
//   const extractYouTubeID = (url: string): string | null => {
//     const regExp =
//       /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = topic.videoUrl ? extractYouTubeID(topic.videoUrl) : null;

//   const handleMarkDone = useCallback(() => {
//     if (isCompleted) return;
//     updateProgress({
//       userId,
//       topicId: topic.id,
//       completed: true,
//       progress: 100,
//     });
//   }, [updateProgress, userId, topic.id, isCompleted]);

//   return (
//     <div className="rounded-lg overflow-hidden shadow-md bg-white">
//       {/* Video section */}
//       {videoId && (
//         <div className="aspect-w-16 aspect-h-9 relative">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}`}
//             title={topic.name}
//             className="w-full h-64 sm:h-96 border-0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}

//       {/* Content section */}
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-800">{topic.name}</h3>

//           {/* Completion status indicator */}
//           {isCompleted && (
//             <div className="flex items-center text-green-600">
//               <CheckCircleIcon className="w-5 h-5 mr-1" />
//               <span className="text-sm font-medium">Completed</span>
//             </div>
//           )}
//         </div>

//         {/* Topic description if available */}
//         {topic.description && (
//           <p className="text-gray-600 mb-6">{topic.description}</p>
//         )}

//         {/* Progress bar */}
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//           <div
//             className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${isCompleted ? 100 : progress}%` }}
//           ></div>
//         </div>

//         {/* Completion button */}
//         {!hideCompletionButton && (
//           <div className="flex justify-end mt-6">
//             {isUpdating ? (
//               <div className="px-4 py-2">
//                 <LoadingSpinner />
//               </div>
//             ) : (
//               <button
//                 onClick={handleMarkDone}
//                 disabled={isCompleted}
//                 className={`px-4 py-2 rounded-md flex items-center transition-colors ${
//                   isCompleted
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <>
//                     <CheckCircleIcon className="w-5 h-5 mr-2" />
//                     Completed
//                   </>
//                 ) : (
//                   "Mark as Complete"
//                 )}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
