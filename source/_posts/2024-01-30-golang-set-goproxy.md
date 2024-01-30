---
date: 2024-01-30
updated: 2024-01-30
mathjax: false
title: 'Golang Module 换国内镜像'
categories: [技术加油站]
tags: [Golang]
---

Golang 很多包在国内下载很慢，换国内镜像可以加快下载速度。

<!--more-->

## 启用 Go Modules 功能
`go env -w GO111MODULE=on`

## 配置 GOPROXY 环境变量，以下三选一

#### 1. 七牛 CDN
`go env -w  GOPROXY=https://goproxy.cn,direct`

#### 2. 阿里云
`go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct`

#### 3. 官方
`go env -w  GOPROXY=https://goproxy.io,direct`

## 确认是否已更新

```
go env | grep GOPROXY
GOPROXY="https://goproxy.cn"
```