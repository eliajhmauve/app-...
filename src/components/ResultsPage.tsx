import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, BookOpen, RefreshCw, Save, Star } from 'lucide-react';
import { SelectedCard, ReadingStyle, ReReadingStyle, ReadingRecord } from '@/data/tarotData';

interface ResultsPageProps {
  question: string;
  spreadName: string;
  cards: SelectedCard[];
  onBack: () => void;
  onHome: () => void;
}

function generateScore(cards: SelectedCard[]): { score: number; description: string } {
  let base = 50;
  cards.forEach(c => {
    const positiveCards = [0, 1, 3, 6, 8, 10, 14, 17, 19, 21];
    const negativeCards = [12, 13, 15, 16, 18];
    if (positiveCards.includes(c.card.id)) base += c.isReversed ? -3 : 6;
    else if (negativeCards.includes(c.card.id)) base += c.isReversed ? 4 : -5;
    else base += c.isReversed ? -2 : 3;
  });
  const score = Math.max(0, Math.min(100, base + Math.floor(Math.random() * 10 - 5)));
  
  let description = '';
  if (score >= 80) description = '能量充沛，命運之輪正朝著極為順利的方向轉動。宇宙的力量與你同在，這是大膽前行的時刻。';
  else if (score >= 60) description = '整體趨勢良好，能量流動順暢。保持覺察，順應內在指引，成果將逐步顯現。';
  else if (score >= 40) description = '能量處於轉換期，機會與挑戰並存。保持平衡與耐心，在變動中尋找方向。';
  else if (score >= 20) description = '當前能量較為沉重，可能面臨阻礙。這是內省與重新調整的時機，靜待時機轉變。';
  else description = '能量處於低谷期，宇宙提醒你停下腳步，深入反思。每一次低谷都是蛻變的前兆。';
  
  return { score, description };
}

