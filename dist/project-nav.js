(() => {
  const projects = [
    { id:'sohu', href:'sohu.html', image:'assets/sohu.webp', alt:'搜狐畅游项目预览', meta:'2024.05 - 2024.09 · 北京', title:'搜狐畅游', description:'AI 创作平台、素材沉淀模块与画板工具改版。' },
    { id:'yonbip', href:'yonbip.html', image:'assets/yonbip.webp', alt:'用友 YonBIP 项目预览', meta:'2024.05 - 2024.09 · 北京', title:'用友 YonBIP', description:'HRM 搜索、浏览和编辑核心模块体验优化。' },
    { id:'huace', href:'huace.html', image:'assets/chcnav.webp', alt:'华测导航项目预览', meta:'2024.05 - 2024.09 · 上海', title:'CHCNAV 华测导航', description:'海外支付、运维工作台与物联网设备管理设计。' },
    { id:'other', href:'other.html', image:'assets/ip.webp', alt:'其他设计项目预览', meta:'2023.05 - 2025.09', title:'其他项目', description:'教育产品改版、IP 视觉、运营设计与图标规范。' }
  ];

  document.querySelectorAll('.project-nav').forEach((section) => {
    const current = section.dataset.current;
    const grid = section.querySelector('.project-nav-grid');
    grid.innerHTML = projects.map((project, index) => {
      const active = project.id === current;
      return `<a class="project-nav-card${active ? ' is-current' : ''}" href="${active ? '#top' : project.href}" ${active ? 'aria-label="返回本项目顶部"' : `aria-label="浏览${project.title}项目"`} data-reveal style="--delay:${index * 90}ms">
        <img src="${project.image}" width="360" height="210" alt="${project.alt}" loading="lazy">
        <div class="project-nav-copy">
          <p class="project-nav-meta">${project.meta}</p>
          <div class="project-nav-title"><h3>${project.title}</h3><span class="project-nav-action"><span class="project-nav-arrow" aria-hidden="true"></span>${active ? '返回顶部' : '查看项目'}</span></div>
          <p class="project-nav-description">${project.description}</p>
        </div>
      </a>`;
    }).join('');
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold:.12 });
  document.querySelectorAll('.project-nav-card[data-reveal]').forEach((card) => {
    observer.observe(card);
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
  });
})();

