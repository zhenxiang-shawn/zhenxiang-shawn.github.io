---
layout: wiki
wiki: Python
order: 19
title: "Python中的 string 和 byte string的区别"
reference:
  - title: what-is-the-difference-between-a-string-and-a-byte-string
    url: https://stackoverflow.com/questions/6224052/what-is-the-difference-between-a-string-and-a-byte-string
  - title: "[廖雪峰的网站]字符串和编码"
    url: https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896
---


<!--more-->
要了解python中基础类型`str`和`byte str`的区别,首先要了解计算机编码(Encodeing)和解码(Decoding).

> 计算机储存数据的单位是byte, 1 byte = 8 bit. 1 bit就是一个二进制码: 0 或 1.
> 任何可以储存到计算机中的数据都需要encode: 音乐需要被格式MP3, WAV等方式encode;图片使用PNG,JPEG等格式encode, 文字以ASCII, UTF-8等格式encode.
> Encode可以被理解为在计算机硬件上表示声音,图片,文字等信息的格式.

在Python中, byte string是一串字节序列. 他对人来说是不可读的. 另一方面一个char string(或者str),是一串字符序列.它对人来说是不可读的.一个字符不能直接被计算机储存, 它必须现先被 encode.

```python
>>># encode this str by using ASCII
>>>'this is a string'.encode('ASCII')
b'this is a string'
```
上边的代码虽然把 byte string 打印了出来,但是这是 python 的一个功能. 本质上 byte string 依旧是人类不能阅读的.因此 python 在 `str` 前边加了代表 byte string 的`b`. byte string 也可以被 decode 回来:
```python
>>># decode this str by using ASCII
>>> b'I am a string'.decode('ASCII')
'I am a string'
```
然后python 就直接返回一个正常的 char string. Encoding 和 Decoding 是相反的操作.


## 为什么要用 byte string

### 什么是编码

因为计算机只能处理数字，如果要处理文本，就必须先把文本转换为数字才能处理。最早的计算机在设计时采用8个比特（bit）作为一个字节（byte），所以，一个字节能表示的最大的整数就是255（二进制`11111111`=十进制`255`），如果要表示更大的整数，就必须用更多的字节。比如两个字节可以表示的最大整数是`65535`，4个字节可以表示的最大整数是`4294967295`。

由于计算机是美国人发明的，因此，最早只有127个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为`ASCII`编码，比如大写字母A的编码是`65`，小写字母`z`的编码是`122`。

如果统一成Unicode编码，乱码问题从此消失了。但是，如果你写的文本基本上全部是英文的话，用Unicode编码比ASCII编码需要多一倍的存储空间，在存储和传输上就十分不划算。

### 使用 byte string

一般 Python 会默认使用 Unicode 来编码解码. 使用bytes类型，实质上是告诉Python，不需要它帮你自动地完成编码和解码的工作，而是用户自己手动进行，并指定编码格式。而且由于Python的字符串类型是str，在内存中以Unicode表示，一个字符对应若干个字节。如果要在网络上传输，或者保存到磁盘上，就需要把str变为以字节为单位的bytes。