function generateReport(cards: SelectedCard[], style: ReadingStyle, question: string): string {
  const styleLabel = style === 'gentle' ? '溫柔支持' : style === 'rational' ? '寫實理性' : '智慧長者';
  
  let report = `# 🔮 塔羅復盤報告\n\n`;
  report += `> **提問：** ${question}\n\n`;
  report += `> **解讀風格：** ${styleLabel}版\n\n---\n\n`;

  report += `## ✦ 牌面總覽\n\n`;
  
  cards.forEach((c, i) => {
    const orientation = c.isReversed ? '🔄 逆位' : '⬆️ 正位';
    report += `### 第${i + 1}張：${c.position}位 —— **${c.card.name}** ${orientation}\n\n`;
    report += `**英文名稱：** ${c.card.nameEn}\n\n`;
    report += `**牌義解析：** ${c.isReversed ? c.card.reversedMeaning : c.card.uprightMeaning}\n\n`;
    report += `**關鍵詞：** ${c.card.keywords.join('、')}\n\n`;
    
    if (style === 'gentle') {
      report += `**溫柔提醒：** 這張牌輕聲告訴你，無論現在的處境如何，你的內在都擁有足夠的力量去面對。${c.card.name}帶來的能量是一份禮物，提醒你信任生命的流動，允許自己在這段旅程中慢慢綻放。\n\n`;
    } else if (style === 'rational') {
      report += `**理性分析：** 從客觀角度來看，${c.card.name}${c.isReversed ? '逆位' : '正位'}指出當前情境中${c.isReversed ? '可能存在的盲點或需要調整的面向' : '正在運作的有利因素'}。建議以務實的態度，檢視具體可行的行動方案。\n\n`;
    } else {
      report += `**長者箴言：** 「孩子，${c.card.name}的出現並非偶然。在漫長的歲月裡，我見過無數人在這張牌前駐足。它告訴你的，不是答案，而是一個方向——${c.isReversed ? '有時候退後一步，才能看見全貌' : '勇敢地踏出去，路自然會在腳下展開'}。」\n\n`;
    }
    report += `---\n\n`;
  });

  report += `## ✦ 牌面關聯分析\n\n`;
  if (cards.length >= 2) {
    report += `在這組牌面中，**${cards[0].card.name}**與**${cards[cards.length - 1].card.name}**形成了一條從起點到終點的能量軸線。`;
    report += `前者象徵著${cards[0].card.keywords[0]}的能量，後者則指向${cards[cards.length - 1].card.keywords[0]}的方向。`;
    report += `這條軸線告訴我們，整體的發展脈絡是從${cards[0].card.keywords.join('、')}的狀態，逐漸過渡到${cards[cards.length - 1].card.keywords.join('、')}的境界。\n\n`;
  }
  
  const reversedCount = cards.filter(c => c.isReversed).length;
  report += `在${cards.length}張牌中，有${reversedCount}張逆位牌。`;
  if (reversedCount > cards.length / 2) {
    report += `逆位較多意味著當前有較多的內在功課需要處理，宇宙正在邀請你向內探索，釋放舊有的模式。\n\n`;
  } else {
    report += `正位較多代表能量流動順暢，外在的發展與內在的意圖較為一致。\n\n`;
  }

  report += `## ✦ 行動建議\n\n`;
  report += `1. **覺察當下：** 每天花5分鐘靜心冥想，感受${cards[0].card.name}帶給你的能量訊息\n`;
  report += `2. **積極行動：** 根據${cards.length > 1 ? cards[1].card.name : cards[0].card.name}的指引，在本週內採取一個具體的行動步驟\n`;
  report += `3. **釋放阻礙：** 寫下三件讓你感到困擾的事情，然後有意識地選擇放下其中一件\n`;
  report += `4. **保持開放：** 留意生活中出現的${cards[cards.length - 1].card.keywords[0]}相關的訊號和機會\n\n`;

  report += `## ✦ 啟發金句\n\n`;
  report += `> 「命運不是等待你的終點，而是你每一步選擇所鋪就的道路。」\n\n`;
  report += `> 「當你學會聆聽內在的聲音，外在的世界也會開始回應你的呼喚。」\n\n`;

  report += `## ✦ 寓言故事\n\n`;
  report += `從前有一位旅人，在一個月光明亮的夜晚來到了命運的十字路口。他看見前方有${cards.length}盞燈籠，每一盞都閃爍著不同顏色的光芒。\n\n`;
  report += `第一盞燈籠散發著**${cards[0].card.name}**的光芒，照亮了${cards[0].card.keywords[0]}的道路。`;
  if (cards.length > 1) {
    report += `第二盞燈籠則帶來了**${cards[1].card.name}**的能量，讓旅人看見了${cards[1].card.keywords[0]}的可能。`;
  }
  report += `\n\n旅人站在那裡，靜靜地感受每一盞燈籠傳遞的訊息。他終於明白，命運從不是一條固定的路，而是由無數個選擇交織而成的網。每一盞燈籠都是一份禮物，每一個方向都蘊含著智慧。\n\n`;
  report += `最後，旅人微笑著踏上了旅程。他知道，無論選擇了哪條路，只要保持覺察和勇氣，每一步都是通向光明的方向。\n\n`;

  report += `---\n\n`;
  report += `*✦ 此報告由「福星何大師」塔羅復盤學習系統生成，僅供學習參考與內在覺察之用 ✦*\n`;

  return report;
}

