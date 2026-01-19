"use client";

import React from 'react';
import { getTypeName, getTypeClosing } from '@/lib/vakData';

interface Props {
  dominantType: 'V' | 'A' | 'K' | 'balanced';
}

export default function TypeSummary({ dominantType }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 あなたのコミュニケーションタイプ</h2>
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <p className="text-xl font-semibold text-green-800">{getTypeName(dominantType)}</p>
        <p className="text-gray-700 mt-2">{getTypeClosing(dominantType)}</p>
      </div>
    </div>
  );
}
