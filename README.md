# xdanger.com

这是 [xdanger.com](https://www.xdanger.com/) 个人博客网站的源代码仓库，使用 [Astro](https://astro.build/) 框架构建。

> AI agents (Claude Code, Codex, Cursor 等) 请阅读 [`AGENTS.md`](./AGENTS.md) 获取项目规范。

## 项目概述

- 基于 [Astro](https://astro.build/) v6 框架构建的静态博客网站
- 使用 `pnpm` 作为包管理器
- 支持 MDX 格式的博客文章和笔记
- 集成了 Tailwind CSS v4 进行样式管理
- 通过 Pagefind 提供站内搜索
- 包含博客文章、笔记和标签页面

## 开发指南

### 系统要求

- [Node.js](https://nodejs.org/) ≥ 20.19（推荐 Node 22 LTS，见 `.nvmrc`）
- [pnpm](https://pnpm.io/) ≥ 10（通过 [Corepack](https://nodejs.org/api/corepack.html) 自动启用）

### 安装依赖

```bash
pnpm install
```

### 开发命令

| 命令            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| `pnpm dev`      | 启动开发服务器                                               |
| `pnpm build`        | 构建生产版本，并生成 Pagefind 搜索索引                       |
| `pnpm build:site`   | 只运行 Astro 构建，适合本地快速验证                          |
| `pnpm build:debug`  | 带 `NODE_OPTIONS=--trace-warnings` 运行 Astro 构建            |
| `pnpm run rebuild`    | 只重新执行 Astro 构建，复用已有 OG image PNG，只补缺失图片 |
| `pnpm run rebuild:og` | 强制刷新全部 OG image PNG，并写回本地缓存                  |
| `pnpm preview`      | 用纯静态服务器（`serve`，`cleanUrls:false`）伺服 `dist/`，1:1 复现线上 URL 行为 |
| `pnpm lint`         | 运行 autocorrect / prettier / eslint / astro check 全套检查 |
| `pnpm fix`          | 自动修复格式与可修复的 lint 问题                             |

### 项目结构

- `_posts/` - 博客文章内容 (MDX 格式)
- `_notes/` - 笔记内容 (MDX 格式)
- `src/components/` - 组件
- `src/layouts/` - 页面布局
- `src/pages/` - 页面和路由
- `src/styles/` - 全局样式
- `src/utils/` - 工具函数
- `public/` - 静态资源文件

### URL 规则

本项目以「干净 URL 为默认、冻结的历史文章为例外」组织所有地址；新增内容时以
`src/utils/url.ts`（`getPostPath` / `getPostRouteSlug` / `getCanonicalUrl` / `getNotePath`，单一事实来源）为准：

1. MoveableType 时期的文章（发布日期 < `2013-05-31`）：

   - 文件路径：`_posts/YYYY/MM/DD/SEQ.mdx`
   - URL 形态：`/YYYY/MM/DD/SEQ.html`（与原博客完全一致）

2. Jekyll 时期的文章（`2013-05-31` <= 发布日期 < `2025-02-28`）：

   - 文件路径：`_posts/YYYY/MM/DD/title.mdx`
   - URL 形态：`/YYYY/MM/DD/title.html`（与原博客完全一致）

3. Astro 时期的文章（`2025-02-28` <= 发布日期）：

   - 文件路径：`_posts/YYYY/MMDD-title.mdx`
   - URL 形态：`/title-YYYYMMDD`（干净 URL，slug 取自文件名 `MMDD-` 之后那段，日期取自 `YYYY`+`MMDD`）
   - 历史上短暂使用过的 `/YYYY/MMDD-title` 形态，由 `astro.config.ts` 的 `redirects` 301 跳到此形态

4. 笔记（notes）：

   - 文件路径：`_notes/<slug>-<YYYYMMDD>.md`
   - URL 形态：`/notes/<slug>-<YYYYMMDD>`（干净 URL）

实现机制：`build.format: "directory"` 让每个页面默认输出为 `<path>/index.html`（干净 URL）；
历史文章（①②）在 `astro:build:done` 钩子（`astro.config.ts` 的 `legacyHtmlFlattener`）里被还原成
扁平 `<path>.html` 文件，以原样伺服历史 `.html` 链接。整套 URL 契约都写在静态产物里，因此
任意静态 host（Vercel / GitHub Pages）行为一致、可移植。本地 `pnpm preview`
（纯静态 `serve`，配置见根目录 `serve.json`）伺服 `dist/`，即可 1:1 复现线上的链接 / 跳转 / 404。
注意不要用 `astro preview`（带路由魔法：对重定向发 3xx、对历史无后缀做 `.html` 回退），不反映线上。

### 工具链

- **包管理器**：pnpm (`packageManager` 字段已锁定版本)
- **代码格式化**：Prettier (含 `prettier-plugin-astro` / `prettier-plugin-tailwindcss` / `prettier-plugin-autocorrect`)
- **TypeScript/JS lint**：ESLint (flat config，`eslint.config.js`)
- **中文文本规范**：[AutoCorrect](https://github.com/huacnlee/autocorrect)
- **类型检查**：`astro check`

### 重要文件

- `AGENTS.md` - 给所有 AI 编程助手的规范说明
- `MIGRATION.md` - 包含从 Next.js 迁移到 Astro 的完整过程记录和待办事项
- `astro.config.ts` - Astro 配置文件
- `src/site.config.ts` - 网站核心配置
- `src/utils/url.ts` - URL 格式处理工具函数

### 部署

- **Vercel**（主站）：`vercel.json` 仅设 `cleanUrls: false`；URL 规则全部由静态产物自身承载，不依赖任何平台路由配置。
- **GitHub Pages**（备份）：通过 `.github/workflows/deploy.yml` 在 `main` 推送后自动构建并发布，行为与 Vercel 一致。

## TODO

### SSG 模式下的改进

- [x] 深入解决 URL 的处理，让生成的 URL 合理，让内链的 URL 符合预期
- [x] 确保 linter/formatter 正确有效（已统一为 prettier + eslint + autocorrect + astro check）
- [x] Upgrade Astro to v6
- [x] Switch package manager to pnpm (移除 bun / biomejs / deno 工具链)
- [ ] Use Cypress/Playwright to establish an e2e tests framework
- [ ] 整理目录结构和代码，让路由更简单合理
- [ ] 重构页面布局相关的 components，需要更合理封装组件，而不是现在大量复制黏贴
- [ ] 尝试改动页面布局，在大尺寸屏幕上尝试居左，右侧空间留给 TOC

### 另建分支探索 SSR

- [ ] 在本地跑通 SSR，确保 URL 处理正确
- [ ] 在 Vercel 上跑通 SSR

## LICENSE

本仓库采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 授权，详见
[`LICENSE`](./LICENSE)。第三方依赖和 `public/assets/` 中保留的第三方素材仍遵循其各自的上游许可。
