import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { ReadingRecord } from '@/data/tarotData';

interface RecordsPageProps {
  onBack: () => void;
}

const RecordsPage = ({ onBack }: RecordsPageProps) => {
  const [records, setRecords] = useState<ReadingRecord[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tarot-records') || '[]');
    setRecords(saved);
  }, []);

  const handleDelete = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('tarot-records', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative">
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <motion.button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1" whileTap={{ scale: 0.95 }}>
            <RotateCcw className="w-4 h-4" /> 返回首頁
          </motion.button>
          <h2 className="text-xl font-display font-bold text-gradient-mystic">復盤紀錄庫</h2>
          <div className="w-16" />
        </div>

        {records.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-4xl mb-4">📜</div>
            <p className="text-muted-foreground font-display">尚無占卜紀錄</p>
            <p className="text-sm text-muted-foreground/60 mt-2">完成一次占卜後，紀錄將保存在此</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {records.map((record, i) => (
              <motion.div
                key={record.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpanded(expanded === record.id ? null : record.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">{record.date} · {record.spreadName}</div>
                    <div className="text-sm font-display font-bold text-foreground mt-1">{record.question}</div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {record.cards.map((c, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {c.card.name} {c.isReversed ? '↓' : '↑'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-display font-bold text-accent">{record.score}</div>
                      <div className="text-xs text-muted-foreground">分</div>
                    </div>
                    {expanded === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === record.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border overflow-hidden"
                    >
                      <div className="p-4 text-sm text-foreground/80 whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {record.report.slice(0, 500)}...
                      </div>
                      <div className="p-3 border-t border-border flex justify-end">
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> 刪除紀錄
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsPage;
