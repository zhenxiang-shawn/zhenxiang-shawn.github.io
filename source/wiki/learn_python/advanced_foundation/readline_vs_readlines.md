
---
layout: wiki
wiki: Python
order: 29
title: "Python中常用的文件读取的方法比较"
reference:

  - title: what-is-the-difference-between-a-string-and-a-byte-string
    url: https://stackoverflow.com/questions/6224052/what-is-the-difference-between-a-string-and-a-byte-string
  - title: "[廖雪峰的网站]字符串和编码"
    url: https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896
---


**read() method**:
read entire contents and return it as a string.

**readline() method**:
read line by line, could use it when the file is large.
a empty string will be returned when it reaches the end of the file.

**readlines() method**:
read entire contents, and return list of strings. Each element is a line.

| Method      | Pros                                       | Cons                                                         |
| ----------- | ------------------------------------------ | ------------------------------------------------------------ |
| Read()      | 简单直接,小文件读取很方便.                 | 1. 如果文件大的话会消耗大量内存 2. 文件的全部内容都在内存里,可能会造成性能问题. |
| Readline()  | 可以处理大文件,甚至一些超出内存大小的文件. | 读取小文件的时候效率不如其他方法高.                          |
| Readlines() | 小文件读取很方便, 返回值处理很直观.        | 1. 如果文件大的话会消耗大量内存 2. 文件的全部内容都在内存里,可能会造成性能问题. |



**`Readline()` 不能识别文件中的 EOF,如果已经读到文件末尾,`readline()`依然会返回空字符串.因此需要手动去判断 readline 的输出来判断是否已经读完了文件.**