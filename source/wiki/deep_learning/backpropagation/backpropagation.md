---
layout: wiki
wiki: DeepLearning
order: 2
title: 反向传播算法 (Back Propagation)
mathjax: true

references: 
  - title: Math is Fun
    url: https://www.mathsisfun.com/algebra/matrix-multiplying.html
  - title: How to display all rows from dataframe using Pandas
    url: https://www.geeksforgeeks.org/how-to-display-all-rows-from-dataframe-using-pandas/
---

反向传播是深度学习的根基.反向传播算法可以快速的计算出各个结构层中的梯度,从而优化各个层级中的参数.

<!-- more -->



## 矩阵运算
在此之前你需要知道矩阵运算. 矩阵运算可以参考[这个网站](https://www.mathsisfun.com/algebra/matrix-multiplying.html)，讲解的很详细。

## 正向传播 (forward propagation)
设每一层的 node 的值`z = wx + b`. 应用激活函数以后的值`a`. 模型的输出`y^`，真实值`y`. 正向传播（Forward Propagation）前向传播就是从input，经过一层层的layer，不断计算每一层的`z`和`a`，最后得到输出`y^`的过程，计算出了`y^`，就可以根据它和真实值`y`的差别来计算损失（loss）。

## 反向传播 (back propagation)
反向传播（Backward Propagation）反向传播就是根据损失函数`L(y^,y)`来反方向地计算每一层的`z、a、w、b`的偏导数（梯度），从而更新参数。
微积分中的链式法则（为了不与概率中的链式法则相混淆）用于计算复合函数 的导数。反向传播是一种计算链式法则的算法，使用高效的特定运算顺序。 反向传播说白了根据根据J的公式对`w`和`b`求偏导，也就是求梯度。因为我们需要用梯度下降法来对参数进行更新，而更新就需要梯度。
但是，根据求偏导的链式法则我们知道，第l层的参数的梯度，需要通过l+1层的梯度来求得，因此我们求导的过程是“反向”的，这也就是为什么叫“反向传播”。

### 计算实例

### 使用代码来计算matrix.
