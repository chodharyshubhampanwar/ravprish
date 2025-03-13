import React, { useState } from "react";
import { motion } from "framer-motion";

const caseStudiesData = [
  {
    title: "Global Expansion for Tech Startup",
    description:
      "We helped a rising tech company expand into 3 new markets, increasing revenue by 200%.",
  },
  {
    title: "Digital Transformation for Retail",
    description:
      "Implemented an end-to-end digital strategy, cutting costs by 30% and boosting online sales.",
  },
  {
    title: "Operational Efficiency for Healthcare",
    description:
      "Redesigned key workflows, leading to a 25% reduction in patient wait times and improved care.",
  },
];

const CaseStudies: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudiesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? caseStudiesData.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="case-studies"
      className="py-20 px-6 lg:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Case Studies</h2>
        <p className="text-gray-600 mb-10">
          Real results from our consulting engagements.
        </p>

        <div className="relative">
          {caseStudiesData.map((study, index) => (
            <motion.div
              key={index}
              className={`absolute w-full transition-opacity ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto max-w-xl p-6 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">{study.title}</h3>
                <p className="text-gray-700">{study.description}</p>
              </div>
            </motion.div>
          ))}

          {/* Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
