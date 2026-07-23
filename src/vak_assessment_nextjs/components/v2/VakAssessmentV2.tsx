"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  VAK_QUESTIONS,
  calculateScores,
  getDominantType,
  getTypeClosing,
  getTypeName,
} from '@/lib/vakData';
import ResultChart from '@/components/result/ResultChart';

type VakResultType = 'V' | 'A' | 'K' | 'balanced';

const ANSWER_OPTIONS = [
  { score: 1, label: '全く当てはまらない' },
  { score: 2, label: 'やや当てはまらない' },
  { score: 3, label: 'どちらとも言えない' },
  { score: 4, label: 'やや当てはまる' },
  { score: 5, label: 'とても当てはまる' },
];

const RESULT_CODES: Record<VakResultType, string> = {
  V: 'v',
  A: 'a',
  K: 'k',
  balanced: 'b',
};

const getFree20FromSearch = (search: string): string => {
  const params = new URLSearchParams(search);
  return (params.get('free20') ?? '').trim();
};

const buildV2Path = (pathname: '/v2/' | '/v2/questions/', search: string): string => {
  const params = new URLSearchParams(search);
  params.delete('start');
  const query = params.toString();
  return `${pathname}${query ? `?${query}` : ''}`;
};

function ReportSignupForm({ resultType }: { resultType: VakResultType }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [free20, setFree20] = useState('');

  useEffect(() => {
    setFree20(getFree20FromSearch(window.location.search));
  }, []);

  const free21 = RESULT_CODES[resultType];
  const formAction = `https://pro-coach.net/p/r/IXjDgtEf?free20=${encodeURIComponent(free20)}&free21=${encodeURIComponent(free21)}`;
  const canSubmit = name.trim().length > 0 && email.includes('@');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!canSubmit) {
      event.preventDefault();
      return;
    }

    const currentFree20 = getFree20FromSearch(window.location.search);
    const form = event.currentTarget;
    const free20Input = form.querySelector('#V2Userfree20') as HTMLInputElement | null;
    const free21Input = form.querySelector('#V2Userfree21') as HTMLInputElement | null;
    const refererFormUrlInput = form.querySelector('#V2UserRefererFormUrl') as HTMLInputElement | null;
    const refererUrlInput = form.querySelector('#V2UserRefererUrl') as HTMLInputElement | null;

    if (free20Input) free20Input.value = currentFree20;
    if (free21Input) free21Input.value = free21;
    if (refererFormUrlInput) refererFormUrlInput.value = window.location.href;
    if (refererUrlInput) refererUrlInput.value = document.referrer;

    form.action = `https://pro-coach.net/p/r/IXjDgtEf?free20=${encodeURIComponent(currentFree20)}&free21=${encodeURIComponent(free21)}`;
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      method="post"
      acceptCharset="utf-8"
      className="mx-auto flex w-full max-w-md flex-col gap-3"
    >
      <input
        type="text"
        name="data[User][name1]"
        id="V2Username1"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="お名前"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
        autoComplete="name"
      />

      <input
        type="email"
        name="data[User][mail]"
        id="V2Usermail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="example@mail.com"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100"
        autoComplete="email"
      />

      <input name="data[User][free9]" type="hidden" id="V2Userfree9" value="" readOnly />
      <input name="data[User][free20]" type="hidden" id="V2Userfree20" value={free20} readOnly />
      <input name="data[User][free21]" type="hidden" id="V2Userfree21" value={free21} readOnly />
      <input type="hidden" id="V2ServerUrl" value="https://pro-coach.net/" readOnly />
      <input type="hidden" name="data[User][referer_form_url]" id="V2UserRefererFormUrl" defaultValue="" />
      <input type="hidden" name="data[User][referer_url]" id="V2UserRefererUrl" defaultValue="" />

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        診断結果をメールで受け取る
      </button>
    </form>
  );
}

function HeroImage({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src="/vak-v2-title-image-flat.png?v=4"
      alt="コミュニケーションタイプ診断のイメージ"
      className={`${compact ? 'h-40 md:h-52' : 'h-56 md:h-80'} w-full object-cover`}
    />
  );
}

