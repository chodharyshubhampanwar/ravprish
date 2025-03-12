import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTestStore } from "../store/testStore";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const TestResult: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const {
    mockTest,
    userAnswers,
    testResult,
    isTestComplete,
    resetTestData,
    elapsedTime,
  } = useTestStore();

  if (!mockTest || !testResult || !isTestComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-lg font-medium">No results available.</p>
        <Button onClick={() => navigate(`/test/${testId}`)}>Go Back</Button>
      </div>
    );
  }

  const timeTaken = elapsedTime;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Flatten all questions from all sections
  const allQuestions = mockTest.sections.flatMap(
    (section) => section.questions
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{mockTest.title}</h1>
          <span className="text-sm text-gray-600">
            Time Taken: {formatTime(timeTaken)}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-3xl mx-auto px-4">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-md text-center">
            <p className="text-lg font-bold text-green-600">
              {testResult.correct}
            </p>
            <p className="text-sm text-gray-600">Correct</p>
          </div>
          <div className="p-4 border rounded-md text-center">
            <p className="text-lg font-bold text-red-600">
              {testResult.incorrect}
            </p>
            <p className="text-sm text-gray-600">Incorrect</p>
          </div>
          <div className="p-4 border rounded-md text-center">
            <p className="text-lg font-bold text-gray-600">
              {testResult.unanswered}
            </p>
            <p className="text-sm text-gray-600">Unanswered</p>
          </div>
          <div className="p-4 border rounded-md text-center">
            <p className="text-lg font-bold text-blue-600">
              {testResult.totalMarks}
            </p>
            <p className="text-sm text-gray-600">Total Marks</p>
          </div>
        </div>

        {/* Detailed Review */}
        {allQuestions.map((question, index) => {
          const userAns = userAnswers[question.id];
          const userSelected = userAns?.selectedOption;

          return (
            <div key={question.id} className="p-4 border rounded-md mb-4">
              <p className="font-medium mb-2">
                {index + 1}. {question.content}
              </p>
              <div className="ml-4 space-y-2">
                {Object.entries(question.options).map(([key, value]) => {
                  const isUserSelected = userSelected === key;
                  const isCorrectOption = key === question.correctAnswer;

                  let icon = null;
                  // Always mark the correct answer with a green check icon
                  if (isCorrectOption) {
                    icon = <CheckCircle className="w-4 h-4 text-green-600" />;
                  }
                  // Mark the wrong answer selected by the user with a red cross icon
                  if (isUserSelected && !isCorrectOption) {
                    icon = <XCircle className="w-4 h-4 text-red-600" />;
                  }
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`result-${question.id}`}
                        checked={isUserSelected}
                        disabled
                        className="form-radio"
                      />
                      <span className="font-semibold">
                        {key.toUpperCase()}.
                      </span>
                      <span>{value}</span>
                      {icon && <span>{icon}</span>}
                    </div>
                  );
                })}
              </div>
              {question.explanation && (
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Explanation: </span>
                  {question.explanation}
                </p>
              )}
            </div>
          );
        })}

        {/* Footer Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => {
              resetTestData();
              navigate("/");
            }}
          >
            Go Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TestResult;
