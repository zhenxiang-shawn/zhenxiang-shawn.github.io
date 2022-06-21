---
date: 2022-06-21
updated: 2022-06-21
title: 计算机视觉中的数据增强
categories: [技术加油站]
tags: [Computer Vision, Machine Learning, Deep Learning]
references:
    - title: CVPR2021 深度框架训练，不是所有数据增强都可以提升最终精度
      url: https://www.cvmart.net/community/detail/4551
    - title: 'KeepAugment: A Simple Information-Preserving Data Augmentation Approach'
      url: https://openaccess.thecvf.com/content/CVPR2021/papers/Gong_KeepAugment_A_Simple_Information-Preserving_Data_Augmentation_Approach_CVPR_2021_paper.pdf
---

数据增强是比较机器学习中比较常用的方法. 但是并不是所有的数据增强都可以有效的提升精度. 有些数据增强的方法很可能会增加噪声,使模型表现比数据增强之前还要差.

<!-- more -->

## 什么是数据增强

数据增强（Data Augmentation）是一种通过让有限的数据产生更多的等价数据来人工扩展训练数据集的技术。它是克服训练数据不足的有效手段，目前在深度学习的各个领域中应用广泛。但是由于生成的数据与真实数据之间的差异，也不可避免地带来了噪声问题。

## 为什么需要数据增强

深度神经网络在许多任务中表现良好，但这些网络通常需要大量数据才能避免过度拟合。遗憾的是，许多场景无法获得大量数据，例如医学图像分析。数据增强技术的存在是为了解决这个问题，这是针对有限数据问题的解决方案。数据增强一套技术，可提高训练数据集的大小和质量，以便您可以使用它们来构建更好的深度学习模型。在计算视觉领域，生成增强图像相对容易。即使引入噪声或裁剪图像的一部分，模型仍可以对图像进行分类，数据增强有一系列简单有效的方法可供选择，有一些机器学习库来进行计算视觉领域的数据增强，比如：它封装了很多数据增强算法，给开发者提供了方便。

## CV中常见的图像增强的方法

CV领域的数据增强大致可以分为两类: 第一类是基于基本图像处理技术的数据增强，第二个类别是基于深度学习的数据增强算法.

### 基于图像处理的数据增强方法

- Flipping (翻转)
一般都是水平方向翻转,很少用垂直方向(镜像变换).
- Rotation (旋转)
一般使用旋转的时候,需要注意旋转角度. 以数据集MNIST为例, 轻微旋转(1-20°)可能有用.
- Color Space (色彩空间)
简单做法是隔离单个色彩通道，例如Red(R)，Green(G)或Blue(B)，此外可以通过简单的矩阵运算以增加或减少图像的亮度。更高级的做法从颜色直方图着手，更改这些直方图中的强度值(想到了图像处理中的直方图均衡)。一般可以调节的有对比度(contrast),亮度(brighteness),色调(hue)
- Cropping (裁剪)
分统一裁剪和随机裁剪。统一裁剪将不同尺寸的图像裁剪至设定大小，随机裁剪类似translation，不同之处在于translation保留原图尺寸而裁剪会降低尺寸。裁剪要注意不要丢失重要信息以至于改变图像标签。
eg. ssd_crop (详解?)
- translation(位置变换)
向左，向右，向上或向下移动图像可能是非常有用的转换，以避免数据中的位置偏差。例如人脸识别数据集中人脸基本位于图像正中，位置变换可以增强模型泛化能力。
- noise injection(添加噪声)

- color space transformations(色彩空间增强)

照明偏差是图像识别问题中最常见的挑战之一，因此色彩空间转换（也称为光度转换）的比较直观有效。

1. 遍历图像以恒定值减少或增加像素值（过亮或过暗）
2. 拼接出（splice out）各个RGB颜色矩阵
3. 将像素值限制为某个最小值或最大值
4. 操作色彩直方图以改变图像色彩空间特征

注意将彩色图转换黑白虽然简化了这些操作，但精度会降低

- geometric versus photometric transformations(几何与光度转换)
todo

### 基于深度学习的数据增强算法

- mixing images(图像混合)
做法是通过平均图像像素值将图像混合在一起:
![image](https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/mixing_img.png)

研究发现是当混合来自整个训练集的图像而不是仅来自同一类别的实例的图像时，可以获得更好的结果。其它一些做法：

1. 一种线性方法是将图像组合成新的训练实例:
![image](https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/img_data_aug1.png)
2. 另一方法是随机裁剪图像并将裁剪后的图像连接在一起以形成新图像:
![image](https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/img_data_aug2.png)

- Random Crop then montage 随机裁剪再拼接
这类方法从人的视角看毫无意义，但确实提升了精度。可能解释是数据集大小的增加导致了诸如线和边之类的低级特征的更可靠表示。
- random erasing随机擦除
这一点受到dropout正规化的启发，随机擦除迫使模型学习有关图像的更多描述性特征，从而防止过拟合某个特定视觉特征。随机擦除的好处在于可以确保网络关注整个图像，而不只是其中的一部分。随机擦除一般分为(1)Image-ware random Erasing(2) Object-ware Random Erasing 和 (3)Image and Object-ware Random Erasing. 最后随机擦除的一个缺点是不一定会保留标签.

## KeepAugment (保持增强)

新方法控制数据增强的保真度，从而减少有害的错误信息。研究者的想法是通过显著性映射测量图像中矩形区域的重要性，并确保数据增强后始终呈现得分最高的区域：对于裁剪，通过避免切割重要区域(见下图a5和b5);对于图像级转换，通过将重要区域粘贴到转换图像顶部
![image](https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/keep_aug_exp1.png)
KeepAugment的伪代码:
![image](https://cdn.jsdelivr.net/gh/zhenxiang-shawn/zhenxiang-shawn.github.io@main/source/_imgs/keep_aug_equation.png)

## 如何选择数据增强

数据增强需要根据数据集而定。不过一般的像图像旋转，图像翻转等方法比较通用，在任何数据集上都有良好的表现。
