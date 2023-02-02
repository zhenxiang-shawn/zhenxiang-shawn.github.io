---
layout: wiki
wiki: DeepLearning
order: 500
title: 计算机视觉介绍
mathjax: true

references: 
    - title: 计算机视觉常用数据集总结：包括MS COCO、ImageNet、VOC、人脸识别、行人检测等
      url: https://zhuanlan.zhihu.com/p/129736067#:~:text=%E6%9C%AC%E7%AF%87%E5%8D%9A%E6%96%87%E4%B8%BB%E8%A6%81%E5%AF%B9%E7%9B%AE%E5%89%8D%E5%85%AC%E5%BC%80%E7%9A%84%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89%E5%B8%B8%E7%94%A8%E6%95%B0%E6%8D%AE%E9%9B%86%E8%BF%9B%E8%A1%8C%E6%80%BB%E7%BB%93%E3%80%82%201.PASCAL%20VOC%EF%BC%88%E6%9D%83%E5%A8%81%E9%BC%BB%E7%A5%96%EF%BC%89%20PASCAL%20VOC%E6%98%AF%E4%B8%80%E4%B8%AA%E5%9B%BE%E5%83%8F%E9%9B%86%EF%BC%8C%E7%94%B1Mark%20Everingham,%28University%20ofLeeds%29%E3%80%81Luc%20van%20Gool%20%28ETHZ%2C%20Zurich%29%E7%AD%89%E4%BA%BA%E5%88%9B%E7%AB%8B%EF%BC%8C%E6%9C%891.7W%2B%E5%BC%A0%E5%9B%BE%E7%89%87%EF%BC%8C%E5%88%86%E4%B8%BA20%E7%B1%BB%E3%80%82

---

<!-- more -->


## 计算机视觉的任务

计算机视觉的任务主要有4种:
1. Image Classification: 最简单的任务,根据识别的图片来进行分类.
2. Object Detection: 最常用的任务之一,可以预测物体的位置和种类.
3. Semantic Segmentation:
4. Instance Segmentaion

细分下去的话,还有人体关键点检测,光学字符识别,目标跟踪,行为识别,全景感知等. [OpenMMLab](https://openmmlab.com/)提供了很多开源的模型可以直接来使用学习.





## 计算机视觉的发展


### 传统机器学习和模式识别
1964年, 计算机视觉刚开始起步的时候,人们只能计算图片的边缘检测. 这也展示了计算机视觉的一个分支. 这个分支影响了计算机视觉领域很久,直到现在这种依靠纯算法的分支还是生产环境/科研中不可或缺的. 比如自动驾驶和机器人SLAM都是大量依靠传统模型计算来获取环境信息的.

### AI

#### ImageNet(2006)
斯坦福大学的李飞飞教授在2006年启动了ImageNet项目. 这是人类当时最大的可以用来训练模型的数据库.ImageNet包含了20,000个类,共计约1500万张图片.

#### ~2010: 初有成效 
特征还是人工提取的. 比如ImageNet结构. 当时已经有很好的识别效果了. 

#### 2012~:深度学习时代
AlexNet 突破了传统视觉系统的性能问题,使损失函数的损失大大降低,甚至很多时候的表现高于人类自身. Fast R-CNN使目标检测进入深度学习时代.



### 开源是AI领域发展的引擎

自从2007年Theano开源深度学习框架一来,越来越多的框架被分享出来.比如现在我们熟知的 `TensorFlow`和`Pytorch`.

其中值得一提的是 [OpenMMLab]([OpenMMLab](https://openmmlab.com/)).  它是在Pytorch框架基础上做出的开源的AI工具库,近几年在各大AI比赛中屠榜. 其开源项目star数超过了60,000, 开发人员全球近10,000人. 其模型架构支持超过1,200篇论文的发表.有兴趣的可以去研究一下.


## 计算机机视觉常用的公开的数据集

下边是一些常用的综合的数据集的汇总, 如果有其他需求,也可以参考[计算机视觉常用数据集总结：包括MS COCO、ImageNet、VOC、人脸识别、行人检测等 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/129736067#:~:text=本篇博文主要对目前公开的计算机视觉常用数据集进行总结。 



### PASCAL VOC

[PASCAL VOC](http://host.robots.ox.ac.uk/pascal/VOC/)是一个图像集，由Mark Everingham (University ofLeeds)、Luc van Gool (ETHZ, Zurich)等人创立，有1.7W+张图片，分为20类。PASCALVOC竞赛也是计算机视觉竞赛的鼻祖，从2005年到2012年一共举办了8届，包含了物体分类（Classification）、目标检测（Detection）、图像分割（Segmentation）、Person Layout等任务，后来逐渐被ILSVRC竞赛替代.



###  ImageNet

[ImageNet](https://image-net.org/)是一个图像集，由斯坦福大学李飞飞创立，有1400W+张样例图片，分为27大类和2W+小类，只能用于非商业研究和教学使用。与ImageNet图像集相应的是著名的ILSVRC竞赛，各种新机器学习算法脱颖而出（AlexNet、ZFNet、GoogleNet、ResNet、...），图像识别率得以显著提高.



### COCO

[MS COCO](https://cocodataset.org/)的全称是Microsoft Common Objects in Context，起源于微软于2014年出资标注的Microsoft COCO数据集，与ImageNet竞赛一样，被视为是计算机视觉领域最受关注和最权威的比赛之一。

COCO数据集是一个大型的、丰富的物体检测，分割和字幕数据集。这个数据集以scene understanding为目标，主要从复杂的日常场景中截取，图像中的目标通过精确的segmentation进行位置的标定。图像包括91类目标，328,000影像和2,500,000个label。目前为止有语义分割的最大数据集，提供的类别有80 类，有超过33 万张图片，其中20 万张有标注，整个数据集中个体的数目超过150 万个。







