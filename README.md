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

## ドキュメント

- [診断ツール一覧](./doc/診断ツール一覧.md)
- [システム構成比較](./doc/システム構成比較.md)
- [LINE公式アカウント概要](./doc/LINE公式アカウント概要.md)

## ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) を参照
