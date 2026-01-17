import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'コミュニケーションスタイル診断',
  description: 'あなたのコミュニケーションスタイルを診断します',
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
