import { useState, useCallback } from 'react';
import OpeningAnimation from '@/components/OpeningAnimation';
import HomePage from '@/components/HomePage';
import CardSelection from '@/components/CardSelection';
import ResultsPage from '@/components/ResultsPage';
import RecordsPage from '@/components/RecordsPage';
import { spreadTypes, SelectedCard } from '@/data/tarotData';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

type AppPhase = 'opening' | 'home' | 'selection' | 'results' | 'records';

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>('opening');
  const [question, setQuestion] = useState('');
  const [spreadId, setSpreadId] = useState(1);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  const handleStartReading = useCallback((q: string, sId: number) => {
    setQuestion(q);
    setSpreadId(sId);
    setPhase('selection');
  }, []);

  const handleCardsComplete = useCallback((cards: SelectedCard[]) => {
    setSelectedCards(cards);
    setPhase('results');
  }, []);

  const spread = spreadTypes.find(s => s.id === spreadId);

  return (
    <div className="min-h-screen bg-background relative">
      {phase === 'opening' && (
        <OpeningAnimation onComplete={() => setPhase('home')} />
      )}

      {phase === 'home' && (
        <div className="relative">
          <HomePage onStartReading={handleStartReading} />
          {/* Records button */}
          <motion.button
            onClick={() => setPhase('records')}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-foreground hover:border-primary/40 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm font-display">復盤紀錄庫</span>
          </motion.button>
        </div>
      )}

      {phase === 'selection' && (
        <CardSelection
          spreadId={spreadId}
          onComplete={handleCardsComplete}
          onBack={() => setPhase('home')}
        />
      )}

      {phase === 'results' && (
        <ResultsPage
          question={question}
          spreadName={spread?.name || ''}
          cards={selectedCards}
          onBack={() => setPhase('selection')}
          onHome={() => setPhase('home')}
        />
      )}

      {phase === 'records' && (
        <RecordsPage onBack={() => setPhase('home')} />
      )}
    </div>
  );
};

export default Index;
