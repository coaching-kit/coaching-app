'use client';

import { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { VAKScores } from '@/lib/vakData';
import ResultChart from './result/ResultChart';
import ScoreCards from './result/ScoreCards';
import TypeSummary from './result/TypeSummary';
import MailEntryForm from './mail/MailEntryForm';
import MailPreviewView from './mail/MailPreviewView';

interface ResultViewProps {
  scores: VAKScores;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onRestart: () => void;
}

export default function ResultView({ scores, dominantType, onRestart }: ResultViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Recharts用のデータ変換
  const chartData = [
    { subject: '視覚型', score: scores.V, fullMark: 20 },
    { subject: '聴覚型', score: scores.A, fullMark: 20 },
    { subject: '体感覚型', score: scores.K, fullMark: 20 },
  ];

  // mail templates moved to components/mail/mailTemplates.tsx

  const handleSend = () => {
    if (!name.trim() || !email.includes('@')) return;
    setStatus('loading');
    // 擬似送信（1500ms）
    setTimeout(() => {
      const ok = true; // デモ用：常に成功
      if (ok) {
        setStatus('success');
        // 成功からさらに待ってプレビューを表示（2000ms）
        setTimeout(() => setShowEmailPreview(true), 2000);
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  // メールプレビュー表示時は画面上部へスクロール
  useEffect(() => {
    if (showEmailPreview) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [showEmailPreview]);

  // メールプレビューは分割したコンポーネントで描画
  if (showEmailPreview) {
    return (
      <MailPreviewView
        name={name}
        dominantType={dominantType}
        scores={scores}
        onClose={() => setShowEmailPreview(false)}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 診断完了！</h1>
          <p className="text-gray-600">あなたの結果をお届けします</p>
        </div>

        <ResultChart scores={scores} />

        <ScoreCards scores={scores} />

        <TypeSummary dominantType={dominantType} />

          <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📧 詳しい診断結果をメールで受け取る</h3>
          <p className="text-gray-600 mb-3">メールアドレスを登録すると、診断の詳細と活用案を自動配信します。</p>
          <div className="flex flex-col gap-3 items-center">
            <MailEntryForm name={name} email={email} setName={setName} setEmail={setEmail} status={status} onSend={handleSend} />

            {status === 'loading' && (
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm text-gray-700">送信中…</div>
                <button className="w-full max-w-md bg-gray-400 text-white font-medium py-2.5 px-6 rounded-lg" disabled>
                  送信中…
                </button>
              </div>
            )}

            {status === 'success' && !showEmailPreview && (
              <div className="text-center">
                <p className="text-lg font-semibold text-green-700">✅ 診断結果をメールでお送りしました</p>
                <p className="text-gray-600">数分以内に届きますので、ご確認ください。</p>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <p className="text-sm text-red-600">送信に失敗しました。後でもう一度お試しください。</p>
                <div className="mt-3">
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600"
                  >
                    再試行
                  </button>
                </div>
              </div>
            )}
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
