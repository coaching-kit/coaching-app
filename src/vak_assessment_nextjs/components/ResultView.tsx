'use client';

import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { VAKScores, getTypeName, TYPE_INFO, getTypeClosing } from '@/lib/vakData';

interface ResultViewProps {
  scores: VAKScores;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onRestart: () => void;
}

export default function ResultView({ scores, dominantType, onRestart }: ResultViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // Recharts用のデータ変換
  const chartData = [
    { subject: '視覚型', score: scores.V, fullMark: 20 },
    { subject: '聴覚型', score: scores.A, fullMark: 20 },
    { subject: '体感覚型', score: scores.K, fullMark: 20 },
  ];

  // メール本文生成（仕様書の「メール本文例」に完全一致）
  const generateEmailBody = () => {
    const v = scores.V;
    const a = scores.A;
    const k = scores.K;

    const header = `🎉 診断完了！\nあなたの結果をお送りします。\n\n【あなたのスコア】\n👀 見るタイプ（視覚型）: ${v}/20点\n👂 聞くタイプ（聴覚型）: ${a}/20点\n✋ 体感タイプ（体感覚型）: ${k}/20点\n\n`;

    if (dominantType === 'balanced') {
      return `${header}🌟 あなたのコミュニケーションタイプ\n\nバランス型：あらゆる場面に対応できる才能\n\nあなたは状況に応じて柔軟にコミュニケーションスタイルを変えられる才能があります！\n視覚、聴覚、体感覚のすべてをバランスよく使えるため、\n相手のタイプに合わせた効果的なアプローチが可能です。\n\nビジネスシーンでの活用:\n- 相手のタイプに合わせて柔軟に対応\n- 視覚資料・対話・実践を組み合わせた提案\n- 多様なチームメンバーとの効果的な協働\n\n人間関係での活用:\n- 様々なタイプの人と良好な関係を築く\n- 相手の反応を見ながら最適なアプローチを選択\n- どんな場面でも柔軟に対応できる\n\nあらゆる状況に対応できるこの才能は、チームリーダーやコーチに最適です。\n\n---\n\n💡 さらに学びたい方へ\n\nコミュニケーション力をさらに高めたい方には、無料セミナーをご用意しています。\n\n▼ 詳細・お申し込みはこちら\nhttps://pro-coach.net/p/r/8uCeXl3l?free20=0030005\n（注：送信時は用途に応じたURLへ置換。例：セミナー申込ページのURL、イベント詳細ページのURL、ランディングページのURLなど）\n`;
    }

    if (dominantType === 'V') {
      return `${header}🌟 あなたのコミュニケーションタイプ\n\n👀 見るタイプ（視覚型）\n\n目から入る情報を重視し、見て理解しようとするタイプです。\n\n【強み】\n- データや資料、図解で理解しやすい\n- 相手の表情やボディランゲージを読み取る\n- 視覚的な記憶が得意\n- 見た目や雰囲気を大切にする\n\n【ビジネスシーンでの活用】\n- プレゼンには視覚資料を効果的に使う\n- 商談では実物やサンプルを見せる\n- ホワイトボードや図解で説明する\n- 身だしなみや会議室の雰囲気づくりを意識\n\n【人間関係での活用】\n- 見た目や雰囲気を大切にする\n- 表情やボディランゲージで理解を深める\n- 視覚的な印象を共有する\n\n視覚で人を動かすこの才能は、プレゼンテーションや営業で力を発揮します。\n\n---\n\n💡 さらに学びたい方へ\n\nコミュニケーション力をさらに高めたい方には、無料セミナーをご用意しています。\n\n▼ 詳細・お申し込みはこちら\nhttps://pro-coach.net/p/r/8uCeXl3l?free20=0030005\n（注：送信時は用途に応じたURLへ置換。例：セミナー申込ページのURL、イベント詳細ページのURL、ランディングページのURLなど）\n`;
    }

    if (dominantType === 'A') {
      return `${header}🌟 あなたのコミュニケーションタイプ\n\n👂 聞くタイプ（聴覚型）\n\n耳から入る情報を重視し、会話や説明を通じて理解しようとするタイプです。\n\n【強み】\n- 話を聞いて理解するのが得意\n- 会話で信頼関係を築く\n- 声のトーンから感情を読み取る\n- ストーリーや背景に興味を持つ\n\n【ビジネスシーンでの活用】\n- 丁寧な説明と対話を大切に\n- 電話やオンライン会議を効果的に活用\n- グループディスカッションに積極参加\n- 相手の話をよく聞き、質問する\n\n【人間関係での活用】\n- 相手の話に耳を傾ける\n- 背景やストーリーを楽しむ\n- 参加者との会話を楽しむ\n\n傾聴で信頼を築くこの才能は、カウンセリングやコーチングで力を発揮します。\n\n---\n\n💡 さらに学びたい方へ\n\nコミュニケーション力をさらに高めたい方には、無料セミナーをご用意しています。\n\n▼ 詳細・お申し込みはこちら\nhttps://pro-coach.net/p/r/8uCeXl3l?free20=0030005\n（注：送信時は用途に応じたURLへ置換。例：セミナー申込ページのURL、イベント詳細ページのURL、ランディングページのURLなど）\n`;
    }

    // K
    return `${header}🌟 あなたのコミュニケーションタイプ\n\n✋ 体感タイプ（体感覚型）\n\n体で感じて理解しようとし、体験や実践を通じて学ぶタイプです。\n\n【強み】\n- 実際に体験することで深く理解\n- 直感や雰囲気を大切にする\n- 実践的なアプローチが好き\n- 身体で感じる感覚に敏感\n\n【ビジネスシーンでの活用】\n- 実践的なワークショップに参加\n- まず試してみる、体験する\n- ロールプレイで理解を深める\n- 現場や実物を見て判断\n\n【人間関係での活用】\n- 実際に体験しながら学ぶ\n- 五感をじっくり楽しむ\n- 一緒に体験することで理解を深める\n\n体感で場を読むこの才能は、現場マネジメントやチーム作りで力を発揮します。\n\n---\n\n💡 さらに学びたい方へ\n\nコミュニケーション力をさらに高めたい方には、無料セミナーをご用意しています。\n\n▼ 詳細・お申し込みはこちら\nhttps://pro-coach.net/p/r/8uCeXl3l?free20=0030005\n（注：送信時は用途に応じたURLへ置換。例：セミナー申込ページのURL、イベント詳細ページのURL、ランディングページのURLなど）\n`;
  };

  const handleShowPreview = () => {
    if (!name.trim() || !email.includes('@')) return;
    setShowEmailPreview(true);
  };

  // メールプレビュー画面
  if (showEmailPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 メールプレビュー</h1>
            <p className="text-gray-600">このような内容でメールが配信されます</p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
              {generateEmailBody()}
            </pre>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowEmailPreview(false)}
              className="bg-gray-500 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              ← 戻る
            </button>
            <button
              onClick={onRestart}
              className="bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              🔄 もう一度診断する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 診断完了！</h1>
          <p className="text-gray-600">あなたの結果をお届けします</p>
        </div>

        {/* レーダーチャート */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">スコア分布</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 20]} />
              <Radar
                name="スコア"
                dataKey="score"
                stroke="#636ef6"
                fill="#636ef6"
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* スコア表示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { type: 'V', label: '👀 見るタイプ', score: scores.V },
            { type: 'A', label: '👂 聞くタイプ', score: scores.A },
            { type: 'K', label: '✋ 体感タイプ', score: scores.K },
          ].map(({ type, label, score }) => (
            <div key={type} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-3">
                <div className="text-sm text-gray-600 mb-1">{label}</div>
                <div className="text-3xl font-bold text-primary">{score}/20</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(score / 20) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* タイプ判定結果 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 あなたのコミュニケーションタイプ</h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-xl font-semibold text-green-800">{getTypeName(dominantType)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📧 詳しい診断結果をメールで受け取る</h3>
          <p className="text-gray-600 mb-3">メールアドレスを登録すると、診断の詳細と活用案を自動配信します。</p>
          <div className="flex flex-col gap-3 items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="お名前"
              className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleShowPreview}
              disabled={!name.trim() || !email.includes('@')}
              className="w-full max-w-md bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              診断結果をメールで受け取る
            </button>
            {status === 'error' && <p className="text-sm text-red-600">送信に失敗しました。後でもう一度お試しください。</p>}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="text-gray-600 hover:text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-white transition-all duration-200"
          >
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
