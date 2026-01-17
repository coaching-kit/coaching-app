'use client';

import { useState, useEffect } from 'react';
import QuestionView from '@/components/QuestionView';
import ResultView from '@/components/ResultView';
import {
  questions,
  shuffleQuestions,
  calculateScores,
  determineType,
  Question,
  Result,
} from '@/lib/communicationData';

type Screen = 'welcome' | 'question' | 'result';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
  }, []);

  const handleStart = () => {
    setScreen('question');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (answer: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const scores = calculateScores(newAnswers);
      const finalResult = determineType(scores);
      setResult(finalResult);
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleQuestions(questions));
    setScreen('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="container mx-auto">
        {screen === 'welcome' && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                コミュニケーションスタイル診断
              </h1>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  あなたのコミュニケーションスタイルを4つのタイプで診断します。
                  <br />
                  ビジネスや人間関係で活かせるヒントが見つかります。
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    4つのコミュニケーションスタイル
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-indigo-600 font-bold mr-2">D</span>
                      <div>
                        <strong className="text-gray-800">Driver型（推進型）</strong>
                        <p className="text-sm text-gray-600">結果重視、決断が早い、リーダーシップ</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">E</span>
                      <div>
                        <strong className="text-gray-800">Expressive型（表現型）</strong>
                        <p className="text-sm text-gray-600">社交的、情熱的、アイデア豊富</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">A</span>
                      <div>
                        <strong className="text-gray-800">Amiable型（協調型）</strong>
                        <p className="text-sm text-gray-600">協力的、聞き上手、安定志向</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">An</span>
                      <div>
                        <strong className="text-gray-800">Analytical型（分析型）</strong>
                        <p className="text-sm text-gray-600">論理的、慎重、データ重視</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    📋 診断について
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ 質問数: 16問（約3分）</li>
                    <li>✓ 各質問に5段階で回答</li>
                    <li>✓ 直感で正直に答えてください</li>
                    <li>✓ 結果はメールで送信可能</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                診断を始める
              </button>
            </div>

            <p className="text-center text-white/80 text-sm">
              ワイン会参加者の皆様へ：効果的なコミュニケーションのヒントを見つけましょう
            </p>
          </div>
        )}

        {screen === 'question' && shuffledQuestions.length > 0 && (
          <QuestionView
            question={shuffledQuestions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={shuffledQuestions.length}
            onAnswer={handleAnswer}
          />
        )}

        {screen === 'result' && result && (
          <ResultView result={result} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}
