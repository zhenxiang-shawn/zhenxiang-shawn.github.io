---
date: 2023-06-28
updated: 2023-07-02
mathjax: true
title: '相似度计算: Cosine Similarity'
categories: [技术加油站]
tags: [Python, Pandas, Data Science]
references:
  - '[Cosine Similarity](https://www.geeksforgeeks.org/cosine-similarity/)'
  - '[Python Measure similarity between two sentences using cosine similarity](https://www.geeksforgeeks.org/python-measure-similarity-between-two-sentences-using-cosine-similarity/)'
---

相似度计算在数据挖掘中指的是:计算在数据集里使用多个维度数据来表示的object 的距离. 一些常用的受欢迎的相似度测量方法有:

1. Euclidean Distance.
欧几里得距离(euclidean distance) 在二维和三维空间中的欧氏距离就是两点之间的实际距离。
1. Manhattan Distance.
在 二维空间 内，两个点之间的曼哈顿距离为它们横坐标之差的绝对值与纵坐标之差的绝对值之和。两个点的曼哈顿距离是会随着坐标系的改变而改变的.
1. Minkowski Distance.
闵科夫斯基距离是规范化向量空间（N维实空间）中两点之间的距离/相似性，是欧氏距离和曼哈顿距离的概括。

相似度一般都是基于某种距离的定义来计算的.

## 余弦相似度 (Cosine Similarity).
余弦相似度是一种度量，有助于确定数据对象的相似程度，无论其大小如何。在余弦相似度的计算中,所有的数据集都被认为是向量(vector, 通常是 1xN的 shape). 求解相似度的公式是:
$$
Cos(x, y) = x \times y \div \textbar\textbar x\textbar\textbar \times \textbar\textbar y\textbar\textbar
$$

比如我们有两个向量: `x = {3,2,0,5} & y = {1, 0, 0, 0}` 其相似度的计算就是:
```
x . y = 3*1 + 2*0 + 0*0 + 5*0 = 3

||x|| = √ (3)^2 + (2)^2 + (0)^2 + (5)^2 = 6.16

||y|| = √ (1)^2 + (0)^2 + (0)^2 + (0)^2 = 1

Cos(x, y) = 3 / (6.16 * 1) = 0.49 

# 两个向量的差异度就是用 100% 减去相似度.
Dis(x, y) = 1 - Cos(x, y) = 1 - 0.49 = 0.51

```



### 扩展:计算句子的相似度



#### Sentence Encode

计算句子的相似度之前,需要使用多维向量来表示一个句子. 一般 NLP 领域都有一个 tokenizer 来加密句子. 在这个例子中我们使用了常用的[NLTK :: Natural Language Toolkit](https://www.nltk.org/) : `nltk`.



```python
# Program to measure the similarity between
# two sentences using cosine similarity.
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# X = input("Enter first string: ").lower()
# Y = input("Enter second string: ").lower()
X ="I love horror movies"
Y ="Lights out is a horror movie"

# tokenization
X_list = word_tokenize(X)
Y_list = word_tokenize(Y)

# sw contains the list of stopwords
sw = stopwords.words('english')
l1 =[];l2 =[]

# remove stop words from the string
X_set = {w for w in X_list if not w in sw}
Y_set = {w for w in Y_list if not w in sw}

# form a set containing keywords of both strings
rvector = X_set.union(Y_set)
for w in rvector:
	if w in X_set: l1.append(1) # create a vector
	else: l1.append(0)
	if w in Y_set: l2.append(1)
	else: l2.append(0)
c = 0

# cosine formula
for i in range(len(rvector)):
		c+= l1[i]*l2[i]
cosine = c / float((sum(l1)*sum(l2))**0.5)
print("similarity: ", cosine)

```


优点:

1. 余弦相似度是很有用的，因为即使两个相似的数据对象由于大小而相距欧几里得距离很远，它们之间仍然可以具有较小的角度。角度越小，相似度越高。
2. 当在多维空间上绘制时，余弦相似度捕获数据对象的方向（角度）从而减少幅度的影响。

