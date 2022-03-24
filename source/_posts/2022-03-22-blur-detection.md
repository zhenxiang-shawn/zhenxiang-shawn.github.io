---
date: 2022-03-22
updated: 2022-03-22
title: 检测模糊图片的几种方法
categories: [技术加油站]
tags: [Computer Vision, Python, Data Clean]
references:
  - title: 'OpenCV fast fourier transform FFT for blur detection in images and video streams'
    url: https://pyimagesearch.com/2020/06/15/opencv-fast-fourier-transform-fft-for-blur-detection-in-images-and-video-streams/
  - title: 'Blur detection with OpenCV'
    url: https://pyimagesearch-com.translate.goog/2015/09/07/blur-detection-with-opencv/?_x_tr_sl=auto&_x_tr_tl=zh-CN&_x_tr_hl=zh-CN
---


## 为什么要做模糊检测 ?

在机器学习准备数据的时候,有些数据并不尽如人意. 比如在计算机视觉训练时,图片数据集中有一些收集的图片清晰度不够,这会影响到后续的训练和模型的准确度. 准备图片数据的时候一般会根据图片质量选择是否先给图片降噪,然后把较为模糊的图片给去掉. 除此以外还可以用来做自动图像分级, 在视频流做OCR的时候可以过滤掉一些质量不好的图片来节省算力. 本文主要为讨论了模糊图片的检测的两种方法.

<!-- more -->

## 方法1: 使用OpenCV和拉普拉斯算子计算

一般来说，如果要检测图片的模糊程度，首先要考虑的方法是计算图像的快速傅里叶变换，然后检查低频和高频的分布：如果图像只有有少量的高频，那么图像就会被认为是模糊的．然而，定义什么算低数量的高频或者什么是高数量的高频是相当困难的。

根据[Pertuz 的研究](https://www.semanticscholar.org/paper/Analysis-of-focus-measure-operators-for-Pertuz-Puig/8c675bf5b542b98bf81dcf70bd869ab52ab8aae9?p2df), 仅使用基本的灰度像素强度统计, 评估图像的局部二值模式就可以计算一个单一的浮点值来表示一个给定图像的模糊程度. 一般的,我们使用**Tenengrad梯度方法**或者**Laplacian梯度方法**. 这两个不同算法在模糊检测时的结果几近相同,而使用Laplacian算子会减少运算量(Tenengrad梯度方法会计算x,y两个方向的梯度, 而Laplacian梯度方法只用计算Laplacian算子矩阵和灰度图的卷积), 所以我们选择Laplacian算子来检测图片的模糊程度.

下边是使用opencv检测图片的代码

```python
import cv2
def detect_pic_blur(img_path) -> bool:
    # read picture
    img = cv2.imread(img_path)
    # remove color
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    # calculate the Laplacian value of the img
    fm = cv.Laplacian(gray, cv2.CV_64F).var() 
    print(f'图片的拉普拉斯值为:{fm}')
    threshold = 120
    return False if fm <= threshold else True
```

使用此方法的话,一般需要对不同的数据集采用不同的threshold.

## 方法2: 使用OpenCV 和 Fast Fourier Transform (FFT)检测模糊图片

当数据集多的时候,拉普拉斯方法需要大量的手动调整来定义图像是否模糊的“阈值”。如果您可以控制您的照明条件、环境和图像捕获过程，那么它的效果会非常好. 但是如果实验数据收集的时候变量太大(不同拍照设备,不同天气)的话,这样拉普拉斯算子算法就不是一个很好的选择.
这个方法的思路是使用快速傅里叶变换来计算图片的模糊值. 在计算机视觉方面，我们经常将 FFT 视为一种图像处理工具，可以在两个域中表示图像：

- 傅里叶域
- 空间域

因此，FFT 用实部和虚部表示图像。通过分析这些值，我们可以执行图像处理例程，例如模糊、边缘检测、阈值处理、纹理分析，甚至是模糊检测。更多关于傅里叶变换的内容请参考[FFT and it's relation to image processing](https://homepages-inf-ed-ac-uk.translate.goog/rbf/HIPR2/fourier.htm?_x_tr_sl=auto&_x_tr_tl=zh-CN&_x_tr_hl=zh-CN&_x_tr_pto=op)

下边是使用opencv检测图片的代码

```python
def detect_img_blur_fft(img_path, size=60, threshold=10, vis=False):
    img = cv2.imread(img_path)
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (height, width) = img_gray.shape
    # compute center coordinates
    (cX, cY) = (int(width / 2.0), int(height / 2.0))

    # compute FFT 
    fft = np.fft.fft2(img_gray)
    fft_shift = np.fft.fftshift(fft)
    # Zero-out the center of our FFT shift (i.e., to remove low frequencies) 
    fft_shift[cY - size:cY + size, cX - size:cX + size] = 0
    # Apply the inverse shift to put the DC component back in the top-left
    fftShift = np.fft.ifftshift(fft_shift)
    # apply inverse FFT
    recon = np.fft.ifft2(fftShift)
    magnitude = 20 * np.log(np.abs(recon))
    mean = np.mean(magnitude)
    print(f'Mean: {mean}')
    # the image will be considered "blurry" if the mean value of the
    # magnitudes is less than the threshold value
    return False if mean <=threshold else True
```
