export interface Question {
  id: number;
  text: string;
  type: 'D' | 'E' | 'A' | 'An';
}

export interface Scores {
  D: number;
  E: number;
  A: number;
  An: number;
}

export interface Result {
  scores: Scores;
  dominantType: 'D' | 'E' | 'A' | 'An' | 'Balanced';
  typeName: string;
  description: string;
  strengths: string[];
  businessTips: string[];
  relationshipTips: string[];
  closingMessage: string;
}

export const questions: Question[] = [
  // Driver型（推進型）の質問
  { id: 1, text: '目標達成のためには、多少の犠牲やリスクも厭わない', type: 'D' },
  { id: 2, text: '会議では結論を出すことを優先し、テンポよく進めたい', type: 'D' },
  { id: 3, text: '問題が起きたとき、すぐに解決策を考えて行動に移す', type: 'D' },
  { id: 4, text: 'チームを引っ張り、明確な方向性を示すことが得意だ', type: 'D' },
  
  // Expressive型（表現型）の質問
  { id: 5, text: '新しいアイデアや可能性について話すことが好きだ', type: 'E' },
  { id: 6, text: '初対面の人とでも、すぐに打ち解けて会話を楽しめる', type: 'E' },
  { id: 7, text: 'プレゼンや人前で話すとき、エネルギーが湧いてくる', type: 'E' },
  { id: 8, text: 'チームの雰囲気を盛り上げ、メンバーを鼓舞することができる', type: 'E' },
  
  // Amiable型（協調型）の質問
  { id: 9, text: '人の話をじっくり聞いて、気持ちを理解することを大切にする', type: 'A' },
  { id: 10, text: 'チーム全体の調和を保ち、協力して物事を進めたい', type: 'A' },
  { id: 11, text: '急激な変化よりも、安定した環境で着実に進めることを好む', type: 'A' },
  { id: 12, text: '相手との長期的な信頼関係を築くことを重視する', type: 'A' },
  
  // Analytical型（分析型）の質問
  { id: 13, text: '意思決定する前に、データや事実をしっかり確認したい', type: 'An' },
  { id: 14, text: 'リスクを慎重に評価し、ミスを防ぐための準備を大切にする', type: 'An' },
  { id: 15, text: '物事を論理的に分析し、正確に理解することが得意だ', type: 'An' },
  { id: 16, text: '詳細な計画を立て、手順を踏んで進めることを好む', type: 'An' },
];

// シャッフル関数
export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// スコア計算
export function calculateScores(answers: Record<number, number>): Scores {
  const scores: Scores = { D: 0, E: 0, A: 0, An: 0 };
  
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      scores[question.type] += answer;
    }
  });
  
  return scores;
}

// タイプ判定
export function determineType(scores: Scores): Result {
  const maxScore = Math.max(scores.D, scores.E, scores.A, scores.An);
  const scoreDifference = 3;
  
  // バランス型チェック
  const isBalanced = Object.values(scores).every(
    score => Math.abs(score - maxScore) < scoreDifference
  );
  
  if (isBalanced) {
    return getBalancedResult(scores);
  }
  
  // 優勢型の判定
  if (scores.D === maxScore) return getDriverResult(scores);
  if (scores.E === maxScore) return getExpressiveResult(scores);
  if (scores.A === maxScore) return getAmiableResult(scores);
  return getAnalyticalResult(scores);
}

function getDriverResult(scores: Scores): Result {
  return {
    scores,
    dominantType: 'D',
    typeName: 'Driver型（推進型）',
    description: '結果重視、決断が早い、リーダーシップを発揮するタイプです。目標達成に向けて迅速に行動し、チームを前に進める推進力があります。',
    strengths: [
      '目標達成に向けて迅速に行動',
      '決断力があり、効率を重視',
      'リーダーシップを発揮できる',
      '物事を前に進める推進力'
    ],
    businessTips: [
      'プロジェクトのリーダーとして活躍',
      '迅速な意思決定が求められる場面で力を発揮',
      '明確な目標設定と進行管理',
      '相手がDriver型の場合：結論ファースト、簡潔に伝える'
    ],
    relationshipTips: [
      '結論から話すとスムーズ',
      '無駄を省いた直接的なコミュニケーション',
      '相手の時間を尊重する',
      'データや実績で説得する'
    ],
    closingMessage: 'この推進力を活かして、リーダーシップを発揮していきましょう！'
  };
}

