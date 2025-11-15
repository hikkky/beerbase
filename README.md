## BEERBASE（ビアベース）

BEERBASEは、ビールを通じて「人・場所・体験」をつなぐSNSプラットフォームです。  
クラフトや市販、海外ビールなど、あらゆるビール体験を記録・発見・共有し、  
ビール文化全体をひとつの“ベース”に集約します。


## コンセプト

> ビールを“飲み物”としてではなく、“体験をつなぐ媒体”として再定義する。

BEERBASEは、飲んだビールを記録するだけでなく、  
「どこで」「誰と」「どんな気分で」飲んだかという体験そのものを残せるプラットフォームです。  

ユーザーは、自分の記録を通じて好みを知り、  
他のユーザーとの共通点や地域文化を発見できます。  
ビールという共通のテーマを通じて、人と体験が自然につながる場を目指します。

## サービスの特徴

| 項目 | 内容 |
|------|------|
| 記録 | 飲んだビール・場所・感想をシンプルに記録できる |
| 発見 | 他のユーザーの投稿から新しいビールやスポットを見つけられる |
| 共有 | SNS的なタイムラインで好みや体験を共有できる |
| 地域性 | 地方ブルワリーや飲食店との接点を可視化する |
| 拡張性 | クラフト、市販、海外ビール、イベントなどを包括的に扱う |

## 位置づけ

- **クラフトビール特化型ではなく、ビール文化全体のハブ**
- 個人の記録アプリでありながら、ブランド・地域・人をつなぐ情報基盤
- 「飲む」ではなく「語る・共有する」を中心としたコミュニティ設計

## 使用技術（Tech Stack）
| カテゴリ    | 技術                                   |
| ------- | ------------------------------------ |
| フロントエンド | Next.js 15, TypeScript, Tailwind CSS |
| バックエンド  | Prisma, Supabase（PostgreSQL）         |
| 認証      | Supabase Auth（Google予定）              |
| デプロイ    | Vercel                               |
| デザイン    | Figma                                |
| 開発支援    | Cursor, ChatGPT         |
| バージョン管理 | GitHub                               |
| インフラ    | Supabase（DB / Storage / Auth）        |

## MVP機能一覧
| カテゴリ   | 機能                          |
| ------ | --------------------------- |
| 投稿     | 写真・感想・ビール名・ブルワリーの登録         |
| タイムライン | 投稿の新着一覧表示                   |
| マイページ  | 自分の投稿一覧表示                   |
| 検索     | ビール名・ブルワリー検索                |
| 認証     | Supabase Auth によるログイン制御     |
| データ層   | Prisma + Supabase によるレビューDB |

## ディレクトリ構成（案）
```bash
beerbase/
├── app/                      # Next.js App Router 構成
│   ├── page.tsx              # トップ
│   ├── api/                  # API ルート
│   └── ...
├── prisma/
│   └── schema.prisma         # Prisma スキーマ
├── lib/
│   ├── prisma.ts             # Prisma クライアント
│   └── supabaseClient.ts     # Supabase クライアント
├── docs/                     # 要件定義・機能仕様
│   ├── 01_要件定義.md
│   ├── 02_機能仕様.md
│   └── 03_DB設計.md
├── .env                      # Supabase 接続設定
├── package.json
└── README.md
```

## 開発環境セットアップ
1. リポジトリ取得
```bash
git clone https://github.com/your-username/beerbase.git
cd beerbase
```

2. 依存関係インストール
```bash
npm install
```

3. 環境変数設定（.env）
Supabase ダッシュボードの値に置き換えて設定します。

```env
# Prisma × Supabase（Session Pooler 推奨）
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"

# Supabase 公開キー（クライアント用）
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

補足:
Prisma CLI は .env を参照します（.env.local ではなく .env）。
パスワードに記号（@, ?, # など）が含まれる場合は URL エンコードが必要です。

4. Prisma 初期化・同期
```bash
npx prisma generate
npx prisma db push
```

5. 開発サーバー起動
```bash
npm run dev
```

http://localhost:3000
 を開いて動作確認します。

## ロードマップ（予定）
| フェーズ     | 内容                                 |
| -------- | ---------------------------------- |
| v0.1 MVP | 投稿・一覧・マイページ                        |
| v0.2     | 認証・画像アップロード（Supabase Auth/Storage） |
| v0.3     | 検索・レビュー分析（将来的なAI連携）                |
| v1.0     | 公開ベータ（Vercel / Supabase 運用）        |


## 今後の展望
- ブルワリー情報の地図連携
- 市販クラフトビールの外部データ取り込み
- OGP 最適化と SNS 共有導線の整備
- テイスト分析やレコメンドの高度化
- 将来的な事業連携・提携を視野に継続開発

## 開発者
hikkky
GitHub: https://github.com/hikkky
