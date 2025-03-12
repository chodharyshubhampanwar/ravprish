import { Backpack } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility class helper

const colors = [
  "text-red-500",
  "text-orange-500",
  "text-amber-500",
  "text-yellow-500",
  "text-lime-500",
  "text-green-500",
  "text-emerald-500",
  "text-teal-500",
  "text-cyan-500",
  "text-sky-500",
  "text-blue-500",
  "text-indigo-500",
];

export function GoalsGrid() {
  const goals = {
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
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Popular Goals
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {goals.items.map((item, index) => (
          <a
            key={item.id}
            href={item.path}
            className={cn(
              "group relative flex flex-col items-center justify-center",
              "rounded-lg border border-gray-200 bg-white p-6",
              "transition-all duration-300 ease-in-out",
              "hover:border-transparent hover:shadow-xl",
              "dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "h-32" // Fixed height for consistency
            )}
            aria-label={`Go to ${item.name} goals`}
          >
            <Backpack
              className={cn(
                "mb-3 h-8 w-8 transition-colors duration-300",
                colors[index % colors.length],
                "group-hover:text-opacity-80"
              )}
              aria-hidden="true"
            />
            <span className="text-center text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-primary dark:text-gray-300">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
