export interface WineVAKQuestion {
  id: number;
  type: 'V' | 'A' | 'K';
  question: string;
}

export interface WineVAKScores {
  V: number;
  A: number;
  K: number;
}

export interface WineVAKTypeInfo {
  title: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  wineAdvice: string[];
  businessAdvice: string[];
  recommendedExperience: string[];
}

// 12問の質問（ワイン版）
export const WINE_VAK_QUESTIONS: WineVAKQuestion[] = [
  { id: 1, type: 'V', question: 'ワインを選ぶとき、ボトルのラベルやデザインが気になる' },
  { id: 2, type: 'V', question: 'グラスに注がれたワインの色や透明度をまず観察する' },
  { id: 3, type: 'V', question: 'ワインを楽しむとき、テーブルセッティングや雰囲気も大切にする' },
  { id: 4, type: 'V', question: 'ワインの印象を写真や画像で記録したくなる' },
  
  { id: 5, type: 'A', question: 'ワインを選ぶとき、ソムリエや店員の説明を聞きたい' },
  { id: 6, type: 'A', question: 'ワインの産地や製造方法の話を聞くのが好きだ' },
  { id: 7, type: 'A', question: 'ワインの味わいを言葉で表現するのが得意だ' },
  { id: 8, type: 'A', question: 'ワイン会では、他の人の感想や評価を聞くのが楽しい' },
  
  { id: 9, type: 'K', question: 'ワインを楽しむとき、まず香りを嗅ぐのが大切だ' },
  { id: 10, type: 'K', question: 'ワインは実際に飲んでみないと良し悪しが分からない' },
  { id: 11, type: 'K', question: 'ワインと料理のペアリングを実際に試すのが好きだ' },
  { id: 12, type: 'K', question: 'ワインの温度や口当たりなど、体感を大切にする' },
];

