import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => onComplete(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: 'hsl(270 30% 6%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Energy rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              borderColor: i % 2 === 0 ? 'hsl(330 100% 55% / 0.3)' : 'hsl(180 100% 50% / 0.2)',
              width: 100 + i * 80,
              height: 100 + i * 80,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: phase >= 1 ? [0, 1.2, 1] : 0,
              opacity: phase >= 1 ? [0, 0.8, 0.4] : 0,
              rotate: phase >= 1 ? [0, 90 * (i % 2 === 0 ? 1 : -1)] : 0,
            }}
            transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(330 100% 55% / 0.6), hsl(270 60% 50% / 0.3), transparent)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase >= 1 ? [0, 2, 1.5] : 0,
            opacity: phase >= 1 ? [0, 1, 0.6] : 0,
          }}
          transition={{ duration: 1.2 }}
        />

        {/* Particles */}
        {phase >= 1 && Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 120 + Math.random() * 100;
          return (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: ['hsl(330 100% 55%)', 'hsl(180 100% 50%)', 'hsl(50 100% 55%)', 'hsl(270 60% 50%)'][i % 4],
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
            />
          );
        })}

        {/* Text */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-display text-gradient-mystic font-bold tracking-wider">
            命運的指引
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground tracking-widest">
            福青施老師 ✦ 塔羅復盤學習
          </p>
        </motion.div>

        {/* Ambient glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(270 60% 50% / 0.1), transparent 70%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningAnimation;
