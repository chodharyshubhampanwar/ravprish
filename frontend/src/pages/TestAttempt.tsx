import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTestStore } from "../store/testStore";
import { Logs, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const TestAttempt: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const {
    mockTest,
    userAnswers,
    currentQuestionIndex,
    setCurrentQuestion,
    setAnswer,
    completeTest,
    isTestComplete,
    startTime,
    elapsedTime,
    isTestStarted,
    startTest,
    setElapsedTime,
  } = useTestStore();

  const [showSidebar, setShowSidebar] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);

  // Redirect if no test data is loaded
  useEffect(() => {
    if (!mockTest) {
      // Use a timeout to delay the navigation until after the current render cycle.
      const timeoutId = setTimeout(() => {
        navigate(`/test/${testId}`);
      }, 0); // 0ms timeout is enough to defer it.

      return () => clearTimeout(timeoutId); // Clean up in case mockTest becomes available
    }
  }, [mockTest, navigate, testId]);

  // Start the test if not already started
  useEffect(() => {
    if (mockTest && !isTestStarted) {
      startTest();
    }
  }, [mockTest, isTestStarted, startTest]);

  useEffect(() => {
    if (isTestComplete) {
      navigate(`/test/${testId}/result`);
    }
  }, [isTestComplete, navigate, testId]);

  // Update elapsed time every second
  useEffect(() => {
    if (!mockTest || !startTime) return;
    const timer = setInterval(() => {
      const newElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(newElapsed);
    }, 1000);
    return () => clearInterval(timer);
  }, [mockTest, startTime, setElapsedTime]);

  // Flatten questions from all sections
  const allQuestions = mockTest
    ? mockTest.sections.flatMap((section) => section.questions)
    : [];

  // Compute attempted count (questions where an option has been selected)
  const attemptedCount = allQuestions.filter(
    (q) => userAnswers[q.id] && userAnswers[q.id].selectedOption !== undefined
  ).length;

  if (!mockTest || allQuestions.length === 0) return null;

  const handleEndTest = () => {
    if (!mockTest) return;
    const { correct, incorrect, unanswered, totalMarks } = calculateResult();
    completeTest({ correct, incorrect, unanswered, totalMarks });
    navigate(`/test/${testId}/result`);
  };

  const calculateResult = () => {
    let correct = 0,
      incorrect = 0,
      unanswered = 0,
      totalMarks = 0;

    mockTest.sections.forEach((section) => {
      section.questions.forEach((question) => {
        const userAns = userAnswers[question.id];
        if (!userAns || !userAns.selectedOption) {
          unanswered++;
        } else if (question.correctAnswer) {
          if (userAns.selectedOption === question.correctAnswer) {
            correct++;
            totalMarks += question.marks;
          } else {
            incorrect++;
            totalMarks -= question.negativeMarks;
          }
        }
      });
    });

    return { correct, incorrect, unanswered, totalMarks };
  };

  const scrollToQuestion = (index: number) => {
    const el = document.getElementById(`question-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setCurrentQuestion(index);
  };

  // Format elapsed time (mm:ss)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      scrollToQuestion(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-gray-100 rounded-md md:block hidden"
            >
              {showSidebar ? (
                <X className="w-5 h-5" />
              ) : (
                <Logs className="w-5 h-5" />
              )}
            </button>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-md md:hidden">
                  <Logs className="w-5 h-5" />
                </button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-lg font-medium">Practice tests</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Show number of attempted questions out of total */}
            <div className="text-sm">
              {attemptedCount} / {allQuestions.length} •{" "}
              {formatTime(elapsedTime)}
            </div>
            <button className="px-4 py-2 bg-yellow-400 rounded-md text-sm font-medium">
              Start free trial
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-14 h-screen">
        {/* Left Panel - Desktop */}
        <div
          className={`fixed left-0 top-14 bottom-0 w-64 bg-white border-r transition-transform duration-200 hidden md:block ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-600 mb-4">
              Question list
            </h2>
            <div className="space-y-2">
              {allQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToQuestion(idx)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    currentQuestionIndex === idx
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sheet */}
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent side="left" className="w-[280px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle>Question List</SheetTitle>
              <SheetDescription>Select a question to jump to</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {allQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    scrollToQuestion(idx);
                    setOpenSheet(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    currentQuestionIndex === idx
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-200 ${
            showSidebar ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div
              className="overflow-y-auto py-8"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              {allQuestions.map((question, index) => {
                const selectedOption = userAnswers[question.id]?.selectedOption;
                return (
                  <div
                    key={question.id}
                    id={`question-${index}`}
                    className="mb-8 scroll-mt-8"
                  >
                    <div className="mb-4">
                      <h2 className="text-base font-normal">
                        <span className="mr-2">{index + 1}.</span>
                        {question.content}
                      </h2>
                    </div>
                    <div className="space-y-3 pl-6">
                      {Object.entries(question.options).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={selectedOption === key}
                            onChange={() => setAnswer(question.id, key)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div
          className={`transition-all duration-200 ${
            showSidebar ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="max-w-3xl mx-auto flex justify-between">
            <Button
              onClick={handleEndTest}
              variant="ghost"
              className="text-blue-600 font-medium"
            >
              Submit test
            </Button>
            <Button
              onClick={handleNext}
              variant="secondary"
              className="text-gray-700 px-4 py-2 rounded-md bg-gray-50"
            >
              Next unanswered question
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestAttempt;
