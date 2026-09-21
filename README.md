# 谭嘉慧个人作品集

这是谭嘉慧的 UX / UI 设计作品集网站，集中展示个人介绍、实习经历、项目案例与视觉作品。

## 在线访问

- 当前公开站点：<https://soft-light-portfolio-jiahui.huolieqiao2.chatgpt.site/>
- GitHub Pages：启用仓库的 Pages 后，可通过 `https://huolieqiao2-cyber.github.io/tanPortfolio/` 访问。

## 项目内容

- 个人介绍与教育、求职信息
- 搜狐畅游 AI 协作平台项目
- 用友 YonBIP 人力资源系统项目
- CHCNAV 华测导航项目
- 产品渲染、摄影等视觉作品轮播
- 响应式布局、项目间跳转、图片预览与动效交互

## 目录结构

```text
.
├─ index.html          # GitHub Pages 根入口
├─ dist/               # 完整静态网站
│  ├─ index.html       # 首页
│  ├─ sohu.html        # 搜狐畅游项目页
│  ├─ yonbip.html      # 用友项目页
│  ├─ huace.html       # 华测导航项目页
│  ├─ other.html       # 其他项目页
│  ├─ assets/          # 图片资源
│  ├─ *.css            # 页面样式
│  └─ *.js             # 交互与动画
└─ .openai/hosting.json
```

## 本地预览

项目无需构建。建议通过本地静态服务器预览，以避免浏览器对本地文件的限制：

```bash
python -m http.server 8080 --directory dist
```

然后打开 <http://localhost:8080/>。

也可以使用 Node.js：

```bash
npx serve dist
```

## 部署到 GitHub Pages

1. 打开仓库 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**。
3. 选择 `main` 分支和 `/ (root)` 目录并保存。
4. 首次部署通常需要几分钟，完成后即可访问 GitHub Pages 地址。

根目录的 `index.html` 会自动跳转到 `dist/` 中的完整网站。

## 技术说明

网站由原生 HTML、CSS 与 JavaScript 构建，无运行时依赖。图片采用延迟加载和响应式展示；动画尊重系统的“减少动态效果”偏好。

## 版权

作品与图片仅用于个人作品集展示。未经作者许可，请勿复制、修改或用于商业用途。
