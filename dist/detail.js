document.documentElement.classList.add('reveal-ready');

const revealGroups = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  for (const group of revealGroups) observer.observe(group);
} else {
  for (const group of revealGroups) group.classList.add('is-visible');
}

document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('hidden-tab', document.hidden);
});
