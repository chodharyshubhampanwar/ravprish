import React from "react";
import { FaCheckCircle, FaTimesCircle, FaAlignJustify } from "react-icons/fa";

interface SummaryStatsProps {
  progress: Array<"correct" | "incorrect" | null>;
  totalCards: number;
  onRestart: () => void;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  progress,
  totalCards,
  onRestart,
}) => {
  const correctCount = progress.filter((r) => r === "correct").length;
  const incorrectCount = progress.filter((r) => r === "incorrect").length;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Session Summary
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        <div className="flex flex-col items-center">
          <FaCheckCircle
            className="text-6xl text-green-500"
            title="Correct Answers"
          />
          <span className="mt-2 text-2xl font-bold">{correctCount}</span>
          <p className="text-gray-600">Correct</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTimesCircle
            className="text-6xl text-red-500"
            title="Incorrect Answers"
          />
          <span className="mt-2 text-2xl font-bold">{incorrectCount}</span>
          <p className="text-gray-600">Incorrect</p>
        </div>
        <div className="flex flex-col items-center">
          <FaAlignJustify
            className="text-6xl text-blue-500"
            title="Incorrect Answers"
          />
          <span className="mt-2 text-2xl font-bold">{totalCards}</span>
          <p className="text-gray-600">Total Cards</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Restart Deck
      </button>
    </div>
  );
};

export default SummaryStats;
