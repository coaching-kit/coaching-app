# Coaching App

コーチング関連のプロトタイプアプリケーション集

## 🌐 デプロイ済みアプリ

### [VAK コミュニケーションタイプ診断](https://coaching-kit.github.io/coaching-app/vak/)
**URL**: https://coaching-kit.github.io/coaching-app/vak/  
**仕様書**: [doc/vak/仕様書.md](./doc/vak/仕様書.md)  
ワイン会向けのVAKコミュニケーションタイプ診断アプリ（Next.js版）

**コード**: [src/vak_assessment_nextjs/](./src/vak_assessment_nextjs/)

### [コミュニケーションスタイル診断](https://coaching-kit.github.io/coaching-app/communication/)
**URL**: https://coaching-kit.github.io/coaching-app/communication/  
**仕様書**: [doc/communication/仕様書.md](./doc/communication/仕様書.md)  
ビジネスや人間関係での対人スタイルを4タイプで診断

**コード**: [src/communication_style/](./src/communication_style/)

### [ワイン × VAK診断](https://coaching-kit.github.io/coaching-app/winevak/)
**URL**: https://coaching-kit.github.io/coaching-app/winevak/  
**仕様書**: [doc/wine_vak/仕様書.md](./doc/wine_vak/仕様書.md)  
ワインの楽しみ方を通じてコミュニケーションスタイルを発見する診断アプリ

**コード**: [src/wine_vak/](./src/wine_vak/)

---

## 📁 プロジェクト一覧

### [src/vak_assessment_nextjs](./src/vak_assessment_nextjs/)
VAK診断アプリ（Next.js版・本番デプロイ済み）

**URL**: https://coaching-kit.github.io/coaching-app/vak/  
**仕様書**: [doc/vak/仕様書.md](./doc/vak/仕様書.md)

### [src/communication_style](./src/communication_style/)
コミュニケーションスタイル診断（Next.js版・本番デプロイ済み）

**URL**: https://coaching-kit.github.io/coaching-app/communication/  
**仕様書**: [doc/communication/仕様書.md](./doc/communication/仕様書.md)

### [src/wine_vak](./src/wine_vak/)
ワイン × VAK診断（Next.js版・本番デプロイ済み）

**URL**: https://coaching-kit.github.io/coaching-app/winevak/  
**仕様書**: [doc/wine_vak/仕様書.md](./doc/wine_vak/仕様書.md)

---

## 🚀 複数アプリのデプロイ構成

このリポジトリは1つのGitHub Pagesで複数のアプリをホストできます：

- `/vak/` - VAK診断アプリ
- `/communication/` - コミュニケーションスタイル診断
- `/winevak/` - ワイン × VAK診断
- `/personality/` - 性格診断アプリ（今後追加予定）
- `/motivation/` - モチベーション診断アプリ（今後追加予定）

各アプリは`basePath`を設定することで、サブパスでアクセス可能になります。

---

## セットアップ

各プロジェクトのフォルダに移動して、それぞれの README を参照してください。

```bash
# VAK診断（ポート3001）
cd src/vak_assessment_nextjs
npm install
npm run dev

# コミュニケーションスタイル診断（ポート3002）
cd src/communication_style
npm install
npm run dev

# ワイン × VAK診断（ポート3003）
cd src/wine_vak
npm install
npm run dev
```

## ドキュメント

- [診断ツール一覧](./doc/診断ツール一覧.md) - 全診断ツールの概要と仕様
- [システム構成比較](./doc/システム構成比較.md) - Streamlit版 vs Next.js版の技術比較

## ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)を参照
