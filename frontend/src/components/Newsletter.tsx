// import React from "react";
// import { motion } from "framer-motion";

// const Newsletter: React.FC = () => {
//   return (
//     <section id="newsletter" className="py-16 px-6 lg:px-8 bg-blue-50">
//       <div className="max-w-7xl mx-auto text-center">
//         <motion.h2
//           className="text-3xl font-bold text-gray-900 mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           Stay Informed
//         </motion.h2>
//         <motion.p
//           className="text-gray-600 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           Get the latest insights, best practices, and news delivered to your
//           inbox.
//         </motion.p>

//         <motion.form
//           className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <input
//             type="email"
//             required
//             placeholder="Enter your email"
//             className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
//           >
//             Subscribe
//           </button>
//         </motion.form>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;

// import { RainbowButton } from "@/components/magicui/rainbow-button";

// export function RainbowButtonDemo() {
//   return <RainbowButton>Start Here</RainbowButton>;
// }
