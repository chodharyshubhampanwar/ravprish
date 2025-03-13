// components/About.tsx
import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Clients Served" },
    { value: "94%", label: "Client Retention" },
    { value: "45+", label: "Industry Experts" },
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-30"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50">
                <h3 className="text-3xl font-bold text-white mb-6">
                  About Pinnacle Consult
                </h3>
                <p className="text-slate-300 mb-6">
                  Founded in 2010, Pinnacle Consult has grown into a leading
                  consulting firm serving clients across various industries. Our
                  team of experts brings decades of combined experience to
                  tackle your most complex business challenges.
                </p>
                <p className="text-slate-300 mb-6">
                  We pride ourselves on building long-term relationships with
                  our clients, becoming trusted advisors who understand your
                  unique needs and goals. Our holistic approach combines
                  strategic thinking with practical implementation to deliver
                  tangible results.
                </p>
                <motion.div
                  className="grid grid-cols-2 gap-6 mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-indigo-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="space-y-6">
              <motion.div
                className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-bold text-white mb-3">
                  Our Mission
                </h4>
                <p className="text-slate-300">
                  To empower businesses through strategic guidance and
                  innovative solutions that drive sustainable growth and create
                  lasting value.
                </p>
              </motion.div>
              <motion.div
                className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-bold text-white mb-3">
                  Our Vision
                </h4>
                <p className="text-slate-300">
                  To be the most trusted consulting partner for businesses
                  seeking transformative change and excellence in their
                  operations.
                </p>
              </motion.div>
              <motion.div
                className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-bold text-white mb-3">
                  Our Values
                </h4>
                <ul className="text-slate-300 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-indigo-400">●</span>
                    Integrity and transparency in all our dealings
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-indigo-400">●</span>
                    Excellence in everything we do
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-indigo-400">●</span>
                    Innovation that drives meaningful results
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-indigo-400">●</span>
                    Collaboration built on trust and respect
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
