---
date: 2024-07-30
updated: 2024-07-30
mathjax: false
title: 'Python 中的 import this'
# 设计开发, 动手实践, 解决方案, 技术加油站, 开源库, 实用脚本
categories: [技术加油站]
tags: [Python]
---

Python 中有一个著名的彩蛋: `import this`. 这是由 Python 的创建者 Guido van Rossum 以及 Tim Peters 所编写。当你在 Python 解释器中输入 import this 并按下回车键时，它会打印出一段著名的 Python 之禅（The Zen of Python），这是一组指导 Python 编程哲学的格言。

<!--more-->

## Python 之禅

> The Zen of Python, by Tim Peters
> 
> Beautiful is better than ugly.
> Explicit is better than implicit.
> Simple is better than complex.
> Complex is better than complicated.
> Flat is better than nested.
> Sparse is better than dense.
> Readability counts.
> Special cases aren't special enough to break the rules.
> Although practicality beats purity.
> Errors should never pass silently.
> Unless explicitly silenced.
> In the face of ambiguity, refuse the temptation to guess.
> There should be one-- and preferably only one --obvious way to do it.
> Although that way may not be obvious at first unless you're Dutch.
> Now is better than never.
> Although never is often better than *right* now.
> If the implementation is hard to explain, it's a bad idea.
> If the implementation is easy to explain, it may be a good idea.
> Namespaces are one honking great idea -- let's do more of those!

## 如何实现

打开 python 编辑器: `python3`, 直接输入: 

```python
import this
print(this.__file__)
>>> /path/to/lib/python3.10/this.py
```

然后直接在 terminal 输入 `cat /path/to/lib/python3.10/this.py`, 就会得到 `this.py`的源码.

```python
#bash cat "/Users/user/anaconda3/lib/python3.10/this.py"
s = """Gur Mra bs Clguba, ol Gvz Crgref

Ornhgvshy vf orggre guna htyl.
Rkcyvpvg vf orggre guna vzcyvpvg.
Fvzcyr vf orggre guna pbzcyrk.
Pbzcyrk vf orggre guna pbzcyvpngrq.
Syng vf orggre guna arfgrq.
Fcnefr vf orggre guna qrafr.
Ernqnovyvgl pbhagf.
Fcrpvny pnfrf nera'g fcrpvny rabhtu gb oernx gur ehyrf.
Nygubhtu cenpgvpnyvgl orngf chevgl.
Reebef fubhyq arire cnff fvyragyl.
Hayrff rkcyvpvgyl fvyraprq.
Va gur snpr bs nzovthvgl, ershfr gur grzcgngvba gb thrff.
Gurer fubhyq or bar-- naq cersrenoyl bayl bar --boivbhf jnl gb qb vg.
Nygubhtu gung jnl znl abg or boivbhf ng svefg hayrff lbh'er Qhgpu.
Abj vf orggre guna arire.
Nygubhtu arire vf bsgra orggre guna *evtug* abj.
Vs gur vzcyrzragngvba vf uneq gb rkcynva, vg'f n onq vqrn.
Vs gur vzcyrzragngvba vf rnfl gb rkcynva, vg znl or n tbbq vqrn.
Anzrfcnprf ner bar ubaxvat terng vqrn -- yrg'f qb zber bs gubfr!"""

d = {}
for c in (65, 97):
    for i in range(26):
        d[chr(i+c)] = chr((i+13) % 26 + c)

print("".join([d.get(c, c) for c in s]))
```

根据源码可以看到, 其实就是一个文件, 里面存储了这段话, 然后通过一个字典, 将每个字母替换为对应的字母, 最后输出结果. 这个转换使用了 ROT 13. 在 Python3 中, 可以使用 `codecs` 来实现这个功能. 下面是示例代码:

``` python
import codecs

my_state = (
    "Guvf vf zl phfgbz vzcbeg guvf. Lbh pna hfr vg gb fubj lbhe fgngrzrag sbe "
    "lbhe yvoenel. Nhgube: Murakvnat Wva. Vs lbh yvxr guvf, cyrnfr fgne guvf "
    "ercb.")


def print_my_state():
    print(codecs.decode(my_state, 'rot_13'))


print_my_state()
```

详细代码可以在 [Github](https://github.com/zhenxiang-shawn/Python_Import_custom_this) 查看.