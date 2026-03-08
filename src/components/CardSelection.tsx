import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, RotateCcw, ChevronRight, Search, X } from 'lucide-react';
import { allTarotCards, spreadTypes, TarotCard, SelectedCard } from '@/data/tarotData';

interface CardSelectionProps {
  spreadId: number;
  onComplete: (cards: SelectedCard[]) => void;
  onBack: () => void;
}

const CardSelection = ({ spreadId, onComplete, onBack }: CardSelectionProps) => {
  const spread = spreadTypes.find((s) => s.id === spreadId)!;
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedSlots, setFlippedSlots] = useState<Set<number>>(new Set());
  const [isShuffling, setIsShuffling] = useState(false);

  const usedCardIds = useMemo(() => new Set(selectedCards.map(c => c.card.id)), [selectedCards]);

  const filteredCards = useMemo(() => {
    if (!searchQuery) return allTarotCards;
    const q = searchQuery.toLowerCase();
    return allTarotCards.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.keywords.some(k => k.includes(q))
    );
  }, [searchQuery]);

  const handleSelectCard = useCallback((card: TarotCard, isReversed: boolean) => {
    const newCard: SelectedCard = {
      card,
      isReversed,
      position: spread.positions[currentSlot],
    };
    setSelectedCards(prev => {
      const updated = [...prev];
      updated[currentSlot] = newCard;
      return updated;
    });
    setShowPicker(false);
    setSearchQuery('');
    // Auto flip after selection
    setTimeout(() => {
      setFlippedSlots(prev => new Set(prev).add(currentSlot));
    }, 300);
  }, [currentSlot, spread.positions]);

  const handleRandomAll = useCallback(() => {
    setIsShuffling(true);
    setFlippedSlots(new Set());
    
    setTimeout(() => {
      const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5);
      const randomCards: SelectedCard[] = spread.positions.map((pos, i) => ({
        card: shuffled[i],
        isReversed: Math.random() > 0.5,
        position: pos,
      }));
      setSelectedCards(randomCards);
      setIsShuffling(false);

      // Flip cards one by one
      randomCards.forEach((_, i) => {
        setTimeout(() => {
          setFlippedSlots(prev => new Set(prev).add(i));
        }, 500 + i * 400);
      });
    }, 1500);
  }, [spread.positions]);

  const allSelected = selectedCards.length === spread.count && selectedCards.every(Boolean);

  const cardColors = ['bg-primary/20', 'bg-secondary/20', 'bg-accent/20', 'bg-mystic/20', 'bg-pop/20'];

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" /> 返回
          </motion.button>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gradient-mystic">
              {spread.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">{spread.description}</p>
          </div>
          <motion.button
            onClick={handleRandomAll}
            disabled={isShuffling}
            className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} /> 隨機
          </motion.button>
        </div>

        {/* Shuffle Animation */}
        <AnimatePresence>
          {isShuffling && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-32 h-48">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-xl bg-gradient-mystic border-2 border-primary/30"
                    animate={{
                      x: [0, (i - 2) * 30, (2 - i) * 20, 0],
                      y: [0, -20, 10, 0],
                      rotate: [0, (i - 2) * 15, (2 - i) * 10, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: 1,
                      ease: 'easeInOut',
                      delay: i * 0.05,
                    }}
                  />
                ))}
                <motion.p
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-accent font-display text-sm whitespace-nowrap"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  洗牌中... ✦
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {spread.positions.map((pos, i) => {
            const card = selectedCards[i];
            const isFlipped = flippedSlots.has(i);

            return (
              <motion.div
                key={i}
                className="card-flip cursor-pointer"
                style={{ height: '200px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  if (!isShuffling) {
                    setCurrentSlot(i);
                    setShowPicker(true);
                  }
                }}
              >
                <div className={`card-flip-inner w-full h-full ${isFlipped && card ? (card.isReversed ? 'flipped-reversed' : 'flipped') : ''}`}>
                  {/* Front - card back */}
                  <div className="card-flip-front rounded-xl border-2 border-border bg-gradient-card flex flex-col items-center justify-center p-3 hover:border-primary/50 transition-all">
                    <div className="text-3xl mb-2">✦</div>
                    <div className="text-xs text-muted-foreground text-center font-display">{pos}</div>
                    <div className="text-xs text-primary/60 mt-2">
                      {card ? '點擊重選' : '點擊選牌'}
                    </div>
                  </div>

                  {/* Back - card face */}
                  {card && (
                    <div className={`card-flip-back rounded-xl border-2 border-primary/30 ${cardColors[i % cardColors.length]} flex flex-col items-center justify-center p-3`}>
                      {/* Energy ripple on reveal */}
                      {isFlipped && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-primary/40 energy-ripple"
                          initial={{ opacity: 0.8 }}
                        />
                      )}
                      <div className="text-xs text-muted-foreground mb-1 font-display">{pos}</div>
                      <div className="text-sm font-display font-bold text-foreground text-center">
                        {card.card.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{card.card.nameEn}</div>
                      <div className={`mt-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                        card.isReversed
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-secondary/20 text-secondary'
                      }`}>
                        {card.isReversed ? '逆位 ↓' : '正位 ↑'}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Proceed Button */}
        <AnimatePresence>
          {allSelected && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                onClick={() => onComplete(selectedCards)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-mystic text-primary-foreground font-display font-bold text-lg shadow-glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                開始解讀命運 <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜尋牌名或關鍵字..."
                    className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => { setShowPicker(false); setSearchQuery(''); }}
                  className="p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-xs text-muted-foreground mb-3 font-display">
                  為「{spread.positions[currentSlot]}」位置選擇一張牌
                </div>

                {/* Major Arcana */}
                <div className="mb-6">
                  <div className="text-sm font-display text-accent mb-2 tracking-wider">✦ 大阿爾克那</div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {filteredCards.filter(c => c.arcana === 'major').map(card => {
                      const isUsed = usedCardIds.has(card.id);
                      return (
                        <CardPickerItem key={card.id} card={card} isUsed={isUsed} onSelect={handleSelectCard} />
                      );
                    })}
                  </div>
                </div>

                {/* Minor Arcana by suit */}
                {['權杖', '聖杯', '寶劍', '錢幣'].map(suit => {
                  const suitCards = filteredCards.filter(c => c.suit === suit);
                  if (suitCards.length === 0) return null;
                  return (
                    <div key={suit} className="mb-6">
                      <div className="text-sm font-display text-accent mb-2 tracking-wider">✦ {suit}</div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                        {suitCards.map(card => {
                          const isUsed = usedCardIds.has(card.id);
                          return (
                            <CardPickerItem key={card.id} card={card} isUsed={isUsed} onSelect={handleSelectCard} />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CardPickerItem = ({
  card,
  isUsed,
  onSelect,
}: {
  card: TarotCard;
  isUsed: boolean;
  onSelect: (card: TarotCard, isReversed: boolean) => void;
}) => {
  const [showOrientation, setShowOrientation] = useState(false);

  if (showOrientation) {
    return (
      <motion.div
        className="p-2 rounded-lg border-2 border-primary bg-card flex flex-col gap-1.5"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={() => onSelect(card, false)}
          className="text-xs py-1.5 rounded bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors font-bold"
        >
          正位 ↑
        </button>
        <button
          onClick={() => onSelect(card, true)}
          className="text-xs py-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors font-bold"
        >
          逆位 ↓
        </button>
        <button
          onClick={() => setShowOrientation(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          取消
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={() => !isUsed && setShowOrientation(true)}
      disabled={isUsed}
      className={`p-2.5 rounded-lg border text-center transition-all text-xs ${
        isUsed
          ? 'border-border/30 bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
          : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-foreground'
      }`}
      whileHover={!isUsed ? { scale: 1.05 } : undefined}
      whileTap={!isUsed ? { scale: 0.95 } : undefined}
    >
      <div className="font-display font-bold text-sm">{card.name}</div>
      <div className="text-muted-foreground mt-0.5" style={{ fontSize: '10px' }}>{card.nameEn}</div>
    </motion.button>
  );
};

export default CardSelection;