const ResultsPage = ({ question, spreadName, cards, onBack, onHome }: ResultsPageProps) => {
  const [style, setStyle] = useState<ReadingStyle>('gentle');
  const [report, setReport] = useState('');
  const [scoreData, setScoreData] = useState({ score: 0, description: '' });
  const [isGenerating, setIsGenerating] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setIsGenerating(true);
    const sd = generateScore(cards);
    setScoreData(sd);
    const timer = setTimeout(() => {
      setReport(generateReport(cards, style, question));
      setIsGenerating(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [style, cards, question]);

  const handleReRead = useCallback((reStyle: ReReadingStyle) => {
    setIsGenerating(true);
    setTimeout(() => {
      let prefix = '';
      if (reStyle === 'action') prefix = '## 🎯 行動建議版再次解讀\n\n此版本聚焦於具體可執行的行動方案，幫助你將牌面的智慧轉化為實際的步驟。\n\n';
      else if (reStyle === 'psychological') prefix = '## 🧠 心理層面版再次解讀\n\n此版本深入探索潛意識的訊息，幫助你理解內在的情感模式與心理動力。\n\n';
      else prefix = '## 🌟 靈性成長版再次解讀\n\n此版本從靈性修行的角度解讀牌面，引導你看見更高維度的生命意義。\n\n';
      
      setReport(prefix + generateReport(cards, style, question));
      setIsGenerating(false);
    }, 1000);
  }, [cards, style, question]);

  const handleSave = useCallback(() => {
    const record: ReadingRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW'),
      question,
      spreadName,
      cards,
      style,
      report,
      score: scoreData.score,
      scoreDescription: scoreData.description,
    };
    const existing = JSON.parse(localStorage.getItem('tarot-records') || '[]');
    existing.unshift(record);
    localStorage.setItem('tarot-records', JSON.stringify(existing));
    setSaved(true);
  }, [question, spreadName, cards, style, report, scoreData]);

  // Simple markdown renderer
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl md:text-3xl font-display font-bold text-gradient-mystic mb-4 mt-6">{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl md:text-2xl font-display font-bold text-accent mt-8 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-display font-bold text-primary mt-6 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary/40 pl-4 my-3 text-foreground/80 italic font-display">{renderInline(line.slice(2))}</blockquote>;
      if (line.startsWith('---')) return <hr key={i} className="my-6 border-border/50" />;
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) return <p key={i} className="text-muted-foreground text-sm italic mt-4">{line.slice(1, -1)}</p>;
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 mb-2 text-foreground/90 list-decimal">{renderInline(line.replace(/^\d+\.\s/, ''))}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-foreground/90 leading-relaxed mb-2">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-bold highlight-pink">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const scoreColor = scoreData.score >= 70 ? 'text-secondary' : scoreData.score >= 40 ? 'text-accent' : 'text-primary';

  return (
    <div className="min-h-screen bg-gradient-dark relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1" whileTap={{ scale: 0.95 }}>
            <RotateCcw className="w-4 h-4" /> 重新選牌
          </motion.button>
          <motion.button onClick={onHome} className="text-muted-foreground hover:text-foreground text-sm" whileTap={{ scale: 0.95 }}>
            返回首頁
          </motion.button>
        </div>

        {/* Cards Summary */}
        <motion.div className="flex flex-wrap gap-2 mb-6 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {cards.map((c, i) => (
            <div key={i} className="px-3 py-2 rounded-lg bg-card border border-border text-center">
              <div className="text-xs text-muted-foreground">{c.position}</div>
              <div className="text-sm font-display font-bold">{c.card.name}</div>
              <div className={`text-xs font-bold ${c.isReversed ? 'text-destructive' : 'text-secondary'}`}>
                {c.isReversed ? '逆位' : '正位'}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Score */}
        <motion.div
          className="mb-8 p-6 rounded-2xl bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm font-display text-accent mb-2">✦ 運勢評分 ✦</div>
          <div className={`text-6xl font-display font-bold ${scoreColor}`}>
            {scoreData.score}
          </div>
          <div className="text-sm text-muted-foreground">/100</div>
          <div className="mt-3 w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-mystic rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${scoreData.score}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
          <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{scoreData.description}</p>
        </motion.div>

        {/* Style Selector */}
        <div className="mb-6">
          <div className="text-sm font-display text-accent mb-3">✦ 解讀風格</div>
          <div className="flex gap-2">
            {[
              { key: 'gentle' as ReadingStyle, label: '溫柔支持' },
              { key: 'rational' as ReadingStyle, label: '寫實理性' },
              { key: 'wise' as ReadingStyle, label: '智慧長者' },
            ].map(s => (
              <motion.button
                key={s.key}
                onClick={() => setStyle(s.key)}
                className={`px-4 py-2 rounded-lg text-sm font-display transition-all ${
                  style === s.key
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-card border border-border text-foreground hover:border-primary/40'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Report */}
        <motion.div
          className="p-6 md:p-8 rounded-2xl bg-card border border-border mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center py-12">
              <motion.div
                className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="mt-4 text-sm text-muted-foreground font-display">命運的訊息正在匯聚中...</p>
            </div>
          ) : (
            <div className="prose-custom">{renderMarkdown(report)}</div>
          )}
        </motion.div>

        {/* Re-read buttons */}
        <div className="mb-6">
          <div className="text-sm font-display text-accent mb-3">✦ 再次解讀（不同視角）</div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'action' as ReReadingStyle, label: '🎯 行動建議版' },
              { key: 'psychological' as ReReadingStyle, label: '🧠 心理層面版' },
              { key: 'spiritual' as ReReadingStyle, label: '🌟 靈性成長版' },
            ].map(s => (
              <motion.button
                key={s.key}
                onClick={() => handleReRead(s.key)}
                className="px-4 py-2 rounded-lg text-sm bg-card border border-border text-foreground hover:border-accent/40 transition-all flex items-center gap-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw className="w-3 h-3" /> {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            onClick={handleSave}
            disabled={saved}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold transition-all ${
              saved
                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                : 'bg-gradient-gold text-accent-foreground shadow-glow-accent'
            }`}
            whileHover={{ scale: saved ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" /> {saved ? '已儲存至復盤紀錄庫' : '儲存至復盤紀錄庫'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
