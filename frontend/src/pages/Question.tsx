import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuestion } from "@/hooks/useQuestion";
import { useQuestionStore } from "@/store/questionStore";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MathText } from "@/components/MathText";

export const QuestionView: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: question, isLoading } = useQuestion(questionId);
  const { userAnswers, setAnswer, startTime, setQuestion } = useQuestionStore();

  useEffect(() => {
    if (question) {
      setQuestion(question);
    }
  }, [question, setQuestion]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && !showSolution) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, showSolution]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Question",
        text: question?.content,
        url: window.location.href,
      });
    } catch (err) {
      console.error(err);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSolutionToggle = () => {
    if (showSolution) {
      setShowSolution(false);
      setQuestion(question!);
    } else {
      setShowSolution(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Question not found</div>
      </div>
    );
  }

  const userAnswer = userAnswers[question.id]?.selectedOption;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getOptionStyle = (optionKey: string) => {
    if (userAnswer === optionKey && !showSolution)
      return "border-blue-500 bg-blue-50";
    if (!userAnswer || !showSolution) return "border-gray-200";
    if (optionKey === question.correctAnswer)
      return "border-green-500 bg-green-50";
    if (optionKey === userAnswer) return "border-red-500 bg-red-50";
    return "border-gray-200";
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/question")}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-white">
              {question.subject}
            </Badge>
            <Badge
              variant="outline"
              className={`bg-white ${
                question.difficulty === "Easy"
                  ? "text-green-600"
                  : question.difficulty === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {question.difficulty}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              {formatTime(elapsedTime)}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-8 overflow-y-auto max-h-[40vh]">
        <h2 className="text-xl font-medium mb-4">
          <MathText content={question.content} />
        </h2>

        {question.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Question"
            className="w-full max-w-2xl mx-auto mb-8 rounded-lg"
          />
        )}
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => !showSolution && setAnswer(question.id, key)}
            disabled={showSolution}
            className={`w-full p-4 text-left border rounded-lg
              transition-colors ${getOptionStyle(key)}
              hover:bg-gray-50 disabled:hover:bg-white
              disabled:cursor-default`}
          >
            <span className="mr-4 text-blue-500 font-medium">{key}.</span>
            <MathText content={value} />
          </button>
        ))}
      </div>

      {/* Solution Section */}
      <div className="mt-auto">
        <Button
          onClick={handleSolutionToggle}
          disabled={!userAnswer}
          className="w-full mb-4"
        >
          {showSolution ? "Solve Again" : "Show Solution"}
        </Button>

        {showSolution && (
          <div className="mt-6 space-y-4 border-t pt-4 overflow-y-auto max-h-[30vh]">
            <div className="font-medium">Explanation:</div>
            <div className="text-gray-600">
              <MathText content={question.explanation} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionView;
