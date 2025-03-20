// ChapterDetail.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChapter } from "../hooks/useChapter";
import { TopicItem } from "./TopicItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCompleteChapter } from "@/hooks/useCompleteChapter";
import { useAuthStore } from "@/store/AuthStore";

const ChapterDetail: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { chapter, isLoading } = useChapter(chapterId);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const currentUser = useAuthStore((state) => state.user?.id);
  const userId = currentUser || "";

  const { mutate: completeChapter, isLoading: isCompleting } =
    useCompleteChapter();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  if (!chapter) return <div className="p-4">Chapter not found.</div>;

  const topics = chapter.topics || [];
  const currentTopic = topics[currentTopicIndex];

  const handleNext = () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex((prev) => prev - 1);
    }
  };

  const handleChapterComplete = () => {
    completeChapter({
      userId,
      chapterId: chapter.id,
      topicId: currentTopic.id, // Add current topic ID
      completed: true, // Set completion status
      progress: 100, // Set full progress
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-4 max-w-6xl mx-auto">
      {/* Left sidebar for desktop */}
      <aside className="hidden md:block md:w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">{chapter.name}</h2>
        <ul>
          {topics.map((topic, index) => (
            <li
              key={topic.id}
              className={`mb-2 cursor-pointer ${
                index === currentTopicIndex
                  ? "font-bold text-blue-600"
                  : "text-gray-700"
              }`}
              onClick={() => setCurrentTopicIndex(index)}
            >
              {topic.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content area */}
      <main className="md:w-3/4 p-4">
        {/* For mobile, show the lesson heading at the top */}
        <div className="block md:hidden mb-4">
          <h2 className="text-xl font-bold">{chapter.name}</h2>
        </div>
        {currentTopic ? (
          <div>
            <TopicItem
              topic={currentTopic}
              userId={userId}
              hideCompletionButton={true} // Hide per-topic completion button.
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentTopicIndex === 0}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {currentTopicIndex < topics.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleChapterComplete}
                  disabled={isCompleting}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {isCompleting ? "Submitting..." : "Mark Complete"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            No topics available for this chapter.
          </div>
        )}
      </main>
    </div>
  );
};

export default ChapterDetail;
