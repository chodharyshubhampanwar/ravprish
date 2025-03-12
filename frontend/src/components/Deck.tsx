// import { motion, AnimatePresence } from "framer-motion";
// import { useFlashCardStore } from "../store/flashCardStore";

// // Flashcard Component
// interface FlashcardProps {
//   front: string;
//   back: string;
//   onNext?: () => void;
//   onPrevious?: () => void;
// }

// const Flashcard = ({ front, back, onNext, onPrevious }: FlashcardProps) => {
//   const { studyState, flipCard } = useFlashCardStore();
//   const { isFlipped } = studyState;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh] p-2 sm:p-4">
//       <div className="w-full max-w-2xl">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={isFlipped ? "back" : "front"}
//             initial={{ rotateX: -90, opacity: 0 }}
//             animate={{ rotateX: 0, opacity: 1 }}
//             exit={{ rotateX: 90, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 cursor-pointer min-h-[250px] flex items-center justify-center"
//             onClick={() => flipCard()}
//           >
//             <div className="text-center">
//               <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
//                 {isFlipped ? back : front}
//               </h2>
//               <p className="text-xs text-gray-400 mt-3">Click to flip</p>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <div className="flex gap-3 mt-6">
//         {onPrevious && (
//           <button
//             onClick={onPrevious}
//             className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
//           >
//             Previous
//           </button>
//         )}
//         {onNext && (
//           <button
//             onClick={onNext}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Flashcard;
import { motion, AnimatePresence } from "framer-motion";
import { useFlashCardStore } from "../store/flashCardStore";

interface FlashcardProps {
  front: string;
  back: string;
}

// Using a function declaration instead of React.FC can help avoid some typing issues.
export default function Flashcard({ front, back }: FlashcardProps) {
  const { studyState, flipCard } = useFlashCardStore();
  const { isFlipped } = studyState;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-2 sm:p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 cursor-pointer min-h-[250px] flex items-center justify-center"
            onClick={() => flipCard()}
          >
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
                {isFlipped ? back : front}
              </h2>
              <p className="text-xs text-gray-400 mt-3">Click to flip</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
