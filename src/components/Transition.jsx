import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const calculateRandomBlockDelay = (rowIndex, totalRows) => {
  const blockDelay = Math.random() * 0.5;
  const rowDelay = rowIndex * 0.05;
  return blockDelay + rowDelay;
};

const Transition = (Page) => {
  return () => {
    const [showTransitionIn, setShowTransitionIn] = useState(true);
    const [showTransitionOut, setShowTransitionOut] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // Show transition-in
      setShowTransitionIn(true);
      setShowTransitionOut(false);

      // After 2s, show transition-out
      const timer1 = setTimeout(() => {
        setShowTransitionIn(false);
        setShowTransitionOut(true);
      }, 2000);


      // After 4s, navigate
      const timer2 = setTimeout(() => {
        navigate(location.pathname);
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, [location.pathname, navigate]);

    return (
      <>
        <Page />

        <AnimatePresence>
          {showTransitionIn && (
            <div className="blocks-container transition-in">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                  {Array.from({ length: 11 }).map((_, blockIndex) => (
                    <motion.div
                      key={blockIndex}
                      className="block"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: calculateRandomBlockDelay(rowIndex, 10),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTransitionOut && (
            <div className="blocks-container transition-out">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                  {Array.from({ length: 11 }).map((_, blockIndex) => (
                    <motion.div
                      key={blockIndex}
                      className="block"
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: 0 }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: calculateRandomBlockDelay(rowIndex, 10),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </>
    );
  };
};

export default Transition;
