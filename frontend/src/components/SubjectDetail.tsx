import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubject } from "../hooks/useSubject";
import { SubjectProgressGrid } from "./SubjectProgressGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthStore } from "@/store/AuthStore";

const SubjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const { user } = useAuthStore();
  const userId = user?.id || "";

  const { subject, isLoading } = useSubject(subjectId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!subject) {
    return <div className="p-4">Subject not found.</div>;
  }

  return (
    <div className="w-full max-w-full px-4 py-6">
      {/* Integrated Progress Grid */}
      <SubjectProgressGrid subject={subject} userId={userId} />

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-6">Subject: {subject.name}</h2>

        {subject.units?.length ? (
          <div className="space-y-8">
            {subject.units.map((unit) => (
              <div
                key={unit.id}
                className="w-full bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-2xl font-semibold mb-4">{unit.name}</h3>
                {unit.chapters?.length ? (
                  <ul className="list-disc list-inside space-y-2">
                    {unit.chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => navigate(`/chapter/${chapter.id}`)}
                        >
                          {chapter.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-600">No chapters yet.</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">
            No units available for this subject.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;

// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSubject } from "../hooks/useSubject";
// import { SubjectProgressGrid } from "./SubjectProgressGrid";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { BookOpen, Star, Zap } from "lucide-react";

// // Progress status types
// type ProgressStatus =
//   | "mastered"
//   | "proficient"
//   | "familiar"
//   | "attempted"
//   | "not-started";

// const ProgressIcon = ({ status }: { status: ProgressStatus }) => {
//   switch (status) {
//     case "mastered":
//       return (
//         <div className="w-6 h-6 bg-purple-800 rounded flex items-center justify-center">
//           <Star className="w-4 h-4 text-white" />
//         </div>
//       );
//     case "proficient":
//       return <div className="w-6 h-6 bg-purple-400 rounded" />;
//     case "familiar":
//       return <div className="w-6 h-6 bg-orange-400 rounded" />;
//     case "attempted":
//       return (
//         <div className="w-6 h-6 border-2 border-orange-400 rounded bg-white" />
//       );
//     default:
//       return (
//         <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white" />
//       );
//   }
// };

// const QuizIcon = () => (
//   <div className="w-6 h-6 flex items-center justify-center">
//     <Zap className="w-4 h-4 text-gray-800" />
//   </div>
// );

// const UnitTestIcon = () => (
//   <div className="w-6 h-6 flex items-center justify-center">
//     <Star className="w-4 h-4 text-gray-800" />
//   </div>
// );

// const UnitHeader = ({ unit, index }: { unit: any; index: number }) => {
//   const bgColor = index === 0 ? "bg-blue-50" : "bg-white";

//   return (
//     <div
//       className={`rounded-lg shadow-sm border border-gray-200 overflow-hidden ${bgColor} mb-6`}
//     >
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold">
//             Unit {index + 1}: {unit.name}
//           </h3>
//           {index === 0 && (
//             <div className="flex items-center space-x-2 text-sm text-blue-600">
//               <BookOpen className="w-4 h-4" />
//               <span>UP NEXT FOR YOU!</span>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           {Array(6)
//             .fill(0)
//             .map((_, i) => (
//               <ProgressIcon
//                 key={i}
//                 status={
//                   i === 0 ? "proficient" : i === 1 ? "attempted" : "not-started"
//                 }
//               />
//             ))}
//           <QuizIcon />
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <ProgressIcon key={i} status="not-started" />
//             ))}
//           <QuizIcon />
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {Array(4)
//             .fill(0)
//             .map((_, i) => (
//               <ProgressIcon key={i} status="not-started" />
//             ))}
//           <QuizIcon />
//           {Array(2)
//             .fill(0)
//             .map((_, i) => (
//               <ProgressIcon key={i} status="not-started" />
//             ))}
//           <UnitTestIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// const SubjectDetail: React.FC = () => {
//   const navigate = useNavigate();
//   const { subjectId } = useParams<{ subjectId: string }>();
//   const userId = "c22bae68-ff0d-4d3c-af78-c6d4fb10a920"; // e.g. from auth
//   const { subject, isLoading } = useSubject(subjectId);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!subject) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-xl font-medium text-gray-700">Subject not found</h2>
//         <button
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           onClick={() => navigate("/")}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Current challenge section from the image
//   const CourseChallenge = () => (
//     <div className="border border-gray-200 rounded-lg p-6 mb-6">
//       <div className="flex items-center gap-2 mb-2">
//         <BookOpen className="w-6 h-6" />
//         <h3 className="font-semibold text-lg">COURSE CHALLENGE</h3>
//       </div>
//       <p className="text-gray-600 mb-3">
//         Test your knowledge of the skills in this course.
//       </p>
//       <button className="text-blue-600 font-medium hover:underline">
//         Start Course challenge
//       </button>
//     </div>
//   );

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6">
//       <SubjectProgressGrid subject={subject} userId={userId} />

//       <div className="grid md:grid-cols-3 gap-6 mt-6">
//         <div className="md:col-span-2">
//           {/* Display first 4 units with grid layouts as shown in image */}
//           {[...Array(4)].map((_, i) => (
//             <UnitHeader
//               key={i}
//               unit={{ name: i === 0 ? "Numbers from 1 to 9" : `Unit ${i + 1}` }}
//               index={i}
//             />
//           ))}
//         </div>

//         <div className="md:col-span-1">
//           <CourseChallenge />

//           {/* Unit mastery section */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-semibold">Unit mastery:</h2>
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-semibold">5%</span>
//               <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
//                 i
//               </div>
//             </div>
//           </div>

//           {/* Next unit for you section */}
//           <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-yellow-100 rounded-full p-3">
//                 <BookOpen className="w-6 h-6 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-blue-600">Up next for you:</p>
//                 <p className="font-medium">Unit 1: Numbers from 1 to 9</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="mb-2">Counting small numbers</p>
//                 <p className="mb-2">Comparing small numbers</p>
//                 <p className="mb-2">What is addition?</p>
//                 <p className="mb-2">Making small numbers</p>
//               </div>
//               <div>
//                 <p className="mb-2">Making 10</p>
//                 <p className="mb-2">What is subtraction?</p>
//                 <p className="mb-2">Subtract within 10</p>
//                 <p className="mb-2">Relate addition and subtraction</p>
//                 <p className="mb-2">Addition and subtraction word problems</p>
//               </div>
//             </div>

//             <button className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectDetail;
