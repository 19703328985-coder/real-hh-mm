'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ====== 这里最适合你以后自己改 ====== */
const FLIGHT_LOG = [
  { date: 'SEP 2025', title: '又一次并肩出发', note: '新的一年开始。我们各自忙着向前，但也把彼此放进了每天的生活里。' },
  { date: 'DEC 2025', title: '忙碌里，仍然彼此回应', note: '很多时候不是发生了多大的事，而是在累的时候，知道有人愿意听你说完。' },
  { date: 'MAR 2026', title: '把普通日子过成纪念', note: '一些饭、一些路、一些很小的对话。后来才发现，最舍不得的常常就是这些。' },
  { date: 'JUN 2026', title: '为各自的方向认真生活', note: '我们都在变得更忙、更坚定。幸好成长不是走散，而是有了更多可以一起分享的未来。' },
  { date: 'SEP 2026', title: '抵达 22 岁', note: '这一程先在这里降落。生日快乐，昊昊。下一段航程，继续去你想去的地方。' }
];

const WINDOW_MEMORIES = [
  {
    no: 'WINDOW 01',
    meta: 'CADET DAYS · WITH THE CREW',
    image: 'window-01.jpg',
    position: '50% 74%',
    title: '你认真奔向天空的样子，我一直记得。',
    text: '穿上制服、和伙伴们站在跑道边，把这一刻留下来。你一步一步把喜欢的事，变成了正在发生的人生。'
  },
  {
    no: 'WINDOW 02',
    meta: 'HANGAR · CLOSER TO THE SKY',
    image: 'window-02.jpg',
    position: '52% 45%',
    title: '梦想从来不只是一句漂亮的话。',
    text: '真正喜欢一件事，是愿意走进机库、靠近飞机，把每一次训练和准备，都当作通往远方的一部分。'
  },
  {
    no: 'WINDOW 03',
    meta: 'US · OFF DUTY',
    image: 'window-03.jpg',
    position: '50% 46%',
    title: '而我最喜欢的，是飞行之外的你。',
    text: '不需要多特别的地点。一起散步、靠得很近拍一张照片，就已经足够成为我想收藏很久的普通一天。'
  }
];


/* ====== V6 · 个人飞行履历 ======
   把真实航班写在这里并上传 GitHub，所有打开网站的人都会看到。
   只填机场三字码即可；下方 AIRPORTS 已经内置常见机场坐标。

   示例（不要直接取消注释，除非它确实是真实航班）：
   { date: '2026-08-18', flight: 'CZ1234', from: 'XUZ', to: 'CAN', note: '第一次去广州' }
*/
const PUBLISHED_FLIGHTS = [
];

const AIRCRAFT_TYPES = [
  'C172S','C172R','DA40','DA42','SR20','SR22',
  'A319','A320-200','A320neo','A321-200','A321neo','A330-300','A350-900',
  'B737-700','B737-800','B737 MAX 8','B747-8','B777-300ER','B787-8','B787-9',
  'C919','ARJ21','E190','E195-E2','CRJ900'
];

const AIRPORTS = {
  XUZ:{city:'徐州',name:'徐州观音国际机场',lat:34.0591,lon:117.5553},
  NKG:{city:'南京',name:'南京禄口国际机场',lat:31.7420,lon:118.8620},
  PVG:{city:'上海',name:'上海浦东国际机场',lat:31.1443,lon:121.8083},
  SHA:{city:'上海',name:'上海虹桥国际机场',lat:31.1979,lon:121.3363},
  PEK:{city:'北京',name:'北京首都国际机场',lat:40.0799,lon:116.6031},
  PKX:{city:'北京',name:'北京大兴国际机场',lat:39.5098,lon:116.4105},
  CAN:{city:'广州',name:'广州白云国际机场',lat:23.3924,lon:113.2988},
  SZX:{city:'深圳',name:'深圳宝安国际机场',lat:22.6393,lon:113.8107},
  HGH:{city:'杭州',name:'杭州萧山国际机场',lat:30.2295,lon:120.4345},
  WUX:{city:'无锡',name:'苏南硕放国际机场',lat:31.4944,lon:120.4294},
  YTY:{city:'扬州',name:'扬州泰州国际机场',lat:32.5617,lon:119.7150},
  NTG:{city:'南通',name:'南通兴东国际机场',lat:32.0708,lon:120.9760},
  YNZ:{city:'盐城',name:'盐城南洋国际机场',lat:33.4258,lon:120.2031},
  LYG:{city:'连云港',name:'连云港花果山机场',lat:34.5717,lon:118.8736},
  CTU:{city:'成都',name:'成都双流国际机场',lat:30.5785,lon:103.9471},
  TFU:{city:'成都',name:'成都天府国际机场',lat:30.3125,lon:104.4410},
  CKG:{city:'重庆',name:'重庆江北国际机场',lat:29.7192,lon:106.6417},
  XIY:{city:'西安',name:'西安咸阳国际机场',lat:34.4471,lon:108.7516},
  WUH:{city:'武汉',name:'武汉天河国际机场',lat:30.7838,lon:114.2081},
  CSX:{city:'长沙',name:'长沙黄花国际机场',lat:28.1892,lon:113.2200},
  KMG:{city:'昆明',name:'昆明长水国际机场',lat:25.1019,lon:102.9292},
  TAO:{city:'青岛',name:'青岛胶东国际机场',lat:36.3619,lon:120.0882},
  TNA:{city:'济南',name:'济南遥墙国际机场',lat:36.8572,lon:117.2160},
  CGO:{city:'郑州',name:'郑州新郑国际机场',lat:34.5197,lon:113.8409},
  TSN:{city:'天津',name:'天津滨海国际机场',lat:39.1244,lon:117.3462},
  DLC:{city:'大连',name:'大连周水子国际机场',lat:38.9657,lon:121.5386},
  SHE:{city:'沈阳',name:'沈阳桃仙国际机场',lat:41.6398,lon:123.4834},
  HRB:{city:'哈尔滨',name:'哈尔滨太平国际机场',lat:45.6234,lon:126.2503},
  XMN:{city:'厦门',name:'厦门高崎国际机场',lat:24.5440,lon:118.1277},
  FOC:{city:'福州',name:'福州长乐国际机场',lat:25.9351,lon:119.6633},
  HAK:{city:'海口',name:'海口美兰国际机场',lat:19.9349,lon:110.4590},
  SYX:{city:'三亚',name:'三亚凤凰国际机场',lat:18.3029,lon:109.4120},
  NNG:{city:'南宁',name:'南宁吴圩国际机场',lat:22.6083,lon:108.1724},
  KWE:{city:'贵阳',name:'贵阳龙洞堡国际机场',lat:26.5385,lon:106.8007},
  LHW:{city:'兰州',name:'兰州中川国际机场',lat:36.5152,lon:103.6208},
  URC:{city:'乌鲁木齐',name:'乌鲁木齐天山国际机场',lat:43.9071,lon:87.4742},
  ZUH:{city:'珠海',name:'珠海金湾机场',lat:22.0064,lon:113.3760},
  HKG:{city:'香港',name:'香港国际机场',lat:22.3080,lon:113.9185},
  MFM:{city:'澳门',name:'澳门国际机场',lat:22.1496,lon:113.5915},
  TPE:{city:'台北',name:'台湾桃园国际机场',lat:25.0797,lon:121.2342},
  NRT:{city:'东京',name:'成田国际机场',lat:35.7720,lon:140.3929},
  HND:{city:'东京',name:'东京羽田机场',lat:35.5494,lon:139.7798},
  KIX:{city:'大阪',name:'关西国际机场',lat:34.4347,lon:135.2441},
  ICN:{city:'首尔',name:'仁川国际机场',lat:37.4602,lon:126.4407},
  SIN:{city:'新加坡',name:'新加坡樟宜机场',lat:1.3644,lon:103.9915},
  BKK:{city:'曼谷',name:'素万那普国际机场',lat:13.6900,lon:100.7501}
};

/* ====== 可编辑区结束 ====== */

const boarding = $('#boarding');
const boardBtn = $('#board-btn');
const skipIntro = $('#skip-intro');
const topbar = $('#topbar');
const heroPhoto = $('#hero-photo');
const timeline = $('#timeline');
const windowsGrid = $('#windows-grid');
const wishForm = $('#wish-form');
const wishInput = $('#wish-input');
const wishCount = $('#wish-count');
const wishError = $('#wish-error');
const takeoff = $('#takeoff');
const takeoffStatus = $('#takeoff-status');
const takeoffResult = $('#takeoff-result');
const takeoffWish = $('#takeoff-wish');
const takeoffClose = $('#takeoff-close');
const sealRecord = $('#seal-record');
const storedWish = $('#stored-wish');
const recordedDate = $('#recorded-date');
const clearWish = $('#clear-wish');
const editWish = $('#edit-wish');
const bgm = $('#bgm');
const musicControl = $('#music-control');
const musicLabel = $('.music-label', musicControl);

let activeWish = '';
let takeoffTimers = [];

/* Soundtrack: starts only after a user gesture, then remembers mute preference. */
const MUSIC_STORAGE_KEY = 'hh022-music-muted-v1';
const BASE_MUSIC_VOLUME = 0.22;
let volumeFrame = 0;
let musicMuted = localStorage.getItem(MUSIC_STORAGE_KEY) === '1';

function syncMusicUI() {
  const playing = !bgm.paused && !musicMuted;
  musicControl.classList.toggle('playing', playing);
  musicControl.setAttribute('aria-pressed', String(playing));
  musicLabel.textContent = playing ? 'SOUND ON' : 'SOUND OFF';
}

function fadeMusicTo(target, duration = 900, pauseAfter = false) {
  cancelAnimationFrame(volumeFrame);
  const start = bgm.volume;
  const began = performance.now();
  const tick = (now) => {
    const ratio = Math.min(1, (now - began) / Math.max(1, duration));
    const eased = 1 - Math.pow(1 - ratio, 3);
    bgm.volume = Math.max(0, Math.min(1, start + (target - start) * eased));
    if (ratio < 1) {
      volumeFrame = requestAnimationFrame(tick);
    } else if (pauseAfter) {
      bgm.pause();
      syncMusicUI();
    }
  };
  volumeFrame = requestAnimationFrame(tick);
}

async function startMusic() {
  if (musicMuted) {
    syncMusicUI();
    return;
  }
  try {
    bgm.volume = 0;
    await bgm.play();
    fadeMusicTo(BASE_MUSIC_VOLUME, reducedMotion ? 80 : 1600);
  } catch {
    // Some browsers can still block playback; the visible control lets the user retry.
  }
  syncMusicUI();
}

function toggleMusic() {
  musicMuted = !bgm.paused && !musicMuted;
  if (musicMuted) {
    localStorage.setItem(MUSIC_STORAGE_KEY, '1');
    fadeMusicTo(0, reducedMotion ? 30 : 550, true);
  } else {
    localStorage.setItem(MUSIC_STORAGE_KEY, '0');
    musicMuted = false;
    startMusic();
  }
  syncMusicUI();
}

musicControl.addEventListener('click', toggleMusic);
bgm.addEventListener('play', syncMusicUI);
bgm.addEventListener('pause', syncMusicUI);
syncMusicUI();

function enterSite() {
  startMusic();
  document.body.classList.add('entered');
  boarding.classList.add('leaving');
  setTimeout(() => boarding.hidden = true, reducedMotion ? 20 : 900);
  setTimeout(() => maybeAutoDeliverFutureMail(), reducedMotion ? 120 : 1250);
}

boardBtn.addEventListener('click', enterSite);
skipIntro.addEventListener('click', enterSite);

/* Timeline */
FLIGHT_LOG.forEach((item, index) => {
  const article = document.createElement('article');
  article.className = 'log-item reveal';
  article.innerHTML = `
    <time>${item.date}</time>
    <h4>${item.title}</h4>
    <p>${item.note}</p>
  `;
  article.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  timeline.appendChild(article);
});

/* Window memories */
WINDOW_MEMORIES.forEach((item, index) => {
  const article = document.createElement('article');
  article.className = 'window-card reveal';
  article.innerHTML = `
    <div class="window-image" aria-hidden="true"></div>
    <div class="window-shade" aria-hidden="true"></div>
    <div class="window-content">
      <div class="window-kicker"><span>${item.no}</span><small>${item.meta || ''}</small></div>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>
  `;
  const image = $('.window-image', article);
  image.style.backgroundImage = `url('${item.image}')`;
  image.style.backgroundPosition = item.position || 'center';
  article.style.transitionDelay = `${index * 90}ms`;
  windowsGrid.appendChild(article);
});

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

$$('.reveal').forEach(el => revealObserver.observe(el));

/* Letter paragraph progression */
const letterParagraphs = $$('#letter-copy p');
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = letterParagraphs.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('lit'), reducedMotion ? 0 : index * 180);
      letterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
letterParagraphs.forEach(p => letterObserver.observe(p));

/* Header + route progress */
function onScroll() {
  topbar.classList.toggle('scrolled', window.scrollY > 28);

  const routeShell = $('.route-shell');
  const progress = $('#route-progress');
  if (routeShell && progress) {
    const rect = routeShell.getBoundingClientRect();
    const viewportMid = window.innerHeight * 0.58;
    const passed = viewportMid - rect.top;
    const ratio = Math.max(0, Math.min(1, passed / rect.height));
    progress.style.height = `${ratio * 100}%`;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Very subtle pointer parallax */
if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
  document.body.classList.add('pointer');
  const glow = $('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

    const dx = (x / window.innerWidth - 0.5) * 8;
    const dy = (y / window.innerHeight - 0.5) * 5;
    if (window.scrollY < window.innerHeight) {
      heroPhoto.style.transform = `scale(1.055) translate(${dx}px, ${dy}px)`;
    }
  }, { passive: true });
}

/* Wish counter */
wishInput.addEventListener('input', () => {
  wishCount.textContent = `${wishInput.value.length} / 120`;
  wishError.textContent = '';
});

function clearTakeoffTimers() {
  takeoffTimers.forEach(clearTimeout);
  takeoffTimers = [];
}

function setTakeoffStatus(text, delay) {
  takeoffTimers.push(setTimeout(() => {
    takeoffStatus.textContent = text;
  }, reducedMotion ? Math.min(delay, 30) : delay));
}

function startTakeoff() {
  clearTakeoffTimers();
  if (!bgm.paused && !musicMuted) fadeMusicTo(0.29, reducedMotion ? 50 : 1200);
  takeoff.hidden = false;
  document.body.classList.add('locked');
  takeoffResult.hidden = true;
  takeoff.classList.remove('running');
  takeoffStatus.textContent = 'DOORS CLOSED';
  takeoffWish.textContent = activeWish;
  void takeoff.offsetWidth;
  takeoff.classList.add('running');

  setTakeoffStatus('RUNWAY CLEAR', 1300);
  setTakeoffStatus('HH022 CLEARED FOR TAKEOFF', 2900);
  setTakeoffStatus('CLIMBING · 12,000 FT', 4700);
  setTakeoffStatus('CRUISING · CHAPTER 22', 6200);

  takeoffTimers.push(setTimeout(() => {
    takeoffResult.hidden = false;
    takeoffStatus.textContent = 'WISH IN FLIGHT';
  }, reducedMotion ? 80 : 7450));
}

wishForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = wishInput.value.trim();
  if (!value) {
    wishError.textContent = '先写下一句话，再让它起航。';
    wishInput.focus();
    return;
  }
  activeWish = value;
  startTakeoff();
});

function closeTakeoff() {
  clearTakeoffTimers();
  if (!bgm.paused && !musicMuted) fadeMusicTo(BASE_MUSIC_VOLUME, reducedMotion ? 50 : 850);
  takeoff.hidden = true;
  takeoff.classList.remove('running');
  document.body.classList.remove('locked');
}
takeoffClose.addEventListener('click', closeTakeoff);

