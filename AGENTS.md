# AGENTS.md — Matter Dictionary Project
> AIエージェントへの憲法。このファイルに書かれたルールは、いかなるタスクにも優先される。

---

## 1. Project Overview（プロジェクト概要）

このプロジェクトは「**Matter辞書**」の構築・運用を目的とする。

- **サイトURL**: https://mikiyoko.github.io/matter-dictionary/
- **リポジトリ**: https://github.com/mikiyoko/matter-dictionary（GitHub Pages で静的ホスティング）
- **ミッション**: Matter仕様（CSA公式）に基づくデバイスタイプ・クラスター・用語集の日本語リファレンスを提供する
- **想定読者**: スマートホームに興味を持つエンジニアや詳しいユーザー（技術向けコンテンツ）
- **オーナー**: 織田未来（Miki Oda）、ライフテックコーディネーター
- **関連サービス**: [スマートホームレシピサイト](https://smart-home-recipe.vercel.app/)（生活者向けの本体サービス）

### 2サービスの位置づけ

```
Matter辞書（matter-dictionary）    スマートホームレシピサイト（recipe-site）
  ↓ 技術仕様の参照                    ↓ 生活者向けの本体サービス
  エンジニア・詳しいユーザー向け          一般ユーザー向け
  GitHub Pages（静的HTML）             Vercel（Next.js）
  製品データはrecipe-siteのAPIから取得 ← /api/products を提供
```

---

## 2. Tech Stack & File Structure（技術スタックと構成）

```
matter-dictionary/
├── AGENTS.md               ← 唯一の憲法（このファイル）
├── README.md               ← プロジェクト概要・更新手順
├── index.html              ← メイン辞書ページ（デバイスタイプ・クラスター一覧）
├── glossary.html           ← Matter用語集
├── products.html           ← CSA認証製品一覧（recipe-site APIからfetch）
├── guide.html              ← 「Matterとは？」解説ページ
├── matter-security.html    ← Matterのセキュリティ解説
├── aliro.html              ← Aliro（アクセス制御）解説
├── troubleshoot.html       ← トラブルシューティング
├── nav.js                  ← 共通ナビゲーション
├── translations-*.js       ← 各ページの日英翻訳データ
└── data/
    ├── clusters.json       ← ★ クラスターデータ（132件、Matter仕様）
    ├── deviceTypes.json    ← ★ デバイスタイプデータ（92件、Matter仕様）
    ├── glossary.json       ← ★ Matter用語集（36件）
    └── products.js         ← 空テンプレート（製品データはrecipe-siteが管理）
```

**技術スタック:**
- 純粋なHTML / CSS / JavaScript（フレームワークなし）
- GitHub Pages でホスティング（push → 自動反映）
- データ: JSONファイル（`data/*.json`）をJSで読み込んで描画
- 製品データのみ外部API（`https://smart-home-recipe.vercel.app/api/products`）からfetch

---

## 3. The Law — Core Principles（憲法：絶対ルール）

### 法1: データの正はCSA公式
- **Matter仕様データ（Cluster・DeviceType）はCSA公式が正**。
- CSA公式リポジトリ（`connectedhomeip`）の `data_model/1.6/` を根拠にすること。
- `data/clusters.json` や `data/deviceTypes.json` の内容を変更する際は、必ずCSA公式と照合すること。
- hex ID（`0x0006` 等）は必ずCSA公式と一致させること。

### 法2: 製品データはrecipe-siteが管理
- `data/products.js` は**空テンプレート**。このファイルに製品データを追加しない。
- `products.html` は `https://smart-home-recipe.vercel.app/api/products` からfetchして表示している。
- 製品データを変更したい場合は、recipe-siteの `app/data/products.json` を編集すること。

### 法3: 静的サイトの制約を守る
- このサイトはHTML/CSS/JSのみ。ビルドプロセスなし。
- サーバーサイド処理（API・データベース）は使えない。
- データは `data/*.json` をJSで読み込んで描画する設計。この構造を維持すること。

### 法4: 日英バイリンガル対応
- ページには日本語・英語の切り替え機能がある。
- コンテンツを追加・変更する場合は、必ず `translations-*.js` の日英両方を更新すること。
- Matter仕様の技術用語は英語表記を優先し、日本語訳を補足として添える。

### 法5: ファイルを増やすな
- 新しいHTMLページを作る前に、既存ページへの追加で対応できないか検討すること。
- `data/` 以外の場所にデータをハードコードしない。

---

## 4. Data Structure（データ構造）

### Cluster（`data/clusters.json`）

```json
{
  "id": "on-off",
  "clusterId": "0x0006",
  "name": "On/Off",
  "nameJa": "オン/オフ",
  "categories": ["lighting"],
  "description": "照明やスイッチのオン・オフを制御する基本クラスター",
  "features": ["Lighting（照明向け拡張）"],
  "keyAttributes": [
    { "name": "OnOff", "description": "現在のオン・オフ状態（true/false）" }
  ],
  "keyCommands": [
    { "name": "On", "description": "デバイスをオンにする" }
  ],
  "tags": ["照明", "スイッチ", "オン/オフ"]
}
```

### DeviceType（`data/deviceTypes.json`）

```json
{
  "id": "dimmable-light",
  "deviceTypeId": "0x0101",
  "name": "Dimmable Light",
  "nameJa": "調光対応照明",
  "category": "lighting",
  "icon": "🔆",
  "description": "明るさを段階的に調整できる照明",
  "supersetOf": ["on-off-light"],
  "req": ["identify", "groups", "on-off", "level-control", "scenes-management"],
  "opt": ["occupancy-sensing"],
  "tags": ["照明", "調光", "明るさ"]
}
```

**重要な関係:**
- `DeviceType.req[]` / `DeviceType.opt[]` → `Cluster.id`（必須・任意クラスターへの参照）
- `DeviceType.supersetOf[]` → `DeviceType.id`（継承関係：dimmable-lightはon-off-lightを継承）

### GlossaryTerm（`data/glossary.json`）

```json
{
  "id": "fabric",
  "term": "Fabric",
  "termJa": "ファブリック",
  "termFull": null,
  "category": "architecture",
  "description": "Matterにおける「信頼の境界」となるネットワーク単位",
  "relatedTerms": ["noc", "commissioner"],
  "source": "Matter Spec / docs/GLOSSARY.md"
}
```

---

## 5. Relationship with recipe-site（recipe-siteとの関係）

| 機能 | matter-dictionary 側 | recipe-site 側 |
|------|----------------------|----------------|
| 製品データ管理 | なし（空テンプレート） | `app/data/products.json` |
| 製品データ配信 | なし | `/api/products`（Next.js Route Handler） |
| 製品ページ表示 | `products.html`（APIをfetch） | `/recipes/[slug]/products/[roleId]` |
| Matter仕様参照 | `data/clusters.json`, `data/deviceTypes.json` | hex ID経由で論理参照 |

**クロスリファレンスのルール:**
- recipe-siteのレシピデータ（`devices[].matterDeviceTypes[].id`）は matter-dictionary の `DeviceType.deviceTypeId`（hex）と一致させること
- recipe-siteのレシピデータ（`devices[].requiredClusters[].id`）は matter-dictionary の `Cluster.clusterId`（hex）と一致させること

---

## 6. Out of Scope（やってはいけないこと）

- ユーザーに確認なく GitHub へのpush・デプロイを実行する
- `data/products.js` に製品データを追加する（製品データはrecipe-siteが管理）
- CSA公式と照合せずにCluster・DeviceTypeのIDや仕様を変更する
- フレームワーク（React・Vue等）を導入してビルドプロセスを追加する
- recipe-siteのデータ（matter-dictionaryのhandwritten JSON）を「正」として使う

---

## 7. Update Guide（更新手順）

### Matter仕様が更新されたとき（例: 1.6→1.7）

```bash
# 1. CSA公式リポジトリを確認
#    https://github.com/project-chip/connectedhomeip/tree/master/data_model/

# 2. 新クラスターを data/clusters.json に追加
# 3. 新デバイスタイプを data/deviceTypes.json に追加
# 4. 必要なら glossary.json に新用語を追加
# 5. GitHubにpush → GitHub Pagesに自動反映
```

### 製品データを更新したいとき

→ `recipe-site` の `app/data/products.json` を更新し、Vercelにデプロイする。
→ matter-dictionaryのproducts.htmlは自動的に最新データを取得する（キャッシュ: 1時間）。
