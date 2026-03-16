"use client";

import React, { useEffect } from 'react';
import { generateHeader, generateTypeEmail, renderWithLink } from './mailTemplates';

interface Props {
  name: string;
  dominantType: 'V' | 'A' | 'K' | 'balanced';
  onClose: () => void;
  onRestart: () => void;
}

export default function MailPreviewView({ name, dominantType, onClose, onRestart }: Props) {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const orderedTypes: Array<'V' | 'A' | 'K' | 'balanced'> = ['V', 'A', 'K', 'balanced'];
  const typeLabel: Record<'balanced' | 'V' | 'A' | 'K', string> = {
    balanced: 'バランス型',
    V: 'Vタイプ（視覚型）',
    A: 'Aタイプ（聴覚型）',
    K: 'Kタイプ（体感覚型）',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-4">※こちらはテスト用のメール表示です。実際にはこの内容がメールで届きます。</p>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 メールプレビュー</h1>
          <p className="text-gray-600">このような内容でメールが配信されます</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">目次（各タイプへジャンプ）</p>
          <div className="flex flex-wrap gap-2">
            {orderedTypes.map((type) => (
              <a
                key={`toc-${type}`}
                href={`#type-${type}`}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {typeLabel[type]}
              </a>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <p className="text-xs text-amber-800 font-medium mb-1">注釈（サンプル値）</p>
            <p className="text-xs text-amber-900 leading-relaxed">
              この画面は
              <span className="mx-1 inline-block rounded bg-amber-200 px-1.5 py-0.5 font-semibold">名前: つぶ</span>
              <span className="mx-1 inline-block rounded bg-amber-200 px-1.5 py-0.5 font-semibold">紹介者ID: 0030005</span>
              の場合の例です。実運用時はここを案件に合わせて変更してください。
              また、前回方針により「あなたのスコア」はメール本文に含めていません。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          {orderedTypes.map((type) => (
            <div key={type}>
              <div id={`type-${type}`} className="mb-8 p-6 rounded-lg border-2 bg-gray-50 border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{typeLabel[type]}</h2>
                <div className="text-sm text-gray-700 mb-2"><strong>件名：</strong>【診断結果】あなたの強みを活かすコミュニケーションタイプ</div>
                {renderWithLink(generateHeader(name) + generateTypeEmail(type))}
              </div>
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