/* Local flight recorder */
const STORAGE_KEY = 'hh022-flight-recorder-v2';

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '15 SEP 2026';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date)
    .toUpperCase();
}

function saveWish(wish) {
  const payload = { wish, recordedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  renderStoredWish();
}

function renderStoredWish() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      storedWish.textContent = '还没有封存愿望。';
      recordedDate.textContent = '—';
      return;
    }
    const data = JSON.parse(raw);
    storedWish.textContent = data.wish || '还没有封存愿望。';
    recordedDate.textContent = formatDate(data.recordedAt);
  } catch {
    storedWish.textContent = '记录读取失败，请重新写下愿望。';
    recordedDate.textContent = '—';
  }
}

sealRecord.addEventListener('click', () => {
  saveWish(activeWish);
  closeTakeoff();
  $('#recorder').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
});

clearWish.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderStoredWish();
});

editWish.addEventListener('click', () => {
  $('#wish').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  setTimeout(() => wishInput.focus(), reducedMotion ? 0 : 550);
});

renderStoredWish();

/* =========================================================
   V5 · FLIGHT ATLAS
   - 真实航班：PUBLISHED_FLIGHTS（上方，可发布给所有人）
   - 临时/个人航班：当前浏览器 localStorage
   - 3D 地球：Three.js CDN，纯静态 Pages 可直接运行
   ========================================================= */
const ATLAS_LOCAL_KEY = 'hh022-personal-flight-logbook-v2';
const LEGACY_ATLAS_LOCAL_KEY = 'hh022-local-flights-v1';
const flightList = $('#flight-list');
const manifestEmpty = $('#manifest-empty');
const manifestCount = $('#manifest-count');
const statFlights = $('#stat-flights');
const statAirports = $('#stat-airports');
const statAircraft = $('#stat-aircraft');
const statDistance = $('#stat-distance');
const statLatest = $('#stat-latest');
const airportList = $('#airport-list');
const aircraftList = $('#aircraft-list');
const fleetSummary = $('#fleet-summary');
const fleetModels = $('#fleet-models');
const addFlightToggle = $('#add-flight-toggle');
const flightFormShell = $('#flight-form-shell');
const closeFlightForm = $('#close-flight-form');
const flightForm = $('#flight-form');
const flightDate = $('#flight-date');
const flightNumber = $('#flight-number');
const flightFrom = $('#flight-from');
const flightTo = $('#flight-to');
const flightOperator = $('#flight-operator');
const flightAircraft = $('#flight-aircraft');
const flightRegistration = $('#flight-registration');
const flightRole = $('#flight-role');
const flightNote = $('#flight-note');
const flightFormHeading = $('#flight-form-heading');
const saveFlightBtn = $('#save-flight-btn');
const flightFormError = $('#flight-form-error');
const exportFlights = $('#export-flights');
const importFlights = $('#import-flights');
const importFlightsFile = $('#import-flights-file');
const clearLocalFlights = $('#clear-local-flights');
const globeReset = $('#globe-reset');
const globeEmpty = $('#globe-empty');

let atlasEngine = null;
let pendingAtlasFocus = null;
let localFlights = readLocalFlights();
let editingFlightId = null;

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'
  }[char]));
}

function readLocalFlights() {
  try {
    const current = localStorage.getItem(ATLAS_LOCAL_KEY);
    const legacy = localStorage.getItem(LEGACY_ATLAS_LOCAL_KEY);
    const parsed = JSON.parse(current || legacy || '[]');
    const records = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.records) ? parsed.records : []);
    if (!current && records.length) localStorage.setItem(ATLAS_LOCAL_KEY, JSON.stringify(records));
    return records;
  } catch {
    return [];
  }
}

function saveLocalFlights() {
  localStorage.setItem(ATLAS_LOCAL_KEY, JSON.stringify(localFlights));
}

function normalizeCode(value) {
  return String(value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
}

function normalizeFlight(record, source = 'published', index = 0) {
  const from = normalizeCode(record.from);
  const to = normalizeCode(record.to);
  const fromAirport = AIRPORTS[from];
  const toAirport = AIRPORTS[to];
  if (!fromAirport || !toAirport || from === to) return null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(record.date || '') ? record.date : '2026-09-15';
  const flight = String(record.flight || 'FLIGHT').trim().slice(0, 18) || 'FLIGHT';
  return {
    id: record.id || `${source}-${date}-${flight}-${from}-${to}-${index}`.replace(/\s+/g,'-'),
    date,
    flight,
    from,
    to,
    operator: String(record.operator || '').trim().slice(0, 30),
    aircraft: String(record.aircraft || 'UNKNOWN').trim().toUpperCase().slice(0, 30) || 'UNKNOWN',
    registration: String(record.registration || '').trim().toUpperCase().slice(0, 16),
    role: String(record.role || '').trim().slice(0, 24),
    note: String(record.note || '').trim().slice(0, 80),
    source,
    fromAirport,
    toAirport
  };
}

function getAllFlights() {
  const published = PUBLISHED_FLIGHTS.map((item, index) => normalizeFlight(item, 'published', index)).filter(Boolean);
  const local = localFlights.map((item, index) => normalizeFlight(item, 'local', index)).filter(Boolean);
  return [...published, ...local].sort((a, b) => b.date.localeCompare(a.date));
}

function haversineKm(a, b) {
  const R = 6371;
  const rad = (deg) => deg * Math.PI / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const lat1 = rad(a.lat);
  const lat2 = rad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function displayFlightDate(date) {
  const [year, month, day] = date.split('-');
  return `${year} · ${month} · ${day}`;
}

function compactLatest(date) {
  if (!date) return '—';
  const [year, month, day] = date.split('-');
  return `${year}.${month}.${day}`;
}

function renderAirportDatalist() {
  if (!airportList) return;
  airportList.innerHTML = Object.entries(AIRPORTS)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([code, airport]) => `<option value="${code}">${escapeHtml(airport.city)} · ${escapeHtml(airport.name)}</option>`)
    .join('');
}

function renderAircraftDatalist() {
  if (!aircraftList) return;
  aircraftList.innerHTML = AIRCRAFT_TYPES.map((type) => `<option value="${escapeHtml(type)}"></option>`).join('');
}

function renderFleet(records) {
  const counts = new Map();
  records.forEach((record) => {
    const type = record.aircraft || 'UNKNOWN';
    counts.set(type, (counts.get(type) || 0) + 1);
  });
  statAircraft.textContent = counts.size;
  if (!fleetSummary || !fleetModels) return;
  fleetSummary.hidden = counts.size === 0;
  fleetModels.innerHTML = [...counts.entries()]
    .sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([type, count]) => `<button class="fleet-model" type="button" data-aircraft="${escapeHtml(type)}"><span>${escapeHtml(type)}</span><strong>${String(count).padStart(2,'0')}</strong><small>FLIGHT${count === 1 ? '' : 'S'}</small></button>`)
    .join('');
  $$('.fleet-model', fleetModels).forEach((button) => {
    button.addEventListener('click', () => {
      const aircraft = button.dataset.aircraft;
      const first = records.find((record) => record.aircraft === aircraft);
      if (first) selectAtlasFlight(first.id);
    });
  });
}

