(() => {
  const projects = [
    { id:'sohu', href:'sohu.html', image:'assets/sohu.webp', alt:'搜狐畅游项目预览', date:'2024.05 - 2024.09', city:'北京', title:'搜狐畅游', role:'B + C 端 / AI 平台设计部', description:'参与 AI 畅游协作平台设计，主导“素材沉淀模块” 0-1 落地与“画板工具”模块改版，沉淀组件规范与状态规则。' },
    { id:'yonbip', href:'yonbip.html', image:'assets/yonbip.webp', alt:'用友 YonBIP 项目预览', date:'2024.05 - 2024.09', city:'北京', title:'用友 YonBIP', role:'B 端 / 人力资源设计部', description:'负责 HRM 搜索、浏览、编辑核心模块设计，优化信息架构与操作流程，提升系统易用性与业务效率。' },
    { id:'huace', href:'huace.html', image:'assets/chcnav.webp', alt:'华测导航项目预览', date:'2024.05 - 2024.09', city:'上海', title:'CHCNAV 华测导航', role:'B 端 / 用户体验设计部', description:'完成海外支付界面、自动化调度运维工作台与物联网设备管理小程序设计，在短周期内完成多项目高保真交付。' },
    { id:'other', href:'other.html', images:['assets/course.webp','assets/ip.webp','assets/iot.webp','assets/icons.webp'], date:'2023.05 - 2025.09', city:'', title:'其他项目', role:'粉笔教育 APP 改版 · IP 视觉设计', description:'海外支付平台界面设计、物联网设备管理小程序设计与图标规范。' }
  ];
  document.querySelectorAll('.project-nav').forEach((section) => {
    const current = section.dataset.current;
    const grid = section.querySelector('.project-nav-grid');
    grid.innerHTML = projects.map((project, index) => {
      const active = project.id === current;
      const visual = project.images ? `<div class="project-nav-gallery">${project.images.map((src) => `<img src="${src}" alt="" loading="lazy">`).join('')}</div>` : `<img class="project-nav-image" src="${project.image}" width="910" height="452" alt="${project.alt}" loading="lazy">`;
      return `<a class="project-nav-card${active ? ' is-current' : ''}${project.images ? ' is-other' : ''}" href="${active ? '#top' : project.href}" ${active ? 'aria-label="返回本项目顶部"' : `aria-label="浏览${project.title}项目"`} data-reveal style="--delay:${index * 90}ms">${visual}<div class="project-nav-copy"><p class="project-nav-meta"><span>${project.date}</span>${project.city ? `<span>${project.city}</span>` : ''}</p><div class="project-nav-title"><h3>${project.title}</h3><span class="project-nav-action"><span class="project-nav-arrow" aria-hidden="true"></span>${active ? '返回顶部' : '查看项目'}</span><p class="project-nav-role">${project.role}</p><p class="project-nav-description">${project.description}</p></div></div></a>`;
    }).join('');
  });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold:.12 });
  document.querySelectorAll('.project-nav-card[data-reveal]').forEach((card) => { observer.observe(card); card.addEventListener('pointermove', (event) => { const rect = card.getBoundingClientRect(); card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`); card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`); }); });
})();
