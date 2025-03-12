import {
  Home,
   PencilRuler,
   Copy,
   FileQuestion,
  // DollarSign,
  // Music,
  // GraduationCap,
  // Bitcoin,
  // Lightbulb,
  FileText,
  NotebookTabs

} from "lucide-react";

export const SIDE_NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: PencilRuler , label: "Tests", path: "/test" },
  { icon: FileQuestion, label: "Questions", path: "/question" },
  { icon:  Copy, label: "Flashcards", path: "/deck" },
  { icon: FileText , label: "Explanation", path: "/explanation" },
  { icon: NotebookTabs , label: "Notes", path: "/notes" },
  // { icon: GraduationCap, label: "Psychology", path: "/psychology" },
  // { icon: Bitcoin, label: "Currencies", path: "/currencies" },
  // { icon: Lightbulb, label: "Thoughts", path: "/thoughts" },
];
