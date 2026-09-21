const pause = document.querySelector('#pause');
const replay = document.querySelector('#replay');
const stage = document.querySelector('.stage');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncMotionPreference() {
  pause.disabled = reduceMotion.matches;
  replay.disabled = reduceMotion.matches;
  pause.textContent = reduceMotion.matches ? '静态模式' : document.body.classList.contains('paused') ? '继续' : '暂停';
}
pause.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  pause.setAttribute('aria-pressed', String(paused));
  syncMotionPreference();
});
replay.addEventListener('click', () => {
  document.body.classList.remove('paused');
  pause.setAttribute('aria-pressed', 'false');
  for (const animation of stage.getAnimations({ subtree: true })) { animation.currentTime = 0; animation.play(); }
  syncMotionPreference();
});
document.addEventListener('visibilitychange', () => document.body.classList.toggle('hidden-tab', document.hidden));
reduceMotion.addEventListener('change', syncMotionPreference);
syncMotionPreference();

// Each label/value pair or paragraph block moves as a whole, never letter by letter.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
  document.documentElement.classList.add('reveal-ready');
  for (const group of document.querySelectorAll('[data-reveal]')) revealObserver.observe(group);
}

// Desktop pointer interaction: subtle parallax and a soft highlight inside each project card.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function bindPointerResponse(element, range) {
  element.addEventListener('pointermove', event => {
    if (!finePointer.matches || reduceMotion.matches) return;
    const rect = element.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    element.style.setProperty('--cursor-x', (x * 100).toFixed(1) + '%');
    element.style.setProperty('--cursor-y', (y * 100).toFixed(1) + '%');
    element.style.setProperty('--shift-x', ((x - .5) * range * 2).toFixed(1) + 'px');
    element.style.setProperty('--shift-y', ((y - .5) * range * 2).toFixed(1) + 'px');
    element.style.setProperty('--soft-x', ((x - .5) * range * -.65).toFixed(1) + 'px');
    element.style.setProperty('--soft-y', ((y - .5) * range * -.65).toFixed(1) + 'px');
  });
  element.addEventListener('pointerleave', () => {
    element.style.setProperty('--cursor-x', '50%');
    element.style.setProperty('--cursor-y', '50%');
    element.style.setProperty('--shift-x', '0px');
    element.style.setProperty('--shift-y', '0px');
    element.style.setProperty('--soft-x', '0px');
    element.style.setProperty('--soft-y', '0px');
  });
}

const stagePointerArea = document.querySelector('.stage');
const experiencePointerArea = document.querySelector('.experience');
if (stagePointerArea) bindPointerResponse(stagePointerArea, 10);
if (experiencePointerArea) bindPointerResponse(experiencePointerArea, 5);
for (const card of document.querySelectorAll('.profile-card')) bindPointerResponse(card, 6);

for (const card of document.querySelectorAll('.project-card:not(.other-projects)')) {
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || reduceMotion.matches) return;
    const rect = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    card.style.setProperty('--pointer-x', (x * 100).toFixed(1) + '%');
    card.style.setProperty('--pointer-y', (y * 100).toFixed(1) + '%');
    card.style.setProperty('--image-x', ((x - .5) * 10).toFixed(1) + 'px');
    card.style.setProperty('--image-y', ((y - .5) * 10).toFixed(1) + 'px');
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
    card.style.setProperty('--image-x', '0px');
    card.style.setProperty('--image-y', '0px');
  });
}

// Confidential projects stay explorable without navigating away: the card copy
// crossfades to the disclosure state on click or keyboard activation.
for (const card of document.querySelectorAll('[data-confidential-card]')) {
  const toggleConfidential = () => {
    const active = card.classList.toggle('is-confidential');
    card.setAttribute('aria-expanded', String(active));
  };
  card.addEventListener('click', toggleConfidential);
  card.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleConfidential();
  });
}
