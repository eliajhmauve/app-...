import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, ChevronRight } from 'lucide-react';
import { spreadTypes } from '@/data/tarotData';

interface HomePageProps {
  onStartReading: (question: string, spreadId: number) => void;
}

const HomePage = ({ onStartReading }: HomePageProps) => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    if (!selectedSpread) return;
    onStartReading(question || '自由探索命運的訊息', selectedSpread);
  }, [question, selectedSpread, onStartReading]);

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mystic/3 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">福星何大師</span>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-mystic mb-4 leading-tight">
            塔羅復盤學習
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            聆聽牌卡的智慧，覺察內在的聲音<br />
            讓能量的訊息引導你走向命運的光芒
          </p>
        </motion.div>

        {/* Question Input */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <label className="block text-sm font-display text-accent mb-3 tracking-wider">
            ✦ 向命運提出你的問題
          </label>
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我的感情未來會如何發展？這份工作適合我嗎？"
              className="w-full bg-card/80 backdrop-blur border-2 border-border hover:border-primary/40 focus:border-primary rounded-xl p-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none h-28 font-body"
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/40">
              留空則自由探索
            </div>
          </div>
        </motion.div>

        {/* Spread Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <label className="block text-sm font-display text-accent mb-4 tracking-wider">
            ✦ 選擇命運的牌陣
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {spreadTypes.map((spread) => (
              <motion.button
                key={spread.id}
                onClick={() => setSelectedSpread(spread.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedSpread === spread.id
                    ? 'border-primary bg-primary/10 shadow-glow-primary'
                    : 'border-border bg-card/60 hover:border-primary/40 hover:bg-card'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-2xl font-display font-bold text-gradient-mystic">
                  {spread.count}
                </div>
                <div className="text-sm font-display text-foreground mt-1">
                  {spread.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {spread.description}
                </div>
                {selectedSpread === spread.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"
                    layoutId="spread-indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <AnimatePresence>
          {selectedSpread && (
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={handleStart}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-mystic text-primary-foreground font-display font-bold text-lg shadow-glow-primary transition-all duration-300 hover:brightness-110"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                開始選牌
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 text-xs text-muted-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ✦ 塔羅牌為內在覺察工具，協助反思與學習 ✦
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
