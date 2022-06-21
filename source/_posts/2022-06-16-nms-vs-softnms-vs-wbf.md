---
date: 2022-06-10
updated: 2022-06-16
title: 常见的图片格式概览
categories: [技术加油站]
tags: [Computer Vision, Big Data]
references: 
  - title: Blomvliet, Marc. (2022). Protect the Great Barrier Reef Identifying starfish in real-time by an object detection model. 10.13140/RG.2.2.12867.27689. 
    url: https://www.researchgate.net/figure/Schematic-illustration-of-NMS-soft-NMS-vs-WBF-Representing-the-outcomes-for-both_fig2_358638369
  - title: NMS和Soft NMS
    url: https://www.jianshu.com/p/e39c9c53b111
---


物体检测中常用的集成方法(ensemble method)

物体检测中一般模型会在一个物体上检测出多个拥有不同confidence score的格子, 但是对于输出结果来说,我们并不需要那么多的预测结果.因此,我们会用一些集成方法来把这些预测结果合并成一个.

<- more ->

## Non-maximum Suppression (NMS, 非最大化抑制)

NMS的思路是对所有类别的检测框进行循环过滤.对于某个类别, NMS 会根据预测结果的confidence score来把预测结果排序,然后选择有最大confidence的预测结果. 在此之后,通过一个IOU(Intersection over Union) 的threshold,就可以过滤其他的预测结果从而减少预测结果的重复性.

基于这种计算逻辑的NMS有两个缺点。首先，NMS算法需要一个超参即`IOU Threshold`，这个阈值在不同任务中很难平衡。其次，NMS会将相邻或者重叠的两个物体对应的两个大概率目标框去掉一个，造成漏检。

## Soft-NMS

Soft NMS方法总流程和NMS算法流程相同. Soft NMS算法会根据IOU成比例的减少confidence score的值. 对于重叠的框,重叠区(IOU)越大,置信度衰减越严重. 一般的, Soft NMS降低置信度权重的计算方法有两个:
    1. 线性法
    2. 高斯法
NMS是一种特殊的线性法的Soft-NMS.(如下)

$$
s_i = \left.
\begin{cases}
    s_i,  iou < T \\
    0,  iou \ge T\\
\end{cases}
\right.
$$

计算方法最好选用连续性的函数,因为采用不连续的函数会导致box集合中的confidence score出现断层.

### WBF (Weighted Boxes Fusion) method

因为NMS和Soft-NMS会删掉很多的检测结果,所以可以说这些集成方法并没有用到模型预测出来的所有信息. 而WBF使用所有预测结果的置信度来计算出一个平均的检测结果,所以WBF可以在所有结果都不太准确的时候修正结果.

### NMW (Non-maximum Weighted) method

NMW方法与WBF方法使用了相似的思路，只是NMW方法使用了IoU来调整检测结果的权重。
