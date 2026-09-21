document.documentElement.classList.add('reveal-ready');

// Keep long case-study pages light on entry. Images after the opening pages use
// data-src and only join the network queue shortly before they reach the screen.
const deferredImages = document.querySelectorAll('img[data-src]');
const loadDeferredImage = image => {
  if (!image.dataset.src) return;
  image.src = image.dataset.src;
  delete image.dataset.src;
  image.addEventListener('load', () => image.classList.add('is-loaded'), { once: true });
  if (image.complete) image.classList.add('is-loaded');
};

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      loadDeferredImage(entry.target);
      imageObserver.unobserve(entry.target);
    }
  }, { rootMargin: '1400px 0px', threshold: 0.01 });
  for (const image of deferredImages) imageObserver.observe(image);
} else {
  for (const image of deferredImages) loadDeferredImage(image);
}

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