function renderAtlas() {
  if (!flightList) return;
  const records = getAllFlights();
  manifestCount.textContent = `${String(records.length).padStart(2, '0')} RECORD${records.length === 1 ? '' : 'S'}`;
  manifestEmpty.hidden = records.length > 0;
  globeEmpty.hidden = records.length > 0 || getVoiceMapRecords().length > 0;

  const airportCodes = new Set();
  let totalKm = 0;
  records.forEach((record) => {
    airportCodes.add(record.from);
    airportCodes.add(record.to);
    record.distanceKm = Math.round(haversineKm(record.fromAirport, record.toAirport));
    totalKm += record.distanceKm;
  });
  statFlights.textContent = records.length;
  statAirports.textContent = airportCodes.size;
  renderFleet(records);
  statDistance.textContent = `${Math.round(totalKm).toLocaleString('en-US')} KM`;
  statLatest.textContent = compactLatest(records[0]?.date);

  flightList.innerHTML = '';
  records.forEach((record, index) => {
    const card = document.createElement('article');
    card.className = `flight-card ${record.source === 'local' ? 'local' : ''}`;
    card.dataset.flightId = record.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${record.flight} ${record.from} 到 ${record.to}`);
    card.innerHTML = `
      <div class="flight-card-top">
        <time>${displayFlightDate(record.date)}</time>
        <span class="flight-card-no">${escapeHtml(record.flight)}</span>
      </div>
      <div class="flight-route">
        <strong>${record.from}</strong><i></i><strong>${record.to}</strong>
      </div>
      <div class="flight-cities"><span>${escapeHtml(record.fromAirport.city)}</span><span>${escapeHtml(record.toAirport.city)}</span></div>
      <div class="aircraft-strip">
        <strong>${escapeHtml(record.aircraft)}</strong>
        ${record.registration ? `<span>${escapeHtml(record.registration)}</span>` : ''}
        ${record.operator ? `<span>${escapeHtml(record.operator)}</span>` : ''}
        ${record.role ? `<span>${escapeHtml(record.role)}</span>` : ''}
      </div>
      <div class="flight-meta">
        <span class="flight-note">${escapeHtml(record.note || 'PERSONAL FLIGHT LOG')}</span>
        <span>${record.distanceKm.toLocaleString('en-US')} KM</span>
      </div>
      ${record.source === 'local' ? `<div class="flight-card-actions"><button type="button" data-action="edit">EDIT</button><button type="button" data-action="delete">DELETE</button></div>` : ''}`;
    const activate = () => selectAtlasFlight(record.id, card);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
    if (record.source === 'local') {
      $('[data-action="edit"]', card)?.addEventListener('click', (event) => {
        event.stopPropagation();
        beginEditFlight(record.id);
      });
      $('[data-action="delete"]', card)?.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteFlight(record.id);
      });
    }
    flightList.appendChild(card);
    if (index === 0 && records.length) card.classList.add('active');
  });

  if (atlasEngine) {
    atlasEngine.setFlights(records);
    if (records[0]) atlasEngine.focusFlight(records[0].id, false);
  }
  window.HH022_REFRESH_LIFE_OS?.();
}

function selectAtlasFlight(id, card = null) {
  $$('.flight-card', flightList).forEach((item) => item.classList.toggle('active', item.dataset.flightId === id));
  if (!card) card = $(`.flight-card[data-flight-id="${CSS.escape(id)}"]`, flightList);
  card?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  if (atlasEngine) atlasEngine.focusFlight(id, true);
  else pendingAtlasFocus = id;
}

renderAirportDatalist();
renderAircraftDatalist();
renderAtlas();
if (flightDate && !flightDate.value) flightDate.value = new Date().toISOString().slice(0, 10);

function resetFlightForm() {
  editingFlightId = null;
  flightForm.reset();
  flightDate.value = new Date().toISOString().slice(0, 10);
  flightFormError.textContent = '';
  flightFormHeading.textContent = '记录一程航班';
  saveFlightBtn.innerHTML = 'SAVE TO LOGBOOK <span>↗</span>';
}

function openFlightForm() {
  flightFormShell.hidden = false;
  addFlightToggle.hidden = true;
  setTimeout(() => flightNumber.focus(), 60);
}

function beginEditFlight(id) {
  const record = localFlights.find((item) => item.id === id);
  if (!record) return;
  editingFlightId = id;
  flightDate.value = record.date || '';
  flightNumber.value = record.flight || '';
  flightFrom.value = record.from || '';
  flightTo.value = record.to || '';
  flightOperator.value = record.operator || '';
  flightAircraft.value = record.aircraft || '';
  flightRegistration.value = record.registration || '';
  flightRole.value = record.role || '';
  flightNote.value = record.note || '';
  flightFormHeading.textContent = '修改这一程';
  saveFlightBtn.innerHTML = 'UPDATE FLIGHT <span>↗</span>';
  openFlightForm();
}

function deleteFlight(id) {
  const record = localFlights.find((item) => item.id === id);
  if (!record) return;
  const ok = window.confirm(`删除 ${record.flight || '这条航班'} 的记录吗？`);
  if (!ok) return;
  localFlights = localFlights.filter((item) => item.id !== id);
  saveLocalFlights();
  renderAtlas();
}

addFlightToggle?.addEventListener('click', () => {
  resetFlightForm();
  openFlightForm();
});
closeFlightForm?.addEventListener('click', () => {
  flightFormShell.hidden = true;
  addFlightToggle.hidden = false;
  resetFlightForm();
});

flightFrom?.addEventListener('input', () => { flightFrom.value = flightFrom.value.toUpperCase(); });
flightTo?.addEventListener('input', () => { flightTo.value = flightTo.value.toUpperCase(); });
flightNumber?.addEventListener('input', () => { flightNumber.value = flightNumber.value.toUpperCase(); });
flightAircraft?.addEventListener('input', () => { flightAircraft.value = flightAircraft.value.toUpperCase(); });
flightRegistration?.addEventListener('input', () => { flightRegistration.value = flightRegistration.value.toUpperCase(); });

flightForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const from = normalizeCode(flightFrom.value);
  const to = normalizeCode(flightTo.value);
  if (!AIRPORTS[from] || !AIRPORTS[to]) {
    flightFormError.textContent = '请选择列表中已经收录的机场三字码。';
    return;
  }
  if (from === to) {
    flightFormError.textContent = '起点和终点不能相同。';
    return;
  }
  const record = {
    id: editingFlightId || `local-${Date.now()}`,
    date: flightDate.value,
    flight: flightNumber.value.trim().toUpperCase(),
    from,
    to,
    operator: flightOperator.value.trim(),
    aircraft: flightAircraft.value.trim().toUpperCase(),
    registration: flightRegistration.value.trim().toUpperCase(),
    role: flightRole.value.trim(),
    note: flightNote.value.trim()
  };
  if (!record.date || !record.flight || !record.aircraft) {
    flightFormError.textContent = '日期、航班号和飞机型号需要填写完整。';
    return;
  }
  if (editingFlightId) {
    localFlights = localFlights.map((item) => item.id === editingFlightId ? record : item);
  } else {
    localFlights.push(record);
  }
  saveLocalFlights();
  const savedId = record.id;
  resetFlightForm();
  flightFormShell.hidden = true;
  addFlightToggle.hidden = false;
  renderAtlas();
  requestAnimationFrame(() => selectAtlasFlight(savedId));
});

clearLocalFlights?.addEventListener('click', () => {
  if (!localFlights.length) return;
  const ok = window.confirm('只会清除这台设备里新增的航班，不会影响网站源码中的永久航班。确定清除吗？');
  if (!ok) return;
  localFlights = [];
  saveLocalFlights();
  renderAtlas();
});

exportFlights?.addEventListener('click', () => {
  const archive = {
    format: 'HH022 PERSONAL FLIGHT LOGBOOK',
    version: 3,
    exportedAt: new Date().toISOString(),
    records: localFlights
  };
  const payload = JSON.stringify(archive, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `haohao-flight-logbook-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

importFlights?.addEventListener('click', () => importFlightsFile?.click());
importFlightsFile?.addEventListener('change', async () => {
  const file = importFlightsFile.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const incoming = Array.isArray(parsed) ? parsed : parsed.records;
    if (!Array.isArray(incoming)) throw new Error('invalid');
    const cleaned = incoming
      .map((item, index) => ({ ...item, id: item.id || `import-${Date.now()}-${index}` }))
      .filter((item) => AIRPORTS[normalizeCode(item.from)] && AIRPORTS[normalizeCode(item.to)] && item.flight && item.date);
    if (!cleaned.length && incoming.length) throw new Error('empty');
    const mode = localFlights.length ? window.confirm('点击“确定”合并导入；点击“取消”则用备份完全替换当前记录。') : true;
    localFlights = (mode === false) ? cleaned : [...localFlights, ...cleaned];
    const unique = new Map();
    localFlights.forEach((item) => unique.set(item.id || `${item.date}-${item.flight}-${item.from}-${item.to}`, item));
    localFlights = [...unique.values()];
    saveLocalFlights();
    renderAtlas();
    window.alert(`已导入 ${cleaned.length} 条飞行记录。`);
  } catch {
    window.alert('这个 JSON 文件不是可识别的飞行档案。');
  } finally {
    importFlightsFile.value = '';
  }
});

/* ---------- THREE.JS GLOBE ---------- */
async function bootFlightGlobe() {
  const canvas = $('#flight-globe');
  const stage = $('#globe-stage');
  const loading = $('#globe-loading');
  const tooltip = $('#globe-tooltip');
  if (!canvas || !stage) return;

  let THREE;
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js');
  } catch (error) {
    console.warn('Three.js failed to load:', error);
    loading.innerHTML = '<span>3D ENGINE UNAVAILABLE · REFRESH TO RETRY</span>';
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 3.75);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const world = new THREE.Group();
  scene.add(world);
  const routesGroup = new THREE.Group();
  const markersGroup = new THREE.Group();
  world.add(routesGroup, markersGroup);

  const RADIUS = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  // Blue Marble texture gives the globe a much more natural, daylight-Earth look.
  // If the texture CDN is temporarily unavailable, the bright ocean fallback still keeps the globe usable.
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x7db9d3,
    emissive: 0x07131a,
    emissiveIntensity: 0.18,
    shininess: 8,
    specular: 0x7ea7b8
  });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), earthMaterial);
  world.add(globe);

  const earthTextureUrl = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');
  textureLoader.load(earthTextureUrl, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy?.() || 1);
    earthMaterial.map = texture;
    earthMaterial.color.setHex(0xffffff);
    earthMaterial.needsUpdate = true;
  }, undefined, () => {
    console.warn('Earth texture unavailable; using bright fallback material.');
  });

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.07, 72, 72),
    new THREE.MeshBasicMaterial({
      color: 0x78c8f0,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  world.add(atmosphere);

  const atmosphereEdge = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.025, 72, 72),
    new THREE.MeshPhongMaterial({ color: 0xbcecff, transparent: true, opacity: 0.055, side: THREE.FrontSide, depthWrite: false })
  );
  world.add(atmosphereEdge);

  const hemi = new THREE.HemisphereLight(0xd8f3ff, 0x15202a, 1.75);
  const sun = new THREE.DirectionalLight(0xfff2dc, 2.15);
  sun.position.set(-3.6, 2.4, 4.5);
  const fill = new THREE.DirectionalLight(0x8bd4ff, 0.8);
  fill.position.set(2.2, 0.5, -2.8);
  scene.add(hemi, sun, fill);

  const gridMaterial = new THREE.LineBasicMaterial({ color: 0xc5e4f0, transparent: true, opacity: 0.055 });
  const grid = new THREE.Group();
  const latLonToVector = (lat, lon, radius = RADIUS) => {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 4) points.push(latLonToVector(lat, lon, RADIUS * 1.003));
    grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const points = [];
    for (let lat = -88; lat <= 88; lat += 3) points.push(latLonToVector(lat, lon, RADIUS * 1.003));
    grid.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
  }
  world.add(grid);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = window.innerWidth < 650 ? 320 : 720;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const radius = 5 + Math.random() * 7;
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const s = Math.sqrt(1 - u * u);
    starPositions[i * 3] = radius * s * Math.cos(theta);
    starPositions[i * 3 + 1] = radius * u;
    starPositions[i * 3 + 2] = radius * s * Math.sin(theta);
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xa9c1cf, size: 0.012, transparent: true, opacity: 0.48, sizeAttenuation: true })));

  const markerMeshes = [];
  const routeObjects = new Map();
  const pulses = [];
  const gold = 0xcdb78f;
  const blue = 0x75b8dc;

  function disposeGroup(group) {
    while (group.children.length) {
      const child = group.children.pop();
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose?.());
      else child.material?.dispose?.();
      child.children?.forEach?.((sub) => {
        sub.geometry?.dispose?.();
        sub.material?.dispose?.();
      });
    }
  }

  function makeArc(record) {
    const start = latLonToVector(record.fromAirport.lat, record.fromAirport.lon, RADIUS * 1.015);
    const end = latLonToVector(record.toAirport.lat, record.toAirport.lon, RADIUS * 1.015);
    let midDir = start.clone().add(end);
    if (midDir.lengthSq() < 0.01) midDir = start.clone().cross(new THREE.Vector3(0,1,0));
    midDir.normalize();
    const centralAngle = start.clone().normalize().angleTo(end.clone().normalize());
    const lift = 0.18 + Math.min(0.38, centralAngle * 0.23);
    const control = midDir.multiplyScalar(RADIUS + lift);
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(72));
    const material = new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.58 });
    const line = new THREE.Line(geometry, material);
    line.userData = { flightId: record.id, record, curve };
    routesGroup.add(line);

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), new THREE.MeshBasicMaterial({ color: gold }));
    pulse.userData = { curve, speed: 0.045 + Math.random() * 0.025, phase: Math.random() };
    routesGroup.add(pulse);
    pulses.push(pulse);
    routeObjects.set(record.id, line);
  }

  function makeMarker(code, airport) {
    const pos = latLonToVector(airport.lat, airport.lon, RADIUS * 1.018);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.025, 18, 18), new THREE.MeshBasicMaterial({ color: gold }));
    core.position.copy(pos);
    core.userData = { type: 'airport', code, airport };
    markersGroup.add(core);
    markerMeshes.push(core);

    const halo = new THREE.Mesh(new THREE.RingGeometry(0.034, 0.052, 28), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }));
    halo.position.copy(pos.clone().multiplyScalar(1.005));
    halo.lookAt(new THREE.Vector3(0,0,0));
    markersGroup.add(halo);
  }

  function makeVoiceMarker(entry) {
    const airport = entry.airport;
    const pos = latLonToVector(airport.lat, airport.lon, RADIUS * 1.045);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.032, 20, 20), new THREE.MeshBasicMaterial({ color: 0x78eadc }));
    core.position.copy(pos);
    core.userData = { type:'voice', code:entry.code, airport, journalId:entry.journalId, record:entry.record };
    markersGroup.add(core);
    markerMeshes.push(core);
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.045, 0.070, 32), new THREE.MeshBasicMaterial({ color:0x78eadc, transparent:true, opacity:.58, side:THREE.DoubleSide, depthWrite:false }));
    halo.position.copy(pos.clone().multiplyScalar(1.004));
    halo.lookAt(new THREE.Vector3(0,0,0));
    halo.userData.voicePulse = true;
    markersGroup.add(halo);
    pulses.push({ userData:{ voiceHalo:true, mesh:halo, phase:Math.random() } });
  }

  function setFlights(records) {
    disposeGroup(routesGroup);
    disposeGroup(markersGroup);
    markerMeshes.length = 0;
    pulses.length = 0;
    routeObjects.clear();
    const airports = new Map();
    records.forEach((record) => {
      airports.set(record.from, record.fromAirport);
      airports.set(record.to, record.toAirport);
      makeArc(record);
    });
    airports.forEach((airport, code) => makeMarker(code, airport));
    getVoiceMapRecords().forEach((entry) => makeVoiceMarker(entry));
  }

  let focusAnimation = null;
  const front = new THREE.Vector3(0, 0, 1);
  function focusFlight(id, animate = true) {
    const line = routeObjects.get(id);
    if (!line) return;
    routeObjects.forEach((routeLine, routeId) => {
      routeLine.material.color.setHex(routeId === id ? gold : blue);
      routeLine.material.opacity = routeId === id ? 0.95 : 0.34;
    });
    const record = line.userData.record;
    const a = latLonToVector(record.fromAirport.lat, record.fromAirport.lon, 1).normalize();
    const b = latLonToVector(record.toAirport.lat, record.toAirport.lon, 1).normalize();
    const mid = a.add(b).normalize();
    const target = new THREE.Quaternion().setFromUnitVectors(mid, front);
    if (!animate || reducedMotion) {
      world.quaternion.copy(target);
      focusAnimation = null;
    } else {
      focusAnimation = { from: world.quaternion.clone(), to: target, start: performance.now(), duration: 900 };
    }
  }

  function resetView() {
    const target = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.12, -0.72, 0));
    focusAnimation = reducedMotion ? null : { from: world.quaternion.clone(), to: target, start: performance.now(), duration: 850 };
    if (reducedMotion) world.quaternion.copy(target);
    camera.position.z = 3.75;
    routeObjects.forEach((routeLine) => {
      routeLine.material.color.setHex(blue);
      routeLine.material.opacity = 0.58;
    });
  }

  let isDragging = false;
  let moved = false;
  let lastX = 0;
  let lastY = 0;
  let lastInteraction = performance.now();
  canvas.addEventListener('pointerdown', (event) => {
    isDragging = true;
    moved = false;
    lastX = event.clientX;
    lastY = event.clientY;
    lastInteraction = performance.now();
    focusAnimation = null;
    canvas.setPointerCapture?.(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (isDragging) {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
      const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), dx * 0.006);
      const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), dy * 0.0045);
      world.quaternion.premultiply(qY).premultiply(qX).normalize();
      lastX = event.clientX;
      lastY = event.clientY;
      lastInteraction = performance.now();
    }
    updateTooltip(event);
  });
  const endDrag = (event) => {
    isDragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('click', (event) => {
    if (moved) return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(markerMeshes, false)[0];
    const data = hit?.object?.userData;
    if (data?.type === 'voice' && data.journalId) {
      $('#journal')?.scrollIntoView({ behavior:reducedMotion ? 'auto' : 'smooth' });
      setTimeout(() => selectJournal(data.journalId), reducedMotion ? 0 : 480);
    }
  });
  canvas.addEventListener('pointerleave', () => {
    if (!isDragging) tooltip.hidden = true;
  });
  stage.addEventListener('wheel', (event) => {
    event.preventDefault();
    camera.position.z = Math.max(2.65, Math.min(5.0, camera.position.z + event.deltaY * 0.0022));
    lastInteraction = performance.now();
  }, { passive: false });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function updateTooltip(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(markerMeshes, false);
    if (!hits.length || moved) {
      tooltip.hidden = true;
      return;
    }
    const data = hits[0].object.userData;
    if (data.type === 'voice') {
      tooltip.innerHTML = `<b>🎙 ${escapeHtml(data.code)} · ${escapeHtml(data.airport.city)}</b><span>${escapeHtml(data.record?.title || 'VOICE FROM THIS PLACE')} · ${escapeHtml(prettyDate(data.record?.date))}</span>`;
    } else {
      tooltip.innerHTML = `<b>${escapeHtml(data.code)} · ${escapeHtml(data.airport.city)}</b><span>${escapeHtml(data.airport.name)}</span>`;
    }
    tooltip.style.left = `${event.clientX - rect.left}px`;
    tooltip.style.top = `${event.clientY - rect.top}px`;
    tooltip.hidden = false;
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  world.rotation.set(-0.12, -0.72, 0);
  let last = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (focusAnimation) {
      const t = Math.min(1, (now - focusAnimation.start) / focusAnimation.duration);
      const eased = 1 - Math.pow(1 - t, 3);
      world.quaternion.slerpQuaternions(focusAnimation.from, focusAnimation.to, eased);
      if (t >= 1) focusAnimation = null;
    } else if (!isDragging && !reducedMotion && now - lastInteraction > 1600) {
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), dt * 0.065);
      world.quaternion.premultiply(q).normalize();
    }
    pulses.forEach((pulse) => {
      if (pulse.userData?.voiceHalo) {
        pulse.userData.phase = (pulse.userData.phase + dt * .7) % 1;
        const scale = 1 + Math.sin(pulse.userData.phase * Math.PI * 2) * .16;
        pulse.userData.mesh.scale.setScalar(scale);
        pulse.userData.mesh.material.opacity = .34 + (Math.sin(pulse.userData.phase * Math.PI * 2) + 1) * .16;
        return;
      }
      pulse.userData.phase = (pulse.userData.phase + dt * pulse.userData.speed) % 1;
      pulse.position.copy(pulse.userData.curve.getPoint(pulse.userData.phase));
    });
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  atlasEngine = { setFlights, focusFlight, resetView };
  setFlights(getAllFlights());
  const first = pendingAtlasFocus || getAllFlights()[0]?.id;
  if (first) focusFlight(first, false);
  pendingAtlasFocus = null;
  loading.classList.add('ready');
  setTimeout(() => { loading.hidden = true; }, 500);
  globeReset?.addEventListener('click', resetView);
}

/* Lazy-load 3D only when the atlas approaches the viewport. */
const atlasSection = $('#atlas');
if (atlasSection) {
  const atlasBootObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      bootFlightGlobe();
      observer.disconnect();
    }
  }, { rootMargin: '500px 0px' });
  atlasBootObserver.observe(atlasSection);
}

/* =========================================================
   V7 · PRIVATE MEMORY VAULT + PILOT TRAINING JOURNAL
   IndexedDB keeps image-heavy data on the current device.
   ========================================================= */
const PRIVATE_DB_NAME = 'hh022-private-vault-v1';
const PRIVATE_DB_VERSION = 2;
const GALLERY_STORE = 'gallery';
const JOURNAL_STORE = 'journal';
const FUTURE_MAIL_STORE = 'futureMail';

const STARTER_GALLERY = WINDOW_MEMORIES.map((item, index) => ({
  id: `starter-${index + 1}`,
  source: 'starter',
  image: item.image,
  title: item.title,
  note: item.text,
  place: index === 0 ? 'CADET DAYS' : index === 1 ? 'HANGAR' : 'US',
  date: '',
  meta: item.meta || ''
}));

