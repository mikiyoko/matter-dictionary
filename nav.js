/**
 * Matter辞書 共通ナビゲーション
 * 読み物ページ（guide / matter-security / aliro / troubleshoot）で使用
 *
 * 使い方:
 *   1. <head> に <script src="nav.js"></script> を追加
 *   2. <body> 先頭に <div id="site-nav"></div> を追加
 *   3. <script> で initNav('page-id') を呼ぶ（例: initNav('guide')）
 *
 * ページID一覧: 'guide' | 'security' | 'aliro' | 'troubleshoot'
 * 言語切替: URL末尾に ?lang=en を付けるか、ボタンを押す
 */

(function () {
  // ===== ナビ定義 =====
  const NAV_ITEMS = [
    {
      id: 'home',
      href: 'index.html',
      ja: '🏠 辞書トップ',
      en: '🏠 Dictionary',
    },
    {
      id: 'guide',
      href: 'guide.html',
      ja: '📡 Matterとは',
      en: '📡 What is Matter?',
    },
    {
      id: 'security',
      href: 'matter-security.html',
      ja: '🔒 セキュリティ',
      en: '🔒 Security',
    },
    {
      id: 'aliro',
      href: 'aliro.html',
      ja: '🔑 Aliroとは',
      en: '🔑 What is Aliro?',
    },
    {
      id: 'troubleshoot',
      href: 'troubleshoot.html',
      ja: '🔧 困ったときは',
      en: '🔧 Troubleshooting',
    },
    {
      id: 'glossary',
      href: 'glossary.html',
      ja: '📖 用語集',
      en: '📖 Glossary',
    },
  ];

  // ===== CSS（ヘッダー共通スタイル）=====
  const CSS = `
    #site-nav {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .snav-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .snav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #1f2937;
      flex-shrink: 0;
    }
    .snav-logo-icon {
      width: 32px;
      height: 32px;
      background: #059669;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
    }
    .snav-logo-text {
      font-size: 14px;
      font-weight: 700;
    }
    .snav-right {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .snav-links {
      display: flex;
      gap: 2px;
    }
    .snav-link {
      padding: 6px 12px;
      border-radius: 8px;
      text-decoration: none;
      color: #4b5563;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .snav-link:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
    .snav-link.active {
      background: #d1fae5;
      color: #065f46;
    }
    .snav-lang {
      display: flex;
      align-items: center;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      margin-left: 8px;
      flex-shrink: 0;
    }
    .snav-lang button {
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      background: transparent;
      color: #9ca3af;
      font-size: 11px;
      font-weight: 700;
      font-family: 'Inter', 'Noto Sans JP', sans-serif;
      transition: all 0.15s;
    }
    .snav-lang button.active {
      background: #059669;
      color: #fff;
    }
    .snav-lang button:hover:not(.active) {
      color: #1f2937;
      background: #f3f4f6;
    }
    /* モバイル */
    @media (max-width: 720px) {
      .snav-inner {
        padding: 0 12px;
        height: auto;
        min-height: 52px;
        flex-wrap: wrap;
        padding-top: 8px;
        padding-bottom: 8px;
        gap: 6px;
      }
      .snav-logo-text { font-size: 13px; }
      .snav-link { font-size: 11px; padding: 5px 8px; }
      .snav-right { flex-wrap: wrap; }
    }
    @media (max-width: 480px) {
      .snav-links { gap: 1px; }
      .snav-link { font-size: 10px; padding: 4px 6px; }
      .snav-link span.nav-text-long { display: none; }
      .snav-link span.nav-text-short { display: inline; }
    }
    @media (min-width: 481px) {
      .snav-link span.nav-text-short { display: none; }
    }
  `;

  // ===== 言語管理 =====
  function getLang() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('lang') === 'en') return 'en';
    return localStorage.getItem('matter-dict-lang') || 'ja';
  }

  function setLang(lang) {
    localStorage.setItem('matter-dict-lang', lang);
    // URLにlangパラメータを反映
    const url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());
    applyLang(lang);
  }

  // テキストノード置換エンジン
  // PAGE_TRANSLATIONS オブジェクト（各ページのtranslations-*.jsで定義）を使い
  // DOMのテキストノードを直接 JA ↔ EN に置き換える
  var _origTextCache = null; // JA原文キャッシュ（一度だけ取得）

  function buildOrigCache() {
    if (_origTextCache) return;
    _origTextCache = [];
    // script/style/code以外のテキストノードを収集
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          var p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
          // code-box内はスキップ
          if (p.closest && p.closest('.code-box')) return NodeFilter.FILTER_REJECT;
          return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
    var node;
    while ((node = walker.nextNode())) {
      _origTextCache.push({ node: node, orig: node.textContent });
    }
  }

  function applyTextTranslations(lang) {
    var table = window.PAGE_TRANSLATIONS;
    if (!table) return;
    buildOrigCache();

    _origTextCache.forEach(function(item) {
      var text = item.orig;
      if (lang === 'en') {
        // 完全一致
        if (table[text.trim()]) {
          item.node.textContent = table[text.trim()];
          return;
        }
        // 部分一致（テキストが翻訳キーを含む場合）
        var replaced = text;
        Object.keys(table).forEach(function(ja) {
          if (replaced.indexOf(ja) !== -1) {
            replaced = replaced.split(ja).join(table[ja]);
          }
        });
        item.node.textContent = replaced;
      } else {
        // JAに戻す
        item.node.textContent = item.orig;
      }
    });
  }

  function applyLang(lang) {
    // ナビリンクのテキスト更新
    document.querySelectorAll('.snav-link[data-nav-id]').forEach(function (el) {
      var id = el.getAttribute('data-nav-id');
      var item = NAV_ITEMS.find(function (n) { return n.id === id; });
      if (item) {
        el.querySelector('.nav-text-long').textContent = lang === 'en' ? item.en : item.ja;
        var emoji = (lang === 'en' ? item.en : item.ja).match(/^[\p{Emoji}🏠📡🔒🔑🔧]\s*/u);
        el.querySelector('.nav-text-short').textContent = emoji ? emoji[0].trim() : '';
      }
    });

    // lang切替ボタンの状態
    var btnJa = document.getElementById('snav-btn-ja');
    var btnEn = document.getElementById('snav-btn-en');
    if (btnJa) btnJa.classList.toggle('active', lang === 'ja');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    // data-ja/data-en 属性による切替（既存）
    document.querySelectorAll('[data-ja]').forEach(function (el) {
      if (lang === 'en' && el.getAttribute('data-en')) {
        el.innerHTML = el.getAttribute('data-en');
      } else {
        el.innerHTML = el.getAttribute('data-ja');
      }
    });

    // テキストノード直接置換（PAGE_TRANSLATIONSがある場合）
    applyTextTranslations(lang);

    // htmlタグのlang属性を更新
    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';

    // ページ内の言語ブロック切替（.ja-only / .en-only）
    document.querySelectorAll('.ja-only').forEach(function (el) {
      el.style.display = lang === 'en' ? 'none' : '';
    });
    document.querySelectorAll('.en-only').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });
  }

  // ===== ナビ生成 =====
  window.initNav = function (currentPageId) {
    // CSSを注入
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const lang = getLang();

    // ナビリンクHTML生成
    const linksHTML = NAV_ITEMS.map(function (item) {
      if (item.id === 'home') return ''; // ロゴで代替するため非表示
      const isActive = item.id === currentPageId;
      const text = lang === 'en' ? item.en : item.ja;
      const emoji = text.match(/^([\p{Emoji}🏠📡🔒🔑🔧]+\s*)/u);
      const emojiStr = emoji ? emoji[0] : '';
      return [
        '<a class="snav-link' + (isActive ? ' active' : '') + '"',
        '   href="' + item.href + '"',
        '   data-nav-id="' + item.id + '"',
        '   aria-current="' + (isActive ? 'page' : 'false') + '">',
        '  <span class="nav-text-long">' + text + '</span>',
        '  <span class="nav-text-short">' + emojiStr.trim() + '</span>',
        '</a>',
      ].join('\n');
    }).join('\n');

    const html = [
      '<div class="snav-inner">',
      '  <a class="snav-logo" href="index.html">',
      '    <div class="snav-logo-icon">M</div>',
      '    <span class="snav-logo-text">Matter辞書</span>',
      '  </a>',
      '  <div class="snav-right">',
      '    <nav class="snav-links" aria-label="サイトナビゲーション">',
      linksHTML,
      '    </nav>',
      '    <div class="snav-lang" role="group" aria-label="言語切替">',
      '      <button id="snav-btn-ja" onclick="snavSetLang(\'ja\')" aria-label="日本語">JA</button>',
      '      <button id="snav-btn-en" onclick="snavSetLang(\'en\')" aria-label="English">EN</button>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n');

    const container = document.getElementById('site-nav');
    if (container) {
      container.innerHTML = html;
    }

    // グローバルに公開（onclick用）
    window.snavSetLang = function (lang) {
      setLang(lang);
    };

    // 初期言語適用
    applyLang(lang);
  };
})();
