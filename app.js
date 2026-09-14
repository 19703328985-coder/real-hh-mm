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
