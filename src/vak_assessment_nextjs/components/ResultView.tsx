'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { VAKScores, getTypeName } from '@/lib/vakData';

// Plotlyを動的インポート（SSR無効化）
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ResultViewProps {
  scores: VAKScores;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onRestart: () => void;
}

export default function ResultView({ scores, dominantType, onRestart }: ResultViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleEmailRegister = async () => {
    if (!name.trim() || !email.includes('@')) return;
    setStatus('sending');
    try {
      await fetch('/api/ma_register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email }),
      });
      setStatus('sent');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 診断完了！</h1>
          <p className="text-gray-600">あなたの結果をお届けします</p>
        </div>

        {/* レーダーチャート */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <Plot
            data={[
              {
                type: 'scatterpolar',
                r: [scores.V, scores.A, scores.K],
                theta: ['Visual<br>視覚型', 'Auditory<br>聴覚型', 'Kinesthetic<br>体感覚型'],
                fill: 'toself',
                line: { color: 'rgb(99, 110, 250)', width: 3 },
                fillcolor: 'rgba(99, 110, 250, 0.3)',
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
              onClick={handleEmailRegister}
              disabled={!name.trim() || !email.includes('@') || status === 'sending'}
              className="w-full max-w-md bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? '送信中…' : status === 'sent' ? '登録完了' : '診断結果をメールで受け取る'}
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
