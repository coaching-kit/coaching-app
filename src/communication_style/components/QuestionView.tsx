import React from 'react';
import { Question } from '@/lib/communicationData';

interface QuestionViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: number) => void;
  selectedAnswer?: number;
  onBack?: () => void;
}

export default function QuestionView({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionViewProps) {
  const options = [
    { value: 1, label: '全く当てはまらない' },
    { value: 2, label: 'やや当てはまらない' },
    { value: 3, label: 'どちらとも言えない' },
    { value: 4, label: 'やや当てはまる' },
    { value: 5, label: 'とても当てはまる' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-white/80">
            質問 {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm text-white/80">
            {Math.round(((currentIndex) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedAnswer === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${isSelected ? 'border-indigo-500' : 'border-gray-300'}`}>
                    <span className="text-sm font-semibold text-gray-600">
                      {option.value}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {onBack && currentIndex > 0 && (
          <div className="mt-4 flex justify-start">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-150"
            >
              ◀ 前の質問へ
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-white/80 text-sm">
        あなたの直感で、正直に答えてください
      </p>
    </div>
  );
}
