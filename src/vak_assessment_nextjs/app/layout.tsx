import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const ogImagePath = '/vak-social-card.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://vak.apps.global-leaders-academy.co.jp'),
  title: 'VAK コミュニケーションタイプ診断',
  description: 'あなたの強みを活かす！コミュニケーションタイプ診断',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VAK コミュニケーションタイプ診断',
    description: 'あなたの強みを活かす！コミュニケーションタイプ診断',
    type: 'website',
    url: '/',
    siteName: 'VAK コミュニケーションタイプ診断',
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: 'VAKコミュニケーションタイプ診断のイメージ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAK コミュニケーションタイプ診断',
    description: 'あなたの強みを活かす！コミュニケーションタイプ診断',
    images: [ogImagePath],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
    </html>
  )
}
