---
layout: wiki
wiki: Python
order: 9
title: Python中的数据结构
---

在创造Python以前，Guido曾为ABC语言贡献过代码。ABC语言是一个致力于为初学者设计编程环境的长达10年的研究项目，其中很多点子在现在看来都很有Python风格：序列的泛型操作、内置的元组和映射类型、用缩进来架构的源码、无需变量声明的强类型，等等。Python对开发者如此友好，根源就在这里。

<!-- more -->

## 序列构成的数组

不管是哪种数据结构，字符串、列表、字节序列、数组、XML元素，抑或是数据库查询结果，它们都共用一套丰富的操作：迭代、切片、排序，还有拼接。

### 内置序列类型概览

Python 标准库用 C 实现了丰富的序列类型:


{% tabs active:1 align:center %}

<!-- tab 容器序列 -->
list, tuple, collections.deque这些序列能存放不同类型的数据.

<!-- tab 扁平序列 -->
str, bytes, bytearray, memoryview, array.array 这类序列只能容纳一种类型, 这种序列其实是一段连续的内存空间, 但他里边只能存放基础类型.

{% endtabs %}

容器类型还可以根据是否能被修改来分类: 

{% tabs active:1 align:center %}

<!-- tab 可变序列 -->
list, bytearray, array.array, collections.deque, memoeryview.

<!-- tab 不可变序列 -->
tuple, str和bytes

{% endtabs %}

### 列表推导和生成器表达式

通常的原则是，只用列表推导来创建新的列表，并且尽量保持简短。如果列表推导的代码超过了两行，你可能就要考虑是不是得用for循环重写了。列表推导不会再有变量泄漏的问题.

{% tabs active:1 align:center %}

<!-- tab 普通方法 -->
{% codeblock lang:python %}
symbols = ")(*(^(&@"
code = []
for symbol in symbols:
	code.append(ord(symbol))
print(code)
{% endcodeblock %}

<!-- tab 列表推导 -->
{% codeblock lang:python %}
symbols = ")(*(^(&@"
code = [ord(symbol) for symbol in symbols]
print(code)
{% endcodeblock %}

{% endtabs %}

在Python3中,表达式内部的变量和赋值只在局部起作用，表达式的上下文里的同名变量还可以被正常引用，局部变量并不会影响到它们, 比如下边的代码展示的.

```python
>>> x = 'ABC'
>>> dummy = [ord(x) for x in x]
>>> x
'ABC'
>>> dummy
[65, 66, 67]
>>
```

#### 使用列表推导生成FrenchCard

```python
# generate cards from A to K
ranks = [str(n) for n in range(2, 11)] + list('JQKA')
```

Source code you can find on [GitHub](https://github.com/zhenxiang-shawn/Fluent_Python_Code/blob/main/Chapter01_Prologue/FrenchCard.py)

## 数据结构详解

### [字典](https://www.runoob.com/python/python-dictionary.html)

这里主要提一下`defaultdict()`. 在说明``collections.defaultdict()``之前，我们首先要提一下`setdefault()`方法。

> Python 字典 setdefault() 函数和get()方法类似, 如果键不存在于字典中，将会添加键并将值设为默认值。

```python
dict.setdefault(key, default=None)
# key – 查找的键值
# default – 键不存在时，需要设置的默认值
# return：如果字典中包含有给定键，则返回该键对应的值，否则返回为该键设置的值。

# to use python defaultdict
collections.defaultdict([default_factory[, …]])
```

因此, Python中通过`Key`访问字典，当`Key`不存在时，会引发`‘KeyError’`异常。为了避免这种情况的发生，可以使用`collections`类中的`defaultdict()`方法来为字典提供默认值。

上文中的 `default_factory` 的类型可以为`int`, `set`, `list`甚至 `lambda function`. 使用不同的类型创建 `default_dict` 的例子:

#### 使用 list 创建 defaultdict

使用list作第一个参数，可以很容易将键-值对序列转换为列表字典。`collections.defaultdict(list)`使用起来效果和我们上面提到的`dict.setdefault()`比较相似，这种方法会和`dict.setdefault()`等价，但是要更快.


``` python
s=[('yellow',1),('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
d=defaultdict(list)
for k, v in s:
	d[k].append(v)
a=sorted(d.items())
print(a)
>>> [('blue', [2, 4]), ('red',* *[**1**]**), ('yellow', [1, 3])]
```

#### 使用 int 创建 defaultdict
将`default_factory`设为`int`时，可以被用来计数`defaultdict(int)` 这里的d其实是生成了一个默认为0的带`key`的数据字典。你可以想象成 `d[key] = int default` ，d[k]所以可以直接读取 `d[“m”] += 1` 就是`d[“m”] `就是默认值` 0+1 = 1`
```python
from collections import defaultdict
s = 'mississippi'
d = defaultdict(int)
for k in s:
    d[k] += 1
print('\n',d)
a=sorted(d.items())
print('\n',a)
>>> defaultdict(<class 'int'>, {'m': 1, 'i': 4, 's': 4, 'p': 2})
>>> [('i', 4), ('m', 1), ('p', 2), ('s', 4)]
```

#### 使用 set 创建 defaultdict
`default_factory` 设为`set`时，可以用`defaultdict`建立集合字典（a dictionary of sets）

```python
from collections import defaultdict
s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
d = defaultdict(set)
for k, v in s:
    d[k].add(v)
print('\n',d)
a=sorted(d.items())
print('\n',a)
>>> defaultdict(<class 'set'>, {'red': {1, 3}, 'blue': {2, 4}})
>>> [('blue', {2, 4}), ('red', {1, 3})]
```
#### 使用 lambda function 创建 defaultdict
使用 `lambda function` 的时候相当于把所有的 `default value` 都预先设置了一下.
```python
d = defaultdict(lambda: "Not Present")
print(d["c"])
>>> Not Present
```









