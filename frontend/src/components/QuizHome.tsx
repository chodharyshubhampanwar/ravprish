import { useQuizStore } from "../store/useQuizStore";
import { Quiz } from "../types/quiz";

interface QuizHomeProps {
  quiz: Quiz;
}

export const QuizHome = ({ quiz }: QuizHomeProps) => {
  const { startQuiz, loading } = useQuizStore();

  const handleStartQuiz = async () => {
    await startQuiz(quiz.id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <div className="space-y-4">
        <p className="text-gray-600">{quiz.description}</p>
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Quiz Details</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Duration: {quiz.duration} minutes</li>
            <li>Total Questions: {quiz.questions.length}</li>
          </ul>
        </div>
        <button
          onClick={handleStartQuiz}
          disabled={loading}
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Starting..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
};
