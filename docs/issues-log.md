# 问题记录（Issue Log）

> 依赖升级后（hexo 8.1.2 / stellar 1.44.0）排查过程中记录的问题。
> 每个问题记录：现象、根因、状态。

## 0. 依赖版本确认（2026-08-23）

- **确认**：`hexo` / `hexo-theme-stellar` 均已升级并安装到 npm 最新版 —— hexo **8.1.2**、stellar **1.44.0**（与 `npm info` 最新一致）。
- **状态**：无需再次升级，继续复刻任务。

## 1. Wiki 页面 references 渲染崩溃（已定位根因）

- **现象**：`npx hexo generate` 报大量 `ERROR ... Input data should be a String`，堆栈指向 `article_footer.ejs:37 refList()` → `markdown(ref)`。
- **根因**：Stellar 从 1.21.0 起将 `references` front-matter 写法由 `{title, url}` 对象改为 **markdown 链接列表**（见 `node_modules/hexo-theme-stellar/CHANGELOG.md` L957）。旧内容里 `source/wiki/leetcode/*`、`source/wiki/deep_learning/*` 仍使用对象格式，markdown-it 收到对象报错。
- **涉及文件**：`source/wiki/leetcode/**`、`source/wiki/deep_learning/**` 等仍为对象写法的页面。
- **状态**：已修复。通过 `docs/convert_refs.js` / `docs/fix_all_refs.js` 批量将对象写法改为 md 链接列表，并清理孤立 `url:` 行。`hexo generate` 正常，不再报错。

## 2. 部分 Wiki 页面渲染为 0 字节（layout 迁移）

- **现象**：`source/wiki/ai_agent/memory/index.html` 等文件字节数为 0，构建日志出现 `WARN No layout: wiki/...`。
- **根因**：front-matter 使用 `layout: wiki`，但 Stellar 1.44.0 已无 `wiki` 布局模板（改为 `index_wiki` / notebook 体系）。页面无匹配布局，正文渲染为空。
- **状态**：已解决。移除所有 Wiki 页面 front-matter 中的 `layout: wiki`，改用主题默认 `page` 布局。构建后 `public/wiki/**` 无 0 字节文件。

## 3. `_posts` 残留孤立 `url:` 行（YAML 解析失败）

- **现象**：`hexo server` / `generate` 报 `YAMLException: bad indentation of a mapping entry`，指向 `source/_posts/*.md` 中 front-matter 的 `tags` 下方残留的孤立 `url:` 行（如 `    url: https://...`）。
- **根因**：早期 references 对象转换脚本残留了孤立 `url:` 行，js-yaml 将其视为非法 mapping。
- **涉及文件**：11 个 `_posts` 文件。
- **状态**：已修复。运行 `node docs/cleanup.js` 清理孤立 `url:` 行，构建通过。

## 4. 日夜模式切换按钮（已实现）

- **需求**：手动日/夜模式切换按钮，默认跟随系统。
- **实现**：在 `_config.stellar.yml` inject 注入。复用主题内置 `data-theme` + `localStorage.Stellar.theme` 机制；默认 auto 跟随系统，点击循环 auto→light→dark 并持久化。按钮注入到侧边栏 logo 区，青色主题风格。
- **状态**：已完成，构建通过。

## 5. AI Agent 系统设计图标替换（部分完成）

- **需求**：将圆角方块的 JPG 图标换成 PNG 式、类似深度学习图标的扁平插画。
- **实现**：用图像生成工具生成扁平 AI Agent 插画 `source/_imgs/ai-agent-logo.jpg`，替换所有引用（`_data/wiki/AiAgent.yml`、`_data/projects.yml`）。
- **状态**：⚠️ 注意——图像工具输出为 **jpg** 而非 png，且本会话无法截图预览尺寸/透明背景。视觉为扁平插画、无圆角方块背景，但若需严格 png 需手工转换。

## 6. 侧边栏菜单英文重复（已修复）

- **现象**：`//*[@id="start"]/aside[1]/div[2]/div[2]/div`（侧边栏菜单区）显示 `solar:documents-bold-duotone` 等英文文本而非图标。
- **根因**：Stellar 1.44.0 图标键体系已迁移，`solar:*` 键在 `icons.yml` 中不存在，`utils.icon()` 对无效键返回原始字符串（见 `scripts/events/lib/utils.js` 的 `icon()` 函数）。经核对 `node_modules/hexo-theme-stellar/_data/icons.yml`，可用键为 `default:*`（documents/category/monitor 等）与 `github:logo` 等。
- **涉及文件**：`_config.stellar.yml` 的 `menubar.items[*].icon`。
- **状态**：已修复。替换为有效键：博客→`default:documents`、项目→`default:category`、友链→`github:logo`、关于→`default:monitor`。构建后 `public/*.html` 无 `solar:` 残留，浏览器验证图标正常。

## 7. 顶部导航栏重复（已修复）

- **现象**：`#main > div.navbar.top > div > div`（navbar-container）内「分类/标签/归档」重复显示。
- **根因**：`_partial/main/navbar/nav_tabs_blog.ejs` 中主题默认已渲染「近期发布/分类/标签/归档」（第 12-52 行），第 54-65 行又渲染 `theme.site_tree.index_blog.nav_tabs` 自定义项，导致分类/标签/归档各出现两次。
- **涉及文件**：`_config.stellar.yml` 的 `site_tree.index_blog.nav_tabs`。
- **状态**：已修复。删除该 `nav_tabs` 配置，使用主题默认导航。构建后 navbar 仅含「近期发布/分类/标签/归档」各一项。

## 8. AI Agent 图标不显示（已修复）

- **现象**：AI Agent 项目图标不显示（wiki 卡片、页面 logo 均为占位图）。
- **根因**：图标引用为 CDN URL `https://cdn.jsdelivr.net/gh/zhenxiang-shawn/...@main/source/_imgs/ai-agent-logo.jpg`，但该新文件尚未推送到 GitHub，CDN 返回 **404**（验证 `deep-learning.png` 等旧文件返回 200，可正常显示）。且 Hexo 默认不复制 `source/_imgs/`（下划线开头目录），无法本地 serve。
- **解决**：将 `ai-agent-logo.jpg` 复制到 `source/imgs/`（无下划线，构建后复制为 `public/imgs/`），`AiAgent.yml` 的 `icon/cover` 与 `projects.yml` 的 `logo.src` 改用相对路径 `/imgs/ai-agent-logo.jpg`。
- **状态**：已修复。`/imgs/ai-agent-logo.jpg` 返回 200，wiki 卡片与页面 logo 正常显示。

## 9. LeetCode 项目卡片不显示（已修复）

- **现象**：`/wiki/` 列表页缺少 LeetCode 卡片（仅显示 AI Agent、深度学习、Python 三张），但 LeetCode 文章链接存在。
- **根因**：wiki 项目配置按 `_data/wiki/<id>.yml` 提供，`source/_data/wiki/` 下缺少 `LeetCode.yml`（仅有 AiAgent/DeepLearning/Python），且 `_data/wiki.yml` 中 `# - LeetCode` 被注释。
- **解决**：新建 `source/_data/wiki/LeetCode.yml`（参照 AiAgent.yml 格式，base_dir `/wiki/leetcode`，toc 章节与 `projects.yml` 一致），并启用 `_data/wiki.yml` 中的 `- LeetCode`。
- **状态**：已修复。`/wiki/` 显示 4 张项目卡片，`/wiki/leetcode/` 页面正常。