let privateDbPromise = null;
function openPrivateDb() {
  if (privateDbPromise) return privateDbPromise;
  privateDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(PRIVATE_DB_NAME, PRIVATE_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(GALLERY_STORE)) {
        const store = db.createObjectStore(GALLERY_STORE, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
      }
      if (!db.objectStoreNames.contains(JOURNAL_STORE)) {
        const store = db.createObjectStore(JOURNAL_STORE, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
      }
      if (!db.objectStoreNames.contains(FUTURE_MAIL_STORE)) {
        const store = db.createObjectStore(FUTURE_MAIL_STORE, { keyPath: 'id' });
        store.createIndex('unlockDate', 'unlockDate', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return privateDbPromise;
}

async function idbGetAll(storeName) {
  const db = await openPrivateDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function idbPut(storeName, value) {
  const db = await openPrivateDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(value);
    tx.oncomplete = () => resolve(value);
    tx.onerror = () => reject(tx.error);
  });
}
async function idbDelete(storeName, id) {
  const db = await openPrivateDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function makeId(prefix) {
  if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function localISODate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
function prettyDate(date) {
  if (!date) return 'PRIVATE ARCHIVE';
  const parts = date.split('-');
  return parts.length === 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : date;
}
function monthLabel(date) {
  if (!date) return 'UNDATED';
  const [y, m] = date.split('-');
  return `${y} · ${m}`;
}

async function optimizeImage(file, maxDimension = 1800, quality = 0.86) {
  if (!file?.type?.startsWith('image/')) throw new Error('Not an image');
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
    const largest = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = Math.min(1, maxDimension / Math.max(1, largest));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.fillStyle = '#07121d';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    return blob || file;
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ---------- Memory Vault ---------- */
const galleryStage = $('#gallery-stage');
const galleryCount = $('#gallery-count');
const galleryPosition = $('#gallery-position');
const galleryPrev = $('#gallery-prev');
const galleryNext = $('#gallery-next');
const galleryUploadToggle = $('#gallery-upload-toggle');
const galleryUploadShell = $('#gallery-upload-shell');
const galleryUploadClose = $('#gallery-upload-close');
const galleryUploadForm = $('#gallery-upload-form');
const galleryDate = $('#gallery-date');
const galleryPlace = $('#gallery-place');
const galleryTitle = $('#gallery-title');
const galleryNote = $('#gallery-note');
const galleryFiles = $('#gallery-files');
const galleryFormError = $('#gallery-form-error');
const gallerySave = $('#gallery-save');
const galleryExport = $('#gallery-export');
const galleryImport = $('#gallery-import');
const galleryImportFile = $('#gallery-import-file');
const memoryLightbox = $('#memory-lightbox');
const memoryLightboxClose = $('#memory-lightbox-close');
const memoryLightboxImage = $('#memory-lightbox-image');
const memoryLightboxMeta = $('#memory-lightbox-meta');
const memoryLightboxTitle = $('#memory-lightbox-title');
const memoryLightboxNote = $('#memory-lightbox-note');
const memoryLightboxDelete = $('#memory-lightbox-delete');

let galleryLocalRecords = [];
let galleryItems = [];
let galleryActive = 0;
let galleryObjectUrls = [];
let galleryPointerStart = null;
let activeLightboxDelete = null;
let activeLightboxObjectUrl = null;

function clearGalleryObjectUrls() {
  galleryObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  galleryObjectUrls = [];
}
function galleryImageUrl(item) {
  if (item.source === 'starter') return item.image;
  const url = URL.createObjectURL(item.blob);
  galleryObjectUrls.push(url);
  return url;
}
function renderGallery() {
  if (!galleryStage) return;
  clearGalleryObjectUrls();
  galleryItems = [...STARTER_GALLERY, ...galleryLocalRecords.sort((a,b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || ''))];
  galleryActive = Math.max(0, Math.min(galleryActive, galleryItems.length - 1));
  galleryCount.textContent = `${String(galleryItems.length).padStart(2,'0')} MEMORIES`;
  galleryPosition.textContent = `${String(galleryActive + 1).padStart(2,'0')} / ${String(galleryItems.length).padStart(2,'0')}`;
  galleryStage.innerHTML = '';
  galleryItems.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'memory-card';
    card.dataset.index = index;
    const src = galleryImageUrl(item);
    const meta = [prettyDate(item.date), item.place || item.meta || 'PRIVATE MEMORY'].filter(Boolean).join(' · ');
    card.innerHTML = `
      <img src="${src}" alt="${escapeHtml(item.title || '回忆照片')}">
      ${item.source === 'local' ? '<span class="memory-card-local">LOCAL MEMORY</span>' : ''}
      <div class="memory-card-copy">
        <span>${escapeHtml(meta)}</span>
        <strong>${escapeHtml(item.title || 'Untitled memory')}</strong>
        <p>${escapeHtml(item.note || '')}</p>
      </div>`;
    card.addEventListener('click', () => {
      if (galleryActive !== index) {
        galleryActive = index;
        updateGalleryDeck();
      } else {
        openMemoryLightbox(item, src, item.source === 'local' ? async () => {
          if (!window.confirm('删除这张本机照片？')) return;
          await idbDelete(GALLERY_STORE, item.id);
          galleryLocalRecords = await idbGetAll(GALLERY_STORE);
          closeMemoryLightbox();
          galleryActive = Math.min(galleryActive, Math.max(0, STARTER_GALLERY.length + galleryLocalRecords.length - 1));
          renderGallery();
        } : null);
      }
    });
    galleryStage.appendChild(card);
  });
  updateGalleryDeck();
  window.HH022_REFRESH_LIFE_OS?.();
}
function updateGalleryDeck() {
  const cards = $$('.memory-card', galleryStage);
  const compact = window.innerWidth < 650;
  cards.forEach((card, index) => {
    const offset = index - galleryActive;
    const abs = Math.abs(offset);
    const xStep = compact ? 46 : 53;
    const rotate = compact ? 8 : 13;
    const scale = abs === 0 ? 1 : Math.max(.72, .9 - abs * .08);
    const z = abs === 0 ? 85 : Math.max(-140, 10 - abs * 55);
    card.style.transform = `translate(-50%,-50%) translateX(${offset * xStep}%) translateZ(${z}px) rotateY(${offset * -rotate}deg) scale(${scale})`;
    card.style.opacity = abs > 2 ? '0' : abs === 0 ? '1' : abs === 1 ? '.64' : '.24';
    card.style.zIndex = String(20 - abs);
    card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
    card.classList.toggle('active', offset === 0);
  });
  galleryPosition.textContent = `${String(galleryActive + 1).padStart(2,'0')} / ${String(Math.max(1,galleryItems.length)).padStart(2,'0')}`;
}
function moveGallery(direction) {
  if (!galleryItems.length) return;
  galleryActive = (galleryActive + direction + galleryItems.length) % galleryItems.length;
  updateGalleryDeck();
}
function openMemoryLightbox(item, src, onDelete = null) {
  if (activeLightboxObjectUrl && activeLightboxObjectUrl !== src) {
    URL.revokeObjectURL(activeLightboxObjectUrl);
    activeLightboxObjectUrl = null;
  }
  memoryLightboxImage.src = src;
  memoryLightboxMeta.textContent = [prettyDate(item.date), item.place || item.meta || 'PRIVATE MEMORY'].filter(Boolean).join(' · ');
  memoryLightboxTitle.textContent = item.title || 'Untitled memory';
  memoryLightboxNote.textContent = item.note || '';
  activeLightboxDelete = onDelete;
  memoryLightboxDelete.hidden = !onDelete;
  memoryLightbox.hidden = false;
  document.body.classList.add('locked');
}
function closeMemoryLightbox() {
  memoryLightbox.hidden = true;
  memoryLightboxImage.removeAttribute('src');
  activeLightboxDelete = null;
  if (activeLightboxObjectUrl) URL.revokeObjectURL(activeLightboxObjectUrl);
  activeLightboxObjectUrl = null;
  document.body.classList.remove('locked');
}

galleryPrev?.addEventListener('click', () => moveGallery(-1));
galleryNext?.addEventListener('click', () => moveGallery(1));
galleryStage?.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaX) < 10) return;
  event.preventDefault();
  moveGallery(event.deltaX > 0 ? 1 : -1);
}, { passive: false });
galleryStage?.addEventListener('pointerdown', (event) => { galleryPointerStart = { x:event.clientX, y:event.clientY }; });
galleryStage?.addEventListener('pointerup', (event) => {
  if (!galleryPointerStart) return;
  const dx = event.clientX - galleryPointerStart.x;
  const dy = event.clientY - galleryPointerStart.y;
  galleryPointerStart = null;
  if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) moveGallery(dx < 0 ? 1 : -1);
});
window.addEventListener('resize', updateGalleryDeck, { passive:true });

galleryUploadToggle?.addEventListener('click', () => {
  galleryUploadShell.hidden = false;
  galleryDate.value ||= localISODate();
  galleryUploadShell.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
});
galleryUploadClose?.addEventListener('click', () => { galleryUploadShell.hidden = true; });
galleryUploadForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const files = [...galleryFiles.files].slice(0, 12);
  if (!files.length) {
    galleryFormError.textContent = '先选择至少一张照片。';
    return;
  }
  galleryFormError.textContent = '';
  gallerySave.disabled = true;
  gallerySave.firstChild.textContent = 'SAVING... ';
  try {
    for (let index = 0; index < files.length; index++) {
      const blob = await optimizeImage(files[index], 1800, .86);
      await idbPut(GALLERY_STORE, {
        id: makeId('memory'),
        source: 'local',
        date: galleryDate.value || localISODate(),
        place: galleryPlace.value.trim(),
        title: galleryTitle.value.trim() || `Memory ${index + 1}`,
        note: galleryNote.value.trim(),
        createdAt: new Date().toISOString(),
        originalName: files[index].name,
        blob
      });
    }
    galleryUploadForm.reset();
    galleryDate.value = localISODate();
    galleryUploadShell.hidden = true;
    galleryLocalRecords = await idbGetAll(GALLERY_STORE);
    galleryActive = STARTER_GALLERY.length;
    renderGallery();
    window.HH022_REFRESH_LIFE_OS?.();
  } catch (error) {
    console.warn(error);
    galleryFormError.textContent = '保存失败。可以少选几张或换一张尺寸更小的图片再试。';
  } finally {
    gallerySave.disabled = false;
    gallerySave.firstChild.textContent = 'SAVE TO MEMORY VAULT ';
  }
});
memoryLightboxClose?.addEventListener('click', closeMemoryLightbox);
memoryLightbox?.addEventListener('click', (event) => { if (event.target === memoryLightbox) closeMemoryLightbox(); });
memoryLightboxDelete?.addEventListener('click', () => activeLightboxDelete?.());

/* ---------- Pilot Training Journal ---------- */
const journalDateList = $('#journal-date-list');
const journalEmptyIndex = $('#journal-empty-index');
const journalReaderEmpty = $('#journal-reader-empty');
const journalEntryView = $('#journal-entry-view');
const journalViewDate = $('#journal-view-date');
const journalViewTitle = $('#journal-view-title');
const journalViewTags = $('#journal-view-tags');
const journalViewNote = $('#journal-view-note');
const journalViewLesson = $('#journal-view-lesson');
const journalViewPhotos = $('#journal-view-photos');
const journalPrev = $('#journal-prev');
const journalNext = $('#journal-next');
const journalPagePosition = $('#journal-page-position');
const journalEdit = $('#journal-edit');
const journalDelete = $('#journal-delete');
const journalNew = $('#journal-new');
const journalFormShell = $('#journal-form-shell');
const journalFormClose = $('#journal-form-close');
const journalForm = $('#journal-form');
const journalFormTitle = $('#journal-form-title');
const journalDate = $('#journal-date');
const journalStage = $('#journal-stage');
const journalAircraft = $('#journal-aircraft');
const journalLocation = $('#journal-location');
const journalHours = $('#journal-hours');
const journalMood = $('#journal-mood');
const journalWeather = $('#journal-weather');
const journalTitle = $('#journal-title');
const journalNote = $('#journal-note');
const journalLesson = $('#journal-lesson');
const journalFutureLine = $('#journal-future-line');
const journalFiles = $('#journal-files');
const journalFormError = $('#journal-form-error');
const journalSave = $('#journal-save');
const journalVoiceRecord = $('#journal-voice-record');
const journalVoiceStop = $('#journal-voice-stop');
const journalVoiceClear = $('#journal-voice-clear');
const journalVoiceStatus = $('#journal-voice-status');
const journalVoiceTimer = $('#journal-voice-timer');
const journalVoicePreview = $('#journal-voice-preview');
const journalVoicePlayback = $('#journal-voice-playback');
const journalWaveformPlayer = $('#journal-waveform-player');
const journalVoiceLabel = $('#journal-voice-label');
const journalVoiceSource = $('#journal-voice-source');
const journalTranscriptBlock = $('#journal-transcript-block');
const journalSummaryBlock = $('#journal-summary-block');
const journalFutureBlock = $('#journal-future-block');
const journalViewTranscript = $('#journal-view-transcript');
const journalViewSummary = $('#journal-view-summary');
const journalViewFuture = $('#journal-view-future');
const journalStatCount = $('#journal-stat-count');
const journalStatHours = $('#journal-stat-hours');
const journalStatLatest = $('#journal-stat-latest');

let journalRecords = [];
let selectedJournalId = null;
let editingJournalId = null;
let journalViewObjectUrls = [];
let journalVoiceRecorder = null;
let journalVoiceStream = null;
let journalVoiceChunks = [];
let journalVoiceBlob = null;
let journalVoiceDuration = 0;
let journalVoiceStartedAt = 0;
let journalVoiceTimerHandle = 0;
let journalVoicePreviewUrl = '';
let journalVoiceWasCleared = false;

