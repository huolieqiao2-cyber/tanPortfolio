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
