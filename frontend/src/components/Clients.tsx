import React from "react";
import { motion } from "framer-motion";

const clients = [
  { name: "Client A", logo: "🚀" },
  { name: "Client B", logo: "🌐" },
  { name: "Client C", logo: "📱" },
  { name: "Client D", logo: "🏦" },
  { name: "Client E", logo: "🛍️" },
  { name: "Client F", logo: "⚕️" },
];

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted By
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our clients span across multiple industries and geographies.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl">{client.logo}</div>
              <span className="mt-2 text-gray-500 text-sm">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