export default function VakAssessmentV2({
  initialStarted = false,
}: {
  initialStarted?: boolean;
}) {
  const [started, setStarted] = useState(initialStarted);
  const [startHref, setStartHref] = useState('/v2/questions/');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);

  const currentQuestion = VAK_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / VAK_QUESTIONS.length) * 100;
  const currentAnswer = answers[currentQuestion.id];
  const scores = useMemo(() => calculateScores(answers), [answers]);
  const resultType = useMemo(() => getDominantType(scores), [scores]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [completed, started, currentIndex]);

  useEffect(() => {
    setStartHref(buildV2Path('/v2/questions/', window.location.search));
  }, []);

  const handleStart = () => {
    setStarted(true);

    if (typeof window !== 'undefined') {
      const nextPath = buildV2Path('/v2/questions/', window.location.search);
      window.history.pushState(null, '', nextPath);
      setStartHref(nextPath);
    }
  };

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));

    if (currentIndex < VAK_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setCompleted(true);
  };

  const handleBack = () => {
    if (completed) {
      setCompleted(false);
      setCurrentIndex(VAK_QUESTIONS.length - 1);
      return;
    }

    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setStarted(false);
    setAnswers({});
    setCurrentIndex(0);
    setCompleted(false);

    if (typeof window !== 'undefined') {
      const startPath = buildV2Path('/v2/', window.location.search);
      const nextStartHref = buildV2Path('/v2/questions/', window.location.search);
      window.history.pushState(null, '', startPath);
      setStartHref(nextStartHref);
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8 text-gray-900">
        <div className="mx-auto max-w-5xl">
          <section className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
            <HeroImage />
            <div className="px-5 py-9 text-center md:px-12 md:py-12">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-primary">
                VAK Communication Assessment
              </p>
              <h1 className="text-3xl font-black leading-tight text-gray-900 md:text-5xl">
                🎯 コミュニケーションタイプ診断
              </h1>
              <p className="mt-3 text-lg font-semibold text-gray-600">
                あなたの強みを活かそう！
              </p>

              <div className="mx-auto mt-7 max-w-2xl rounded-2xl bg-blue-50 p-5 text-left leading-relaxed text-gray-700">
                <p>
                  人それぞれ、情報を受け取る得意な方法が異なります。
                  <br />
                  このテストで、あなたのコミュニケーションタイプを診断します。
                  <br />
                  自分の強みを活かした学習法やコミュニケーション方法を見つけましょう。
                </p>
              </div>

              <a
                href={startHref}
                onClick={(event) => {
                  event.preventDefault();
                  handleStart();
                }}
                className="mt-8 inline-flex rounded-full bg-primary px-10 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                診断をはじめる
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8 text-gray-900">
        <div className="mx-auto max-w-5xl">
          <section className="mb-6 overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
            <HeroImage compact />
            <div className="px-5 py-8 text-center md:px-10">
              <h1 className="text-4xl font-black text-gray-900">🎉 診断完了！</h1>
              <p className="mt-2 text-gray-600">あなたの結果をお届けします</p>
            </div>
          </section>

          <ResultChart scores={scores} />

          <section className="mb-6 rounded-[1.5rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
            <h2 className="mb-4 text-2xl font-black text-gray-900">🌟 あなたのコミュニケーションタイプ</h2>
            <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-5">
              <p className="text-xl font-bold text-emerald-800">{getTypeName(resultType)}</p>
              <p className="mt-2 leading-relaxed text-gray-700">{getTypeClosing(resultType)}</p>
            </div>
          </section>

          <section className="mb-6 rounded-[1.5rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
            <h3 className="mb-4 text-2xl font-black text-gray-900">✨ メールで、あなたの強みレポートをゲット！</h3>
            <div className="mb-4 grid gap-2 md:grid-cols-3">
              <p className="rounded-xl bg-blue-50 px-4 py-3 text-gray-700">
                <span className="mr-2">📊</span> あなたのスコア
              </p>
              <p className="rounded-xl bg-orange-50 px-4 py-3 text-gray-700">
                <span className="mr-2">💼</span> ビジネスでの活用法
              </p>
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-gray-700">
                <span className="mr-2">🤝</span> 人間関係での活用法
              </p>
            </div>
            <p className="mb-5 text-gray-600">
              まずはメールを開いて、自分の強みを詳しく確認してみましょう。
              <br />
              このレポートで、あなたの強みを活かすアイデアやヒントがすぐに手に入ります。
            </p>
            <ReportSignupForm resultType={resultType} />
          </section>

          <div className="text-center">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-full px-6 py-3 font-bold text-gray-600 transition hover:bg-white hover:text-gray-900"
            >
              🔄 もう一度診断する
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
          <HeroImage compact />
          <div className="px-5 py-6 text-center md:px-8">
            <h1 className="text-3xl font-black leading-tight text-gray-900 md:text-5xl">
              🎯 コミュニケーションタイプ診断
            </h1>
            <p className="mt-2 text-gray-600">あなたの強みを活かそう！</p>
          </div>
        </header>

        <section className="mb-6 rounded-[1.5rem] bg-white p-5 shadow-lg ring-1 ring-black/5 md:p-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-gray-700">
              質問 {currentIndex + 1} / {VAK_QUESTIONS.length}
            </span>
            <span className="font-black text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="rounded-[1.5rem] bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-9">
          <h2 className="mb-8 text-xl font-bold leading-relaxed text-gray-900 md:text-2xl">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-3 md:grid-cols-5">
            {ANSWER_OPTIONS.map((option) => {
              const selected = currentAnswer === option.score;

              return (
                <button
                  key={option.score}
                  type="button"
                  onClick={() => handleAnswer(currentQuestion.id, option.score)}
                  className={`rounded-2xl px-4 py-4 text-center text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                    selected ? 'bg-blue-700' : 'bg-primary hover:bg-blue-600'
                  }`}
                >
                  <span className="block text-sm font-bold leading-snug">{option.label}</span>
                  <span className="mt-1 block text-3xl font-black">{option.score}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="rounded-full bg-white px-5 py-3 font-bold text-gray-600 shadow transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ⬅️ 前の質問に戻る
          </button>
        </div>

        <section className="mt-8 rounded-[1.5rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
          <h3 className="mb-4 text-lg font-black text-gray-900">📋 診断について</h3>
          <p className="leading-relaxed text-gray-700">
            人それぞれ、情報を受け取る得意な方法が異なります。
            <br />
            このテストで、あなたのコミュニケーションタイプを診断します。
            <br />
            自分の強みを活かした学習法やコミュニケーション方法を見つけましょう。
          </p>
        </section>
      </div>
    </main>
  );
}
