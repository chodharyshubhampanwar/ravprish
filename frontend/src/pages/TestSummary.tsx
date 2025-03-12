import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTest } from "../hooks/useTest";
import { useTestStore } from "../store/testStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// Import your types if available
import { Section, Question } from "../types/test";

const TestSummary: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { data: mockTest, isLoading, error } = useTest(testId);
  const setMockTest = useTestStore((state) => state.setMockTest);
  const resetTestData = useTestStore((state) => state.resetTestData);

  // Reset test data on component mount
  React.useEffect(() => {
    resetTestData();
  }, [resetTestData]);

  // Manage state for the Instructions modal
  const [openInstructions, setOpenInstructions] = React.useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!mockTest) return <div>No test found.</div>;

  const handleStartTest = () => {
    setMockTest(mockTest);
    navigate(`/test/${testId}/attempt`);
  };

  // Calculate total questions and total marks from all sections
  const totalQuestions = mockTest.sections.reduce(
    (acc: number, section: Section) => acc + section.questions.length,
    0
  );
  const totalMarks = mockTest.sections.reduce(
    (acc: number, section: Section) =>
      acc +
      section.questions.reduce(
        (sum: number, q: Question) => sum + (q.marks ?? 0),
        0
      ),
    0
  );

  // Use section titles as fallback for syllabus topics if mockTest.topics is undefined
  const syllabusTopics: string[] =
    mockTest.topics ?? mockTest.sections.map((section) => section.title);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Top Section: Test Info, Stats & Action Buttons */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
          {/* Test Information & Stats */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{mockTest.title}</h1>
            <p className="text-gray-600 mb-4">{mockTest.description}</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Questions:</span>
                <span className="text-gray-800">{totalQuestions}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Total Marks:</span>
                <span className="text-gray-800">{totalMarks}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <span className="font-semibold">Duration:</span>
                <span className="text-gray-800">
                  {mockTest.duration} minutes
                </span>
              </div> */}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button onClick={handleStartTest} className="px-6 py-2">
              Start Test
            </Button>
            <Sheet open={openInstructions} onOpenChange={setOpenInstructions}>
              <SheetTrigger asChild>
                <Button variant="outline" className="px-6 py-2">
                  Instructions
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-md">
                <SheetHeader>
                  <SheetTitle>Test Instructions</SheetTitle>
                  <SheetDescription>
                    {/* Since instructions aren’t provided in the API, use a default message */}
                    No instructions provided.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Bottom Section: Syllabus */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Syllabus</h2>
          {syllabusTopics && syllabusTopics.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {syllabusTopics.map((topic, index) => (
                <li key={index} className="text-gray-700">
                  {topic}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No syllabus topics available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
