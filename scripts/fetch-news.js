// scripts/fetch-news.js
// NotionのUpdateデータベースから「公開フラグ」ONの記事を取得し、
// 日付の新しい順に data/news.json へ書き出すスクリプト。
// GitHub Actions（update-news.yml）から実行されます。
//
// 必要な環境変数（GitHubのSecretsに登録）:
//   NOTION_TOKEN        … Notionインテグレーションのシークレット（ntn_...）
//   NOTION_DATABASE_ID  … UpdateデータベースのID（URL中の32文字）
//
// Notion側の列名（変更したらここも合わせて変更が必要）:
//   タイトル（タイトル型）／本文（テキスト型）／日付（日付型）／
//   公開フラグ（チェックボックス型）／リンク先（URL型）

const fs = require("fs");

const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_DATABASE_ID;

async function main() {
  if (!TOKEN || !DB_ID) {
    throw new Error("NOTION_TOKEN / NOTION_DATABASE_ID が設定されていません。GitHubのSecretsを確認してください。");
  }

  // Notionから全件取得（100件超でも取りこぼさないようページングに対応）
  let results = [];
  let cursor;
  do {
    const body = {
      filter: { property: "公開フラグ", checkbox: { equals: true } },
      sorts: [{ property: "日付", direction: "descending" }],
      page_size: 100,
    };
    if (cursor) body.start_cursor = cursor;

    const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Notion APIエラー: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    results = results.concat(data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  // 必要な項目だけを取り出して整形
  const items = results
    .map((page) => {
      const p = page.properties;
      return {
        title: (p["タイトル"]?.title || []).map((t) => t.plain_text).join(""),
        body: (p["本文"]?.rich_text || []).map((t) => t.plain_text).join(""),
        date: p["日付"]?.date?.start || "",
        url: p["リンク先"]?.url || "",
      };
    })
    .filter((item) => item.title); // タイトル空の行は除外

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(
    "data/news.json",
    JSON.stringify({ updated: new Date().toISOString(), items }, null, 2) + "\n"
  );
  console.log(`✅ ${items.length}件の更新情報を data/news.json に書き出しました`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
