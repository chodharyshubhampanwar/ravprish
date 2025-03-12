import {
  BookOpen,
  FileText,
  FileQuestion,
  MessageSquare,
  BookMarked,
  Notebook,
} from "lucide-react";

const tools = {
  id: "tools",
  title: "Tools",
  items: [
    {
      id: "flashcard",
      name: "Flashcards",
      path: "/deck",
      icon: BookOpen,
      color: "#10B981",
      description: "Create your own flashcards and access millions of others.",
    },
    {
      id: "test",
      name: "Mock Tests",
      path: "/test",
      icon: FileText,
      color: "#6366F1",
      description: "Test your knowledge with real .",
    },
    {
      id: "questions",
      name: "Question Bank",
      path: "/question",
      icon: MessageSquare,
      color: "#8B5CF6",
      description: "Access comprehensive question banks for practice.",
    },
    {
      id: "notes",
      name: "Notes",
      path: "/notes",
      icon: Notebook,
      color: "#F59E0B",
      description:
        "Find the best study documents to ace your way through education.",
    },
    {
      id: "explanation",
      name: "Explanations",
      path: "/explanation",
      icon: BookMarked,
      color: "#EC4899",
      description: "Get detailed explanations of every topic subject wise.",
    },
    {
      id: "exams",
      name: "Practice Exams",
      path: "/exams",
      icon: FileQuestion,
      color: "#3B82F6",
      description: "Practice with previous year questions and gain confidence.",
    },
  ],
};

const ToolsGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-navy-900 mb-2">
        Everything you need to succeed - packed into one app!
      </h1>

      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.items.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${tool.color}15` }}
                  >
                    <IconComponent size={24} style={{ color: tool.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
