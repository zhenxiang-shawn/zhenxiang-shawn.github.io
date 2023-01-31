---
layout: wiki
wiki: DeepLearning
order: 9
title: Pandas中基本的数据结构和用法
mathjax: true

references: 
  - title: Pandas - Intro to data structures
    url: https://pandas.pydata.org/docs/user_guide/dsintro.html
  - title: How to display all rows from dataframe using Pandas
    url: https://www.geeksforgeeks.org/how-to-display-all-rows-from-dataframe-using-pandas/
---

Pandas 是使用 Python 在机器学习中不可绕过的必续用到的库. 熟悉和熟练使用这个库可以有效的帮助模型训练和数据清洗.

<!-- more -->

## Pandas中的数据结构
Pandas 常用的数据结构有两个,一个是 Series,一个是 DataFrame. 一般的,默认情况下其中的数据是对齐的. 标签和数据之间的联系不会被打破，除非手动更改。


> **DataFrame** 可以看成一个 Excel 表格中的一个 Tab 页面,同时也可以被认为是有限个的Series组合而来的.



{% note color:cyan Note 本文的的源码都可以在此 [Github Repo](https://github.com/zhenxiang-shawn/Fluent_Python_Code/blob/main/learn_python/python_pandas_usage_example.ipynb) 中找到. %}

### Series
> **Series** 可以看成 Excel 表格中的一行或者一列,这一行/列同时还拥有 Excel 中行/列的 index 信息.当然这个 index 的信息在 Series 中是可以随意更改的.

```python
# import library. Pandas offten used with Numpy.
import numpy as np
import pandas as pd
```

#### Series 中的基础属性

1. name
2. dtype

#### 创建新的 Series.

创建 series 的语法是: `s = pd.Series(data, index=index)`. data 可以是 `python dict`, `ndarray`,也可以是一个向量值. Index 可以不设置,方法会用默认的数字排序来作为 index.

##### 从`ndarray`中创建

```python
In [3]: s = pd.Series(np.random.randn(5), index=["a", "b", "c", "d", "e"])

In [4]: s
Out[4]: 
a    0.469112
b   -0.282863
c   -1.509059
d   -1.135632
e    1.212112
dtype: float64

In [5]: s.index
Out[5]: Index(['a', 'b', 'c', 'd', 'e'], dtype='object')

In [6]: pd.Series(np.random.randn(5))
Out[6]: 
0   -0.173215
1    0.119209
2   -1.044236
3   -0.861849
4   -2.104569
dtype: float64
```

##### 从`python dict`中创建

```python
In [7]: d = {"b": 1, "a": 0, "c": 2}

In [8]: pd.Series(d)
Out[8]: 
b    1
a    0
c    2
dtype: int64
In [9]: d = {"a": 0.0, "b": 1.0, "c": 2.0}

In [10]: pd.Series(d)
Out[10]: 
a    0.0
b    1.0
c    2.0
dtype: float64

In [11]: pd.Series(d, index=["b", "c", "d", "a"])
Out[11]: 
b    1.0
c    2.0
d    NaN
a    0.0
dtype: float64
```

{% note color:blue Note NaN(Not a Number) 用来表示数据丢失%}

**从向量值中创建**

```python
In [12]: pd.Series(5.0, index=["a", "b", "c", "d", "e"])
Out[12]: 
a    5.0
b    5.0
c    5.0
d    5.0
e    5.0
dtype: float64
```

####  Series 的操作

##### 选取与切片

1. ##### 像 `ndarray`那样操作

Series 的操作非常像`ndarray`而且很多`Numpy functions`可以直接用在 Series 上. 比如:取值和 index 切割.

```python
In [13]: s[0]
Out[13]: 0.4691122999071863

In [14]: s[:3]
Out[14]: 
a    0.469112
b   -0.282863
c   -1.509059
dtype: float64

In [15]: s[s > s.median()]
Out[15]: 
a    0.469112
e    1.212112
dtype: float64

In [16]: s[[4, 3, 1]]
Out[16]: 
e    1.212112
d   -1.135632
b   -0.282863
dtype: float64

In [17]: np.exp(s)
Out[17]: 
a    1.598575
b    0.753623
c    0.221118
d    0.321219
e    3.360575
dtype: float64
```

此外 `Series`像`Numpy array`一样拥有一个`dtype`的值.

```python
In [18]: s.dtype
Out[18]: dtype('float64')
```

2. ##### 像python dict 那样操作

```python
In [21]: s["a"]
Out[21]: 0.4691122999071863

In [22]: s["e"] = 12.0

In [23]: s
Out[23]: 
a     0.469112
b    -0.282863
c    -1.509059
d    -1.135632
e    12.000000
dtype: float64

In [24]: "e" in s
Out[24]: True

In [25]: "f" in s
Out[25]: False
# 如果方括号中的 key 不存在,那么就会返回一个KeyError. 因此取值的时候推荐使用 get()
# 使用 get() 方法的时候,及时 key 不存在,也不会报错而会返回 None 或者一个自定义的值.
In [27]: s.get("f")

In [28]: s.get("f", np.nan)
Out[28]: nan
```





##### Series 到其他类型的转化

如果需要 array,可以使用 Series.array来返回一个 array. 这时就可以做一些不需要 index 的操作.

```python
In [19]: s.array
Out[19]: 
<PandasArray>
[ 0.4691122999071863, -0.2828633443286633, -1.5090585031735124,
 -1.1356323710171934,  1.2121120250208506]
Length: 5, dtype: float64
# 也可以转成 numpy ndarray
In [20]: s.to_numpy()
Out[20]: array([ 0.4691, -0.2829, -1.5091, -1.1356,  1.2121])
```

##### 向量操作和标签排列

```python
In [29]: s + s
Out[29]: 
a     0.938225
b    -0.565727
c    -3.018117
d    -2.271265
e    24.000000
dtype: float64

In [30]: s * 2
Out[30]: 
a     0.938225
b    -0.565727
c    -3.018117
d    -2.271265
e    24.000000
dtype: float64

In [31]: np.exp(s)
Out[31]: 
a         1.598575
b         0.753623
c         0.221118
d         0.321219
e    162754.791419
dtype: float64

In [32]: s[1:] + s[:-1]
Out[32]: 
a         NaN
b   -0.565727
c   -3.018117
d   -2.271265
e         NaN
dtype: float64
```

前文提到 Series 的 name 属性,一般 name 会被自动赋值.如果想要使用不同的 name 值,可以使用`rename`方法. rename 方法每次都会返回一个新的 Series 而不会对之前的 Series 进行任何操作.

```python
In [33]: s = pd.Series(np.random.randn(5), name="something")

In [34]: s
Out[34]: 
0   -0.494929
1    1.071804
2    0.721555
3   -0.706771
4   -1.039575
Name: something, dtype: float64

In [35]: s.name
Out[35]: 'something'
In [36]: s2 = s.rename("different")

In [37]: s2.name
Out[37]: 'different'
```

### DataFrame

DataFrame是一个 2D 的带有 label 的数据结构.Dataframe 的每一列都可以是不同的数据类型.

#### 创建新的 DataFrame

创建DataFrame的时候可以直接传递 index(行 label) 和 columns(列 label) 的参数. DataFrame 可以从很多种数据类型种创建:

1. Dict of 1D ndarrays, lists, dicts, or Series
2. 2-D numpy.ndarray
3. Structured or record ndarray
4. A Series
5. Another DataFrame

##### 0. 初始化带有初始值的 DataFrame

```python
# initial DataFrame with initial values
# !! must contains index and columns !!
>>> initial_val = 0
>>> index=["a", "b", "c"]
>>> columns=[1,2]
>>> df0 = pd.DataFrame(initial_val, index=index, columns=columns)
>>> df0
   1  2
a  0  0
b  0  0
c  0  0
```



##### 1. 从Dict of Series or Dict of dicts 中创建

```python
In [38]: d = {
   ....:     "one": pd.Series([1.0, 2.0, 3.0], index=["a", "b", "c"]),
   ....:     "two": pd.Series([1.0, 2.0, 3.0, 4.0], index=["a", "b", "c", "d"]),
   ....: }
   ....: 

In [39]: df = pd.DataFrame(d)

In [40]: df
Out[40]: 
   one  two
a  1.0  1.0
b  2.0  2.0
c  3.0  3.0
d  NaN  4.0

In [41]: pd.DataFrame(d, index=["d", "b", "a"])
Out[41]: 
   one  two
d  NaN  4.0
b  2.0  2.0
a  1.0  1.0

In [42]: pd.DataFrame(d, index=["d", "b", "a"], columns=["two", "three"])
Out[42]: 
   two three
d  4.0   NaN
b  2.0   NaN
a  1.0   NaN
In [43]: df.index
Out[43]: Index(['a', 'b', 'c', 'd'], dtype='object')

In [44]: df.columns
Out[44]: Index(['one', 'two'], dtype='object')
```

{% note color:orange Note 当一组特定的列与数据的dict一起被传递时，传递的列会覆盖dict中的键。%}

##### 2. 从Dict of ndarrays/list 中创建

```python
In [45]: d = {"one": [1.0, 2.0, 3.0, 4.0], "two": [4.0, 3.0, 2.0, 1.0]}

In [46]: pd.DataFrame(d)
Out[46]: 
   one  two
0  1.0  4.0
1  2.0  3.0
2  3.0  2.0
3  4.0  1.0

In [47]: pd.DataFrame(d, index=["a", "b", "c", "d"])
Out[47]: 
   one  two
a  1.0  4.0
b  2.0  3.0
c  3.0  2.0
d  4.0  1.0
```

##### 3. 从 structured 或者 record array 中创建

这种情况和从 dict of arrays 中创建是一样的.

```python
In [48]: data = np.zeros((2,), dtype=[("A", "i4"), ("B", "f4"), ("C", "a10")])

In [49]: data[:] = [(1, 2.0, "Hello"), (2, 3.0, "World")]

In [50]: pd.DataFrame(data)
Out[50]: 
   A    B         C
0  1  2.0  b'Hello'
1  2  3.0  b'World'

In [51]: pd.DataFrame(data, index=["first", "second"])
Out[51]: 
        A    B         C
first   1  2.0  b'Hello'
second  2  3.0  b'World'

In [52]: pd.DataFrame(data, columns=["C", "A", "B"])
Out[52]: 
          C  A    B
0  b'Hello'  1  2.0
1  b'World'  2  3.0
```

{% note color:orange Note 虽然DataFrame看起来就像是二维的 Numpy ndarray. 不过它并不完全像二维的NumPy ndarray那样而且一直没有想着去代替 ndarray。%}

##### 4. 从 list of dicts 中创建

```python
In [53]: data2 = [{"a": 1, "b": 2}, {"a": 5, "b": 10, "c": 20}]

In [54]: pd.DataFrame(data2)
Out[54]: 
   a   b     c
0  1   2   NaN
1  5  10  20.0

In [55]: pd.DataFrame(data2, index=["first", "second"])
Out[55]: 
        a   b     c
first   1   2   NaN
second  5  10  20.0

In [56]: pd.DataFrame(data2, columns=["a", "b"])
Out[56]: 
   a   b
0  1   2
1  5  10
```



##### 5. 从 dict of tuples 中创建

```python
In [57]: pd.DataFrame(
   ....:     {
   ....:         ("a", "b"): {("A", "B"): 1, ("A", "C"): 2},
   ....:         ("a", "a"): {("A", "C"): 3, ("A", "B"): 4},
   ....:         ("a", "c"): {("A", "B"): 5, ("A", "C"): 6},
   ....:         ("b", "a"): {("A", "C"): 7, ("A", "B"): 8},
   ....:         ("b", "b"): {("A", "D"): 9, ("A", "B"): 10},
   ....:     }
   ....: )
   ....: 
Out[57]: 
       a              b      
       b    a    c    a     b
A B  1.0  4.0  5.0  8.0  10.0
  C  2.0  3.0  6.0  7.0   NaN
  D  NaN  NaN  NaN  NaN   9.0
```

##### 6. 从 Series 直接创建

```python
In [58]: ser = pd.Series(range(3), index=list("abc"), name="ser")

In [59]: pd.DataFrame(ser)
Out[59]: 
   ser
a    0
b    1
c    2
```

##### 7. 从 list of namedtuples 中创建

```python
In [60]: from collections import namedtuple

In [61]: Point = namedtuple("Point", "x y")

In [62]: pd.DataFrame([Point(0, 0), Point(0, 3), (2, 3)])
Out[62]: 
   x  y
0  0  0
1  0  3
2  2  3

In [63]: Point3D = namedtuple("Point3D", "x y z")

In [64]: pd.DataFrame([Point3D(0, 0, 0), Point3D(0, 3, 5), Point(2, 3)])
Out[64]: 
   x  y    z
0  0  0  0.0
1  0  3  5.0
2  2  3  NaN
```



##### 8. 从 list of dataclasses 创建

```python
In [65]: from dataclasses import make_dataclass

In [66]: Point = make_dataclass("Point", [("x", int), ("y", int)])

In [67]: pd.DataFrame([Point(0, 0), Point(0, 3), Point(2, 3)])
Out[67]: 
   x  y
0  0  0
1  0  3
2  2  3
```

##### 9. 使用构造器 from_dict() 创建

`DataFrame.from_dict` 这个构造器接收一个dict的dict或一个数组类序列的dict，并返回一个DataFrame。

```python
In [68]: pd.DataFrame.from_dict(dict([("A", [1, 2, 3]), ("B", [4, 5, 6])]))
Out[68]: 
   A  B
0  1  4
1  2  5
2  3  6
# 如果你使用 orient='index', key 就会成为行的标签
In [69]: pd.DataFrame.from_dict(
   ....:     dict([("A", [1, 2, 3]), ("B", [4, 5, 6])]),
   ....:     orient="index",
   ....:     columns=["one", "two", "three"],
   ....: )
   ....: 
Out[69]: 
   one  two  three
A    1    2      3
B    4    5      6
```

##### 10. 使用构造器 from_records() 创建

DataFrame.from_records()接收一个元列表或一个具有结构化dtype的ndarray。它的工作方式与普通的DataFrame构造函数类似，只是产生的DataFrame索引可能是结构化dtype的一个特定字段。

```python
In [70]: data
Out[70]: 
array([(1, 2., b'Hello'), (2, 3., b'World')],
      dtype=[('A', '<i4'), ('B', '<f4'), ('C', 'S10')])

In [71]: pd.DataFrame.from_records(data, index="C")
Out[71]: 
          A    B
C               
b'Hello'  1  2.0
b'World'  2  3.0
```



#### 行和列的选择,添加和删除

| Operation                      | Syntax           | Result    |
| ------------------------------ | ---------------- | --------- |
| Select column                  | `df[col]`        | Series    |
| Select row by label            | `df.loc[label]`  | Series    |
| Select row by integer location | `df.iloc[index]` | Series    |
| Slice rows                     | `df[4:8]`        | DataFrame |
| Select rows by boolean vector  | `df[bool_vec]`   | DataFrame |



##### 当成 dict 直接使用

你可以直接把DataFrame当成一个类似索引的Series对象的dict。获取、设置和删除列的语法与类似的dict操作相同。

```python
In [72]: df["one"]
Out[72]: 
a    1.0
b    2.0
c    3.0
d    NaN
Name: one, dtype: float64

In [73]: df["three"] = df["one"] * df["two"]

In [74]: df["flag"] = df["one"] > 2

In [75]: df
Out[75]: 
   one  two  three   flag
a  1.0  1.0    1.0  False
b  2.0  2.0    4.0  False
c  3.0  3.0    9.0   True
d  NaN  4.0    NaN  False
```

列可以被像字典那样 pop 或 delete

```python
In [76]: del df["two"]

In [77]: three = df.pop("three")

In [78]: df
Out[78]: 
   one   flag
a  1.0  False
b  2.0  False
c  3.0   True
d  NaN  False
```

##### 使用其他方法来操作

可以使用`insert()`或者`assign()`方法来插入值.

插入值的时候可以直接像字典一样赋值也可以用`insert()`方法.

```python
In [79]: df["foo"] = "bar"

In [80]: df
Out[80]: 
   one   flag  foo
a  1.0  False  bar
b  2.0  False  bar
c  3.0   True  bar
d  NaN  False  bar

# insert 方法
In [83]: df.insert(1, "bar", df["one"])

In [84]: df
Out[84]: 
   one  bar   flag  foo  one_trunc
a  1.0  1.0  False  bar        1.0
b  2.0  2.0  False  bar        2.0
c  3.0  3.0   True  bar        NaN
d  NaN  NaN  False  bar        NaN
```

当插入一个`Series`到不同 index 的 `DataFrame`中的时候,按照 DataFrame 的 index 来更新数据.

```python
In [81]: df["one_trunc"] = df["one"][:2]

In [82]: df
Out[82]: 
   one   flag  foo  one_trunc
a  1.0  False  bar        1.0
b  2.0  False  bar        2.0
c  3.0   True  bar        NaN
d  NaN  False  bar        NaN
```

使用`assign()`方法:

```python
In [85]: iris = pd.read_csv("data/iris.data")

In [86]: iris.head()
Out[86]: 
   SepalLength  SepalWidth  PetalLength  PetalWidth         Name
0          5.1         3.5          1.4         0.2  Iris-setosa
1          4.9         3.0          1.4         0.2  Iris-setosa
2          4.7         3.2          1.3         0.2  Iris-setosa
3          4.6         3.1          1.5         0.2  Iris-setosa
4          5.0         3.6          1.4         0.2  Iris-setosa

In [87]: iris.assign(sepal_ratio=iris["SepalWidth"] / iris["SepalLength"]).head()
Out[87]: 
   SepalLength  SepalWidth  PetalLength  PetalWidth         Name  sepal_ratio
0          5.1         3.5          1.4         0.2  Iris-setosa     0.686275
1          4.9         3.0          1.4         0.2  Iris-setosa     0.612245
2          4.7         3.2          1.3         0.2  Iris-setosa     0.680851
3          4.6         3.1          1.5         0.2  Iris-setosa     0.673913
4          5.0         3.6          1.4         0.2  Iris-setosa     0.720000
```

`assign` 的时候也可以使用 `lambda function`

```python
# assign方法总是返回一个新的 DataFrame 而不会对之前的数据做任何操作.
In [88]: iris.assign(sepal_ratio=lambda x: (x["SepalWidth"] / x["SepalLength"])).head()
Out[88]: 
   SepalLength  SepalWidth  PetalLength  PetalWidth         Name  sepal_ratio
0          5.1         3.5          1.4         0.2  Iris-setosa     0.686275
1          4.9         3.0          1.4         0.2  Iris-setosa     0.612245
2          4.7         3.2          1.3         0.2  Iris-setosa     0.680851
3          4.6         3.1          1.5         0.2  Iris-setosa     0.673913
4          5.0         3.6          1.4         0.2  Iris-setosa     0.720000

In [90]: dfa = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})

In [91]: dfa.assign(C=lambda x: x["A"] + x["B"], D=lambda x: x["A"] + x["C"])
Out[91]: 
   A  B  C   D
0  1  4  5   6
1  2  5  7   9
2  3  6  9  12
```

#### DataFrame的数学操作

1. DataFrame 可以直接和 Series 进行运算.

```python
In [97]: df - df.iloc[0]
Out[97]: 
          A         B         C         D
0  0.000000  0.000000  0.000000  0.000000
1 -1.359261 -0.248717 -0.453372 -1.754659
2  0.253128  0.829678  0.010026 -1.991234
3 -1.311128  0.054325 -1.724913 -1.620544
4  0.573025  1.500742 -0.676070  1.367331
5 -1.741248  0.781993 -1.241620 -2.053136
6 -1.240774 -0.869551 -0.153282  0.000430
7 -0.743894  0.411013 -0.929563 -0.282386
8 -1.194921  1.320690  0.238224 -1.482644
9  2.293786  1.856228  0.773289 -1.446531
```

2. 也可以直接进行`element-wise`级别的运算

```python
In [98]: df * 5 + 2
Out[98]: 
           A         B         C          D
0   3.359299 -0.124862  4.835102   3.381160
1  -3.437003 -1.368449  2.568242  -5.392133
2   4.624938  4.023526  4.885230  -6.575010
3  -3.196342  0.146766 -3.789461  -4.721559
4   6.224426  7.378849  1.454750  10.217815
5  -5.346940  3.785103 -1.373001  -6.884519
6  -2.844569 -4.472618  4.068691   3.383309
7  -0.360173  1.930201  0.187285   1.969232
8  -2.615303  6.478587  6.026220  -4.032059
9  14.828230  9.156280  8.701544  -3.851494

In [99]: 1 / df
Out[99]: 
          A          B         C           D
0  3.678365  -2.353094  1.763605    3.620145
1 -0.919624  -1.484363  8.799067   -0.676395
2  1.904807   2.470934  1.732964   -0.583090
3 -0.962215  -2.697986 -0.863638   -0.743875
4  1.183593   0.929567 -9.170108    0.608434
5 -0.680555   2.800959 -1.482360   -0.562777
6 -1.032084  -0.772485  2.416988    3.614523
7 -2.118489 -71.634509 -2.758294 -162.507295
8 -1.083352   1.116424  1.241860   -0.828904
9  0.389765   0.698687  0.746097   -0.854483

In [100]: df ** 4
Out[100]: 
           A             B         C             D
0   0.005462  3.261689e-02  0.103370  5.822320e-03
1   1.398165  2.059869e-01  0.000167  4.777482e+00
2   0.075962  2.682596e-02  0.110877  8.650845e+00
3   1.166571  1.887302e-02  1.797515  3.265879e+00
4   0.509555  1.339298e+00  0.000141  7.297019e+00
5   4.661717  1.624699e-02  0.207103  9.969092e+00
6   0.881334  2.808277e+00  0.029302  5.858632e-03
7   0.049647  3.797614e-08  0.017276  1.433866e-09
8   0.725974  6.437005e-01  0.420446  2.118275e+00
9  43.329821  4.196326e+00  3.227153  1.875802e+00
```

3. DataFrame 适配了所有的 Numpy function.

```python
In [108]: np.exp(df)
Out[108]: 
           A         B         C         D
0   1.312403  0.653788  1.763006  1.318154
1   0.337092  0.509824  1.120358  0.227996
2   1.690438  1.498861  1.780770  0.179963
3   0.353713  0.690288  0.314148  0.260719
4   2.327710  2.932249  0.896686  5.173571
5   0.230066  1.429065  0.509360  0.169161
6   0.379495  0.274028  1.512461  1.318720
7   0.623732  0.986137  0.695904  0.993865
8   0.397301  2.449092  2.237242  0.299269
9  13.009059  4.183951  3.820223  0.310274

In [109]: np.asarray(df)
Out[109]: 
array([[ 0.2719, -0.425 ,  0.567 ,  0.2762],
       [-1.0874, -0.6737,  0.1136, -1.4784],
       [ 0.525 ,  0.4047,  0.577 , -1.715 ],
       [-1.0393, -0.3706, -1.1579, -1.3443],
       [ 0.8449,  1.0758, -0.109 ,  1.6436],
       [-1.4694,  0.357 , -0.6746, -1.7769],
       [-0.9689, -1.2945,  0.4137,  0.2767],
       [-0.472 , -0.014 , -0.3625, -0.0062],
       [-0.9231,  0.8957,  0.8052, -1.2064],
       [ 2.5656,  1.4313,  1.3403, -1.1703]])

In [110]: ser = pd.Series([1, 2, 3, 4])

In [111]: np.exp(ser)
Out[111]: 
0     2.718282
1     7.389056
2    20.085537
3    54.598150
dtype: float64
```

#### 在终端上展示

默认情况下终端不会完全展示 DataFrame. 如果想要完全展示出来 DataFrame 的数据,一般有两种方法:

1. 一个是转换为字符串
2. 一个是转换为 Markdown 格式
3. 一个是在 display setting 里调节参数

```python
# 转化为string
In [126]: print(baseball.iloc[-20:, :12].to_string())
       id     player  year  stint team  lg    g   ab   r    h  X2b  X3b
80  89474  finlest01  2007      1  COL  NL   43   94   9   17    3    0
81  89480  embreal01  2007      1  OAK  AL    4    0   0    0    0    0
82  89481  edmonji01  2007      1  SLN  NL  117  365  39   92   15    2
83  89482  easleda01  2007      1  NYN  NL   76  193  24   54    6    0
84  89489  delgaca01  2007      1  NYN  NL  139  538  71  139   30    0
85  89493  cormirh01  2007      1  CIN  NL    6    0   0    0    0    0
86  89494  coninje01  2007      2  NYN  NL   21   41   2    8    2    0
87  89495  coninje01  2007      1  CIN  NL   80  215  23   57   11    1
88  89497  clemero02  2007      1  NYA  AL    2    2   0    1    0    0
89  89498  claytro01  2007      2  BOS  AL    8    6   1    0    0    0
90  89499  claytro01  2007      1  TOR  AL   69  189  23   48   14    0
91  89501  cirilje01  2007      2  ARI  NL   28   40   6    8    4    0
92  89502  cirilje01  2007      1  MIN  AL   50  153  18   40    9    2
93  89521  bondsba01  2007      1  SFN  NL  126  340  75   94   14    0
94  89523  biggicr01  2007      1  HOU  NL  141  517  68  130   31    3
95  89525  benitar01  2007      2  FLO  NL   34    0   0    0    0    0
96  89526  benitar01  2007      1  SFN  NL   19    0   0    0    0    0
97  89530  ausmubr01  2007      1  HOU  NL  117  349  38   82   16    3
98  89533   aloumo01  2007      1  NYN  NL   87  328  51  112   19    1
99  89534  alomasa02  2007      1  NYN  NL    8   22   1    3    1    0

# 
In [127]: pd.set_option("display.max_colwidth", 100) # optional
In [128]: pd.set_option('display.max_rows', None)
In [129]: pd.set_option('display.max_columns', None)

In [130]: print(baseball.iloc[-20:, :12])
       id     player  year  stint team  lg    g   ab   r    h  X2b  X3b
80  89474  finlest01  2007      1  COL  NL   43   94   9   17    3    0
81  89480  embreal01  2007      1  OAK  AL    4    0   0    0    0    0
82  89481  edmonji01  2007      1  SLN  NL  117  365  39   92   15    2
83  89482  easleda01  2007      1  NYN  NL   76  193  24   54    6    0
84  89489  delgaca01  2007      1  NYN  NL  139  538  71  139   30    0
85  89493  cormirh01  2007      1  CIN  NL    6    0   0    0    0    0
86  89494  coninje01  2007      2  NYN  NL   21   41   2    8    2    0
87  89495  coninje01  2007      1  CIN  NL   80  215  23   57   11    1
88  89497  clemero02  2007      1  NYA  AL    2    2   0    1    0    0
89  89498  claytro01  2007      2  BOS  AL    8    6   1    0    0    0
90  89499  claytro01  2007      1  TOR  AL   69  189  23   48   14    0
91  89501  cirilje01  2007      2  ARI  NL   28   40   6    8    4    0
92  89502  cirilje01  2007      1  MIN  AL   50  153  18   40    9    2
93  89521  bondsba01  2007      1  SFN  NL  126  340  75   94   14    0
94  89523  biggicr01  2007      1  HOU  NL  141  517  68  130   31    3
95  89525  benitar01  2007      2  FLO  NL   34    0   0    0    0    0
96  89526  benitar01  2007      1  SFN  NL   19    0   0    0    0    0
97  89530  ausmubr01  2007      1  HOU  NL  117  349  38   82   16    3
98  89533   aloumo01  2007      1  NYN  NL   87  328  51  112   19    1
99  89534  alomasa02  2007      1  NYN  NL    8   22   1    3    1    0
```
{%note Note color:blue [Pandas 常用的方法](https://pandas.pydata.org/docs/user_guide/basics.html)%}

### 实例
物体检测模型的结果: 有class: `a,b,c,d,e` 我们想看他的 `confusion matrix`.


```python
>>> classes = ['a', 'b', 'c', 'd', 'e']
# 初始值为 0, 这样的话就比较好直接进行 matrix 相加.
# 如果Matrix 中有 NaN,直接相加会得到 NaN.
>>> cfm = pd.DataFrame(0, index=classes, columns=classes)
>>> cfm
   a  b  c  d  e
a  0  0  0  0  0
b  0  0  0  0  0
c  0  0  0  0  0
d  0  0  0  0  0
e  0  0  0  0  0
# 这里使用随机值代替模型评估统计的结果.
>>> cfm = cfm.applymap(lambda cell: np.random.randint(100)
>>> cfm
    a   b   c   d   e
a  50   3  58  74  25
b   3  63  19  98  90
c  41  77  64  58  49
d  45  45  81  64  40
e  37  13  85  16  36
# 我们可以直接把数字换成百分比. 比如坐标的 index 代表的是 groundtruth.
# column 代表的是 prediction. 这个 confusion matrix 就可以用来检测分类性能.
>>> percentage_cfm = cfm.div(cfm.sum(axis=1))
>>> 
```

