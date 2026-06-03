import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const StickyMobileCTA = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname !== "/" || dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
        >
          <div className="glass-card flex items-center gap-2 rounded-2xl p-2 shadow-primary-tint-lg">
            <Button asChild variant="hero" className="h-11 flex-1 rounded-xl text-sm">
              <Link to="/dashboard">
                <Sparkles className="h-4 w-4" /> Start free · no card
              </Link>
            </Button>
            <button
              aria-label="Dismiss"
              onClick={() => setDismissed(true)}
              className="grid h-11 w-11 place-items-center rounded-xl text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};