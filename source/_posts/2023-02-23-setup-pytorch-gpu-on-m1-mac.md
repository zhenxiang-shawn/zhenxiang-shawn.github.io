---
title: 在 M1 Mac上搭建 Pytorch GPU 加速环境
date: 2023-02-23
updated: 2023-02-23
categories: [解决方案]
tags: [PyTorch, Metal]
references:
  - '[PyTorch](https://pytorch.org)'
  - '[GPU-Acceleration Comes to PyTorch on M1 Macs](https://towardsdatascience.com/gpu-acceleration-comes-to-pytorch-on-m1-macs-195c399efcc1)'  
---
M1 Max 的芯片的 GPU 算力已经很不错了, 想着自己不是视频编辑工作者,总不能这么浪费这么好的资源.偶尔用这电脑来跑跑中小型的模型也是不错的选择. TensorFlow 到现在对 M1 的支持还是有点一塌糊涂的感觉. 知名的 YOLO 模型也基本只有 PyTorch 版本. 想想 PyTorch 就是数据科学家必须了解的知识点.

<!-- more-->

我所用的云服务器基本都在外网,由于众所周知的因素,链接很慢也不是很稳定. 测试学习之类的还是在本地比较好.


## 安装 PyTorch

下面是用来安装的命令以及注释:
如果你不确定这是不是你需要的版本, 请移步到[PyTorch 官网](https://pytorch.org/get-started/locally/)来查看官网的文档.

```bash
# 官网推荐安装 python 3.7或以上版本.
# 由于其他包的关系,这里推荐 3.8 的最新版
conda create -n torch-gpu python=3.8
conda activate torch-gpu
# 安装 PyTorch. MPS acceleration is available on MacOS 12.3+
conda install pytorch torchvision torchaudio -c pytorch

# 安装其他工具或依赖
conda install -c conda-forge jupyter jupyterlab
conda install  numpy
conda install matplotlib
conda install pandas
```


## 测试


如果是这种输出,那么恭喜你,安装完成.
```python
python
>>> import torch
>>> torch.backends.mps.is_available()
True
```

