import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Strategy & Planning",
    description: "Comprehensive plans to guide your organization’s growth.",
    icon: "💡",
  },
  {
    title: "Operations Optimization",
    description:
      "Streamline processes to maximize efficiency and profitability.",
    icon: "⚙️",
  },
  {
    title: "Digital Transformation",
    description: "Leverage modern technology to drive innovation.",
    icon: "💻",
  },
  {
    title: "Analytics & Insights",
    description: "Data-driven approaches for informed decision making.",
    icon: "📊",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Key Offerings
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-100 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
