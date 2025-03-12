import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTests } from "@/hooks/useTest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FiFilter } from "react-icons/fi";
import { X } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";

const TestsList: React.FC = () => {
  const navigate = useNavigate();
  const { data: tests, isLoading, error } = useTests();

  // New filter states matching DeckList filters
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedBoard, setSelectedBoard] = useState("all");

  // Mobile filter modal state
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Derive filter options from the tests data
  const subjectOptions = useMemo(() => {
    if (!tests) return [];
    const set = new Set(tests.map((test) => test.subject).filter(Boolean));
    return Array.from(set);
  }, [tests]);

  const gradeOptions = useMemo(() => {
    if (!tests) return [];
    const set = new Set(tests.map((test) => test.grade).filter(Boolean));
    return Array.from(set);
  }, [tests]);

  const boardOptions = useMemo(() => {
    if (!tests) return [];
    const set = new Set(tests.map((test) => test.board).filter(Boolean));
    return Array.from(set);
  }, [tests]);

  // Filter tests based on selected subject, grade, and board
  const filteredTests = useMemo(() => {
    if (!tests) return [];
    return tests.filter((test) => {
      const matchesSubject =
        selectedSubject === "all" || test.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || test.grade === selectedGrade;
      const matchesBoard =
        selectedBoard === "all" || test.board === selectedBoard;
      return matchesSubject && matchesGrade && matchesBoard;
    });
  }, [tests, selectedSubject, selectedGrade, selectedBoard]);

  if (isLoading) return <div className="p-6 text-center">Loading tests...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">Error: {error.message}</div>
    );
  if (!tests || tests.length === 0)
    return <div className="p-6 text-center">No tests available.</div>;

  // Reusable filter content (for both desktop and mobile)
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
      {(selectedSubject !== "all" ||
        selectedGrade !== "all" ||
        selectedBoard !== "all") && (
        <button
          onClick={() => {
            setSelectedSubject("all");
            setSelectedGrade("all");
            setSelectedBoard("all");
          }}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-400 transition-colors flex items-center gap-2"
        >
          <span>Clear All Filters</span>
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Available Mock Tests
        </h1>

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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setShowFilterModal(false)}
            ></div>
            {/* Modal Panel */}
            <div className="absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filter Options</h2>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-xl font-bold"
                  >
                    &times;
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

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card
                key={test.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/test/${test.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {test.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{test.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      Duration: {test.duration} min
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end"></CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg text-gray-600">
              No tests found matching your criteria
            </h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsList;
