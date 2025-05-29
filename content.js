console.log('五十音面板 - 极简自动隐藏版 - 2024-06-13');

// 五十音数据
const fiftyonData = {
  hiragana: [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', '', 'ゆ', '', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', '', '', '', 'を'],
    ['ん']
  ],
  katakana: [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', '', '', 'ヲ'],
    ['ン']
  ],
  romaji: [
    ['a', 'i', 'u', 'e', 'o'],
    ['ka', 'ki', 'ku', 'ke', 'ko'],
    ['sa', 'shi', 'su', 'se', 'so'],
    ['ta', 'chi', 'tsu', 'te', 'to'],
    ['na', 'ni', 'nu', 'ne', 'no'],
    ['ha', 'hi', 'fu', 'he', 'ho'],
    ['ma', 'mi', 'mu', 'me', 'mo'],
    ['ya', '', 'yu', '', 'yo'],
    ['ra', 'ri', 'ru', 're', 'ro'],
    ['wa', '', '', '', 'wo'],
    ['n']
  ]
};

// 扩展假名（浊音、拗音、半浊音等）
const fiftyonExtend = [
  { kana: 'が', romaji: 'ga' }, { kana: 'ぎ', romaji: 'gi' }, { kana: 'ぐ', romaji: 'gu' }, { kana: 'げ', romaji: 'ge' }, { kana: 'ご', romaji: 'go' },
  { kana: 'ざ', romaji: 'za' }, { kana: 'じ', romaji: 'ji' }, { kana: 'ず', romaji: 'zu' }, { kana: 'ぜ', romaji: 'ze' }, { kana: 'ぞ', romaji: 'zo' },
  { kana: 'だ', romaji: 'da' }, { kana: 'ぢ', romaji: 'ji' }, { kana: 'づ', romaji: 'zu' }, { kana: 'で', romaji: 'de' }, { kana: 'ど', romaji: 'do' },
  { kana: 'ば', romaji: 'ba' }, { kana: 'び', romaji: 'bi' }, { kana: 'ぶ', romaji: 'bu' }, { kana: 'べ', romaji: 'be' }, { kana: 'ぼ', romaji: 'bo' },
  { kana: 'ぱ', romaji: 'pa' }, { kana: 'ぴ', romaji: 'pi' }, { kana: 'ぷ', romaji: 'pu' }, { kana: 'ぺ', romaji: 'pe' }, { kana: 'ぽ', romaji: 'po' },
  { kana: 'きゃ', romaji: 'kya' }, { kana: 'きゅ', romaji: 'kyu' }, { kana: 'きょ', romaji: 'kyo' },
  { kana: 'しゃ', romaji: 'sha' }, { kana: 'しゅ', romaji: 'shu' }, { kana: 'しょ', romaji: 'sho' },
  { kana: 'ちゃ', romaji: 'cha' }, { kana: 'ちゅ', romaji: 'chu' }, { kana: 'ちょ', romaji: 'cho' },
  { kana: 'にゃ', romaji: 'nya' }, { kana: 'にゅ', romaji: 'nyu' }, { kana: 'にょ', romaji: 'nyo' },
  { kana: 'ひゃ', romaji: 'hya' }, { kana: 'ひゅ', romaji: 'hyu' }, { kana: 'ひょ', romaji: 'hyo' },
  { kana: 'みゃ', romaji: 'mya' }, { kana: 'みゅ', romaji: 'myu' }, { kana: 'みょ', romaji: 'myo' },
  { kana: 'りゃ', romaji: 'rya' }, { kana: 'りゅ', romaji: 'ryu' }, { kana: 'りょ', romaji: 'ryo' }
];

// 创建面板容器
const panel = document.createElement('div');
panel.id = 'fiftyon-panel';
panel.className = 'fiftyon-panel bottom-right fiftyon-hidden';
panel.innerHTML = `
  <div class="fiftyon-header">
    <div class="fiftyon-title">五十音</div>
    <div class="fiftyon-controls">
      <button class="fiftyon-button" id="fiftyon-switch">切换</button>
      <button class="fiftyon-button" id="fiftyon-position">位置</button>
    </div>
  </div>
  <div class="fiftyon-grid" id="fiftyon-grid"></div>
`;
document.body.appendChild(panel);

