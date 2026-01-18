'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { WineVAKScores, getWineTypeName, WINE_TYPE_INFO, getWineTypeClosing } from '@/lib/wineVakData';

// Plotlyを動的インポート（SSR無効化）
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ResultViewProps {
  scores: WineVAKScores;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onRestart: () => void;
}

export default function ResultView({ scores, dominantType, onRestart }: ResultViewProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const generateEmailBody = () => {
    const typeName = getWineTypeName(dominantType);
    const typeInfo = WINE_TYPE_INFO[dominantType];
    const closing = getWineTypeClosing(dominantType);
    
    return `━━━━━━━━━━━━━━━━━━━━━━
【ワイン × VAK診断 結果】
━━━━━━━━━━━━━━━━━━━━━━

こんにちは！

診断お疲れ様でした。
あなたのワインの楽しみ方をお届けします。

━━━━━━━━━━━━━━━━━━━━━━
📊 あなたのスコア
━━━━━━━━━━━━━━━━━━━━━━

${typeName}

👁️ Visual型（視覚派）: ${scores.V}/20点
👂 Auditory型（聴覚派）: ${scores.A}/20点
✋ Kinesthetic型（体感派）: ${scores.K}/20点

━━━━━━━━━━━━━━━━━━━━━━
💡 あなたのワインの楽しみ方
━━━━━━━━━━━━━━━━━━━━━━

${typeInfo.subtitle}

${typeInfo.description}

【あなたの特徴】
${typeInfo.characteristics.map(c => `• ${c}`).join('\n')}

【おすすめのワインの楽しみ方】
${typeInfo.wineAdvice.map(a => `• ${a}`).join('\n')}

【おすすめのワイン体験】
${typeInfo.recommendedExperience.map(e => `• ${e}`).join('\n')}

${closing}

━━━━━━━━━━━━━━━━━━━━━━
🌟 この力をもっと伸ばしたい方へ
━━━━━━━━━━━━━━━━━━━━━━

自分のタイプを知ることは第一歩。

次は、「相手の可能性を引き出す力」を
身につけてみませんか？

詳しくはこちら 👇
https://pro-coach.net/p/r/8uCeXl3l?free20=0030005

━━━━━━━━━━━━━━━━━━━━━━

ワイン × VAK診断より`;
  };

  const handleEmailSend = () => {
    setEmailError(null);
    
    if (!email) {
      setEmailError('メールアドレスを入力してください');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('有効なメールアドレスを入力してください');
      return;
    }
    
    const subject = '【診断結果】ワイン × VAK診断 - あなたのワインの楽しみ方';
    const body = generateEmailBody();
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 診断完了！</h1>
          <p className="text-gray-600">あなたの結果はこちらです</p>
        </div>

        {/* レーダーチャート */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <Plot
            data={[
              {
                type: 'scatterpolar',
                r: [scores.V, scores.A, scores.K],
                theta: ['Visual<br>視覚派', 'Auditory<br>聴覚派', 'Kinesthetic<br>体感派'],
                fill: 'toself',
                line: { color: 'rgb(168, 85, 247)', width: 3 },
                fillcolor: 'rgba(168, 85, 247, 0.3)',
              },
            ]}
            layout={{
              autosize: true,
              polar: {
                radialaxis: {
                  visible: true,
                  range: [0, 20],
                  automargin: true,
                  tickfont: { size: 11 },
                },
                angularaxis: {
                  tickfont: { size: 12 },
                  automargin: true,
                },
              },
              showlegend: false,
              height: 440,
              margin: { t: 40, b: 12, l: 60, r: 60 },
              title: {
                text: '<b>スコア分布</b>',
                font: { size: 25 },
                x: 0.5,
                xanchor: 'center',
                y: 0.98,
                yanchor: 'top',
                pad: { t: 6, b: 0 },
              },
            }}
            config={{ staticPlot: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>

        {/* スコア表示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { type: 'V', label: '👁️ Visual型', score: scores.V, color: 'purple' },
            { type: 'A', label: '👂 Auditory型', score: scores.A, color: 'pink' },
            { type: 'K', label: '✋ Kinesthetic型', score: scores.K, color: 'red' },
          ].map(({ type, label, score, color }) => (
            <div key={type} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-3">
                <div className="text-sm text-gray-600 mb-1">{label}</div>
                <div className="text-3xl font-bold text-purple-600">{score}/20</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(score / 20) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* タイプ表示 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🍷 あなたのワインの楽しみ方</h2>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded mb-4">
            <p className="text-xl font-semibold text-purple-800">{getWineTypeName(dominantType)}</p>
            <p className="text-gray-700 mt-2">{WINE_TYPE_INFO[dominantType].subtitle}</p>
          </div>
          <p className="text-gray-700 mb-4">{WINE_TYPE_INFO[dominantType].description}</p>
        </div>

        {/* 特徴 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">✨ あなたの特徴</h3>
          <ul className="space-y-2 text-gray-700">
            {WINE_TYPE_INFO[dominantType].characteristics.map((char, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ワインアドバイス */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🍇 ワインでの楽しみ方</h3>
          <ul className="space-y-2 text-gray-700">
            {WINE_TYPE_INFO[dominantType].wineAdvice.map((advice, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ビジネス・人間関係での活用 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💼 ビジネス・人間関係での活用</h3>
          <ul className="space-y-2 text-gray-700">
            {WINE_TYPE_INFO[dominantType].businessAdvice.map((advice, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{advice}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-purple-700 font-semibold">{getWineTypeClosing(dominantType)}</p>
        </div>

        {/* おすすめ体験 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 おすすめの学びと体験</h3>
          <ul className="space-y-2 text-gray-700">
            {WINE_TYPE_INFO[dominantType].recommendedExperience.map((exp, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl p-8 mb-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">🌟 このコミュニケーション力を仕事に活かす</h3>
          <p className="mb-6">ワインで発見したあなたの才能は、ビジネスやコーチングで大きな強みになります。「相手の可能性を引き出す力」をさらに磨きませんか？</p>
          <a
            href="https://pro-coach.net/p/r/8uCeXl3l?free20=0030005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            🎯 無料コーチングセミナーをチェック
          </a>
        </div>

        {/* メール送信 */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">📧 この結果を自分に送る</h3>
          <p className="text-gray-600 mb-4">後でゆっくり読み返せます</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {emailError && (
              <p className="text-red-600 text-sm">{emailError}</p>
            )}
            <button
              onClick={handleEmailSend}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              📧 メールアプリを開く
            </button>
          </div>
        </div>

        {/* やり直しボタン */}
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
