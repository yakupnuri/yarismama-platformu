import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedScoreProps {
  score: number;
  previousScore: number;
  color: string;
}

export const AnimatedScore = ({ score, previousScore, color }: AnimatedScoreProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const difference = score - previousScore;

  useEffect(() => {
    if (difference > 0) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [score, difference]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showAnimation && difference > 0 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ 
                  scale: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 1
                }}
                animate={{
                  scale: [1, 1.2, 0],
                  x: [-20, 0],
                  y: [-20, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                className="absolute -top-4 -right-4"
              >
                <Star className="w-4 h-4" style={{ color }} fill={color} />
              </motion.div>
            ))}
            <motion.div
              initial={{ y: -20, x: 20, scale: 1.5, opacity: 1 }}
              animate={{ y: 0, x: 0, scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-6 right-0 font-bold"
              style={{ color }}
            >
              +{difference}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.div
        key={score}
        initial={{ scale: difference > 0 ? 1.2 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold"
        style={{ color }}
      >
        {score}
      </motion.div>
    </div>
  );
};