---
title: 如果启用 Hexo 博客的数学公式支持
date: 2023-02-03
updated: 2023-02-03
categories: [解决方案]
tags: [Hexo, LaTeX]
references:
  - title: 'LaTeX'
    url: https://www.latex-project.org/
  - title: 'hexo插入数学公式'  
    url: https://blog.csdn.net/sunfove/article/details/111106363
  - title: 'Github: hexojs/hexo-renderer-pandoc'
    url: https://github.com/hexojs/hexo-renderer-pandoc
---

Hexo默认的markdown渲染器是不支持数学公式的输入的. 一般来说都会用hexo的一些插件来实现对数学公式的支持. 这里数学公式的输入一般都是用的`LaTeX`.

<!--more-->

## 安装 hexo-renderer-pandoc
因为Hexo默认的渲染插件对数学公式不支持,我们需要把默认的markdown渲染插件先移出,然后再安装我们所需要的插件: [hexo-renderer-pandoc](https://github.com/hexojs/hexo-renderer-pandoc)

```bash
# 卸载Hexo默认渲染插件：
npm uninstall hexo-renderer-marked --save

# 安装pandoc渲染插件：
npm install hexo-renderer-pandoc --save
```

## 安装 mathjax 
这一步对于某些运行环境来说不是必须的. 但是如果你安装pandoc以后还是没有成功渲染出来数学公式的话,那么就需要安装mathjax了.

```bash
npm install hexo-filter-mathjax --save
```
## 配置 config 文件
在hexo 的配置文件: `_config.yml` 中添加以下代码:
```yaml
math:
  ...
  mathjax:
    enable: true

    # Next v6.3.0 后的版本 tags 要设置成 ams
    # Available values: none | ams | all
    tags: ams
```

## 清除缓存并重新构建文件
```bash
hexo clean
hexo generate
```

## 部署或者使用本地服务测试

```bash
# 使用本地服务测试
hexo s

# 部署
hexo deploy
```

## 使用数学公式的页面

[Deep Learning Intro](https://zhenxiang-shawn.github.io/wiki/deep_learning/index.html#start)
