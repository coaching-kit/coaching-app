import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          チャレンジ、素晴らしいです！
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          診断を受けて一歩踏み出したあなたの行動は、これからの成長につながります。<br />
          ご入力いただいたメールアドレス宛に診断結果をお送りしました。届いたら、ぜひ次の一歩に活かしてみてください。
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">次の一歩</p>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>受信メールを開いて、あなたの強みを確認する</li>
            <li>今日から実践できることを1つ決めて行動する</li>
            <li>メールが見当たらない場合は迷惑メールフォルダも確認する</li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-primary text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            診断トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
