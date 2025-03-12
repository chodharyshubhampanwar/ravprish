import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [theme, setTheme] = useState("auto");

  const navigationData = {
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
          { id: "match", name: "Match", path: "/match" },
          { id: "quiz", name: "Quiz", path: "/quiz" },
          { id: "test", name: "Mock Tests", path: "/test" },
          { id: "exams", name: "Practice Exams", path: "/exams" },
          { id: "questions", name: "Question Bank", path: "/question" },
          { id: "notes", name: "Notes", path: "/notes" },
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
          { id: "merch", name: "Merch", path: "/merch" },
          { id: "stationary", name: "Stationary", path: "/stationary" },
        ],
      },
    ],
  };

  const legalLinks = {
    id: "legal",
    title: "Legal",
    items: [
      { id: "privacy", name: "Privacy Policy", path: "/privacy" },
      { id: "terms", name: "Terms of Service", path: "/terms" },
      { id: "cookies", name: "Cookie Policy", path: "/cookies" },
      { id: "accessibility", name: "Accessibility", path: "/accessibility" },
    ],
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
    setTheme(newTheme);
    // Here you can add your theme change logic
  };

  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Navigation Categories */}
          {navigationData.categories.map((category) => (
            <div key={category.id}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {legalLinks.title}
            </h3>
            <ul className="space-y-2">
              {legalLinks.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 px-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Theme Toggle Buttons */}
              <div className="flex items-center gap-2 bg-gray-200 p-1 rounded-lg">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "light"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "dark"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("auto")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "auto"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                © {currentYear} . All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
