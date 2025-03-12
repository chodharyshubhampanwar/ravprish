import React from "react";
import {
  // Import whichever icons you need from lucide-react
  Grid,
  Globe2,
  School,
  Calculator,
  Brain,
  Briefcase,
  Users,
  Scale,
  IndianRupee,
  FlaskConical,
  Music,
  Palette,
  Cpu,
  TreeDeciduous,
  Leaf,
  BookOpen,
  Scroll,
  Pi,
  Sigma,
} from "lucide-react";

// 1. Define a type for your subject data
interface Subject {
  name: string;
  icon: React.ElementType; // or IconType from lucide-react
}

// 2. Create an array of subjects with icon references
const subjects: Subject[] = [
  { name: "All", icon: Grid },
  { name: "French", icon: Globe2 },
  { name: "FR", icon: Globe2 },
  { name: "CBSE BOARD X", icon: School },
  { name: "CBSE BOARD XII", icon: School },
  { name: "Accountancy", icon: Calculator },
  { name: "Psychology", icon: Brain },
  { name: "Business Studies", icon: Briefcase },
  { name: "Sociology", icon: Users },
  { name: "Political Science", icon: Scale },
  { name: "Economy", icon: IndianRupee }, // or DollarSign if IndianRupee is not available in your version
  { name: "Science", icon: FlaskConical },
  { name: "Music", icon: Music },
  { name: "Art", icon: Palette },
  { name: "World Language", icon: Globe2 },
  { name: "Hindi", icon: Globe2 },
  { name: "Chinese", icon: Globe2 },
  { name: "ZH", icon: Globe2 },
  { name: "Indian Languages", icon: Globe2 },
  { name: "Computer Science", icon: Cpu },
  { name: "Environmental Science", icon: TreeDeciduous },
  { name: "Social Sciences", icon: Users },
  { name: "Chemistry", icon: FlaskConical },
  { name: "Physics", icon: Sigma },
  { name: "Biology", icon: Leaf },
  { name: "Geography", icon: Globe2 },
  { name: "English", icon: BookOpen },
  { name: "History", icon: Scroll },
  { name: "Math", icon: Pi },
];

// 3. Build the grid component
const Subject: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-4
        md:grid-cols-8
        gap-6
      "
      >
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className="
              flex
              flex-col
              items-center
              justify-center
              p-4
              bg-white
              border
              border-gray-200
              rounded-lg
              shadow-sm
              hover:shadow-md
              transition-shadow
              cursor-pointer
            "
          >
            {/* Icon */}
            <subject.icon className="w-6 h-6 text-gray-700 mb-2" />

            {/* Label */}
            <span className="text-sm font-medium text-gray-800">
              {subject.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;