// タイプ情報（ワイン版）
export const WINE_TYPE_INFO: Record<'V' | 'A' | 'K' | 'balanced', WineVAKTypeInfo> = {
  V: {
    title: '👁️ Visual型（視覚派）',
    subtitle: 'ワインの見た目を楽しむタイプ',
    description: 'あなたは、視覚的な情報から楽しみや理解を得るタイプです。ワインでは色や輝きに注目し、ビジネスでは資料やデータを重視します。',
    characteristics: [
      '視覚的な美しさや情報から深い印象を受ける',
      '見た目やプレゼンテーションを大切にする',
      '図やグラフ、写真などで記憶しやすい',
      '全体像を把握するのが得意'
    ],
    wineAdvice: [
      'ワインの色の変化（熟成による色の違い）を楽しみましょう',
      'グラスの形状による見た目の変化に注目してみてください',
      '透明度や輝きから、ワインの品質を判断できます',
      'テーブルコーディネートも含めてワインを楽しみましょう'
    ],
    businessAdvice: [
      '相手にプレゼンするときは、視覚資料を効果的に使いましょう',
      'あなた自身の見た目や身だしなみも、信頼構築の重要な要素です',
      '相手の表情やボディランゲージから多くを読み取れます',
      'ホワイトボードや図解を使った説明が得意です'
    ],
    recommendedExperience: [
      'ワイナリー見学（景色の美しい産地）',
      'プレゼンテーション研修やデザイン講座',
      'コーチングスキルを学ぶ（相手の非言語情報を読み取る）',
      'ビジュアルファシリテーション講座'
    ]
  },
  A: {
    title: '👂 Auditory型（聴覚派）',
    subtitle: 'ワインの物語を楽しむタイプ',
    description: 'あなたは、言葉や会話を通じて理解を深めるタイプです。ワインではストーリーに耳を傾け、ビジネスでは対話を通じて信頼関係を築きます。',
    characteristics: [
      '会話や説明を通じて深く理解できる',
      'ストーリーや背景に興味を持つ',
      '言葉で表現するのが得意',
      '相手の話をじっくり聞くことができる'
    ],
    wineAdvice: [
      'ソムリエのいるレストランで説明を聞いてみましょう',
      'ワインの歴史やストーリーを学ぶと、より深く楽しめます',
      'テイスティングノートを言葉で記録するのがおすすめ',
      'ワイン仲間との会話で、新たな発見があるでしょう'
    ],
    businessAdvice: [
      '相手の話をじっくり聞くことで、深い信頼関係を築けます',
      '電話やオンライン会議でも効果的にコミュニケーションできます',
      '声のトーンから相手の本音や感情を読み取れます',
      'ストーリーを交えた説明で、相手の心を動かせます'
    ],
    recommendedExperience: [
      'ソムリエによるワインセミナー',
      'コーチング講座（傾聴スキルを磨く）',
      'プレゼンテーション研修（ストーリーテリング）',
      'ファシリテーション講座'
    ]
  },
  K: {
    title: '✋ Kinesthetic型（体感派）',
    subtitle: 'ワインを体で感じるタイプ',
    description: 'あなたは、実際の体験を通じて理解を深めるタイプです。ワインでは五感で味わい、ビジネスでは実践を通じて学びます。',
    characteristics: [
      '実際に体験することで深く理解できる',
      '直感や雰囲気を大切にする',
      '体で感じる感覚に敏感',
      'まず行動してみることを好む'
    ],
    wineAdvice: [
      'さまざまなワインを実際に飲み比べてみましょう',
      '香りの変化（グラスを回す前後）を楽しんでください',
      '温度による味の変化を体感してみましょう',
      '料理とのペアリングを積極的に試してみてください'
    ],
    businessAdvice: [
      '実践的なワークショップやロールプレイが効果的です',
      '現場や実物を見て判断することで、的確な決断ができます',
      '相手の雰囲気や場の空気を読み取るのが得意です',
      'デモやサンプルを使った説明で、相手を動かせます'
    ],
    recommendedExperience: [
      'ブラインドテイスティングイベント',
      'コーチング実践講座（ロールプレイ中心）',
      'チームビルディング研修',
      'リーダーシップ体験型ワークショップ'
    ]
  },
  balanced: {
    title: '🌟 バランス型',
    subtitle: 'すべての楽しみ方をマスターするタイプ',
    description: 'あなたは、視覚・聴覚・体感覚のすべてをバランスよく使えるタイプです。状況に応じて柔軟にコミュニケーションスタイルを変えられる才能があります。',
    characteristics: [
      '視覚的情報、会話、体験のすべてから学べる',
      '相手や場面に合わせて、アプローチを変えられる',
      '多様な側面を理解し、説明できる',
      'あらゆるタイプの人とコミュニケーションが取れる'
    ],
    wineAdvice: [
      'あなたの多角的な視点を活かして、ワインを深く理解しましょう',
      '初心者に教える立場としても適性があります',
      'さまざまなタイプの人と一緒にワインを楽しむと、新たな発見があります',
      'ワインの総合的な評価ができる強みを活かしましょう'
    ],
    businessAdvice: [
      '相手のタイプを見極めて、最適なアプローチを選べます',
      'チームの多様性を活かしたマネジメントができます',
      '資料・対話・実践を組み合わせた効果的な提案ができます',
      'コーチやファシリテーターとして高い適性があります'
    ],
    recommendedExperience: [
      'ワインセミナー（総合的な学び）',
      'コーチング資格取得講座',
      'チームビルディング研修',
      'プロジェクトマネジメント講座'
    ]
  }
};

// スコア計算
export function calculateWineScores(answers: Record<number, number>): WineVAKScores {
  const scores: WineVAKScores = { V: 0, A: 0, K: 0 };
  
  WINE_VAK_QUESTIONS.forEach(q => {
    const answer = answers[q.id];
    if (answer) {
      scores[q.type] += answer;
    }
  });
  
  return scores;
}

// 優勢タイプ判定
export function getDominantWineType(scores: WineVAKScores): 'V' | 'A' | 'K' | 'balanced' {
  const maxScore = Math.max(scores.V, scores.A, scores.K);
  const minScore = Math.min(scores.V, scores.A, scores.K);
  
  // バランス型判定（差が3未満）
  if (maxScore - minScore < 3) {
    return 'balanced';
  }
  
  // 優勢型判定
  if (scores.V === maxScore) return 'V';
  if (scores.A === maxScore) return 'A';
  return 'K';
}

// タイプ名取得
export function getWineTypeName(type: 'V' | 'A' | 'K' | 'balanced'): string {
  return WINE_TYPE_INFO[type].title;
}

// タイプ別締めくくり文言
export function getWineTypeClosing(type: 'V' | 'A' | 'K' | 'balanced'): string {
  const closings = {
    V: 'この視覚的な才能は、ビジネスのプレゼンテーションやコーチングで相手の表情を読み取る力として活かせます。',
    A: 'この傾聴の才能は、ビジネスの交渉やコーチングで相手の本音を引き出す力として活かせます。',
    K: 'この体感の才能は、ビジネスの現場判断やコーチングで相手の感情を察知する力として活かせます。',
    balanced: 'この柔軟性は、ビジネスのリーダーシップやコーチングで多様な人を導く力として活かせます。'
  };
  return closings[type];
}
