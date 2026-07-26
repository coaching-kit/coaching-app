# Coaching App

VAKコミュニケーションタイプ診断アプリ（Next.js / Static Export）

## 🌐 公開URL

- GitHub Pages（確認用）: https://coaching-kit.github.io/coaching-app/
- カスタムドメイン（本番）: https://vak.apps.global-leaders-academy.co.jp/

## 📁 構成

- アプリ本体: [src/vak_assessment_nextjs](./src/vak_assessment_nextjs/)
- 仕様書: [doc/vak/仕様書.md](./doc/vak/仕様書.md)
- デプロイ設定: [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

## 🚀 ローカル起動

```bash
cd src/vak_assessment_nextjs
npm install
npm run dev
```

- ローカルURL: http://localhost:3001

## 🛠 デプロイ方針（GitHub Pages）

このリポジトリは `actions/deploy-pages` で `src/vak_assessment_nextjs/out` をそのまま公開します。

`deploy.yml` の環境変数で配信先を切り替えます。

- `NEXT_PUBLIC_BASE_PATH: /coaching-app` + `ENABLE_CUSTOM_DOMAIN: 'false'`
	- GitHub Pages確認用（`https://coaching-kit.github.io/coaching-app/`）
- `NEXT_PUBLIC_BASE_PATH: ''` + `ENABLE_CUSTOM_DOMAIN: 'true'`
	- カスタムドメイン本番用（`https://vak.apps.global-leaders-academy.co.jp/`）

`ENABLE_CUSTOM_DOMAIN: 'true'` の場合、ワークフローが `out/CNAME` を生成します。

## 📈 Google Analytics

GA4 の測定IDを設定すると、本番サイトに Google tag が出力されます。

1. Google Analytics で Web データストリームを作成
   - ウェブサイトURL: `https://vak.apps.global-leaders-academy.co.jp`
   - ストリーム名: `VAKコミュニケーションタイプ診断`
2. 発行された測定ID（`G-` で始まるID）をコピー
3. GitHub リポジトリの **Settings → Secrets and variables → Actions → Variables** に追加
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`
4. `Deploy to GitHub Pages` workflow を再実行、または次回 push で反映

v2では追加イベントも送信します。

- `vak_assessment_start`: 診断開始
- `vak_assessment_result`: 診断完了（`result_type`, `free20`）
- `vak_report_submit`: レポート申込フォーム送信（`result_type`, `free20`）

## ドキュメント

- [診断ツール一覧](./doc/診断ツール一覧.md)
- [システム構成比較](./doc/システム構成比較.md)
- [LINE公式アカウント概要](./doc/LINE公式アカウント概要.md)

## ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) を参照
