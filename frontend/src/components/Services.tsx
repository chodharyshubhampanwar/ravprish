// components/Services.tsx
import React from "react";
import { motion } from "framer-motion";

export const Services: React.FC = () => {
  const services = [
    {
      title: "Strategic Planning",
      description:
        "Develop comprehensive strategies that align with your business goals and market dynamics.",
      icon: "📊",
    },
    {
      title: "Digital Transformation",
      description:
        "Navigate the digital landscape with tailored solutions that drive innovation and efficiency.",
      icon: "🔄",
    },
    {
      title: "Financial Advisory",
      description:
        "Optimize financial performance with expert guidance and sustainable financial strategies.",
      icon: "💰",
    },
    {
      title: "Operational Excellence",
      description:
        "Streamline processes and enhance productivity through operational improvement initiatives.",
      icon: "⚙️",
    },
    {
      title: "Market Research",
      description:
        "Gain valuable insights into market trends and consumer behavior to inform decision-making.",
      icon: "🔍",
    },
    {
      title: "Leadership Development",
      description:
        "Cultivate strong leadership capabilities within your organization for sustainable growth.",
      icon: "👥",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We offer a comprehensive range of consulting services designed to
            address your unique business challenges and opportunities.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 h-full flex flex-col">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-300 mb-6 flex-grow">
                  {service.description}
                </p>
                <motion.a
                  href="#contact"
                  className="text-indigo-300 hover:text-indigo-200 font-medium text-sm flex items-center"
                  whileHover={{ x: 3 }}
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
