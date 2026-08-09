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
        type: 'image/png',
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
      <Script id="vak-free20-bootstrap" strategy="beforeInteractive">
        {`
          (function () {
            try {
              var storageKey = 'vak.free20';
              var getStoredFree20 = function () {
                try {
                  return (window.sessionStorage.getItem(storageKey) || '').trim();
                } catch (error) {
                  return '';
                }
              };
              var storeFree20 = function (value) {
                if (!value) return;
                try {
                  window.sessionStorage.setItem(storageKey, value);
                } catch (error) {}
              };
              var params = new URLSearchParams(window.location.search);
              var free20 = (params.get('free20') || '').trim();
              if (free20) storeFree20(free20);
              var effectiveFree20 = free20 || getStoredFree20();
              if (!effectiveFree20) return;

              var buildHref = function (rawHref) {
                var url = new URL(rawHref, window.location.origin);
                if (url.pathname !== '/questions/' && url.pathname !== '/v2/questions/') {
                  return rawHref;
                }
                if (!url.searchParams.get('free20')) {
                  url.searchParams.set('free20', effectiveFree20);
                }
                return url.pathname + url.search + url.hash;
              };

              var syncStartLinks = function () {
                var links = document.querySelectorAll('a[href="/questions/"], a[href="/v2/questions/"]');
                for (var index = 0; index < links.length; index += 1) {
                  var currentHref = links[index].getAttribute('href');
                  if (currentHref) links[index].setAttribute('href', buildHref(currentHref));
                }
              };

              document.addEventListener(
                'click',
                function (event) {
                  var target = event.target;
                  if (!target || !target.closest) return;
                  var link = target.closest('a[href="/questions/"], a[href="/v2/questions/"]');
                  if (!link) return;
                  var currentHref = link.getAttribute('href');
                  if (!currentHref) return;
                  var nextHref = buildHref(currentHref);
                  if (nextHref !== currentHref) {
                    event.preventDefault();
                    window.location.href = nextHref;
                  }
                },
                true
              );

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', syncStartLinks, { once: true });
              } else {
                syncStartLinks();
              }
            } catch (error) {}
          })();
        `}
      </Script>
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
