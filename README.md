# Coaching App

コーチング関連のプロトタイプアプリケーション集

## 🌐 デプロイ済みアプリ

### [VAK コミュニケーションタイプ診断](https://coaching-kit.github.io/coaching-app/vak/)
**URL**: https://coaching-kit.github.io/coaching-app/vak/  
ワイン会向けのVAKコミュニケーションタイプ診断アプリ（Next.js版）

**コード**: [src/vak_assessment_nextjs/](./src/vak_assessment_nextjs/)

---

## 📁 プロジェクト一覧

### [src/vak_assessment_nextjs](./src/vak_assessment_nextjs/)
VAK診断アプリ（Next.js版・本番デプロイ済み）

**URL**: https://coaching-kit.github.io/coaching-app/vak/

---

## 🚀 複数アプリのデプロイ構成

このリポジトリは1つのGitHub Pagesで複数のアプリをホストできます：

- `/vak/` - VAK診断アプリ
- `/personality/` - 性格診断アプリ（今後追加予定）
- `/motivation/` - モチベーション診断アプリ（今後追加予定）

各アプリは`basePath`を設定することで、サブパスでアクセス可能になります。

---

## セットアップ

各プロジェクトのフォルダに移動して、それぞれの README を参照してください。

```bash
# Next.jsアプリ
cd src/vak_assessment_nextjs
npm install
npm run dev
```

## ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)を参照
