'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Result, generateEmailBody } from '@/lib/communicationData';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ResultViewProps {
  result: Result;
  onRestart: () => void;
}

export default function ResultView({ result, onRestart }: ResultViewProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scores, typeName, description, strengths, businessTips, relationshipTips, closingMessage } = result;

  const handleEmailSend = () => {
    // 簡易バリデーション
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setEmailError('送信先メールアドレスを入力してください');
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError('有効なメールアドレスを入力してください');
      return;
    }
    setEmailError(null);

    const subject = encodeURIComponent('【診断結果】あなたのコミュニケーションスタイル');
    const body = encodeURIComponent(generateEmailBody(result));
    // 宛先を指定してメールアプリを起動
    window.location.href = `mailto:${encodeURIComponent(trimmed)}?subject=${subject}&body=${body}`;
  };

  const chartData = [
    {
      type: 'scatterpolar' as const,
      r: [scores.D, scores.E, scores.A, scores.An],
      theta: ['推進型', '表現型', '協調型', '分析型'],
      fill: 'toself',
      fillcolor: 'rgba(99, 110, 250, 0.3)',
      line: {
        color: 'rgb(99, 110, 250)',
        width: 3,
      },
      marker: {
        size: 8,
        color: 'rgb(99, 110, 250)',
      },
    },
  ];

  const chartLayout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 20],
        tickvals: [5, 10, 15, 20],
        gridcolor: 'rgba(0, 0, 0, 0.1)',
      },
      angularaxis: {
        gridcolor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 40, r: 40, b: 40, l: 40 },
    font: {
      size: 14,
      color: '#374151',
      family: 'system-ui, -apple-system, sans-serif',
    },
  };

  const chartConfig = {
    displayModeBar: false,
    staticPlot: true,
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          診断結果
        </h2>
        <p className="text-center text-gray-600 mb-8">
          あなたのコミュニケーションスタイルは...
        </p>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8">
          <h3 className="text-3xl font-bold text-white text-center mb-2">
            {typeName}
          </h3>
          <p className="text-white/90 text-center leading-relaxed">
            {description}
          </p>
        </div>

        {mounted && (
          <div className="mb-8">
            <Plot
              data={chartData}
              layout={chartLayout}
              config={chartConfig}
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">推進型</p>
            <p className="text-2xl font-bold text-indigo-600">{scores.D}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(scores.D / 20) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">表現型</p>
            <p className="text-2xl font-bold text-purple-600">{scores.E}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(scores.E / 20) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">協調型</p>
            <p className="text-2xl font-bold text-green-600">{scores.A}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(scores.A / 20) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">分析型</p>
            <p className="text-2xl font-bold text-blue-600">{scores.An}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(scores.An / 20) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">💪</span>
              あなたの強み
            </h4>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 mr-2">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">💼</span>
              ビジネスシーンでの活かし方
            </h4>
            <ul className="space-y-2">
              {businessTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">→</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🤝</span>
              人間関係での活用
            </h4>
            <ul className="space-y-2">
              {relationshipTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">→</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-center">
          <p className="text-lg font-medium leading-relaxed">
            {closingMessage}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          さらにコミュニケーション力を高めたい方へ
        </h3>
        <p className="text-gray-600 mb-6 text-center leading-relaxed">
          このスタイルをさらに活かし、より効果的なコミュニケーションを身につけたい方は、
          <br />
          無料のコーチングセミナーにぜひご参加ください。
        </p>
        <div className="flex justify-center">
          <a
            href="https://pro-coach.net/p/r/8uCeXl3l?free20=0030005"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            無料セミナーの詳細を見る
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📧 この結果を自分に送る</h3>
        <p className="text-gray-600 mb-3">後でゆっくり読み返せます</p>
        <div className="flex flex-col gap-3 items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {emailError && <p className="text-sm text-red-600 mt-2">{emailError}</p>}
          <button
            onClick={handleEmailSend}
            className={`w-full max-w-md bg-indigo-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${!email || emailError ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!email || !!emailError}
          >
            📧 メールアプリを開く
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onRestart}
            className="text-gray-600 hover:text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
