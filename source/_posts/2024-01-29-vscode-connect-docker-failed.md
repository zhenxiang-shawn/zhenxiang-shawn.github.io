---
date: 2024-01-30
updated: 2024-02-11
mathjax: false
title: 'VSCode 连接 Docker 镜像失败'
# 设计开发, 动手实践, 解决方案, 技术加油站, 开源库, 实用脚本
categories: [解决方案]
tags: [Docker]
references:
  - '[VSCode连接docker失败](https://blog.csdn.net/weixin_42688573/article/details/127159093)'
---

开发时,有时需要直接在 docker 中开发或者 debug. 使用 VSCode 会方便很多. 但是有时候安装了 [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 还是会报错: `Failed to connect. Is docker running?`

<!--more-->

> 原因是docker使用unix socket进行通讯，但是unix socket属于root用户，但是普通用户需要使用sudo才能开启root权限，但是普通的操作并没有root权限。

## Ubuntu:
- `sudo usermod -aG docker ${USER}`

## Mac:
1. `cmd-shift-p`
2. 点击 `"Preferences: Open Workspace Settings"`
3. 搜索 "docker path"
4. 输入docker client的绝对路径 (通常在 `"/usr/local/bin/docker"`)

## Windows:
同 Mac

## Windows WSL:
暂未解决
