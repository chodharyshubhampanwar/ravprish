import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "@/hooks/useQuestion";
import {
  Card,
  CardHeader,
  //   CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiFilter } from "react-icons/fi";
import { X, BookmarkIcon } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";

const QuestionsList: React.FC = () => {
  const navigate = useNavigate();
  const { data: questions, isLoading, error } = useQuestions();

  // Filter states
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedBoard, setSelectedBoard] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Derive filter options from questions data
  const subjectOptions = useMemo(() => {
    if (!questions) return [];
    const set = new Set(
      questions.map((question) => question.subject).filter(Boolean)
    );
    return Array.from(set);
  }, [questions]);

  const gradeOptions = useMemo(() => {
    if (!questions) return [];
    const set = new Set(
      questions.map((question) => question.grade).filter(Boolean)
    );
    return Array.from(set);
  }, [questions]);

  const boardOptions = useMemo(() => {
    if (!questions) return [];
    const set = new Set(
      questions.map((question) => question.board).filter(Boolean)
    );
    return Array.from(set);
  }, [questions]);

  const difficultyOptions = ["Easy", "Medium", "Hard"];

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    if (!questions) return [];
    return questions.filter((question) => {
      const matchesSubject =
        selectedSubject === "all" || question.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || question.grade === selectedGrade;
      const matchesBoard =
        selectedBoard === "all" || question.board === selectedBoard;
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        question.difficulty === selectedDifficulty;
      return (
        matchesSubject && matchesGrade && matchesBoard && matchesDifficulty
      );
    });
  }, [
    questions,
    selectedSubject,
    selectedGrade,
    selectedBoard,
    selectedDifficulty,
  ]);

  // Reusable filter content
  const FilterContent = () => (
    <div className="w-full flex flex-col md:flex-row items-center gap-3">
      <FilterDropdown
        label="Subject"
        value={selectedSubject}
        options={subjectOptions.map((s) => ({ label: s, value: s }))}
        onChange={setSelectedSubject}
      />
      <FilterDropdown
        label="Grade"
        value={selectedGrade}
        options={gradeOptions.map((g) => ({ label: g, value: g }))}
        onChange={setSelectedGrade}
      />
      <FilterDropdown
        label="Board"
        value={selectedBoard}
        options={boardOptions.map((b) => ({ label: b, value: b }))}
        onChange={setSelectedBoard}
      />
      <FilterDropdown
        label="Difficulty"
        value={selectedDifficulty}
        options={difficultyOptions.map((d) => ({ label: d, value: d }))}
        onChange={setSelectedDifficulty}
      />
      {(selectedSubject !== "all" ||
        selectedGrade !== "all" ||
        selectedBoard !== "all" ||
        selectedDifficulty !== "all") && (
        <button
          onClick={() => {
            setSelectedSubject("all");
            setSelectedGrade("all");
            setSelectedBoard("all");
            setSelectedDifficulty("all");
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-400 transition-colors flex items-center gap-2"
        >
          <span>Clear All Filters</span>
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );

  if (isLoading)
    return <div className="p-6 text-center">Loading questions...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">Error: {error.message}</div>
    );
  if (!questions || questions.length === 0)
    return <div className="p-6 text-center">No questions available.</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Question Bank</h1>

        {/* Desktop Filter Controls */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-600" size={20} />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <FilterContent />
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilterModal(true)}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 transition-colors flex items-center gap-2 justify-center"
          >
            <FiFilter className="text-gray-600" size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setShowFilterModal(false)}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filter Options</h2>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <FilterContent />
                <div className="mt-4">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <Card
                key={question.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/question/${question.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{question.subject}</Badge>
                        <Badge variant="outline">{question.topic}</Badge>
                        <Badge
                          variant="outline"
                          className={
                            question.difficulty === "Easy"
                              ? "bg-green-100"
                              : question.difficulty === "Medium"
                              ? "bg-yellow-100"
                              : "bg-red-100"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 font-medium line-clamp-3">
                    {question.content}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Marks: {question.marks}</span>
                    <span>Negative: {question.negativeMarks}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-gray-500">
                  <span>{question.grade} Grade</span>
                  <span>{question.board}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg text-gray-600">
              No questions found matching your criteria
            </h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
