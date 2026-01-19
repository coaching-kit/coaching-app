"use client";

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { VAKScores } from '@/lib/vakData';

interface Props {
  scores: VAKScores;
}

export default function ResultChart({ scores }: Props) {
  const chartData = [
    { subject: '視覚型', score: scores.V, fullMark: 20 },
    { subject: '聴覚型', score: scores.A, fullMark: 20 },
    { subject: '体感覚型', score: scores.K, fullMark: 20 },
  ];

  return (
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
  );
}
