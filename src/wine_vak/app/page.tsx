'use client';

import { useState, useEffect, useMemo } from 'react';
import { WINE_VAK_QUESTIONS, calculateWineScores, getDominantWineType } from '@/lib/wineVakData';
import QuestionView from '@/components/QuestionView';
import ResultView from '@/components/ResultView';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);

  // 質問をランダムにシャッフル（初回のみ）
  const shuffledQuestions = useMemo(() => {
    const questions = [...WINE_VAK_QUESTIONS];
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }, []);

  // 結果表示時に画面トップへスクロール
  useEffect(() => {
    if (completed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [completed]);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    // リスタート時にリロードして質問を再シャッフル
    window.location.reload();
  };

  if (completed) {
    const scores = calculateWineScores(answers);
    const dominantType = getDominantWineType(scores);
    
    return (
      <ResultView 
        scores={scores} 
        dominantType={dominantType}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuestionView
      currentQuestion={currentQuestion}
      totalQuestions={shuffledQuestions.length}
      question={shuffledQuestions[currentQuestion]}
      onAnswer={handleAnswer}
      onBack={handleBack}
      canGoBack={currentQuestion > 0}
    />
  );
}
