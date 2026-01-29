import React from 'react';
import { VAKScores } from '@/lib/vakData';

export const CTA_URL = 'https://pro-coach.net/p/r/8uCeXl3l?free20=0030005';

export function generateHeader(userName: string, scores: VAKScores) {
  const v = scores.V;
  const a = scores.A;
  const k = scores.K;
  return `${userName}様\n\n🎉 診断完了！\nあなたの結果をお送りします。\n\n【あなたのスコア】\n👀 見るタイプ（視覚型）: ${v}/20点\n👂 聞くタイプ（聴覚型）: ${a}/20点\n✋ 体感タイプ（体感覚型）: ${k}/20点\n\n`;
}

export function generateTypeEmail(type: 'V' | 'A' | 'K' | 'balanced') {
  const CTA_URL = 'https://pro-coach.net/p/r/8uCeXl3l?free20=0030005';
  const commonFooter = `\n---\n\n✨ あなたの強みを実践で活かしていく段階です！\nこの診断でわかったあなたの強みを活かして、人の力を引き出すスキルを知りたくないですか？\nそれがコーチングです。\n\n無料でコーチング入門編を活用できるこの機会を逃さないでください。\n\nまずは小さな一歩から、あなたの強みが誰かの力になる体験を。\n\n▼ 無料セミナーの詳細・お申し込みはこちら\n${CTA_URL}\n※本配信時は用途に応じたURLに差し替えてください\n`;

  if (type === 'balanced') {
    return `🌟 あなたのコミュニケーションタイプ\n\n⚖️ バランス型\n\nあなたは状況に応じて柔軟にコミュニケーションスタイルを変えられる才能があります！\n視覚、聴覚、体感覚のすべてをバランスよく使えるため、\n相手のタイプに合わせた効果的なアプローチが可能です。\n\n【ビジネスシーンでの活用】\n- 相手のタイプに合わせて柔軟に対応\n- 視覚資料・対話・実践を組み合わせた提案\n- 多様なチームメンバーとの効果的な協働\n\n【人間関係での活用】\n- 様々なタイプの人と良好な関係を築く\n- 相手の反応を見ながら最適なアプローチを選択\n- どんな場面でも柔軟に対応できる\n\nあらゆる状況に対応できるこの才能は、チームリーダーやコーチに最適です。${commonFooter}`;
  }

  if (type === 'V') {
    return `🌟 あなたのコミュニケーションタイプ\n\n👀 見るタイプ（視覚型）\n\n目から入る情報を重視し、見て理解しようとするタイプです。\n\n【強み】\n- データや資料、図解で理解しやすい\n- 相手の表情やボディランゲージを読み取る\n- 視覚的な記憶が得意\n- 見た目や雰囲気を大切にする\n\n【ビジネスシーンでの活用】\n- プレゼンには視覚資料を効果的に使う\n- 商談では実物やサンプルを見せる\n- ホワイトボードや図解で説明する\n- 身だしなみや会議室の雰囲気づくりを意識\n\n【人間関係での活用】\n- 見た目や雰囲気を大切にする\n- 表情やボディランゲージで理解を深める\n- 視覚的な印象を共有する\n\n視覚で人を動かすこの才能は、プレゼンテーションや営業で力を発揮します。${commonFooter}`;
  }

  if (type === 'A') {
    return `🌟 あなたのコミュニケーションタイプ\n\n👂 聞くタイプ（聴覚型）\n\n耳から入る情報を重視し、会話や説明を通じて理解しようとするタイプです。\n\n【強み】\n- 話を聞いて理解するのが得意\n- 会話で信頼関係を築く\n- 声のトーンから感情を読み取る\n- ストーリーや背景に興味を持つ\n\n【ビジネスシーンでの活用】\n- 丁寧な説明と対話を大切に\n- 電話やオンライン会議を効果的に活用\n- グループディスカッションに積極参加\n- 相手の話をよく聞き、質問する\n\n【人間関係での活用】\n- 相手の話に耳を傾ける\n- 背景やストーリーを楽しむ\n- 参加者との会話を楽しむ\n\n傾聴で信頼を築くこの才能は、カウンセリングやコーチングで力を発揮します。${commonFooter}`;
  }

  // type === 'K'
  return `🌟 あなたのコミュニケーションタイプ\n\n✋ 体感タイプ（体感覚型）\n\n体で感じて理解しようとし、体験や実践を通じて学ぶタイプです。\n\n【強み】\n- 実際に体験することで深く理解\n- 直感や雰囲気を大切にする\n- 実践的なアプローチが好き\n- 身体で感じる感覚に敏感\n\n【ビジネスシーンでの活用】\n- 実践的なワークショップに参加\n- まず試してみる、体験する\n- ロールプレイで理解を深める\n- 現場や実物を見て判断\n\n【人間関係での活用】\n- 実際に体験しながら学ぶ\n- 五感をじっくり楽しむ\n- 一緒に体験することで理解を深める\n\n体感で場を読むこの才能は、現場マネジメントやチーム作りで力を発揮します。${commonFooter}`;
}

export function renderWithLink(text: string) {
  const parts = text.split(CTA_URL);
  return (
    <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i !== parts.length - 1 && (
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              {CTA_URL}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
