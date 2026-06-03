import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  words: string[];
  duration?: number;
  className?: string;
}

export const WordRotate = ({ words, duration = 2400, className }: Props) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), duration);
    return () => clearInterval(t);
  }, [words.length, duration]);

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};