// 创建扩展假名提示卡片，绝对定位在主面板上方
const extendTip = document.createElement('div');
extendTip.id = 'fiftyon-extend-tip';
extendTip.style.cssText = `
  display:none;position:absolute;top:0;right:0;left:0;margin:auto;
  width:120px;min-height:60px;
  background:#fffbe6;border:1.5px solid #fbc02d;padding:10px 0 8px 0;
  border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.18);
  font-size:20px;z-index:10001;text-align:center;
  pointer-events:none;transition:opacity 0.3s;
`;
panel.appendChild(extendTip);

let extendTipTimer = null;
function showExtendTip(kana, romaji) {
  extendTip.innerHTML = `<div style="font-size:32px;margin-bottom:4px;">${kana}</div>
    <div style="font-size:14px;color:#bfa600;">${romaji}</div>`;
  extendTip.style.display = 'block';
  extendTip.style.opacity = '1';
  speak(kana);
  if (extendTipTimer) clearTimeout(extendTipTimer);
  extendTipTimer = setTimeout(() => {
    extendTip.style.opacity = '0';
    setTimeout(() => { extendTip.style.display = 'none'; }, 300);
  }, 30000); // 30秒后自动隐藏
}

// 生成五十音表
const grid = document.getElementById('fiftyon-grid');
function generateGrid() {
  grid.innerHTML = '';
  const data = isHiragana ? fiftyonData.hiragana : fiftyonData.katakana;
  data.forEach((row, i) => {
    row.forEach((kana, j) => {
      if (kana) {
        const cell = document.createElement('div');
        cell.className = 'fiftyon-cell';
        cell.innerHTML = `
          <div class="fiftyon-kana">${kana}</div>
          <div class="fiftyon-romaji">${fiftyonData.romaji[i][j]}</div>
        `;
        cell.dataset.kana = kana;
        cell.dataset.romaji = fiftyonData.romaji[i][j];
        grid.appendChild(cell);
      }
    });
  });
}

// 发音函数
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  window.speechSynthesis.speak(utterance);
}

// 设置事件监听器
const switchBtn = document.getElementById('fiftyon-switch');
const positionBtn = document.getElementById('fiftyon-position');
let isHiragana = true;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

function setupEventListeners() {
  // 切换平假名/片假名
  switchBtn.addEventListener('click', () => {
    isHiragana = !isHiragana;
    generateGrid();
  });

  // 切换位置
  positionBtn.addEventListener('click', () => {
    panel.classList.toggle('top-left');
    panel.classList.toggle('bottom-right');
  });

  // 拖动相关
  panel.addEventListener('mousedown', (e) => {
    if (e.target.closest('.fiftyon-controls')) return;
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    panel.style.transition = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
    panel.classList.remove('top-left', 'bottom-right');
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    panel.style.transition = 'all 0.3s ease';
  });

  // 点击发音
  grid.addEventListener('click', (e) => {
    const cell = e.target.closest('.fiftyon-cell');
    if (cell) {
      speak(cell.dataset.kana);
    }
  });
}

// 自动隐藏/显示面板（鼠标移到右下角100x100区域才显示）
document.addEventListener('mousemove', function(e) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (e.clientX > vw - 120 && e.clientY > vh - 120) {
    panel.classList.remove('fiftyon-hidden');
    panel.classList.add('fiftyon-visible');
  } else {
    panel.classList.remove('fiftyon-visible');
    panel.classList.add('fiftyon-hidden');
  }
});

// 监听文本选择事件
document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  if (text) {
    // 优先查找扩展假名（如「が」）
    const ext = fiftyonExtend.find(item => item.kana === text);
    if (ext) {
      showExtendTip(ext.kana, ext.romaji);
      return;
    }
    // 如果不是扩展假名，且长度大于1，只处理第一个字符
    const firstChar = text[0];
    const cells = document.querySelectorAll('.fiftyon-cell');
    cells.forEach(cell => {
      cell.classList.remove('highlight');
      if (cell.dataset.kana === firstChar) {
        cell.classList.add('highlight');
        speak(firstChar);
      }
    });
  }
});

// 初始化
generateGrid();
setupEventListeners();