function getExpressiveResult(scores: Scores): Result {
  return {
    scores,
    dominantType: 'E',
    typeName: 'Expressive型（表現型）',
    description: '社交的、情熱的、アイデア豊富で人を巻き込むタイプです。人を惹きつける魅力とエネルギーがあり、チームの雰囲気を明るくします。',
    strengths: [
      '人を惹きつける魅力とエネルギー',
      'クリエイティブで革新的なアイデア',
      'チームの雰囲気を明るくする',
      'ネットワーキングが得意'
    ],
    businessTips: [
      '新規プロジェクトの企画・提案',
      'プレゼンテーションで人を動かす',
      'チームのモチベーションを高める',
      '相手がExpressive型の場合：ビジョンや可能性を語る'
    ],
    relationshipTips: [
      '明るく楽しい雰囲気を作る',
      'ビジョンや夢を共有する',
      'ポジティブなエネルギーで人を鼓舞',
      '一緒に盛り上がる'
    ],
    closingMessage: 'この魅力と情熱を活かして、人を巻き込んでいきましょう！'
  };
}

function getAmiableResult(scores: Scores): Result {
  return {
    scores,
    dominantType: 'A',
    typeName: 'Amiable型（協調型）',
    description: '協力的、聞き上手、安定志向で人を支えるタイプです。他者の気持ちを理解し、チームワークを大切にします。',
    strengths: [
      '他者の気持ちを理解し、共感できる',
      'チームワークを大切にする',
      '安定した関係性を築く',
      '聞き上手で信頼される'
    ],
    businessTips: [
      'チームの調整役として活躍',
      '顧客との長期的な関係構築',
      'サポート業務で力を発揮',
      '相手がAmiable型の場合：時間をかけて関係を築く'
    ],
    relationshipTips: [
      '相手の話をじっくり聞く',
      '安心できる雰囲気を作る',
      '長期的な信頼関係を築く',
      'チーム全体への配慮を示す'
    ],
    closingMessage: 'この協調性を活かして、信頼の輪を広げていきましょう！'
  };
}

function getAnalyticalResult(scores: Scores): Result {
  return {
    scores,
    dominantType: 'An',
    typeName: 'Analytical型（分析型）',
    description: '論理的、慎重、データ重視で正確性を求めるタイプです。データに基づいた正確な分析とリスク評価が得意です。',
    strengths: [
      'データに基づいた正確な分析',
      'リスクを慎重に評価',
      '論理的な思考と判断',
      '詳細な計画と準備'
    ],
    businessTips: [
      'データ分析・戦略立案',
      '品質管理・リスク管理',
      '正確性が求められる業務',
      '相手がAnalytical型の場合：データや根拠を示す'
    ],
    relationshipTips: [
      '事実やデータで信頼を築く',
      '論理的な説明を心がける',
      '慎重に関係を深める',
      '時間をかけて検討してもらう'
    ],
    closingMessage: 'この分析力を活かして、確実な成果を生み出していきましょう！'
  };
}

function getBalancedResult(scores: Scores): Result {
  return {
    scores,
    dominantType: 'Balanced',
    typeName: 'バランス型',
    description: '各スタイルをバランスよく使いこなせるタイプです。状況に応じて柔軟に対応でき、多様な人と効果的にコミュニケーションができます。',
    strengths: [
      '相手や状況に合わせて柔軟に対応',
      '多様なタイプの人と効果的にコミュニケーション',
      'バランスの取れたアプローチ',
      '様々な役割で活躍できる'
    ],
    businessTips: [
      '様々な役割で活躍できる',
      'チームの橋渡し役',
      '状況に応じた最適なスタイルを選択',
      '相手のスタイルに合わせて柔軟に対応'
    ],
    relationshipTips: [
      '相手のタイプを見極めて対応',
      '状況に応じたコミュニケーション',
      '多様な人との関係構築',
      'バランスの取れたアプローチ'
    ],
    closingMessage: 'この柔軟性を活かして、様々な場面で効果的なコミュニケーションを楽しみましょう！'
  };
}

// メール本文生成
export function generateEmailBody(result: Result): string {
  const { scores, typeName, description, strengths, businessTips, closingMessage } = result;
  
  return `
【コミュニケーションスタイル診断結果】

あなたのコミュニケーションスタイルは...

${typeName}

${description}

■ あなたのスコア（各20点満点）
・Driver型（推進型）: ${scores.D}点
・Expressive型（表現型）: ${scores.E}点
・Amiable型（協調型）: ${scores.A}点
・Analytical型（分析型）: ${scores.An}点

■ あなたの強み
${strengths.map(s => `・${s}`).join('\n')}

■ ビジネスシーンでの活かし方
${businessTips.map(t => `・${t}`).join('\n')}

${closingMessage}

---

■ さらにコミュニケーション力を高めたい方へ

このスタイルをさらに活かし、より効果的なコミュニケーションを身につけたい方は、
無料のコーチングセミナーにぜひご参加ください。

▼ 詳細・お申し込みはこちら
https://pro-coach.net/p/r/8uCeXl3l?free20=0030005

ワイン会を楽しんでください！
  `.trim();
}
