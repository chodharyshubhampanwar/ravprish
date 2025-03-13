import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="py-6 px-6 lg:px-8 bg-white border-t border-gray-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ConsultPro. All rights reserved.
        </p>
        <ul className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
          <li>
            <a href="#privacy" className="hover:text-gray-900">
              Privacy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-gray-900">
              Terms
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-900">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </motion.footer>
  );
};

export default Footer;
