import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          診断結果の送信が完了しました。
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          ご入力いただいたメールアドレス宛に診断結果をお送りしました。<br />
          数分たっても届かない場合は、迷惑メールフォルダもご確認ください。
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">ご確認ポイント</p>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>受信メールを開いて診断結果をご確認ください</li>
            <li>メールが見当たらない場合は迷惑メールもご確認ください</li>
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
