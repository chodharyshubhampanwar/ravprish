import { useQuizStore } from "../store/useQuizStore";
import { cn } from "../lib/utils";
import {
  AiOutlineLoading3Quarters,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { Quiz } from "../types/quiz";

interface QuizComponentProps {
  quiz: Quiz;
}

export const QuizComponent = ({ quiz }: QuizComponentProps) => {
  const {
    currentQuestionIndex,
    userAnswers,
    loading,
    nextQuestion,
    previousQuestion,
    setCurrentQuestion,
    setAnswer,
  } = useQuizStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        {/* ... existing question display code ... */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Question header and navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </h2>
          </div>

          {/* Question content and options */}
          <div className="space-y-4">
            <p className="text-lg">{currentQuestion.content}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswer(currentQuestion.id, option)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors",
                    userAnswers[currentQuestion.id] === option
                      ? "bg-blue-100 border-blue-300"
                      : "bg-white border border-gray-200 hover:bg-blue-50"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <AiOutlineLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
              <AiOutlineRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="fixed bottom-0 left-0 w-full md:relative md:w-80 bg-white shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={cn(
                  "h-10 w-10 rounded-md text-sm font-medium",
                  currentQuestionIndex === idx
                    ? "bg-blue-600 text-white"
                    : userAnswers[quiz.questions[idx].id]
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
