// import React from "react";
// import { useCourses } from "../hooks/useCourses";
// import { useCourseStore } from "../store/courseStore";

// const CoursesList: React.FC = () => {
//   const { courses, isLoading } = useCourses();
//   const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse);

//   if (isLoading) return <div className="p-4">Loading courses...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Courses</h2>
//       {courses && courses.length > 0 ? (
//         <ul>
//           {courses.map((course) => (
//             <li
//               key={course.id}
//               className="cursor-pointer hover:bg-gray-200 p-2 rounded"
//               onClick={() => setSelectedCourse(course)}
//             >
//               {course.name}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No courses available for the selected goal.</div>
//       )}
//     </div>
//   );
// };

// export default CoursesList;
// CoursesList.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCourses } from "../hooks/useCourses";
// import { useCourseStore } from "../store/courseStore";
// import { Book } from "lucide-react"; // example icon

// const CoursesList: React.FC = () => {
//   const navigate = useNavigate();
//   const { courses, isLoading } = useCourses();
//   const selectedGoal = useCourseStore((state) => state.selectedGoal);
//   const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse);
//   const setSelectedSubject = useCourseStore(
//     (state) => state.setSelectedSubject
//   );

//   if (!selectedGoal) {
//     return <div className="p-4">Select a goal first.</div>;
//   }

//   if (isLoading) {
//     return <div className="p-4">Loading courses...</div>;
//   }

//   if (!courses || courses.length === 0) {
//     return (
//       <div className="p-4">No courses available for the selected goal.</div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">
//         Courses for {selectedGoal.name}
//       </h2>

//       <ul className="space-y-4">
//         {courses.map((course) => (
//           <li key={course.id} className="border p-4 rounded hover:bg-gray-50">
//             {/* Course title */}
//             <div
//               className="font-semibold text-lg cursor-pointer mb-2"
//               onClick={() => {
//                 setSelectedCourse(course);
//                 // You could also navigate to a dedicated Course detail page if needed:
//                 // navigate(`/courses/${course.id}`);
//               }}
//             >
//               {course.name}
//             </div>

//             {/* Subjects within this course */}
//             {course.subjects && course.subjects.length > 0 ? (
//               <div className="flex flex-wrap gap-4">
//                 {course.subjects.map((subject) => (
//                   <div
//                     key={subject.id}
//                     className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
//                     onClick={() => {
//                       setSelectedSubject(subject);
//                       navigate(`/subject/${subject.id}`);
//                     }}
//                   >
//                     <Book className="w-5 h-5 mr-2 text-blue-500" />
//                     <span>{subject.name}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>No subjects available for this course.</div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CoursesList;

// CoursesPage.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { Calculator, BookOpen, GraduationCap, Microscope } from "lucide-react";

const getSubjectIcon = (subjectName: string) => {
  const name = subjectName.toLowerCase();
  if (name.includes("math"))
    return <Calculator className="w-5 h-5 text-blue-600" />;
  return <BookOpen className="w-5 h-5 text-green-600" />;
  return <Microscope className="w-5 h-5 text-purple-600" />;
};

const CoursesList: React.FC = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const { courses, isLoading } = useCourses(goalId);

  if (isLoading) return <div className="p-4">Loading courses...</div>;

  if (!courses || courses.length === 0) {
    return <div className="p-4">No courses found for this goal.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6" />
        Start Learning
      </h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-3">{course.name}</h3>
            {course.subjects && course.subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {course.subjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => navigate(`/subject/${subject.id}`)}
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {getSubjectIcon(subject.name)}
                    <span>{subject.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No subjects available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
