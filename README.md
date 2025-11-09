## BEERBASE（ビアベース）

クラフトビールを記録・発見・共有できるSNSプラットフォーム。
全国のブルワリーや市販クラフトビールを検索・レビューし、自分のビールログを残せます。
コンセプトは「サウナイキタイ × クラフトビール」。

##開発目的

クラフトビール市場が拡大する一方で、
「全国のブルワリー情報を横断的に探せない」「自分の記録を体系的に残せない」
という課題を解決するために個人開発として立ち上げました。

国内ブルワリー数は約600（2025年時点想定）。
地域・文化・旅行・飲み歩きを軸に、クラフトビール好きが集まる場所を目指します。

## 使用技術（Tech Stack）
| カテゴリ    | 技術                                   |
| ------- | ------------------------------------ |
| フロントエンド | Next.js 14, TypeScript, Tailwind CSS |
| バックエンド  | Prisma, Supabase（PostgreSQL）         |
| 認証      | Supabase Auth（Google予定）              |
| デプロイ    | Vercel                               |
| デザイン    | Figma                                |
| 開発支援    | Cursor, ChatGPT, Claude Code         |
| バージョン管理 | GitHub                               |
| インフラ    | Supabase（DB / Storage / Auth）        |

## MVP機能一覧
| カテゴリ   | 機能                          | 状態   |
| ------ | --------------------------- | ---- |
| 投稿     | 写真・感想・ビール名・ブルワリーの登録         | 実装中  |
| タイムライン | 投稿の新着一覧表示                   | 設計済み |
| マイページ  | 自分の投稿一覧表示                   | 設計済み |
| 検索     | ビール名・ブルワリー検索                | 未着手  |
| 認証     | Supabase Auth によるログイン制御     | 未着手  |
| データ層   | Prisma + Supabase によるレビューDB | 完了   |

## ディレクトリ構成（案）
```bash
beerbase/
├── app/                      # Next.js App Router 構成
│   ├── page.tsx              # トップ（ビール一覧）
│   ├── beers/[id]/page.tsx   # ビール詳細＋レビュー
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
```env
Supabase ダッシュボードの値に置き換えて設定します。

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
