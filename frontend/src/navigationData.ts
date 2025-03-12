// navigationData.ts
import { NavigationData } from "./types/nav";

export const navigationData: NavigationData = {
  categories: [
    {
      id: "goals",
      title: "Goals",
      items: [
        { id: "class1", name: "Class 1", path: "/goal/class-1" },
        { id: "class2", name: "Class 2", path: "/goal/class-2" },
        { id: "class3", name: "Class 3", path: "/goal/class-3" },
        { id: "class4", name: "Class 4", path: "/goal/class-4" },
        { id: "class5", name: "Class 5", path: "/goal/class-5" },
        { id: "class6", name: "Class 6", path: "/goal/class-6" },
        { id: "class7", name: "Class 7", path: "/goal/class-7" },
        { id: "class8", name: "Class 8", path: "/goal/class-8" },
        { id: "class9", name: "Class 9", path: "/goal/class-9" },
        { id: "class10", name: "Class 10", path: "/goal/class-10" },
        { id: "class11", name: "Class 11", path: "/goal/class-11" },
        { id: "class12", name: "Class 12", path: "/goal/class-12" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      items: [
        { id: "flashcard", name: "Flashcards", path: "/deck" },
        { id: "test", name: "Mock Tests", path: "/test" },
        { id: "questions", name: "Question Bank", path: "/question" },
        { id: "notes", name: "Notes", path: "/notes" },
        { id: "explanation", name: "Explanations", path: "/explanation" },
        { id: "exams", name: "Practice Exams", path: "/exams" },
      ],
    },
    {
      id: "store",
      title: "Store",
      items: [
        { id: "books", name: "Books", path: "/books" },
        {
          id: "printed-notes",
          name: "Printed Notes",
          path: "/printed-notes",
        },
        { id: "stationary", name: "Stationary", path: "/stationary" },
        { id: "merch", name: "Merch", path: "/merch" },
      ],
    },
  ],
};
