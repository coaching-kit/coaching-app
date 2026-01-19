"use client";

import React from 'react';
import { VAKScores } from '@/lib/vakData';

interface Props {
  scores: VAKScores;
}

export default function ScoreCards({ scores }: Props) {
  const items = [
    { type: 'V', label: '👀 見るタイプ', score: scores.V },
    { type: 'A', label: '👂 聞くタイプ', score: scores.A },
    { type: 'K', label: '✋ 体感タイプ', score: scores.K },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {items.map(({ type, label, score }) => (
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
  );
}
