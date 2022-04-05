---
layout: wiki
wiki: Python
title: 学习Python
tags: 
    - Python
references:
    -   title: Python 100 Days
        url: https://github.com/jackfrued/Python-100-Days
    -   title: 流畅的Python
        url: https://book.douban.com/subject/27028517/
    -   title: Python Data Model
        url: https://docs.python.org/3/reference/datamodel.html
---

<!-- more -->

## Python 基础

本系列只针对有一定Python编程基础的人. 如果你对Python一无所知,请先移步到 [Runoob](https://www.runoob.com/python/python-tutorial.html) 或者 [廖雪峰的官方网站-Python](https://www.liaoxuefeng.com/wiki/1016959663602400)来学习关于Python的基础知识.

{% folding child:codeblock open:false color:yellow Python小彩蛋 %}

``` python
import this
```

{% endfolding %}

> **说明**：输入上面的代码，在Python的交互式环境中可以看到Tim Peter撰写的[“Python之禅”](../Python之禅.md)，里面讲述的道理不仅仅适用于Python，也适用于其他编程语言。



## Why Python

**很多互联网和移动互联网企业对开发效率的要求高于对执行效率的要求**。

很多时候，你的问题只需一行Python代码就能解决。

``` python
# 一行代码实现求阶乘函数
fac = lambda x: __import__('functools').reduce(int.__mul__, range(1, x + 1), 1)

# 一行代码实现求最大公约数函数
gcd = lambda x, y: y % x and gcd(y % x, x) or x

# 一行代码实现判断素数的函数
is_prime = lambda x: x > 1 and not [f for f in range(2, int(x ** 0.5) + 1) if x % f == 0]

# 一行代码实现快速排序
quick_sort = lambda items: len(items) and quick_sort([x for x in items[1:] if x < items[0]]) + [items[0]] + quick_sort([x for x in items[1:] if x > items[0]]) or items

# 生成FizzBuzz列表
['Fizz'[x % 3 * 4:] + 'Buzz'[x % 5 * 4:] or x for x in range(1, 101)]
```

**设计模式从未如此简单**

Python是动态类型语言，大量的设计模式在Python中被简化或弱化.

> **思考**：如何优化下面的代码。

```Python
def fib(num):
    if num in (1, 2):
        return 1
    return fib(num - 1) + fib(num - 2)
```

代理模式在Python中可以通过内置的或自定义的装饰器来实现。

```Python
from functools import lru_cache


@lru_cache()
def fib(num):
    if num in (1, 2):
        return 1
    return fib(num - 1) + fib(num - 2)


for n in range(1, 121):
    print(f'{n}: {fib(n)}')
```

> **说明**：通过Python标准库`functools`模块的`lru_cache`装饰器为`fib`函数加上缓存代理，缓存函数执行的中间结果，优化代码的性能。

## 写出Python代码的正确姿势

>  用Python就要写出Pythonic的代码.

### 交换变量

跨界开发者的代码:

```python
temp = a
a = b
b = temp
```

或者

```python
a = a ^ b
b = a ^ b
a = a ^ b
```

Pythonic的代码:

```python
a, b = b, a
```

### 用序列组装字符串

跨界开发者的代码：

```Python
chars = ['j', 'a', 'c', 'k', 'f', 'r', 'u', 'e', 'd']
name = ''
for char in chars:
    name += char
```

Pythonic的代码：

```Python
chars = ['j', 'a', 'c', 'k', 'f', 'r', 'u', 'e', 'd']
name = ''.join(chars)
```

### 创建列表

跨界开发者的代码：

```Python
data = [7, 20, 3, 15, 11]
result = []
for i in data:
    if i > 10:
        result.append(i * 3)
```

Pythonic的代码：

```Python
data = [7, 20, 3, 15, 11]
result = [num * 3 for num in data if num > 10]
```


#### 

### 遍历列表

跨界开发者的代码:

```python
fruits = ['orange', 'grape', 'pitaya', 'blueberry']
index = 0
for fruit in fruits:
    print(index, ':', fruit)
    index += 1
```

Pythonic的代码:

```python
fruits = ['orange', 'grape', 'pitaya', 'blueberry']
for index, fruit in enumerate(fruits):
    print(index, ':', fruit)
```



### 确保代码健壮性

跨界开发者的代码：

```Python
data = {'x': '5'}
if 'x' in data and isinstance(data['x'], (str, int, float)) \
        and data['x'].isdigit():
    value = int(data['x'])
    print(value)
else:
    value = None
```

Pythonic的代码：

```Python
data = {'x': '5'}
try:
    value = int(data['x'])
    print(value)
except (KeyError, TypeError, ValueError):
    value = None
```

## Python 代码规范 

### 使用Lint工具检查你的代码规范

阅读下面的代码，看看你能看出哪些地方是有毛病的或者说不符合Python的编程规范的。

```Python
from enum import *

@unique
class Suite (Enum):
    SPADE, HEART, CLUB, DIAMOND = range(4)

class Card(object):
    def __init__(self,suite,face ):
        self.suite = suite
        self.face = face


    def __repr__(self):
        suites='♠♥♣♦'
        faces=['','A','2','3','4','5','6','7','8','9','10','J','Q','K']
        return f'{suites[self.suite.value]}{faces[self.face]}'

import random

class Poker(object):
    def __init__(self):
        self.cards =[Card(suite, face) for suite in Suite
            for face in range(1, 14)]
        self.current=0
    def shuffle (self):
        self.current=0
        random.shuffle(self.cards)
    def deal (self):
        card = self.cards[self.current]
        self.current+=1
        return card
    def has_next (self):
        if self.current<len(self.cards): return True
        return False

p = Poker()
p.shuffle()
print(p.cards)
```



### PyLint的安装和使用

Pylint是Python代码分析工具，它分析Python代码中的错误，查找不符合代码风格标准（默认使用的代码风格是 PEP 8）和有潜在问题的代码。

```Bash
pip install pylint
pylint [options] module_or_package
```

Pylint输出格式如下所示。

> 模块名:行号:列号:    消息类型    消息

消息类型有以下几种：

1. C - 惯例：违反了Python编程惯例（PEP 8）的代码。
2. R - 重构：写得比较糟糕需要重构的代码。
3. W - 警告：代码中存在的不影响代码运行的问题。
4. E - 错误：代码中存在的影响代码运行的错误。
5. F - 致命错误：导致Pylint无法继续运行的错误。

Pylint命令的常用参数：

1. `--disable=<msg ids>`或`-d <msg ids>`：禁用指定类型的消息。
2. `--errors-only`或`-E`：只显示错误。
3. `--rcfile=<file>`：指定配置文件。
4. `--list-msgs`：列出Pylint的消息清单。
5. `--generate-rcfile`：生成配置文件的样例。
6. `--reports=<y_or_n>`或`-r <y_or_n>`：是否生成检查报告。
