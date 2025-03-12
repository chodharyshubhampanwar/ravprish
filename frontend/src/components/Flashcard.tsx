import React from "react";
import { useParams } from "react-router-dom";
import { useDeck } from "../hooks/useDeck";
import LoadingSpinner from "../components/LoadingSpinner";
import Flashcard from "./Deck";
import SummaryStats from "./SummaryStats";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { data: deck, isLoading, error } = useDeck(deckId!);

  const [progress, setProgress] = React.useState<
    Array<"correct" | "incorrect" | null>
  >([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  React.useEffect(() => {
    if (deck) {
      setProgress(new Array(deck.cards.length).fill(null));
      setCurrentCardIndex(0);
    }
  }, [deck]);

  React.useEffect(() => {
    if (deck && currentCardIndex >= deck.cards.length) {
      const summary = {
        correct: progress.filter((r) => r === "correct").length,
        incorrect: progress.filter((r) => r === "incorrect").length,
        total: deck.cards.length,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("flashcardSummary", JSON.stringify(summary));
    }
  }, [currentCardIndex, deck, progress]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="text-red-500 text-center py-8">
          Error loading deck:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Deck not found</p>
        </div>
      </div>
    );
  }

  if (currentCardIndex >= deck.cards.length) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <SummaryStats
          progress={progress}
          totalCards={deck.cards.length}
          onRestart={() => {
            setProgress(new Array(deck.cards.length).fill(null));
            setCurrentCardIndex(0);
          }}
        />
      </div>
    );
  }

  // Get the current card
  const currentCard = deck.cards[currentCardIndex];

  // Handle answer marking and progress update
  const handleMarkAnswer = (result: "correct" | "incorrect") => {
    setProgress((prev) => {
      const newProgress = [...prev];
      newProgress[currentCardIndex] = result;
      return newProgress;
    });
    setCurrentCardIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 h-[100vh]">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          {deck.title}
        </h1>
        <p className="text-gray-600">{deck.description}</p>
      </div>

      {/* Flashcard component */}
      <Flashcard front={currentCard.front} back={currentCard.back} />

      {/* Answer Marking Buttons (only Correct & Incorrect) */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={() => handleMarkAnswer("incorrect")}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors group relative"
        >
          <FaTimesCircle className="text-xl" />
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Still Learning
          </span>
        </button>
        <button
          onClick={() => handleMarkAnswer("correct")}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors group relative"
        >
          <FaCheckCircle className="text-xl" />
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Know
          </span>
        </button>
      </div>

      {/* Always-visible, horizontally scrollable progress tracker */}
      <div className="mt-4">
        <h3 className="text-center text-gray-600 mb-2">Progress</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-2 items-center justify-center">
            {/* {progress.map((result, index) => {
              if (result === "correct") {
                return (
                  <FaCheckCircle
                    key={index}
                    className="text-green-500"
                    title="Correct"
                  />
                );
              }
              if (result === "incorrect") {
                return (
                  <FaTimesCircle
                    key={index}
                    className="text-red-500"
                    title="Incorrect"
                  />
                );
              }
              // For unanswered cards, render an empty fixed-size placeholder
              return <div key={index} className="w-6 h-6" />;
            })} */}
            {progress.map((result, index) => {
              if (result === "correct") {
                return (
                  <div key={index} className="group relative">
                    <FaCheckCircle className="text-green-500 sm:text-lg md:text-xl" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Know
                    </span>
                  </div>
                );
              }
              if (result === "incorrect") {
                return (
                  <div key={index} className="group relative">
                    <FaTimesCircle className="text-red-500 sm:text-lg md:text-xl" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Still Don't Know
                    </span>
                  </div>
                );
              }
              return <div key={index} className="w-6 h-6" />;
            })}
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-2">
          Card {currentCardIndex + 1} of {deck.cards.length}
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
