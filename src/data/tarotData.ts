export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  element?: string;
}

export const majorArcana: TarotCard[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', arcana: 'major', uprightMeaning: '新的開始、冒險、自由、天真、無限可能', reversedMeaning: '魯莽、冒險過度、猶豫不決、缺乏計劃', keywords: ['開始', '冒險', '自由'], element: '風' },
  { id: 1, name: '魔術師', nameEn: 'The Magician', arcana: 'major', uprightMeaning: '創造力、意志力、技能、自信、行動力', reversedMeaning: '欺騙、操控、才能未發揮、缺乏方向', keywords: ['創造', '意志', '行動'], element: '水星' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', arcana: 'major', uprightMeaning: '直覺、潛意識、神秘、內在智慧、靜待時機', reversedMeaning: '忽略直覺、表面化、秘密被揭露、焦躁', keywords: ['直覺', '智慧', '神秘'], element: '月亮' },
  { id: 3, name: '皇后', nameEn: 'The Empress', arcana: 'major', uprightMeaning: '豐收、母性、美麗、自然、滋養', reversedMeaning: '依賴、過度保護、創意阻塞、忽略自我', keywords: ['豐收', '滋養', '美麗'], element: '金星' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', arcana: 'major', uprightMeaning: '權威、結構、穩定、領導力、紀律', reversedMeaning: '控制欲、僵化、暴政、缺乏彈性', keywords: ['權威', '穩定', '領導'], element: '白羊座' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', arcana: 'major', uprightMeaning: '傳統、信仰、指導、教育、精神導師', reversedMeaning: '打破傳統、反叛、教條主義、不良建議', keywords: ['傳統', '信仰', '指導'], element: '金牛座' },
  { id: 6, name: '戀人', nameEn: 'The Lovers', arcana: 'major', uprightMeaning: '愛情、選擇、和諧、價值觀、結合', reversedMeaning: '不和諧、錯誤選擇、價值觀衝突、分離', keywords: ['愛', '選擇', '和諧'], element: '雙子座' },
  { id: 7, name: '戰車', nameEn: 'The Chariot', arcana: 'major', uprightMeaning: '意志力、勝利、決心、掌控、前進', reversedMeaning: '失控、缺乏方向、侵略性、自我懷疑', keywords: ['勝利', '決心', '前進'], element: '巨蟹座' },
  { id: 8, name: '力量', nameEn: 'Strength', arcana: 'major', uprightMeaning: '勇氣、耐心、內在力量、慈悲、影響力', reversedMeaning: '自我懷疑、軟弱、缺乏自信、粗暴', keywords: ['勇氣', '力量', '慈悲'], element: '獅子座' },
  { id: 9, name: '隱者', nameEn: 'The Hermit', arcana: 'major', uprightMeaning: '內省、獨處、智慧、尋求真理、指引', reversedMeaning: '孤立、逃避、孤獨、拒絕幫助', keywords: ['內省', '智慧', '獨處'], element: '處女座' },
  { id: 10, name: '命運之輪', nameEn: 'Wheel of Fortune', arcana: 'major', uprightMeaning: '命運、轉變、循環、機運、關鍵時刻', reversedMeaning: '厄運、抗拒改變、失控、停滯', keywords: ['命運', '轉變', '循環'], element: '木星' },
  { id: 11, name: '正義', nameEn: 'Justice', arcana: 'major', uprightMeaning: '公正、真相、因果、平衡、責任', reversedMeaning: '不公、逃避責任、偏見、欺騙', keywords: ['公正', '真相', '平衡'], element: '天秤座' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', arcana: 'major', uprightMeaning: '犧牲、等待、新視角、放下、頓悟', reversedMeaning: '拖延、無意義的犧牲、固執、停滯', keywords: ['犧牲', '等待', '頓悟'], element: '水' },
  { id: 13, name: '死神', nameEn: 'Death', arcana: 'major', uprightMeaning: '結束、轉變、蛻變、放下舊事物、重生', reversedMeaning: '抗拒改變、停滯不前、恐懼、無法放下', keywords: ['結束', '轉變', '重生'], element: '天蠍座' },
  { id: 14, name: '節制', nameEn: 'Temperance', arcana: 'major', uprightMeaning: '平衡、耐心、調和、中庸、療癒', reversedMeaning: '失衡、過度、衝突、缺乏耐心', keywords: ['平衡', '耐心', '調和'], element: '射手座' },
  { id: 15, name: '惡魔', nameEn: 'The Devil', arcana: 'major', uprightMeaning: '束縛、慾望、物質主義、陰暗面、誘惑', reversedMeaning: '解脫、打破束縛、覺醒、重獲自由', keywords: ['束縛', '慾望', '誘惑'], element: '摩羯座' },
  { id: 16, name: '高塔', nameEn: 'The Tower', arcana: 'major', uprightMeaning: '突變、崩塌、覺醒、真相揭露、解放', reversedMeaning: '逃避災難、恐懼改變、延遲崩塌', keywords: ['突變', '崩塌', '覺醒'], element: '火星' },
  { id: 17, name: '星星', nameEn: 'The Star', arcana: 'major', uprightMeaning: '希望、靈感、寧靜、信念、更新', reversedMeaning: '失望、缺乏信心、消極、疏離', keywords: ['希望', '靈感', '信念'], element: '水瓶座' },
  { id: 18, name: '月亮', nameEn: 'The Moon', arcana: 'major', uprightMeaning: '幻覺、恐懼、潛意識、不確定、直覺', reversedMeaning: '走出迷霧、釋放恐懼、真相浮現', keywords: ['幻覺', '恐懼', '直覺'], element: '雙魚座' },
  { id: 19, name: '太陽', nameEn: 'The Sun', arcana: 'major', uprightMeaning: '喜悅、成功、活力、樂觀、光明', reversedMeaning: '暫時低潮、過度樂觀、延遲的成功', keywords: ['喜悅', '成功', '光明'], element: '太陽' },
  { id: 20, name: '審判', nameEn: 'Judgement', arcana: 'major', uprightMeaning: '覺醒、重生、召喚、反省、寬恕', reversedMeaning: '自我懷疑、逃避審視、拒絕改變', keywords: ['覺醒', '重生', '反省'], element: '冥王星' },
  { id: 21, name: '世界', nameEn: 'The World', arcana: 'major', uprightMeaning: '完成、成就、圓滿、整合、旅程結束', reversedMeaning: '未完成、缺乏結束感、延遲、不完整', keywords: ['完成', '圓滿', '成就'], element: '土星' },
];

const suits = [
  { name: '權杖', nameEn: 'Wands', element: '火' },
  { name: '聖杯', nameEn: 'Cups', element: '水' },
  { name: '寶劍', nameEn: 'Swords', element: '風' },
  { name: '錢幣', nameEn: 'Pentacles', element: '土' },
];

const courtCards = ['侍者', '騎士', '皇后', '國王'];
const courtCardsEn = ['Page', 'Knight', 'Queen', 'King'];

const numberNames = ['王牌', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const minorMeanings: Record<string, { upright: string; reversed: string; keywords: string[] }[]> = {
  '權杖': [
    { upright: '靈感、新計劃、創造力、潛力', reversed: '延遲、猶豫、缺乏方向', keywords: ['靈感', '潛力'] },
    { upright: '規劃、決策、遠見、主導權', reversed: '恐懼、缺乏計劃、猶豫', keywords: ['規劃', '決策'] },
    { upright: '擴展、前瞻、領導、進步', reversed: '障礙、延遲、缺乏遠見', keywords: ['擴展', '進步'] },
    { upright: '慶祝、和諧、家庭、穩定', reversed: '不穩定、衝突、缺乏支持', keywords: ['慶祝', '穩定'] },
    { upright: '競爭、衝突、緊張、挑戰', reversed: '避免衝突、內在衝突、和解', keywords: ['競爭', '挑戰'] },
    { upright: '勝利、認可、自信、領導', reversed: '驕傲、失敗、缺乏認可', keywords: ['勝利', '認可'] },
    { upright: '防禦、堅持、勇氣、立場', reversed: '退讓、不堪重負、放棄', keywords: ['防禦', '堅持'] },
    { upright: '快速行動、變化、旅行、衝勁', reversed: '延遲、挫折、混亂', keywords: ['行動', '變化'] },
    { upright: '堅韌、毅力、考驗、邊界', reversed: '疲憊、固執、偏執', keywords: ['堅韌', '考驗'] },
    { upright: '負擔、責任、壓力、艱難', reversed: '釋放壓力、委託、放下', keywords: ['負擔', '壓力'] },
    { upright: '探索、熱情、自由、冒險', reversed: '挫折、缺乏方向、不成熟', keywords: ['探索', '熱情'] },
    { upright: '行動力、衝勁、熱情、勇敢', reversed: '急躁、魯莽、延遲', keywords: ['行動', '勇敢'] },
    { upright: '魅力、決心、創造力、熱情', reversed: '暴躁、操控、缺乏方向', keywords: ['魅力', '創造'] },
    { upright: '遠見、領導、企業家精神、自信', reversed: '獨裁、衝動、高期望', keywords: ['遠見', '領導'] },
  ],
  '聖杯': [
    { upright: '新感情、直覺、情感開始、愛', reversed: '情感阻塞、空虛、錯失機會', keywords: ['愛', '直覺'] },
    { upright: '合作、吸引、連結、友誼', reversed: '失衡、分離、誤解', keywords: ['合作', '連結'] },
    { upright: '慶祝、友誼、創意、社交', reversed: '過度放縱、孤立、失去連結', keywords: ['慶祝', '友誼'] },
    { upright: '冷漠、不滿、沉思、重新評估', reversed: '覺醒、新機會、接受', keywords: ['沉思', '評估'] },
    { upright: '失去、悲傷、遺憾、失望', reversed: '接受、前進、寬恕、找回希望', keywords: ['失去', '悲傷'] },
    { upright: '懷舊、童年回憶、天真、喜悅', reversed: '活在過去、不切實際、幼稚', keywords: ['懷舊', '天真'] },
    { upright: '幻想、選擇、想像、白日夢', reversed: '誘惑、幻覺、面對現實', keywords: ['幻想', '選擇'] },
    { upright: '離開、放下、尋求真理、轉變', reversed: '恐懼改變、逃避、執著', keywords: ['離開', '轉變'] },
    { upright: '滿足、感恩、願望成真、豐盛', reversed: '不滿足、貪婪、物質主義', keywords: ['滿足', '豐盛'] },
    { upright: '幸福、和諧、家庭、情感圓滿', reversed: '不和諧、價值觀衝突、家庭問題', keywords: ['幸福', '圓滿'] },
    { upright: '直覺、敏感、藝術性、夢想', reversed: '情緒化、不切實際、脆弱', keywords: ['直覺', '夢想'] },
    { upright: '浪漫、魅力、理想主義、溫柔', reversed: '情緒不穩、不切實際、嫉妒', keywords: ['浪漫', '溫柔'] },
    { upright: '慈悲、直覺、情感安全、關懷', reversed: '情緒依賴、控制、不安全感', keywords: ['慈悲', '關懷'] },
    { upright: '情感成熟、慷慨、智慧、外交', reversed: '情感操控、冷漠、壓抑', keywords: ['成熟', '智慧'] },
  ],
  '寶劍': [
    { upright: '真相、清晰、突破、新想法', reversed: '混亂、誤解、粗暴的真相', keywords: ['真相', '突破'] },
    { upright: '抉擇、僵局、平衡、否認', reversed: '猶豫不決、資訊過多、焦慮', keywords: ['抉擇', '平衡'] },
    { upright: '心痛、悲傷、分離、背叛', reversed: '恢復、釋放、寬恕', keywords: ['心痛', '分離'] },
    { upright: '休息、恢復、沉思、退隱', reversed: '不安、倦怠、需要休息', keywords: ['休息', '恢復'] },
    { upright: '衝突、失敗、爭鬥、自私', reversed: '和解、原諒、前進', keywords: ['衝突', '失敗'] },
    { upright: '過渡、改變、離開、前行', reversed: '停滯、抗拒改變、未完成的事', keywords: ['過渡', '改變'] },
    { upright: '欺騙、策略、狡猾、機智', reversed: '坦白、良心發現、自我欺騙', keywords: ['策略', '機智'] },
    { upright: '限制、束縛、無力、受害者心態', reversed: '自我釋放、新視角、力量', keywords: ['限制', '束縛'] },
    { upright: '焦慮、噩夢、絕望、內在恐懼', reversed: '希望、面對恐懼、恢復', keywords: ['焦慮', '恐懼'] },
    { upright: '結束、失敗、痛苦、最深的低谷', reversed: '重生、恢復、度過最壞的時期', keywords: ['結束', '重生'] },
    { upright: '好奇、求知、觀察、真相追求', reversed: '八卦、欺騙、冷漠', keywords: ['好奇', '求知'] },
    { upright: '果斷、直接、知識、獨立', reversed: '冷酷、衝動、缺乏同理心', keywords: ['果斷', '獨立'] },
    { upright: '獨立、洞察力、直覺、坦率', reversed: '冷酷、報復、情緒壓抑', keywords: ['獨立', '洞察'] },
    { upright: '權威、真相、紀律、理性', reversed: '暴政、操控、冷酷', keywords: ['權威', '理性'] },
  ],
  '錢幣': [
    { upright: '新機會、繁榮、潛力、物質', reversed: '錯失機會、缺乏規劃、不穩定', keywords: ['機會', '繁榮'] },
    { upright: '平衡、適應、多任務、靈活', reversed: '失衡、過度忙碌、缺乏優先順序', keywords: ['平衡', '靈活'] },
    { upright: '團隊合作、技能、學習、精通', reversed: '缺乏團隊精神、平庸、不專注', keywords: ['技能', '學習'] },
    { upright: '安全、控制、穩定、節儉', reversed: '貪婪、執著、恐懼失去', keywords: ['安全', '穩定'] },
    { upright: '困難、貧困、不安全感、孤立', reversed: '恢復、精神上的豐富、改善', keywords: ['困難', '不安'] },
    { upright: '慷慨、給予、分享、繁榮', reversed: '自私、債務、條件性的給予', keywords: ['慷慨', '繁榮'] },
    { upright: '耐心、長期投資、收穫、評估', reversed: '焦躁、短視、收穫不足', keywords: ['耐心', '收穫'] },
    { upright: '勤奮、專注、技能、品質', reversed: '缺乏專注、平庸、捷徑', keywords: ['勤奮', '品質'] },
    { upright: '富裕、獨立、自信、成就', reversed: '過度物質、孤立、表面成功', keywords: ['富裕', '成就'] },
    { upright: '遺產、家族、傳承、長期成功', reversed: '家族問題、財務損失、不穩定', keywords: ['傳承', '成功'] },
    { upright: '學習、機會、實際、新技能', reversed: '缺乏進展、錯失機會、不專注', keywords: ['學習', '實際'] },
    { upright: '冒險、實際、可靠、努力', reversed: '停滯、懶惰、缺乏效率', keywords: ['努力', '可靠'] },
    { upright: '豐盛、安全、家庭、實際智慧', reversed: '不安全感、過度依賴、忽略自我', keywords: ['豐盛', '安全'] },
    { upright: '財富、安全、成功、領導力', reversed: '貪婪、過度物質、控制', keywords: ['財富', '領導'] },
  ],
};

function generateMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  let id = 22;
  for (const suit of suits) {
    const meanings = minorMeanings[suit.name];
    for (let i = 0; i < 14; i++) {
      const isCourtCard = i >= 10;
      const name = isCourtCard
        ? `${suit.name}${courtCards[i - 10]}`
        : `${suit.name}${numberNames[i]}`;
      const nameEn = isCourtCard
        ? `${courtCardsEn[i - 10]} of ${suit.nameEn}`
        : `${i === 0 ? 'Ace' : (i + 1).toString()} of ${suit.nameEn}`;
      
      cards.push({
        id: id++,
        name,
        nameEn,
        arcana: 'minor',
        suit: suit.name,
        uprightMeaning: meanings[i].upright,
        reversedMeaning: meanings[i].reversed,
        keywords: meanings[i].keywords,
        element: suit.element,
      });
    }
  }
  return cards;
}

export const minorArcana = generateMinorArcana();
export const allTarotCards: TarotCard[] = [...majorArcana, ...minorArcana];

export const spreadTypes = [
  { id: 1, name: '單牌指引', count: 1, description: '命運的一道光芒', positions: ['指引'] },
  { id: 2, name: '二選一', count: 2, description: '兩條命運之路', positions: ['選項一', '選項二'] },
  { id: 3, name: '時間之流', count: 3, description: '過去・現在・未來', positions: ['過去', '現在', '未來'] },
  { id: 5, name: '五芒星陣', count: 5, description: '五重能量交匯', positions: ['現況', '挑戰', '過去', '未來', '建議'] },
  { id: 6, name: '六芒星陣', count: 6, description: '六道能量之門', positions: ['過去', '現在', '未來', '建議', '環境', '結果'] },
  { id: 7, name: '七星陣', count: 7, description: '七曜星辰排列', positions: ['過去', '現在', '隱藏因素', '建議', '環境', '希望', '結果'] },
  { id: 8, name: '八方陣', count: 8, description: '八方能量匯聚', positions: ['現況', '障礙', '意識', '潛意識', '過去', '未來', '自我', '結果'] },
  { id: 10, name: '凱爾特十字', count: 10, description: '最經典的命運全觀', positions: ['現況', '挑戰', '過去', '未來', '意識', '潛意識', '自我認知', '環境', '希望/恐懼', '最終結果'] },
];

export type ReadingStyle = 'gentle' | 'rational' | 'wise';
export type ReReadingStyle = 'action' | 'psychological' | 'spiritual';

export interface SelectedCard {
  card: TarotCard;
  isReversed: boolean;
  position: string;
}

export interface ReadingRecord {
  id: string;
  date: string;
  question: string;
  spreadName: string;
  cards: SelectedCard[];
  style: ReadingStyle;
  report: string;
  score: number;
  scoreDescription: string;
}
