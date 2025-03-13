import { createBrowserRouter } from "react-router-dom";
import QuizPage from "./pages/Quiz";
import DeckPage from "./pages/DeckPage";
import Flashcard from "./components/Flashcard";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import TestSummary from "./pages/TestSummary";
import TestsList from "./pages/TestList";
import TestAttempt from "./pages/TestAttempt";
import TestResult from "./pages/TestResult";
import QuestionsList from "./pages/QuestionList";
import QuestionView from "./pages/Question";
// import Layout from "./layout";
import GoalsList from "./components/GoalsList";
import CoursesList from "./components/CourseList";
import SubjectDetail from "./components/SubjectDetail";
import ChapterDetail from "./components/ ChapterDetails";
import Instagram from "./components/Instagram";
import Facebook from "./components/Facebook";
import DashboardLayout from "./layout/DashboardLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "goals",
        element: <GoalsList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "deck",
        element: <DeckPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "home",
        element: <GoalsList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "test",
        element: <TestsList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "question",
        element: <QuestionsList />,
      },
      {
        path: "courses/:goalId",
        element: <CoursesList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "subject/:subjectId",
        element: <SubjectDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "chapter/:chapterId",
        element: <ChapterDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "quiz/:quizId",
        element: <QuizPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "deck/:deckId",
        element: <Flashcard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "test/:testId",
        element: <TestSummary />,
      },
      {
        path: "test/:testId/attempt",
        element: <TestAttempt />,
      },
      {
        path: "test/:testId/result",
        element: <TestResult />,
      },
      {
        path: "question/:questionId",
        element: <QuestionView />,
      },
    ],
    errorElement: <ErrorPage />,
  },

  {
    path: "social",
    element: <Instagram />,
    errorElement: <ErrorPage />,
  },
  {
    path: "facebook",
    element: <Facebook />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
