---
layout: wiki
wiki: Python
order: 9
title: 数据结构
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
>>> x = 'ABC'￼
>>> dummy = [ord(x) for x in x]￼
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



