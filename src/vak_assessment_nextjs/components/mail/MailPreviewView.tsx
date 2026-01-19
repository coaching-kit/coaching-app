"use client";

import React, { useEffect } from 'react';
import { VAKScores } from '@/lib/vakData';
import { generateHeader, generateTypeEmail, renderWithLink } from './mailTemplates';

interface Props {
  name: string;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  scores: VAKScores;
  onClose: () => void;
  onRestart: () => void;
}

export default function MailPreviewView({ name, dominantType, scores, onClose, onRestart }: Props) {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const allTypes: Array<'balanced' | 'V' | 'A' | 'K'> = ['balanced', 'V', 'A', 'K'];
  const orderedTypes = [dominantType, ...allTypes.filter(t => t !== dominantType)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-4">※こちらはテスト用のメール表示です。実際にはこの内容がメールで届きます。</p>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 メールプレビュー</h1>
          <p className="text-gray-600">このような内容でメールが配信されます</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          {orderedTypes.map((type, index) => (
            <div key={type}>
              {index === 0 ? (
                <div id={`type-${type}`} className="mb-8 p-6 rounded-lg border-2 bg-blue-50 border-blue-400 shadow-lg">
                  <div className="text-sm text-gray-700 mb-2"><strong>件名：</strong>【診断結果】あなたのコミュニケーションタイプ</div>
                  {renderWithLink(generateHeader(name, scores) + generateTypeEmail(type))}
                </div>
              ) : (
                <div>
                  {index === 1 && (
                    <div className="my-8 text-center">
                      <div className="inline-block bg-gray-200 px-4 py-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">📋 参考：他のタイプのメール例</p>
                      </div>
                    </div>
                  )}

                  <div id={`type-${type}`} className="mb-8 p-6 rounded-lg border-2 bg-gray-50 border-gray-200">
                    <div className="text-sm text-gray-700 mb-2"><strong>件名：</strong>【診断結果】あなたのコミュニケーションタイプ</div>
                    {renderWithLink(generateHeader(name, scores) + generateTypeEmail(type))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={onClose} className="bg-gray-500 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200">← 戻る</button>
          <button onClick={onRestart} className="bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200">🔄 もう一度診断する</button>
        </div>
      </div>
    </div>
  );
}
