---
title: 如何在Server上优化博客上图片的加载速度
date: 2022-03-23
updated: 2022-03-24
categories: [解决方案]
tags: [Optimization, CDN]
references:
  - title: '百科:CDN'
    url: https://baike.baidu.com/item/CDN/420951
  - title: '快速免费的公用CDN'
    url: https://www.cnblogs.com/lfri/p/12212878.html
---

在使用博客搭建的时候,一般来说我的图片和博客都是开源放在github上的. 但是如果用相对路径来读取图片的话,图片的加载速度收到github流量速度限制,会变得很慢,而且有一些地区也对GitHub加了一道防火墙,这使GitHub Pages加载速度更慢了.目前有两种方式可以缓解图片加载速度.

<!-- more -->

## Github Raw 文件读取

使用Github Raw来加载文件通常比相对路径配置的更快些, 可通过以下几种URL来加载raw文件：

```
https://raw.githubusercontent.com/user/repo/branch/README.md
https://github.com/user/repo/raw/branch/README.md
https://github.com/user/repo/blob/branch/README.md?raw=true
```

对于不支持 Raw 查看的文件，在浏览器中输入或点击上述查看 raw 文件的 URL 时，会对文件进行下载。因此可以通过这个特性，在 GitHub 上直接提供文件的下载功能。支持 Raw 查看的文件，可在浏览器打开 raw 页面，直接 `另存为…` 保存即可

## 内容分发网络(Content Delivery Network (CDN))

关于CDN, 百度百科给出的解释是:

> CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。

CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求.	

CDN的基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置[节点服务器](https://baike.baidu.com/item/节点服务器/4576219)所构成的在现有的互联网基础之上的一层智能[虚拟网络](https://baike.baidu.com/item/虚拟网络/855117)，CDN系统能够实时地根据[网络流量](https://baike.baidu.com/item/网络流量/7489548)和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。根据我的理解,简单的说就是**用更近的互联网数据中心(Internet Data Center,IDC)缓存内容,让客户端有更快的速度来访问此项资源**.

## 如何搭建CDN服务

### CDN服务: [jsDelivr](https://www.jsdelivr.com/)

jsDelivr 是一个免费的开源CDN. 这是在中国大陆唯一有 license 的公有 CDN，而且实际使用中的访问速度也是极快的. 它可以引用的资源包括NPM、github、wordpress的所有资源，github可以是任意体积小于50M的仓库。

以github为例，只需要通过符合 JSDelivr 规则的 URL 引用，即可直接使用 Github 中的资源:

```text
// load any GitHub release, commit, or branch
// note: we recommend using npm for projects that support it
https://cdn.jsdelivr.net/gh/user/repo@version/file

// load jQuery v3.2.1
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js

// use a version range instead of a specific version
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2/dist/jquery.min.js
https://cdn.jsdelivr.net/gh/jquery/jquery@3/dist/jquery.min.js

// omit the version completely to get the latest one
// you should NOT use this in production
https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js

// add ".min" to any JS/CSS file to get a minified version
// if one doesn't exist, we'll generate it for you
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/src/core.min.js

// add / at the end to get a directory listing
https://cdn.jsdelivr.net/gh/jquery/jquery/
```

详细配置,请参考[jsDelivr](https://www.jsdelivr.com/)



这是使用github raw加载和使用CDN来加载图片的对比:


{% tabs active:2 align:center %}

<!-- tab GitHub Raw -->
{% image https://github.com/zhenxiang-shawn/zhenxiang-shawn.github.io/blob/main/source/_imgs/python_logo.png?raw=true %}

<!-- tab jsDelivr(CDN) -->
{% image https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/python_logo.png %}

{% endtabs %}

## 其他免费并且不限速的CDN推荐

### [staticaly](https://statically.io/)

它可以轻松地从GitHub / GitLab / Bitbucket等加载您的项目 没有流量限制或限制。

文件通过超快速全球CDN提供。 在URL（不是分支）中使用特定标记或提交哈希。
根据URL永久缓存文件。 除master分支外，文件在浏览器中缓存1年