function clearJournalViewUrls() {
  journalViewObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  journalViewObjectUrls = [];
}
function sortedJournal() {
  return [...journalRecords].sort((a,b) => (b.date || '').localeCompare(a.date || '') || (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}
function renderJournalIndex() {
  const records = sortedJournal();
  journalStatCount.textContent = records.length;
  const hours = records.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  journalStatHours.textContent = `${hours.toFixed(1)} H`;
  journalStatLatest.textContent = records[0]?.date ? prettyDate(records[0].date) : '—';
  journalEmptyIndex.hidden = records.length > 0;
  journalDateList.innerHTML = '';
  let lastMonth = '';
  records.forEach((record) => {
    const month = monthLabel(record.date);
    if (month !== lastMonth) {
      const label = document.createElement('div');
      label.className = 'journal-month';
      label.textContent = month;
      journalDateList.appendChild(label);
      lastMonth = month;
    }
    const [year='',monthPart='',day=''] = (record.date || '').split('-');
    const button = document.createElement('button');
    button.className = 'journal-date-button';
    button.type = 'button';
    button.dataset.id = record.id;
    button.innerHTML = `<time>${escapeHtml(day || '--')}.${escapeHtml(monthPart || '--')}</time><div><strong>${escapeHtml(record.title || 'Training log')}</strong><span>${escapeHtml(record.stage || '')}${record.aircraft ? ` · ${escapeHtml(record.aircraft)}` : ''}</span></div>`;
    button.classList.toggle('active', record.id === selectedJournalId);
    button.addEventListener('click', () => selectJournal(record.id));
    journalDateList.appendChild(button);
  });
  if (!selectedJournalId && records[0]) selectedJournalId = records[0].id;
  if (selectedJournalId && !records.some(r => r.id === selectedJournalId)) selectedJournalId = records[0]?.id || null;
  renderJournalReader();
  window.HH022_REFRESH_LIFE_OS?.();
}
function renderJournalReader() {
  clearJournalViewUrls();
  const records = sortedJournal();
  const record = records.find((item) => item.id === selectedJournalId);
  journalReaderEmpty.hidden = !!record;
  journalEntryView.hidden = !record;
  if (!record) return;
  journalViewDate.textContent = prettyDate(record.date);
  journalViewTitle.textContent = record.title || 'Training log';
  const journalTags = [
    record.stage,
    record.aircraft,
    record.location ? `LOC · ${record.location}` : '',
    record.voiceSource === 'PLAUD' ? 'PLAUD · IMPORTED' : '',
    Number(record.hours) ? `${Number(record.hours).toFixed(1)} H` : '',
    record.mood ? `MOOD · ${record.mood}` : '',
    record.weather ? `INNER WEATHER · ${record.weather}` : ''
  ].filter(Boolean);
  journalViewTags.innerHTML = journalTags.map((tag) => `<span class="${tag.startsWith('MOOD') ? 'mood' : ''}">${escapeHtml(tag)}</span>`).join('');
  journalViewNote.textContent = record.note || '—';
  journalViewLesson.textContent = record.lesson || '这一天还没有单独写下经验教训。';
  journalViewPhotos.innerHTML = '';
  (record.photos || []).forEach((photo, index) => {
    const url = URL.createObjectURL(photo.blob || photo);
    journalViewObjectUrls.push(url);
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<img src="${url}" alt="训练日志照片 ${index + 1}">`;
    button.addEventListener('click', () => {
      openMemoryLightbox({ date:record.date, place:record.stage, title:record.title, note:record.note }, url, null);
    });
    journalViewPhotos.appendChild(button);
  });
  journalTranscriptBlock.hidden = !record.transcript;
  journalSummaryBlock.hidden = !record.summary;
  journalFutureBlock.hidden = !record.futureLine;
  if (record.transcript) journalViewTranscript.textContent = record.transcript;
  if (record.summary) journalViewSummary.textContent = record.summary;
  if (record.futureLine) journalViewFuture.textContent = `“${record.futureLine}”`;
  if (record.voice?.blob) {
    journalVoicePlayback.hidden = false;
    journalVoiceLabel.textContent = record.voiceSource === 'PLAUD' ? 'PLAUD · 那一天的真实声音' : '那一天的声音';
    journalVoiceSource.textContent = record.voiceSource === 'PLAUD' ? 'PLAUD IMPORT' : 'HH022 CVR';
    renderWaveformPlayer(journalWaveformPlayer, record.voice.blob, { duration:record.voice.duration, urls:journalViewObjectUrls, label:record.title });
  } else {
    journalVoicePlayback.hidden = true;
    journalWaveformPlayer.innerHTML = '';
  }
  const idx = records.findIndex((item) => item.id === record.id);
  journalPagePosition.textContent = `${String(idx + 1).padStart(2,'0')} / ${String(records.length).padStart(2,'0')}`;
  journalPrev.disabled = idx <= 0;
  journalNext.disabled = idx >= records.length - 1;
  $$('.journal-date-button', journalDateList).forEach((button) => button.classList.toggle('active', button.dataset.id === record.id));
}
function selectJournal(id) {
  selectedJournalId = id;
  renderJournalReader();
  const button = $(`.journal-date-button[data-id="${CSS.escape(id)}"]`, journalDateList);
  button?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block:'nearest', inline:'nearest' });
}

function formatVoiceTime(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}
function stopJournalVoiceStream() {
  journalVoiceStream?.getTracks?.().forEach((track) => track.stop());
  journalVoiceStream = null;
}
function syncJournalVoicePreview() {
  if (journalVoicePreviewUrl) URL.revokeObjectURL(journalVoicePreviewUrl);
  journalVoicePreviewUrl = '';
  if (journalVoiceBlob) {
    journalVoicePreviewUrl = URL.createObjectURL(journalVoiceBlob);
    journalVoicePreview.src = journalVoicePreviewUrl;
    journalVoicePreview.hidden = false;
    journalVoiceClear.hidden = false;
    journalVoiceTimer.textContent = formatVoiceTime(journalVoiceDuration);
    journalVoiceStatus.textContent = 'RECORDED';
    journalVoiceStatus.classList.remove('recording');
  } else {
    journalVoicePreview.pause?.();
    journalVoicePreview.removeAttribute('src');
    journalVoicePreview.hidden = true;
    journalVoiceClear.hidden = true;
    journalVoiceTimer.textContent = '00:00';
    journalVoiceStatus.textContent = 'READY';
    journalVoiceStatus.classList.remove('recording');
  }
}
function resetJournalVoiceState(existingVoice = null) {
  if (journalVoiceRecorder?.state === 'recording') {
    try { journalVoiceRecorder.stop(); } catch {}
  }
  stopJournalVoiceStream();
  clearInterval(journalVoiceTimerHandle);
  journalVoiceRecorder = null;
  journalVoiceChunks = [];
  journalVoiceBlob = existingVoice?.blob instanceof Blob ? existingVoice.blob : null;
  journalVoiceDuration = Number(existingVoice?.duration) || 0;
  journalVoiceWasCleared = false;
  journalVoiceRecord.disabled = false;
  journalVoiceStop.disabled = true;
  syncJournalVoicePreview();
}
async function startJournalVoiceRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    journalFormError.textContent = '当前浏览器暂不支持网页录音。可以换最新版 Safari / Chrome 再试。';
    return;
  }
  try {
    journalFormError.textContent = '';
    stopJournalVoiceStream();
    journalVoiceStream = await navigator.mediaDevices.getUserMedia({ audio:true });
    const candidates = ['audio/mp4','audio/webm;codecs=opus','audio/webm'];
    const mimeType = candidates.find((type) => MediaRecorder.isTypeSupported?.(type)) || '';
    journalVoiceChunks = [];
    journalVoiceRecorder = new MediaRecorder(journalVoiceStream, mimeType ? { mimeType } : undefined);
    journalVoiceRecorder.addEventListener('dataavailable', (event) => {
      if (event.data?.size) journalVoiceChunks.push(event.data);
    });
    journalVoiceRecorder.addEventListener('stop', () => {
      clearInterval(journalVoiceTimerHandle);
      const duration = Math.max(1, (performance.now() - journalVoiceStartedAt) / 1000);
      const type = journalVoiceRecorder?.mimeType || journalVoiceChunks[0]?.type || 'audio/webm';
      journalVoiceBlob = new Blob(journalVoiceChunks, { type });
      journalVoiceDuration = duration;
      journalVoiceWasCleared = false;
      journalVoiceRecord.disabled = false;
      journalVoiceStop.disabled = true;
      stopJournalVoiceStream();
      syncJournalVoicePreview();
    });
    journalVoiceStartedAt = performance.now();
    journalVoiceTimer.textContent = '00:00';
    journalVoiceStatus.textContent = 'REC';
    journalVoiceStatus.classList.add('recording');
    journalVoiceRecord.disabled = true;
    journalVoiceStop.disabled = false;
    journalVoiceRecorder.start(250);
    journalVoiceTimerHandle = setInterval(() => {
      const elapsed = (performance.now() - journalVoiceStartedAt) / 1000;
      journalVoiceTimer.textContent = formatVoiceTime(elapsed);
      if (elapsed >= 180 && journalVoiceRecorder?.state === 'recording') journalVoiceRecorder.stop();
    }, 250);
  } catch (error) {
    console.warn(error);
    stopJournalVoiceStream();
    journalFormError.textContent = '没有获得麦克风权限，或当前设备无法开始录音。';
  }
}
function stopJournalVoiceRecording() {
  if (journalVoiceRecorder?.state === 'recording') journalVoiceRecorder.stop();
}
journalVoiceRecord?.addEventListener('click', startJournalVoiceRecording);
journalVoiceStop?.addEventListener('click', stopJournalVoiceRecording);
journalVoiceClear?.addEventListener('click', () => {
  journalVoiceBlob = null;
  journalVoiceDuration = 0;
  journalVoiceWasCleared = true;
  syncJournalVoicePreview();
});

function openJournalForm(record = null) {
  editingJournalId = record?.id || null;
  journalFormTitle.textContent = record ? '编辑这篇训练日志' : '记录今天的训练';
  journalDate.value = record?.date || localISODate();
  journalStage.value = record?.stage || '基础训练';
  journalAircraft.value = record?.aircraft || '';
  journalLocation.value = record?.location || '';
  journalHours.value = record?.hours || '';
  journalMood.value = record?.mood || '平静';
  journalWeather.value = record?.weather || 'CAVOK';
  resetJournalVoiceState(record?.voice || null);
  journalTitle.value = record?.title || '';
  journalNote.value = record?.note || '';
  journalLesson.value = record?.lesson || '';
  journalFutureLine.value = record?.futureLine || '';
  journalFiles.value = '';
  journalFormError.textContent = '';
  journalFormShell.hidden = false;
  journalFormShell.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block:'center' });
}
function closeJournalForm() {
  stopJournalVoiceStream();
  clearInterval(journalVoiceTimerHandle);
  journalFormShell.hidden = true;
  editingJournalId = null;
}

journalNew?.addEventListener('click', () => openJournalForm());
journalFormClose?.addEventListener('click', closeJournalForm);
journalEdit?.addEventListener('click', () => {
  const record = journalRecords.find((item) => item.id === selectedJournalId);
  if (record) openJournalForm(record);
});
journalDelete?.addEventListener('click', async () => {
  if (!selectedJournalId || !window.confirm('删除这篇训练日志？')) return;
  await idbDelete(JOURNAL_STORE, selectedJournalId);
  journalRecords = await idbGetAll(JOURNAL_STORE);
  selectedJournalId = sortedJournal()[0]?.id || null;
  renderJournalIndex();
  window.HH022_REFRESH_LIFE_OS?.();
});
journalPrev?.addEventListener('click', () => {
  const records = sortedJournal();
  const idx = records.findIndex((item) => item.id === selectedJournalId);
  if (idx > 0) selectJournal(records[idx - 1].id);
});
journalNext?.addEventListener('click', () => {
  const records = sortedJournal();
  const idx = records.findIndex((item) => item.id === selectedJournalId);
  if (idx >= 0 && idx < records.length - 1) selectJournal(records[idx + 1].id);
});

journalForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (journalVoiceRecorder?.state === 'recording') {
    journalFormError.textContent = '先停止语音录制，再保存这篇日志。';
    return;
  }
  if (!journalDate.value || !journalTitle.value.trim() || !journalNote.value.trim()) {
    journalFormError.textContent = '日期、标题和今天的记录需要填写。';
    return;
  }
  journalFormError.textContent = '';
  journalSave.disabled = true;
  journalSave.firstChild.textContent = 'SAVING... ';
  try {
    const existing = journalRecords.find((item) => item.id === editingJournalId);
    const photos = [...(existing?.photos || [])];
    const files = [...journalFiles.files].slice(0, 6);
    for (const file of files) {
      const blob = await optimizeImage(file, 1600, .84);
      photos.push({ name:file.name, type:blob.type || file.type, blob });
    }
    const record = {
      id: editingJournalId || makeId('journal'),
      date: journalDate.value,
      stage: journalStage.value,
      aircraft: journalAircraft.value.trim(),
      location: journalLocation.value.trim(),
      hours: Number(journalHours.value) || 0,
      mood: journalMood.value,
      weather: journalWeather.value || 'CAVOK',
      voice: journalVoiceBlob ? { blob: journalVoiceBlob, duration: journalVoiceDuration, type: journalVoiceBlob.type || 'audio/webm' } : (journalVoiceWasCleared ? null : (existing?.voice || null)),
      title: journalTitle.value.trim(),
      note: journalNote.value.trim(),
      lesson: journalLesson.value.trim(),
      futureLine: journalFutureLine.value.trim(),
      transcript: existing?.transcript || '',
      summary: existing?.summary || '',
      voiceSource: journalVoiceBlob ? 'HH022 CVR' : (journalVoiceWasCleared ? '' : (existing?.voiceSource || '')),
      photos,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await idbPut(JOURNAL_STORE, record);
    journalRecords = await idbGetAll(JOURNAL_STORE);
    selectedJournalId = record.id;
    closeJournalForm();
    renderJournalIndex();
    window.HH022_REFRESH_LIFE_OS?.();
    $('#journal-reader')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block:'center' });
  } catch (error) {
    console.warn(error);
    journalFormError.textContent = '保存失败。图片很多时，可以减少几张后再试。';
  } finally {
    journalSave.disabled = false;
    journalSave.firstChild.textContent = 'SAVE TRAINING LOG ';
  }
});


/* =========================================================
   V9 · PLAUD × HH022 PERSONAL BLACK BOX
   Import exported audio/transcripts, render real waveforms,
   bind voices to journal / globe / constellation / badges.
   ========================================================= */
const plaudForm = $('#plaud-import-form');
const plaudDate = $('#plaud-date');
const plaudLocation = $('#plaud-location');
const plaudStage = $('#plaud-stage');
const plaudAircraft = $('#plaud-aircraft');
const plaudHours = $('#plaud-hours');
const plaudMood = $('#plaud-mood');
const plaudWeather = $('#plaud-weather');
const plaudTitle = $('#plaud-title');
const plaudAudio = $('#plaud-audio');
const plaudTranscript = $('#plaud-transcript');
const plaudSummary = $('#plaud-summary');
const plaudFutureLine = $('#plaud-future-line');
const plaudFormError = $('#plaud-form-error');
const plaudImportSave = $('#plaud-import-save');
const plaudAudioName = $('#plaud-audio-name');
const plaudTranscriptName = $('#plaud-transcript-name');
const plaudSummaryName = $('#plaud-summary-name');
const voiceArchiveCount = $('#voice-archive-count');
const voiceArchiveList = $('#voice-archive-list');
const voiceArchiveEmpty = $('#voice-archive-empty');
const firstSoloBox = $('#first-solo-box');
const firstSoloTitle = $('#first-solo-title');
const firstSoloMeta = $('#first-solo-meta');
const firstSoloWaveform = $('#first-solo-waveform');
const firstSoloFuture = $('#first-solo-future');
const firstSoloOpen = $('#first-solo-open');
const futureEchoKicker = $('#future-echo-kicker');
const futureEchoText = $('#future-echo-text');
const futureEchoOpen = $('#future-echo-open');

let blackBoxObjectUrls = [];
function clearBlackBoxObjectUrls() {
  blackBoxObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  blackBoxObjectUrls = [];
}
function resolveAirportFromLocation(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const code = raw.toUpperCase().slice(0,3);
  if (AIRPORTS[code]) return { code, airport:AIRPORTS[code] };
  const lower = raw.toLowerCase();
  const entry = Object.entries(AIRPORTS).find(([key, airport]) => key.toLowerCase() === lower || airport.city.toLowerCase().includes(lower) || airport.name.toLowerCase().includes(lower) || lower.includes(airport.city.toLowerCase()));
  return entry ? { code:entry[0], airport:entry[1] } : null;
}
function getVoiceMapRecords() {
  if (typeof journalRecords === 'undefined') return [];
  return journalRecords.filter((item) => item.voice?.blob && item.location).map((item) => {
    const resolved = resolveAirportFromLocation(item.location);
    return resolved ? { ...resolved, journalId:item.id, record:item } : null;
  }).filter(Boolean);
}
function readAudioDuration(blob) {
  return new Promise((resolve) => {
    if (!blob) return resolve(0);
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    const done = (value=0) => { URL.revokeObjectURL(url); resolve(Number.isFinite(value) ? value : 0); };
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => done(audio.duration);
    audio.onerror = () => done(0);
    audio.src = url;
  });
}
function cleanPlaudText(text) {
  return String(text || '')
    .replace(/^WEBVTT\s*/i,'')
    .replace(/^\s*\d+\s*$/gm,'')
    .replace(/^\s*\d{1,2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{1,2}:\d{2}:\d{2}[,.]\d{3}.*$/gm,'')
    .replace(/^\s*\d{1,2}:\d{2}[,.]\d{3}\s*-->\s*\d{1,2}:\d{2}[,.]\d{3}.*$/gm,'')
    .replace(/\n{3,}/g,'\n\n').trim();
}
function pickWavePeaks(buffer, bars=160) {
  const data = buffer.getChannelData(0);
  const size = Math.max(1, Math.floor(data.length / bars));
  const peaks = [];
  for (let i=0;i<bars;i++) {
    let max=0;
    const start=i*size, end=Math.min(data.length,start+size);
    for(let j=start;j<end;j+=Math.max(1,Math.floor(size/40))) max=Math.max(max,Math.abs(data[j]));
    peaks.push(Math.max(.025,max));
  }
  const maxPeak=Math.max(...peaks,.001);
  return peaks.map(v=>v/maxPeak);
}
async function decodeWaveform(blob, bars=160) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) throw new Error('No AudioContext');
    const ctx = new AudioCtx();
    const array = await blob.arrayBuffer();
    const buffer = await ctx.decodeAudioData(array.slice(0));
    const peaks = pickWavePeaks(buffer,bars);
    await ctx.close?.();
    return peaks;
  } catch {
    const seed = `${blob?.size || 1}-${blob?.type || 'audio'}`;
    return Array.from({length:bars},(_,i)=>.14 + hash01(`${seed}-${i}`)*.86);
  }
}
function drawWaveCanvas(canvas, peaks, progress=0) {
  const rect=canvas.getBoundingClientRect();
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const width=Math.max(260,Math.round(rect.width||600)), height=Math.max(52,Math.round(rect.height||72));
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  const ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,width,height);
  const count=peaks.length, gap=2.2, barW=Math.max(1,(width-gap*(count-1))/count);
  const center=height/2;
  peaks.forEach((v,i)=>{const h=Math.max(3,v*(height*.78));const x=i*(barW+gap);ctx.fillStyle=(i/count)<=progress?'rgba(205,183,143,.96)':'rgba(126,164,184,.28)';ctx.fillRect(x,center-h/2,barW,h);});
  const x=Math.max(0,Math.min(width,width*progress));ctx.fillStyle='rgba(241,239,233,.92)';ctx.fillRect(x-0.5,5,1,height-10);
}
function renderWaveformPlayer(container, blob, options={}) {
  if (!container || !blob) return;
  const url=URL.createObjectURL(blob); (options.urls || blackBoxObjectUrls).push(url);
  container.innerHTML=`<div class="wave-controls"><button type="button" class="wave-play" aria-label="播放/暂停">▶</button><span class="wave-time">00:00</span><strong>${escapeHtml(options.label || 'VOICE RECORD')}</strong><span class="wave-duration">${formatVoiceTime(options.duration || 0)}</span></div><canvas class="wave-canvas" aria-label="音频波形，可点击跳转"></canvas><audio preload="metadata" src="${url}"></audio>`;
  const audio=$('audio',container), canvas=$('.wave-canvas',container), play=$('.wave-play',container), time=$('.wave-time',container), durationEl=$('.wave-duration',container);
  let peaks=Array.from({length:120},(_,i)=>.12+hash01(`${blob.size}-${i}`)*.55);
  const redraw=()=>drawWaveCanvas(canvas,peaks,audio.duration ? audio.currentTime/audio.duration : 0);
  decodeWaveform(blob, window.innerWidth<650?90:150).then((data)=>{peaks=data;redraw();});
  audio.addEventListener('loadedmetadata',()=>{durationEl.textContent=formatVoiceTime(audio.duration||options.duration);redraw();});
  audio.addEventListener('timeupdate',()=>{time.textContent=formatVoiceTime(audio.currentTime);redraw();});
  audio.addEventListener('play',()=>{play.textContent='❚❚';container.classList.add('playing');});
  audio.addEventListener('pause',()=>{play.textContent='▶';container.classList.remove('playing');});
  audio.addEventListener('ended',()=>{play.textContent='▶';container.classList.remove('playing');});
  play.addEventListener('click',()=>audio.paused?audio.play().catch(()=>{}):audio.pause());
  canvas.addEventListener('click',(event)=>{if(!audio.duration)return;const rect=canvas.getBoundingClientRect();audio.currentTime=Math.max(0,Math.min(audio.duration,(event.clientX-rect.left)/rect.width*audio.duration));});
  if('ResizeObserver' in window)new ResizeObserver(redraw).observe(container);
}
function isSoloRecord(item) {
  const corpus=journalSearchText(item);
  return ['首次单飞','单飞','独飞','独立飞行','first solo','solo flight','solo'].some((word)=>corpus.includes(word.toLowerCase()));
}
function findFirstSoloVoiceRecord() {
  return [...journalRecords].filter((item)=>item.voice?.blob && isSoloRecord(item)).sort((a,b)=>(a.date||'').localeCompare(b.date||''))[0] || null;
}
function renderPlaudBlackBox() {
  if (!voiceArchiveList) return;
  clearBlackBoxObjectUrls();
  const voices=[...journalRecords].filter((item)=>item.voice?.blob).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  voiceArchiveCount.textContent=`${String(voices.length).padStart(2,'0')} RECORD${voices.length===1?'':'S'}`;
  voiceArchiveEmpty.hidden=voices.length>0;
  voiceArchiveList.innerHTML='';
  voices.forEach((item,index)=>{
    const resolved=resolveAirportFromLocation(item.location);
    const button=document.createElement('button');button.type='button';button.className='voice-archive-item';button.dataset.id=item.id;
    button.innerHTML=`<span class="voice-index">${String(index+1).padStart(2,'0')}</span><div><span>${escapeHtml(prettyDate(item.date))}${resolved?` · ${escapeHtml(resolved.code)}`:''}</span><strong>${escapeHtml(item.title||'Voice record')}</strong><small>${escapeHtml(item.voiceSource==='PLAUD'?'PLAUD IMPORT':'HH022 CVR')} · ${formatVoiceTime(item.voice?.duration||0)}${item.futureLine?' · FUTURE LINE':''}</small></div><i>▶</i>`;
    button.addEventListener('click',()=>{$('#journal')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'});setTimeout(()=>selectJournal(item.id),reducedMotion?0:420);});
    voiceArchiveList.appendChild(button);
  });
  const solo=findFirstSoloVoiceRecord();
  firstSoloBox.hidden=!solo;
  if(solo){
    firstSoloTitle.textContent=solo.title||'FIRST SOLO';
    const loc=resolveAirportFromLocation(solo.location);
    firstSoloMeta.textContent=[prettyDate(solo.date),solo.aircraft,loc?.code||solo.location,formatVoiceTime(solo.voice?.duration)].filter(Boolean).join(' · ');
    firstSoloFuture.textContent=solo.futureLine?`“${solo.futureLine}”`:'这一段声音会一直被置顶在这里。';
    firstSoloWaveform.innerHTML='';
    renderWaveformPlayer(firstSoloWaveform,solo.voice.blob,{duration:solo.voice.duration,urls:blackBoxObjectUrls,label:'FIRST SOLO CVR'});
    firstSoloOpen.onclick=()=>{$('#journal')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'});setTimeout(()=>selectJournal(solo.id),reducedMotion?0:420);};
  }
}
function renderFutureEcho() {
  if(!futureEchoText)return;
  const candidates=[...journalRecords].filter((item)=>String(item.futureLine||'').trim()).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  if(!candidates.length){futureEchoKicker.textContent='A MESSAGE IS WAITING';futureEchoText.textContent='写下一句给未来的自己。等飞得更远以后，它会从过去回来找你。';futureEchoOpen.hidden=true;return;}
  const item=candidates[0];
  const hoursAfter=journalRecords.filter((r)=>(r.date||'')>(item.date||'')).reduce((sum,r)=>sum+(Number(r.hours)||0),0);
  futureEchoKicker.textContent=hoursAfter>0?`FROM YOU · ${hoursAfter.toFixed(1)} FLIGHT HOURS AGO`:`FROM YOU · ${prettyDate(item.date)}`;
  futureEchoText.textContent=`“${item.futureLine}”`;
  futureEchoOpen.hidden=false;futureEchoOpen.onclick=()=>{$('#journal')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'});setTimeout(()=>selectJournal(item.id),reducedMotion?0:420);};
}
function syncPlaudFileLabels(){
  if(plaudAudioName)plaudAudioName.textContent=plaudAudio.files?.[0]?.name||'MP3 / WAV / M4A / WEBM';
  if(plaudTranscriptName)plaudTranscriptName.textContent=plaudTranscript.files?.[0]?.name||'TXT / MD / SRT / VTT · 可选';
  if(plaudSummaryName)plaudSummaryName.textContent=plaudSummary.files?.[0]?.name||'TXT / MD · 可选';
  const audio=plaudAudio.files?.[0]; if(audio && !plaudTitle.value.trim()) plaudTitle.value=audio.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').slice(0,60);
}
[plaudAudio,plaudTranscript,plaudSummary].forEach((input)=>input?.addEventListener('change',syncPlaudFileLabels));
plaudForm?.addEventListener('submit',async(event)=>{
  event.preventDefault();
  const audioFile=plaudAudio.files?.[0]||null, transcriptFile=plaudTranscript.files?.[0]||null, summaryFile=plaudSummary.files?.[0]||null;
  if(!audioFile&&!transcriptFile&&!summaryFile){plaudFormError.textContent='至少选择一份 PLAUD 录音、转写或总结文件。';return;}
  if(!plaudDate.value||!plaudTitle.value.trim()){plaudFormError.textContent='日期和标题需要填写。';return;}
  plaudFormError.textContent='';plaudImportSave.disabled=true;plaudImportSave.firstChild.textContent='ARCHIVING... ';
  try{
    const transcript=transcriptFile?cleanPlaudText(await transcriptFile.text()):'';
    const summary=summaryFile?cleanPlaudText(await summaryFile.text()):'';
    const voice=audioFile?{blob:audioFile,duration:await readAudioDuration(audioFile),type:audioFile.type||'audio/mpeg',name:audioFile.name,source:'PLAUD'}:null;
    const note=(summary||transcript||'来自 PLAUD 的一次飞行复盘。').slice(0,1600);
    const lesson=(summary||'').slice(0,1000);
    const record={id:makeId('journal'),date:plaudDate.value,stage:plaudStage.value,aircraft:plaudAircraft.value.trim(),location:plaudLocation.value.trim(),hours:Number(plaudHours.value)||0,mood:plaudMood.value,weather:plaudWeather.value||'CAVOK',voice,voiceSource:'PLAUD',title:plaudTitle.value.trim(),note,lesson,transcript,summary,futureLine:plaudFutureLine.value.trim(),photos:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
    await idbPut(JOURNAL_STORE,record);journalRecords=await idbGetAll(JOURNAL_STORE);selectedJournalId=record.id;renderJournalIndex();renderPlaudBlackBox();refreshLifeOS();
    plaudForm.reset();plaudDate.value=localISODate();syncPlaudFileLabels();
    $('#journal')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'});setTimeout(()=>selectJournal(record.id),reducedMotion?0:500);
  }catch(error){console.warn(error);plaudFormError.textContent='归档失败。录音文件很大时，可以先从 PLAUD 导出体积更小的版本再试。';}
  finally{plaudImportSave.disabled=false;plaudImportSave.firstChild.textContent='ARCHIVE TO HH022 ';}
});


/* =========================================================
   V9.1 · FUTURE MAIL / TIME CAPSULE
   A letter remains sealed until its chosen local calendar date.
   ========================================================= */
const futureMailNew = $('#future-mail-new');
const futureMailFormShell = $('#future-mail-form-shell');
const futureMailFormClose = $('#future-mail-form-close');
const futureMailForm = $('#future-mail-form');
const futureMailFormTitle = $('#future-mail-form-title');
const futureMailDate = $('#future-mail-date');
const futureMailTitle = $('#future-mail-title');
const futureMailMessage = $('#future-mail-message');
const futureMailError = $('#future-mail-error');
const futureMailSave = $('#future-mail-save');
const futureMailCount = $('#future-mail-count');
const futureMailWaiting = $('#future-mail-waiting');
const futureMailArrived = $('#future-mail-arrived');
const futureMailNext = $('#future-mail-next');
const futureMailList = $('#future-mail-list');
const futureMailEmpty = $('#future-mail-empty');
const futureMailModal = $('#future-mail-modal');
const futureMailModalBackdrop = $('#future-mail-modal-backdrop');
const futureMailModalClose = $('#future-mail-modal-close');
const futureMailModalDate = $('#future-mail-modal-date');
const futureMailModalTitle = $('#future-mail-modal-title');
const futureMailModalOrigin = $('#future-mail-modal-origin');
const futureMailModalMessage = $('#future-mail-modal-message');
const futureMailModalQueue = $('#future-mail-modal-queue');
const futureMailModalArchive = $('#future-mail-modal-archive');
const futureMailModalNext = $('#future-mail-modal-next');

let futureMailRecords = [];
let editingFutureMailId = null;
let activeFutureMailId = null;
let futureMailReady = false;

function futureMailIsDue(item) {
  return Boolean(item?.unlockDate) && item.unlockDate <= localISODate();
}
function futureMailDaysUntil(item) {
  if (!item?.unlockDate) return null;
  const today = new Date(`${localISODate()}T00:00:00`);
  const target = new Date(`${item.unlockDate}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}
function futureMailMonthDay(date) {
  if (!date) return { day:'—', month:'—' };
  const parts = date.split('-');
  return { day:parts[2] || '—', month:`${parts[0]}.${parts[1]}` };
}
function futureMailStatus(item) {
  if (!futureMailIsDue(item)) return { key:'waiting', label:'IN TRANSIT' };
  if (item.openedAt) return { key:'opened', label:'OPENED' };
  return { key:'due', label:'ARRIVED' };
}
function futureMailSummary(item) {
  if (!futureMailIsDue(item)) {
    const days = futureMailDaysUntil(item);
    if (days === 0) return '今天抵达';
    if (days === 1) return '明天抵达';
    return days > 1 ? `${days} DAYS TO DELIVERY` : `DELIVERS ${prettyDate(item.unlockDate)}`;
  }
  return item.openedAt ? `OPENED ${prettyDate(String(item.openedAt).slice(0,10))}` : 'READY TO OPEN';
}
function resetFutureMailForm() {
  editingFutureMailId = null;
  futureMailForm?.reset();
  if (futureMailDate) {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    const offset = tomorrow.getTimezoneOffset() * 60000;
    futureMailDate.value = new Date(tomorrow.getTime() - offset).toISOString().slice(0,10);
    futureMailDate.min = localISODate();
  }
  if (futureMailFormTitle) futureMailFormTitle.textContent = '写一封定时信';
  if (futureMailSave) futureMailSave.firstChild.textContent = 'SEAL & SCHEDULE ';
  if (futureMailError) futureMailError.textContent = '';
}
function openFutureMailForm(record = null) {
  if (!futureMailFormShell) return;
  resetFutureMailForm();
  if (record) {
    editingFutureMailId = record.id;
    futureMailDate.value = record.unlockDate || localISODate();
    futureMailTitle.value = record.title || '';
    futureMailMessage.value = record.message || '';
    futureMailFormTitle.textContent = '修改尚未抵达的信';
    futureMailSave.firstChild.textContent = 'RESEAL LETTER ';
  }
  futureMailFormShell.hidden = false;
  requestAnimationFrame(() => futureMailFormShell.scrollIntoView({ behavior:reducedMotion?'auto':'smooth', block:'center' }));
}
function closeFutureMailForm() {
  if (!futureMailFormShell) return;
  futureMailFormShell.hidden = true;
  resetFutureMailForm();
}
function renderFutureMailArchive() {
  if (!futureMailList) return;
  const sorted = [...futureMailRecords].sort((a,b) => (b.unlockDate || '').localeCompare(a.unlockDate || '') || (b.createdAt || '').localeCompare(a.createdAt || ''));
  const waiting = sorted.filter((item) => !futureMailIsDue(item));
  const arrived = sorted.filter(futureMailIsDue);
  futureMailCount.textContent = `${String(sorted.length).padStart(2,'0')} LETTER${sorted.length===1?'':'S'}`;
  futureMailWaiting.textContent = String(waiting.length);
  futureMailArrived.textContent = String(arrived.length);
  const next = [...waiting].sort((a,b)=>(a.unlockDate||'').localeCompare(b.unlockDate||''))[0];
  futureMailNext.textContent = next ? prettyDate(next.unlockDate) : '—';
  futureMailEmpty.hidden = sorted.length > 0;
  futureMailList.innerHTML = '';
  sorted.forEach((item) => {
    const status = futureMailStatus(item);
    const md = futureMailMonthDay(item.unlockDate);
    const wrapper = document.createElement('div');
    wrapper.className = `future-mail-item ${status.key}`;
    wrapper.innerHTML = `
      <div class="future-mail-item-date"><strong>${escapeHtml(md.day)}</strong><span>${escapeHtml(md.month)}</span></div>
      <button class="future-mail-item-copy" type="button" aria-label="${futureMailIsDue(item)?'打开':'查看'} ${escapeHtml(item.title || '未来来信')}">
        <span>${futureMailIsDue(item) ? 'DELIVERED FUTURE MAIL' : 'SEALED FUTURE MAIL'}</span>
        <strong>${escapeHtml(item.title || 'Untitled future mail')}</strong>
        <small>${escapeHtml(futureMailSummary(item))}</small>
      </button>
      <div class="future-mail-item-status"><i></i>${escapeHtml(status.label)}</div>
      <div class="future-mail-item-actions">
        ${!futureMailIsDue(item) ? `<button type="button" data-action="edit">EDIT BEFORE DELIVERY</button>` : ''}
        <button type="button" class="danger" data-action="delete">DELETE</button>
      </div>`;
    $('.future-mail-item-copy', wrapper).addEventListener('click', () => {
      if (!futureMailIsDue(item)) {
        const days = futureMailDaysUntil(item);
        window.alert(days === 1 ? '这封信会在明天解锁。' : `这封信仍在途中，将于 ${prettyDate(item.unlockDate)} 解锁。`);
        return;
      }
      openFutureMail(item.id, false);
    });
    const edit = $('[data-action="edit"]', wrapper);
    edit?.addEventListener('click', () => openFutureMailForm(item));
    $('[data-action="delete"]', wrapper)?.addEventListener('click', async () => {
      if (!window.confirm('删除这封未来来信？删除后无法恢复。')) return;
      await idbDelete(FUTURE_MAIL_STORE, item.id);
      futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
      renderFutureMailArchive();
    });
    futureMailList.appendChild(wrapper);
  });
}
async function markFutureMailOpened(item) {
  if (!item.openedAt) item.openedAt = new Date().toISOString();
  item.updatedAt = new Date().toISOString();
  await idbPut(FUTURE_MAIL_STORE, item);
}
async function openFutureMail(id, auto = false) {
  const item = futureMailRecords.find((record) => record.id === id);
  if (!item || !futureMailIsDue(item) || !futureMailModal) return;
  activeFutureMailId = item.id;
  await markFutureMailOpened(item);
  futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
  futureMailModalDate.textContent = `DELIVERED · ${prettyDate(item.unlockDate)}`;
  futureMailModalTitle.textContent = item.title || '一封来自过去的信';
  futureMailModalOrigin.textContent = `WRITTEN ${prettyDate(String(item.createdAt || '').slice(0,10))}`;
  futureMailModalMessage.textContent = item.message || '';
  const queue = futureMailRecords.filter((record) => futureMailIsDue(record) && !record.notifiedAt && record.id !== item.id).sort((a,b)=>(a.unlockDate||'').localeCompare(b.unlockDate||''));
  futureMailModalQueue.textContent = auto ? (queue.length ? `还有 ${queue.length} 封已抵达的信等待签收` : '这封信，刚刚从过去抵达。') : '已解锁 · 可随时在时间信箱重新打开';
  futureMailModalNext.hidden = !auto || queue.length === 0;
  futureMailModal.hidden = false;
  document.body.classList.add('future-mail-open');
  renderFutureMailArchive();
}
async function acknowledgeActiveFutureMail() {
  if (!activeFutureMailId) return;
  const item = futureMailRecords.find((record) => record.id === activeFutureMailId);
  if (!item || item.notifiedAt) return;
  item.notifiedAt = new Date().toISOString();
  item.updatedAt = new Date().toISOString();
  await idbPut(FUTURE_MAIL_STORE, item);
  futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
}
async function closeFutureMailModal() {
  await acknowledgeActiveFutureMail();
  activeFutureMailId = null;
  futureMailModal.hidden = true;
  document.body.classList.remove('future-mail-open');
  renderFutureMailArchive();
}
async function maybeAutoDeliverFutureMail() {
  if (!futureMailReady || !document.body.classList.contains('entered') || !futureMailModal?.hidden) return;
  const due = [...futureMailRecords].filter((item) => futureMailIsDue(item) && !item.notifiedAt).sort((a,b)=>(a.unlockDate||'').localeCompare(b.unlockDate||'') || (a.createdAt||'').localeCompare(b.createdAt||''));
  if (!due.length) return;
  await openFutureMail(due[0].id, true);
}

futureMailNew?.addEventListener('click', () => openFutureMailForm());
futureMailFormClose?.addEventListener('click', closeFutureMailForm);
futureMailForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const unlockDate = futureMailDate.value;
  const title = futureMailTitle.value.trim();
  const message = futureMailMessage.value.trim();
  if (!unlockDate || !title || !message) { futureMailError.textContent = '开启日期、标题和正文都需要填写。'; return; }
  if (unlockDate < localISODate()) { futureMailError.textContent = '开启日期不能早于今天。'; return; }
  futureMailError.textContent = '';
  futureMailSave.disabled = true;
  try {
    const old = editingFutureMailId ? futureMailRecords.find((item)=>item.id===editingFutureMailId) : null;
    const record = {
      id: old?.id || makeId('future-mail'),
      title,
      message,
      unlockDate,
      createdAt: old?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      openedAt: old?.openedAt || null,
      notifiedAt: old?.notifiedAt || null
    };
    await idbPut(FUTURE_MAIL_STORE, record);
    futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
    renderFutureMailArchive();
    closeFutureMailForm();
  } catch (error) {
    console.warn(error);
    futureMailError.textContent = '封存失败，请稍后再试。';
  } finally {
    futureMailSave.disabled = false;
  }
});
futureMailModalClose?.addEventListener('click', closeFutureMailModal);
futureMailModalBackdrop?.addEventListener('click', closeFutureMailModal);
futureMailModalArchive?.addEventListener('click', async () => {
  await closeFutureMailModal();
  $('#future-mail')?.scrollIntoView({ behavior:reducedMotion?'auto':'smooth', block:'start' });
});
futureMailModalNext?.addEventListener('click', async () => {
  await acknowledgeActiveFutureMail();
  const next = [...futureMailRecords].filter((item)=>futureMailIsDue(item) && !item.notifiedAt && item.id !== activeFutureMailId).sort((a,b)=>(a.unlockDate||'').localeCompare(b.unlockDate||''))[0];
  if (next) await openFutureMail(next.id, true); else await closeFutureMailModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && futureMailModal && !futureMailModal.hidden) closeFutureMailModal();
});


/* ---------- Portable private archive backup ---------- */
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
function dataUrlToBlob(dataUrl) {
  const [head, body] = String(dataUrl).split(',');
  const match = /data:([^;]+);base64/.exec(head || '');
  const type = match?.[1] || 'image/jpeg';
  const binary = atob(body || '');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type });
}
async function exportPrivateArchive() {
  const gallery = await idbGetAll(GALLERY_STORE);
  const journal = await idbGetAll(JOURNAL_STORE);
  const futureMail = await idbGetAll(FUTURE_MAIL_STORE);
  const galleryPortable = [];
  for (const item of gallery) galleryPortable.push({ ...item, blob: await blobToDataUrl(item.blob) });
  const journalPortable = [];
  for (const item of journal) {
    const photos = [];
    for (const photo of item.photos || []) photos.push({ ...photo, blob: await blobToDataUrl(photo.blob || photo) });
    const voice = item.voice?.blob ? { ...item.voice, blob: await blobToDataUrl(item.voice.blob) } : null;
    journalPortable.push({ ...item, photos, voice });
  }
  const payload = {
    kind: 'HH022_PRIVATE_ARCHIVE',
    version: 3,
    exportedAt: new Date().toISOString(),
    gallery: galleryPortable,
    journal: journalPortable,
    futureMail,
    flights: readLocalFlights(),
    milestones: readGrowthMilestones(),
    wish: localStorage.getItem(STORAGE_KEY) || null
  };
  const blob = new Blob([JSON.stringify(payload)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hh022-private-archive-${localISODate()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function importPrivateArchive(file) {
  const payload = JSON.parse(await file.text());
  if (payload?.kind !== 'HH022_PRIVATE_ARCHIVE') throw new Error('Unknown archive');
  for (const item of payload.gallery || []) {
    if (!item?.id || !item?.blob) continue;
    await idbPut(GALLERY_STORE, { ...item, source:'local', blob:dataUrlToBlob(item.blob) });
  }
  for (const item of payload.journal || []) {
    if (!item?.id) continue;
    const photos = (item.photos || []).map((photo) => ({ ...photo, blob:dataUrlToBlob(photo.blob) }));
    const voice = item.voice?.blob ? { ...item.voice, blob:dataUrlToBlob(item.voice.blob) } : null;
    await idbPut(JOURNAL_STORE, { ...item, photos, voice });
  }
  for (const item of payload.futureMail || []) {
    if (!item?.id || !item?.unlockDate) continue;
    await idbPut(FUTURE_MAIL_STORE, item);
  }
  if (payload.milestones && typeof payload.milestones === 'object') {
    localStorage.setItem(GROWTH_MILESTONE_KEY, JSON.stringify(payload.milestones));
  }
  if (Array.isArray(payload.flights)) {
    localFlights = payload.flights;
    saveLocalFlights();
    renderAtlas();
  }
  if (payload.wish) localStorage.setItem(STORAGE_KEY, payload.wish);
  galleryLocalRecords = await idbGetAll(GALLERY_STORE);
  journalRecords = await idbGetAll(JOURNAL_STORE);
  futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
  renderGallery();
  renderJournalIndex();
  renderFutureMailArchive();
  refreshLifeOS();
}


galleryExport?.addEventListener('click', async () => {
  galleryExport.disabled = true;
  try { await exportPrivateArchive(); }
  catch (error) { console.warn(error); window.alert('导出失败，请稍后再试。'); }
  finally { galleryExport.disabled = false; }
});
galleryImport?.addEventListener('click', () => galleryImportFile.click());
galleryImportFile?.addEventListener('change', async () => {
  const file = galleryImportFile.files?.[0];
  if (!file) return;
  try {
    await importPrivateArchive(file);
    window.alert('私人档案已导入。');
  } catch (error) {
    console.warn(error);
    window.alert('这不是可识别的 HH022 私人档案。');
  } finally {
    galleryImportFile.value = '';
  }
});


/* =========================================================
   V8 · FLIGHT LIFE OS
   Constellation / growth cockpit / badges / inner weather
   ========================================================= */
const GROWTH_MILESTONE_KEY = 'hh022-growth-milestones-v1';
const MILESTONE_DEFS = [
  { id:'ground', code:'01', title:'理论与基础', note:'开始系统学飞，把基本功一项项搭起来。' },
  { id:'circuit', code:'02', title:'起落航线', note:'让每一次进近、落地和复飞都更稳定。' },
  { id:'solo', code:'03', title:'首次单飞', note:'真正独自把飞机带上天空，再安全带回来。' },
  { id:'crosscountry', code:'04', title:'转场训练', note:'开始把航图、天气、航路和决策连成一整程。' },
  { id:'instrument', code:'05', title:'仪表训练', note:'学会在更少外界参照时依然相信程序和判断。' },
  { id:'nextstage', code:'06', title:'下一阶段 / 执照', note:'这个节点由你自己定义，也由你自己点亮。' }
];
const WEATHER_META = {
  'CAVOK': { icon:'○', label:'状态很好' },
  'CLEAR': { icon:'☼', label:'清朗' },
  'CLOUDY': { icon:'◌', label:'有点迷茫' },
  'CROSSWIND': { icon:'↝', label:'有挑战' },
  'TURBULENCE': { icon:'≈', label:'起伏很大' },
  'STORM': { icon:'ϟ', label:'很难熬' },
  'AFTER RAIN': { icon:'◇', label:'熬过去了' }
};

const constellationCanvas = $('#life-constellation');
const constellationStage = $('#constellation-stage');
const constellationTooltip = $('#constellation-tooltip');
const constellationEmpty = $('#constellation-empty');
const constellationCount = $('#constellation-count');
const growthDial = $('#growth-dial');
const growthPercent = $('#growth-percent');
const osHours = $('#os-hours');
const osTypes = $('#os-types');
const osAirports = $('#os-airports');
const osLogdays = $('#os-logdays');
const milestoneList = $('#milestone-list');
const badgeWall = $('#badge-wall');
const badgeProgress = $('#badge-progress');
const weatherYear = $('#weather-year');
const weatherYearGrid = $('#weather-year-grid');
const weatherSummary = $('#weather-summary');

let constellationPoints = [];
let constellationRenderFrame = 0;
let constellationPulseTimer = 0;

function readGrowthMilestones() {
  try { return JSON.parse(localStorage.getItem(GROWTH_MILESTONE_KEY) || '{}') || {}; }
  catch { return {}; }
}
function writeGrowthMilestones(value) {
  localStorage.setItem(GROWTH_MILESTONE_KEY, JSON.stringify(value || {}));
}
function journalHasStage(stage) {
  return journalRecords.some((item) => String(item.stage || '').includes(stage));
}
function journalSearchText(item) {
  return [
    item?.stage,
    item?.title,
    item?.note,
    item?.lesson,
    item?.mood,
    item?.weather,
    item?.aircraft,
    item?.location,
    item?.futureLine,
    item?.transcript,
    item?.summary
  ].filter(Boolean).join(' ').toLowerCase();
}
function journalHasAnyKeyword(keywords) {
  const words = keywords.map((word) => String(word).toLowerCase());
  return journalRecords.some((item) => {
    const corpus = journalSearchText(item);
    return words.some((word) => corpus.includes(word));
  });
}
function milestoneEvidence(id) {
  if (id === 'ground') return journalRecords.length > 0;
  if (id === 'circuit') return journalHasAnyKeyword(['起落航线', '本场训练', 'circuit', 'pattern']);
  // SOLO must be robust: older journal versions may have written “首次单飞”
  // in the title/note rather than saving it in the stage field.
  if (id === 'solo') return journalHasAnyKeyword(['首次单飞', '单飞', '独飞', '独立飞行', 'first solo', 'solo flight', 'solo']);
  if (id === 'crosscountry') return journalHasAnyKeyword(['转场训练', '转场', 'cross country', 'cross-country', 'xc']);
  if (id === 'instrument') return journalHasAnyKeyword(['仪表训练', '仪表飞行', 'instrument', 'ifr']);
  return false;
}
function effectiveMilestones() {
  const manual = readGrowthMilestones();
  const result = {};
  MILESTONE_DEFS.forEach((item) => { result[item.id] = Boolean(manual[item.id] || milestoneEvidence(item.id)); });
  return result;
}
function renderGrowthCockpit() {
  if (!milestoneList) return;
  const effective = effectiveMilestones();
  const manual = readGrowthMilestones();
  const completed = MILESTONE_DEFS.filter((item) => effective[item.id]).length;
  const percent = Math.round((completed / MILESTONE_DEFS.length) * 100);
  growthPercent.textContent = `${percent}%`;
  growthDial.style.setProperty('--progress', `${percent * 3.6}deg`);

  const hours = journalRecords.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  const aircraftTypes = new Set([
    ...getAllFlights().map((item) => item.aircraft).filter((v) => v && v !== 'UNKNOWN'),
    ...journalRecords.map((item) => String(item.aircraft || '').trim().toUpperCase()).filter(Boolean)
  ]);
  const airportCodes = new Set();
  getAllFlights().forEach((item) => { airportCodes.add(item.from); airportCodes.add(item.to); });
  osHours.textContent = `${hours.toFixed(1)} H`;
  osTypes.textContent = aircraftTypes.size;
  osAirports.textContent = airportCodes.size;
  osLogdays.textContent = new Set(journalRecords.map((item) => item.date).filter(Boolean)).size;

  milestoneList.innerHTML = '';
  MILESTONE_DEFS.forEach((item) => {
    const evidence = milestoneEvidence(item.id);
    const done = effective[item.id];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `milestone-item ${done ? 'done' : ''} ${evidence ? 'evidence' : ''}`;
    button.innerHTML = `<span class="milestone-mark">${done ? '✓' : item.code}</span><span class="milestone-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.note)}</span></span><span>${evidence ? 'FROM LOG' : (manual[item.id] ? 'MARKED' : 'TAP TO MARK')}</span>`;
    button.addEventListener('click', () => {
      if (evidence) return;
      const next = readGrowthMilestones();
      next[item.id] = !next[item.id];
      writeGrowthMilestones(next);
      renderGrowthCockpit();
      renderBadges();
    });
    milestoneList.appendChild(button);
  });
}

function badgeMetrics() {
  const flights = getAllFlights();
  const hours = journalRecords.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  const types = new Set([
    ...flights.map((item) => item.aircraft).filter((v) => v && v !== 'UNKNOWN'),
    ...journalRecords.map((item) => String(item.aircraft || '').trim().toUpperCase()).filter(Boolean)
  ]);
  const airports = new Set();
  flights.forEach((item) => { airports.add(item.from); airports.add(item.to); });
  const textCorpus = journalRecords.map((item) => journalSearchText(item)).join(' ');
  return { flights, hours, types, airports, textCorpus };
}
function renderBadges() {
  if (!badgeWall) return;
  const m = badgeMetrics();
  const milestone = effectiveMilestones();
  const defs = [
    { symbol:'01', title:'FIRST LOG', note:'写下第一篇学飞日志', unlocked:journalRecords.length >= 1 },
    { symbol:'↗', title:'FIRST ROUTE', note:'记录第一程航班', unlocked:m.flights.length >= 1 },
    { symbol:'10H', title:'TEN HOURS', note:'累计记录 10 小时训练', unlocked:m.hours >= 10 },
    { symbol:'SOLO', title:'SOLO WINGS', note:'首次单飞', unlocked:milestone.solo },
    { symbol:'N', title:'NIGHT OWL', note:'记录过一次夜航', unlocked:journalHasAnyKeyword(['夜航', 'night flight', 'night']) },
    { symbol:'3T', title:'TYPE COLLECTOR', note:'记录 3 种不同机型', unlocked:m.types.size >= 3 },
    { symbol:'5A', title:'AIRPORT EXPLORER', note:'去过 5 个机场', unlocked:m.airports.size >= 5 },
    { symbol:'10F', title:'TEN FLIGHTS', note:'记录 10 程航班', unlocked:m.flights.length >= 10 },
    { symbol:'CVR', title:'BLACK BOX', note:'留下一段训练语音', unlocked:journalRecords.some((item) => item.voice?.blob) },
    { symbol:'S·V', title:'FIRST SOLO CVR', note:'第一次单飞的声音被永久封存', unlocked:Boolean(findFirstSoloVoiceRecord()) }
  ];
  const unlockedCount = defs.filter((item) => item.unlocked).length;
  badgeProgress.textContent = `${unlockedCount} / ${defs.length} UNLOCKED`;
  badgeWall.innerHTML = defs.map((item, index) => `
    <article class="flight-badge ${item.unlocked ? 'unlocked' : ''}">
      <div class="badge-topline"><span>FLIGHT ACHIEVEMENT</span><em>${String(index + 1).padStart(2,'0')}</em></div>
      <div class="badge-medal" aria-hidden="true">
        <span class="badge-wing badge-wing-left"></span>
        <div class="badge-symbol">${escapeHtml(item.symbol)}</div>
        <span class="badge-wing badge-wing-right"></span>
      </div>
      <strong>${escapeHtml(item.title)}</strong>
      <span class="badge-note">${escapeHtml(item.note)}</span>
      <div class="badge-lock-state">${item.unlocked ? '<i></i> ACHIEVEMENT UNLOCKED' : 'LOCKED · KEEP FLYING'}</div>
    </article>`).join('');
}

function dominantValue(items, key) {
  const counts = new Map();
  items.forEach((item) => {
    const value = String(item[key] || '').trim();
    if (!value) return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()].sort((a,b) => b[1] - a[1])[0]?.[0] || '';
}
function renderInnerWeather() {
  if (!weatherYearGrid) return;
  const years = journalRecords.map((item) => Number(String(item.date || '').slice(0,4))).filter(Boolean);
  const year = years.length ? Math.max(...years) : new Date().getFullYear();
  weatherYear.textContent = String(year);
  const months = Array.from({ length:12 }, (_, index) => index + 1);
  weatherYearGrid.innerHTML = '';
  let dataMonths = 0;
  const weatherCounts = new Map();
  months.forEach((month) => {
    const monthRecords = journalRecords.filter((item) => {
      const [y,m] = String(item.date || '').split('-').map(Number);
      return y === year && m === month;
    });
    const weather = dominantValue(monthRecords, 'weather');
    const mood = dominantValue(monthRecords, 'mood');
    if (monthRecords.length) dataMonths += 1;
    if (weather) weatherCounts.set(weather, (weatherCounts.get(weather) || 0) + monthRecords.length);
    const meta = WEATHER_META[weather] || { icon:'·', label:'暂无记录' };
    const card = document.createElement('div');
    card.className = `weather-month ${monthRecords.length ? 'has-data' : ''}`;
    card.dataset.weather = weather || '';
    card.innerHTML = `<span>${String(month).padStart(2,'0')} / ${year}</span><div class="weather-icon">${escapeHtml(meta.icon)}</div><strong>${escapeHtml(weather || 'NO LOG')}</strong><small>${monthRecords.length ? `${monthRecords.length} logs · ${mood || meta.label}` : '等待记录'}</small>`;
    weatherYearGrid.appendChild(card);
  });
  const topWeather = [...weatherCounts.entries()].sort((a,b) => b[1] - a[1])[0]?.[0];
  if (!journalRecords.length) {
    weatherSummary.textContent = '写下训练日志后，这里会慢慢出现属于这一年的“内心天气”。';
  } else if (topWeather) {
    weatherSummary.textContent = `${year} 已经留下 ${journalRecords.filter((item) => String(item.date || '').startsWith(String(year))).length} 篇训练记录，覆盖 ${dataMonths} 个月。出现最多的内心天气是 ${topWeather} · ${WEATHER_META[topWeather]?.label || ''}。`;
  } else {
    weatherSummary.textContent = `${year} 已经有训练日志了。下一篇开始选一个 INNER WEATHER，这张气象图就会真正长出来。`;
  }
}

function flightLogDateToISO(value) {
  const [mon, year] = String(value || '').split(/\s+/);
  const months = { JAN:'01',FEB:'02',MAR:'03',APR:'04',MAY:'05',JUN:'06',JUL:'07',AUG:'08',SEP:'09',OCT:'10',NOV:'11',DEC:'12' };
  return year && months[mon] ? `${year}-${months[mon]}-15` : '';
}
function buildConstellationEvents() {
  const events = [];
  FLIGHT_LOG.forEach((item, index) => {
    const date = flightLogDateToISO(item.date);
    if (date) events.push({ id:`timeline-${index}`, date, type:'memory', title:item.title, note:item.note, target:'log' });
  });
  getAllFlights().forEach((item) => events.push({ id:item.id, date:item.date, type:'flight', title:`${item.flight} · ${item.from} → ${item.to}`, note:[item.aircraft,item.operator].filter(Boolean).join(' · '), target:'flight' }));
  journalRecords.forEach((item) => events.push({ id:item.id, date:item.date, type:item.voice?.blob ? 'voice' : 'journal', title:item.title || 'Training log', note:[item.stage,item.aircraft,item.voice?.blob ? '🎙 VOICE PRESERVED' : ''].filter(Boolean).join(' · '), target:'journal' }));
  galleryLocalRecords.forEach((item) => { if (item.date) events.push({ id:item.id, date:item.date, type:'memory', title:item.title || 'Memory', note:item.place || item.note || '', target:'gallery' }); });
  return events.filter((item) => item.date).sort((a,b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
function hash01(value) {
  let h = 2166136261;
  for (const char of String(value)) { h ^= char.charCodeAt(0); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 10000) / 10000;
}
function resizeConstellationCanvas() {
  if (!constellationCanvas || !constellationStage) return null;
  const rect = constellationStage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(260, Math.round(rect.height));
  if (constellationCanvas.width !== Math.round(width * dpr) || constellationCanvas.height !== Math.round(height * dpr)) {
    constellationCanvas.width = Math.round(width * dpr);
    constellationCanvas.height = Math.round(height * dpr);
  }
  constellationCanvas.style.width = `${width}px`;
  constellationCanvas.style.height = `${height}px`;
  const ctx = constellationCanvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return { ctx, width, height, dpr };
}
function drawConstellation() {
  clearTimeout(constellationPulseTimer);
  cancelAnimationFrame(constellationRenderFrame);
  constellationRenderFrame = requestAnimationFrame(() => {
    const sized = resizeConstellationCanvas();
    if (!sized) return;
    const { ctx, width, height } = sized;
    const events = buildConstellationEvents();
    constellationCount.textContent = `${String(events.length).padStart(2,'0')} STARS`;
    constellationEmpty.hidden = events.length > 0;
    ctx.clearRect(0,0,width,height);
    const bg = ctx.createRadialGradient(width*.52,height*.46,20,width*.52,height*.46,width*.75);
    bg.addColorStop(0,'rgba(43,91,119,.12)'); bg.addColorStop(1,'rgba(2,8,14,0)');
    ctx.fillStyle = bg; ctx.fillRect(0,0,width,height);
    for (let i=0;i<95;i++) {
      const x = hash01(`bg-x-${i}`) * width;
      const y = hash01(`bg-y-${i}`) * height;
      const r = .35 + hash01(`bg-r-${i}`) * 1.1;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=`rgba(186,211,224,${.10 + hash01(`bg-a-${i}`)*.32})`; ctx.fill();
    }
    if (!events.length) { constellationPoints = []; return; }
    const minTime = new Date(events[0].date).getTime();
    const maxTime = new Date(events[events.length-1].date).getTime();
    const span = Math.max(1, maxTime-minTime);
    constellationPoints = events.map((event,index) => {
      const t = (new Date(event.date).getTime()-minTime)/span;
      const x = width*.08 + t*width*.84;
      const jitter = (hash01(event.id)-.5)*height*.34;
      const wave = Math.sin(index*1.55 + hash01(event.id)*4.2)*height*.11;
      const y = height*.50 + jitter + wave;
      return { ...event, x, y:Math.max(38,Math.min(height-38,y)) };
    });
    ctx.lineWidth = 1;
    for (let i=1;i<constellationPoints.length;i++) {
      const a=constellationPoints[i-1], b=constellationPoints[i];
      const grad=ctx.createLinearGradient(a.x,a.y,b.x,b.y); grad.addColorStop(0,'rgba(139,190,216,.12)'); grad.addColorStop(1,'rgba(205,183,143,.22)');
      ctx.strokeStyle=grad; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    }
    constellationPoints.forEach((point,index) => {
      const color = point.type==='flight' ? [157,217,255] : point.type==='voice' ? [120,234,220] : point.type==='journal' ? [205,183,143] : [234,182,200];
      const pulse = point.type==='voice' ? (Math.sin(Date.now()/430 + index)*.5+.5) : 0;
      const radius = point.type==='voice' ? 4.8 + pulse*1.7 : point.type==='journal' ? 4.4 : 3.8;
      const glow=ctx.createRadialGradient(point.x,point.y,0,point.x,point.y,17); glow.addColorStop(0,`rgba(${color.join(',')},.38)`); glow.addColorStop(1,`rgba(${color.join(',')},0)`); ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(point.x,point.y,17,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgb(${color.join(',')})`;ctx.beginPath();ctx.arc(point.x,point.y,radius,0,Math.PI*2);ctx.fill();
      if(point.type==='voice'){ctx.strokeStyle=`rgba(${color.join(',')},${.22+pulse*.28})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(point.x,point.y,11+pulse*7,0,Math.PI*2);ctx.stroke();}
      if(index===constellationPoints.length-1){ctx.strokeStyle='rgba(205,183,143,.38)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(point.x,point.y,10,0,Math.PI*2);ctx.stroke();}
    });
    if (constellationPoints.some((point)=>point.type==='voice') && !reducedMotion) constellationPulseTimer=setTimeout(drawConstellation,90);
  });
}
function constellationHit(event) {
  if (!constellationCanvas) return null;
  const rect = constellationCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left, y = event.clientY - rect.top;
  return constellationPoints.map((point) => ({ point, d:Math.hypot(point.x-x,point.y-y) })).sort((a,b)=>a.d-b.d)[0]?.d <= 15 ? constellationPoints.map((point) => ({ point, d:Math.hypot(point.x-x,point.y-y) })).sort((a,b)=>a.d-b.d)[0].point : null;
}
constellationCanvas?.addEventListener('pointermove', (event) => {
  const point = constellationHit(event);
  if (!point) { constellationTooltip.hidden = true; constellationCanvas.style.cursor='crosshair'; return; }
  constellationCanvas.style.cursor='pointer';
  constellationTooltip.innerHTML = `<span>${escapeHtml(point.type.toUpperCase())} · ${escapeHtml(prettyDate(point.date))}</span><strong>${escapeHtml(point.title)}</strong><p>${escapeHtml(point.note || '点击查看这条记录')}</p>`;
  const stageRect = constellationStage.getBoundingClientRect();
  constellationTooltip.style.left = `${Math.min(stageRect.width-260, Math.max(12,event.clientX-stageRect.left+14))}px`;
  constellationTooltip.style.top = `${Math.min(stageRect.height-110, Math.max(12,event.clientY-stageRect.top+14))}px`;
  constellationTooltip.hidden = false;
});
constellationCanvas?.addEventListener('pointerleave', () => { constellationTooltip.hidden = true; });
constellationCanvas?.addEventListener('click', (event) => {
  const point = constellationHit(event); if (!point) return;
  if (point.target === 'flight') { $('#atlas')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'}); setTimeout(()=>selectAtlasFlight(point.id), reducedMotion?0:500); }
  else if (point.target === 'journal') { $('#journal')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'}); setTimeout(()=>selectJournal(point.id), reducedMotion?0:500); }
  else if (point.target === 'gallery') { $('#gallery')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'}); const idx=galleryItems.findIndex((item)=>item.id===point.id); if(idx>=0){galleryActive=idx;updateGalleryDeck();} }
  else $('#log')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth'});
});
if ('ResizeObserver' in window) new ResizeObserver(drawConstellation).observe(constellationStage || document.body);
else window.addEventListener('resize', drawConstellation);

function refreshLifeOS() {
  renderGrowthCockpit();
  renderBadges();
  renderInnerWeather();
  renderPlaudBlackBox();
  renderFutureEcho();
  drawConstellation();
  if (atlasEngine) atlasEngine.setFlights(getAllFlights());
}
window.HH022_REFRESH_LIFE_OS = refreshLifeOS;

async function initPrivateVault() {
  if (!('indexedDB' in window)) {
    galleryFormError.textContent = '当前浏览器不支持本机照片数据库。请使用最新版 Safari / Chrome。';
    journalFormError.textContent = '当前浏览器不支持本机日志数据库。请使用最新版 Safari / Chrome。';
    return;
  }
  try {
    galleryLocalRecords = await idbGetAll(GALLERY_STORE);
    journalRecords = await idbGetAll(JOURNAL_STORE);
    futureMailRecords = await idbGetAll(FUTURE_MAIL_STORE);
    galleryDate.value = localISODate();
    journalDate.value = localISODate();
    if (plaudDate) plaudDate.value = localISODate();
    resetFutureMailForm();
    renderGallery();
    renderJournalIndex();
    renderFutureMailArchive();
    refreshLifeOS();
    futureMailReady = true;
    if (document.body.classList.contains('entered')) setTimeout(() => maybeAutoDeliverFutureMail(), 250);
  } catch (error) {
    console.warn('Private vault init failed:', error);
  }
}
initPrivateVault();
