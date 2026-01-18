'use client';

import { useState } from 'react';
import { VAKScores, getTypeName } from '@/lib/vakData';

interface ResultViewProps {
  scores: VAKScores;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onRestart: () => void;
}

export default function ResultView({ scores, dominantType, onRestart }: ResultViewProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleEmailRegister = async () => {
    if (!email.includes('@')) return;
    setStatus('sending');
    try {
      await fetch('/api/ma_register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: getTypeName(dominantType), scores }),
      });
      setStatus('sent');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 診断完了！</h1>
          <p className="text-gray-600">タイプ判定結果を表示しています。詳細はメールで受け取れます。</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 あなたのコミュニケーションタイプ</h2>
          <p className="text-xl font-semibold text-green-800">{getTypeName(dominantType)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📧 詳しい診断結果をメールで受け取る</h3>
          <p className="text-gray-600 mb-3">メールアドレスを登録すると、診断の詳細と活用案を自動配信します。</p>
          <div className="flex flex-col gap-3 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleEmailRegister}
              disabled={!email.includes('@') || status === 'sending'}
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
