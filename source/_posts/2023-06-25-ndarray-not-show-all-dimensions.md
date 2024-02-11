---
date: 2023-06-25
updated: 2023-06-25
title: "[Debug] Numpy Array 不显示全部维度的 shape"
categories: [技术加油站]
tags: [Python, Pandas, Data Science]
references:
  - '[pandas.DataFrame.values-Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.values.html)'
  - '[why-is-np-shape-not-showing-all-dimensions](https://stackoverflow.com/questions/70281985/why-is-np-shape-not-showing-all-dimensions)'
---

前一段时间发现从一个 DataFrame 中提取出一个Series. 不管被提取的 Series 的每一个值是不是一个 ndarray,返回值永远是一个一维的 ndarray.
<!--more-->

## 发现问题

比如有一个 Dataframe
```python3
# each label_embed_vector contains 100 vectors.
                  img_key  ...                                 label_embed_vector
0   1628112148035278_1_31  ...  0.006821885239,-0.068260461092,-0.010561314411...
1  1647947462308801_2_622  ...  0.028957819566,-0.027704223990,-0.001513824915...
```

直接用 `df['label_embed_vector']`来读取数据的话,返回的是一个小的 dataframe. 这个时候就需要使用 [Dataframe.values](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.values.html) 来读取数据. 这个方法会返回一个包含数据的 numpy array. 但是这个 ndarry 只是 1 维的.

在pandas.DataFrame.values的官方文档里,说推荐`pandas.DataFrame.to_numpy` 来代替 values 方法. 但是使用推荐的方法以后返回的结果还是 1 维的:

```python
# 使用`to_numpy`方法来读取`label_embed_vector`的数据以后发现他返回的是一个 shape 为 (86,)的 ndarray.
data = df['label_embed_vector'].to_numpy()
print(data.shape)
>>> (86,)

# 读取第一个数据
print(data[0])
>>> list([0.006821885239,-0.068260461092,-0.010561314411...])

```
上面的输出很奇怪, 从读取的数据来看的话, data 是一个(86,100)的 ndarray. 但是 data 的 shape 却是(86,).

## 原因和解决方案
通过 print 来检查数据以后发现, 虽然数据结构类似而且读取数据的时候和多维数组一样, 不过输出的数组确实不是多维度的:

```python
# printout 检查数据
print(df['label_embed_vector'].to_numpy())

>>> array([arrar([0.006821885239,-0.068260461092,-0.010561314411...], array([0.028957819566,-0.027704223990,-0.001513824915..], ... , array([-0.000122768164,-0.020344628021,0.018706960604...])]
# .values 和 to_numpy 返回的是 1个包含了 86 个独立 array 的 1 维array.而不是多维的.
```
### 解决方案

**经过搜索发现 Pandas 这样做的原因是不能确定每一个 row 的 array 的长度是一样的, 因此返回的是一维数据.** 这个时候可以用`np.vstack`来手动把一位数据来转化成多维数据. 比如:

```python
data = np.vstack(df['label_embed_vector'].to_numpy())

```