export interface VAKQuestion {
  id: number;
  type: 'V' | 'A' | 'K';
  question: string;
}

export interface VAKScores {
  V: number;
  A: number;
  K: number;
}

export interface VAKTypeInfo {
  title: string;
  description: string;
  strengths: string[];
  businessTips: string[];
}

// 12問の質問（シャッフル）
// 各タイプ4問ずつ：強い対比1問 + やや対比1問 + 単一特性2問
// タイプと語尾の連続を避ける配置
export const VAK_QUESTIONS: VAKQuestion[] = [
  { id: 1, type: 'A', question: '説明を聞くとき、ストーリーや事例がないと理解しづらい' }, // A: 単一特性
  { id: 2, type: 'K', question: '新しい機器やソフトは、マニュアルよりまず触って試すことが多い' }, // K: 強い対比 K vs V
  { id: 3, type: 'V', question: '道順を説明するとき、地図や絵を描いて説明したくなる' }, // V: 単一特性
  { id: 4, type: 'A', question: 'メールやチャットより、電話や直接話すことが多い' }, // A: 強い対比 A vs K
  { id: 5, type: 'K', question: 'セミナーや研修では、実践やワークショップで学ぶ方が好きだ' }, // K: 単一特性
  { id: 6, type: 'V', question: '複雑な情報でも、図や表、グラフなどで見ると一目で理解できる' }, // V: 単一特性
  { id: 7, type: 'A', question: '声のトーンや話し方から、相手の本音や感情を読み取れる' }, // A: 単一特性
  { id: 8, type: 'K', question: '状況を判断するとき、見た目より雰囲気や空気感で判断することが多い' }, // K: やや対比 K vs V
  { id: 9, type: 'V', question: '初対面の人は、名前より顔や服装を覚えることが多い' }, // V: やや対比 V vs A
  { id: 10, type: 'A', question: '新しいことを決めるとき、実際に試すよりまず話を聞くことが多い' }, // A: やや対比 A vs K
  { id: 11, type: 'V', question: '新しいことを学ぶとき、文章より図やイラストを先に見ることが多い' }, // V: 強い対比 V vs A
  { id: 12, type: 'K', question: '人を理解するには、一緒に何かを体験することで距離が縮まると感じる' }, // K: 単一特性
];

// タイプ情報
export const TYPE_INFO: Record<'V' | 'A' | 'K', VAKTypeInfo> = {
  V: {
    title: '👀 見るタイプ（視覚型）',
    description: '目から入る情報を重視し、見て理解しようとするタイプです。',
    strengths: [
      'データや資料、図解で理解しやすい',
      '相手の表情やボディランゲージを読み取る',
      '視覚的な記憶が得意',
      '見た目や雰囲気を大切にする'
    ],
    businessTips: [
      'プレゼンには視覚資料を効果的に使う',
      '商談では実物やサンプルを見せる',
      'ホワイトボードや図解で説明する',
      '身だしなみや会議室の雰囲気づくりを意識'
    ]
  },
  A: {
    title: '👂 聞くタイプ（聴覚型）',
    description: '耳から入る情報を重視し、会話や説明を通じて理解しようとするタイプです。',
    strengths: [
      '話を聞いて理解するのが得意',
      '会話で信頼関係を築く',
      '声のトーンから感情を読み取る',
      'ストーリーや背景に興味を持つ'
    ],
    businessTips: [
      '丁寧な説明と対話を大切に',
      '電話やオンライン会議を効果的に活用',
      'グループディスカッションに積極参加',
      '相手の話をよく聞き、質問する'
    ]
  },
  K: {
    title: '✋ 体感タイプ（体感覚型）',
    description: '体で感じて理解しようとし、体験や実践を通じて学ぶタイプです。',
    strengths: [
      '実際に体験することで深く理解',
      '直感や雰囲気を大切にする',
      '実践的なアプローチが好き',
      '身体で感じる感覚に敏感'
    ],
    businessTips: [
      '実践的なワークショップに参加',
      'まず試してみる、体験する',
      'ロールプレイで理解を深める',
      '現場や実物を見て判断'
    ]
  }
};

// スコア計算
export function calculateScores(answers: Record<number, number>): VAKScores {
  const scores: VAKScores = { V: 0, A: 0, K: 0 };
  
  VAK_QUESTIONS.forEach(q => {
    const answer = answers[q.id];
    if (answer) {
      scores[q.type] += answer;
    }
  });
  
  return scores;
}

// 優勢タイプ判定
export function getDominantType(scores: VAKScores): 'V' | 'A' | 'K' | 'balanced' {
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
export function getTypeName(type: 'V' | 'A' | 'K' | 'balanced'): string {
  if (type === 'balanced') return 'バランス型';
  const names = {
    V: '見るタイプ（視覚型）',
    A: '聞くタイプ（聴覚型）',
    K: '体感タイプ（体感覚型）'
  };
  return names[type];
}

// タイプ別締めくくり文言
export function getTypeClosing(type: 'V' | 'A' | 'K' | 'balanced'): string {
  const closings = {
    V: '視覚で人を動かすこの才能は、プレゼンテーションや営業で力を発揮します。',
    A: '傾聴で信頼を築くこの才能は、カウンセリングやコーチングで力を発揮します。',
    K: '体感で場を読むこの才能は、現場マネジメントやチーム作りで力を発揮します。',
    balanced: 'あらゆる状況に対応できるこの才能は、チームリーダーやコーチに最適です。'
  };
  return closings[type];
}
