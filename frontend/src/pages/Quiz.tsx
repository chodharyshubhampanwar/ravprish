import { useParams } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { QuizHome } from "../components/QuizHome";
import { QuizComponent } from "../components/Quiz";
import { useQuizStore } from "../store/useQuizStore";

export default function QuizPage() {
  const { quizId } = useParams();
  const { isStarted } = useQuizStore();
  const { quiz, isLoading, error } = useQuiz(quizId || "");
  console.log(quizId, quiz, isLoading, error);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // if (error) {
  //   return <Navigate to="/error" replace state={{ message: error }} />;
  // }

  if (!quiz) {
    return <p>No quiz found for ID: {quizId}</p>;
  }

  return isStarted ? <QuizComponent quiz={quiz} /> : <QuizHome quiz={quiz} />;
}
