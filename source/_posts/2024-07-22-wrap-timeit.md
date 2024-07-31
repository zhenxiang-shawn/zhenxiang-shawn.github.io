---
date: 2024-07-22
updated: 2024-07-22
mathjax: false
title: 'Python 把 timeit 模块打包成修饰函数'
categories: [解决方案, 技术加油站]
tags: [Python]
references:
  - '[Cosine Similarity](https://www.geeksforgeeks.org/cosine-similarity/)'
---

Python 中的修饰器（decorator）是一个函数，它接受一个函数或方法作为其唯一的参数，并返回一个新的函数或方法，其中整合了修饰后的函数或方法，以及附带的一些额外功能。
简单来说，修饰器可以在不修改被修饰函数原有代码的情况下，为其添加额外的功能。例如用于性能分析、日志记录、权限控制、缓存、参数验证、事务处理、重试机制、异常处理等。

<!--more-->

### 实现原理

装饰器的实现原理基于 Python 的函数对象和闭包的概念。

在 Python 中，函数是“一等公民”，这意味着函数可以像其他对象一样被传递、赋值和返回。

当使用装饰器时，例如 `@decorator` 应用于一个函数 `func` ，实际上发生了以下过程：

1. 定义装饰器函数 `decorator` ，它接受一个函数作为参数。
2. 当解释器遇到 `@decorator` 应用于 `func` 时，它会将 `func` 作为参数传递给 `decorator` 。
3. `decorator` 内部通常会定义一个新的函数（比如 `wrapper` ），在这个新函数中，会执行一些额外的操作（例如在函数执行前后添加代码），然后调用被装饰的函数 `func` 。
4. 最后，`decorator` 返回这个新定义的函数 `wrapper` 。
5. 后续对 `func` 的调用实际上是在调用装饰器返回的 `wrapper` 函数，从而实现了在不修改原始函数代码的情况下，为函数添加了额外的功能。

这种机制利用了函数可以作为参数传递和返回，以及在函数内部可以定义新函数并形成闭包（即新函数可以访问外部函数的变量）的特性。

比如: 
```python
def my_decorator(func):
    def wrapper():
        print("Before function execution")
        func()
        print("After function execution")
    return wrapper

@my_decorator
def my_function():
    print("Inside my_function")

my_function()
```

在这个例子中，`my_decorator` 就是一个装饰器函数，它返回了一个新的函数 `wrapper` ，当调用 `my_function` 时，实际上是在调用 `wrapper` ，从而实现了在 `my_function` 执行前后打印额外信息的功能。

## Timeit 修饰器

正常使用 time 库来测试方法的性能的时候,通常需要写很多代码,而且几乎都是重复的. 这里创建 timeit 修饰器的话,可以在被测试的方法上直接添加修饰器使用,使用起来更方便而且还能减少代码量.

```python
"""根据上面的实现原理,我们可以实现一个 timeit 修饰器,使用的时候可以直接在方法前加 @timeit 就可以查看方法运行时间了."""
def timeit(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        print(f"Function {func.__name__} took {time.time() - start:.2f} seconds")
        return res
    return wrapper

```

>这里需要注意的是, 方法 `wrapper` 的命名不是强制的, 把名字改为 `wrapper2` 的话该修饰器一样有效.
