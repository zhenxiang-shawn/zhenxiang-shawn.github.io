---
date: 2019-01-03
updated: 2022-04-24
title: Git `.gitignore` 更新后没有作用
categories: [解决方案]
tags: [Git]
references: 
    - title: GeeksForGeeks
      url: https://www.geeksforgeeks.org/stable-marriage-problem/
---

# Git `.ignore` 编辑后文件没有变化

如果在文件编辑、修改之后再更新的`.gitignore`, 那么这个时候Git并不会作用于现在当前文件夹里的文件。因为这个时候Git已经认为这些文件已经是这个Repository的一部分了。这个时候只需要用以下命令来清理缓存然后再重新添加文件就好。

<!-- more -->

``` bash
git rm -rf --cached .   # remove cache
git add .               # add contents to the index
```
