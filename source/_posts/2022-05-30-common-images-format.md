---
date: 2022-03-24
updated: 2022-06-12
title: 常见的图片格式概览
categories: [技术加油站]
tags: [Computer Vision, Big Data]
references: 
  - title: 百度百科
    url: https://baike.baidu.com/item/%E5%9B%BE%E7%89%87%E6%A0%BC%E5%BC%8F/381122
  - title: 常见图片格式jpg、jpeg、png、gif等有什么区别
    url: https://zhuanlan.zhihu.com/p/41610691
  - title: WebP 相对于 PNG、JPG 有什么优势
    url: https://www.zhihu.com/question/27201061
  - title: SVG 教程
    url: https://www.runoob.com/svg/svg-intro.html
---

数据都是以二进制的格式存在计算机中。图片作为一种数据，当然也是以二进制的格式存在计算机中。此篇不讲图片数据格式的底层，只是概述一下各个图片格式的特点和优缺点。

<!-- more -->

## 常见的图片格式

一般的，生活中常见、常用的图片格式有png，jpeg，gif，webp。工作中偶尔会用的有BMP，TIF，svg。各个格式有各个格式的优缺点，目前没有一种统一的图片格式可以替代所有。GIF/PNG/JPG/WEBP/APNG等都是属于位图，而SVG是矢量图。

{% note 这里提一下PDF格式。很多人错误的以为PDF是图片的格式，但是PDF的全称是Portable Document Format，意为"可携带文档格式”。是由Adobe Systems用于与应用程序、操作系统、硬件无关的方式进行文件交换所发展出的文件格式。PDF文件以PostScript语言图象模型为基础，使其在各型号打印机上都可再现原稿的字符、颜色以及图象信息。简单的说，PDF除了有图片信息（图片）以外，还有一些肉眼看不到的信息和metadata。 %}

## 各种图片的优缺点

### WebP

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；此外他还具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。WebP支持的像素最大数量是16383x16383。iSparta做了一个PNG图片和WebP图片压缩和不压缩的质量对比和大小对比。[点此查看](https://isparta.github.io/compare-webp/index.html#12345). WebP有静态与动态两种模式。动态WebP（Animated WebP）支持有损与无损压缩、ICC色彩配置、XMP诠释资料、Alpha透明通道。相对于GIF，WebP格式有近乎相同的图片质量和相当小的数据大小。通过官方给出的[例子](https://isparta.github.io/compare-webp/index_a.html#12)我们可以明显的看出WebP的优点。缺点是你压缩的时候需要的时间更久了，而且使用WebP的时候CPU的负载更多。

### GIF（Graphics Interchange Format）

GIF图形交换格式是一种位图图形文件格式,以8位色（即256种颜色）重现真彩色的图像。它实际上是一种压缩文档,采用LZW压缩算法进行编码,有效地减少了图像文件在网络上传输的时间。它有很多优点，比如：

1. 优秀的压缩算法使其在一定程度上保证图像质量的同时将体积变得很小。
2. 可插入多帧,从而实现动画效果。
3. 可设置透明色以产生对象浮现于背景之上的效果。

但是由于采用了8位压缩,最多只能处理256种颜色（2的8次方）,故不宜应用于真彩图像。

### PNG（Portable Network Graphics）

便携式网络图片（Portable Network Graphics）,简称PNG,是一种无损数据压缩位图图形文件格式。PNG格式是无损数据压缩的,PNG格式有8位、24位、32位三种形式,其中8位PNG支持两种不同 的透明形式（索引透明和alpha透明）,24位PNG不支持透明,32位 PNG 在24位基础上增加了8位透明通道（32-24===8）,因此可展现256级透明程度。

PNG这种类型的图片就是为了取代GIF图片而生的, 除了GIF不支持动画的优势, 能用PNG的地方就用PNG, 原因是压缩比高,色彩好；

相比较GIF图片，PNG图片的优点更多：

1. 支持256色调色板技术以产生小体积文件
2. 最高支持48位真彩色图像以及16位灰度图像。
3. 支持Alpha通道的半透明特性。
4. 支持图像亮度的gamma校正信息。
5. 支持存储附加文本信息,以保留图像名称、作者、版权、创作时间、注释等信息。
6. 使用无损压缩。
7. 渐近显示和流式读写,适合在网络传输中快速显示预览效果后再展示全貌。
8. 使用CRC循环冗余编码防止文件出错。
9. 最新的PNG标准允许在一个文件内存储多幅图像。

### JPG（Joint Photographic Experts Group）

JPEG是一种针对相片影像而广泛使用的一种失真压缩标准方法。JPEG的压缩方式通常是破坏性资料压缩（lossy compression）,意即在压缩过程中图像的品质会遭受到可见的破坏。

JPEG/JFIF是最普遍在万维网（World Wide Web）上被用来储存和传输照片的格式。JPG压缩算法将不易被人眼察觉的图像颜色删除，从而达到较大的压缩比（可达到2:1甚至40:1），可以说是用最少的磁盘空间得到较好的图像质量。JPEG在色调及颜色平滑变化的相片或是写实绘画（painting）上可以达到它最佳的效果。在这种情况下,它通常比完全无失真方法作得更好,仍然可以产生非常好看的影像（事实上它会比其他一般的方法像是GIF产生更高品质的影像,因为GIF对于线条绘画（drawing）和图示的图形是无失真,但针对全彩影像则需要极困难的量化)。但是，它并不适合于线条绘图（drawing）和其他文字或图示（iconic）的图形,因为它的压缩方法用在这些图形的型态上,会得到不适当的结果；

更多关于JPEG的详细解释，请参考[这篇文章](https://www.jianshu.com/p/f5557c0e689e)

### BMP

位图（Bitmap）格式的数据没有经过压缩，或最多只采用行程长度编码（RLE，run-length encoding）来进行轻度的无损数据压缩。以至于，LaTeX 并不能像插入 .jpg 甚至于矢量图那样便捷地插入 BMP 图片。

BMP文件的数据按照从文件头开始的先后顺序分为四个部分：

- 位图文件头(bmp file header)：  提供文件的格式、大小等信息

- 位图信息头(bitmap information)：提供图像数据的尺寸、位平面数、压缩方式、颜色索引等信息

- 调色板(color palette)：可选，如使用索引来表示图像，调色板就是索引与其对应的颜色的映射表

- 位图数据(bitmap data)：图像数据区

对于压缩方式，虽然 Bitmap 格式提供简单的压缩功能，但是绝大多数情况下，并没有采用任何压缩手段。

拿最常见的 24BPP RGB （24 比特每像素，红绿蓝三通道） 位图来说，每种颜色需要 8 比特，或者说 1 字节，来存储。在二进制文件中，通常情况下，RGB 按照蓝、绿、红的顺序依次表示图片中的像素点，而 RGBA 则按照蓝、绿、红、透明的顺序（从左下开始，横向逐行向上扫描）。特殊时候，也会出现顺序与上述情况不同的特例，这时色彩顺序会写在 DIB Header 的 Bit Fields 中，以不同色彩通道的 Mask 的形式进行规定。由于 BI_BITFIELDS 也是一种压缩方式，而通常 BMP 不采用任何压缩方式，所以绝大多数时候，我们都是按照前面说的顺序进行排序。

数据按照像素行进行包装，便于读取。但是这并不是全部，因为其中还可能会有补零（zero-padding）。这涉及到计算机的数据结构对齐（data structure alignment）的问题。如果要把BMP讲透彻的话，细节太多，这里就不一一讲解了。想要了解更多，请参考[这篇文章](https://zhuanlan.zhihu.com/p/25119530)

### TIF & TIFF

TIFF（Tag Image File Format）图像文件是图形图像处理中常用的格式之一，其图像格式很复杂，但由于它对图像信息的存放灵活多变，可以支持很多色彩系统，而且独立于操作系统，因此得到了广泛应用。TIFF文件以.tif为扩展名。其数据格式是一种3级体系结构，Ti内部结构可以分成三个部分，分别是：文件头信息区、标识信息区和图像数据区。其中所有的标签都是以升序排列，这些标签信息是用来处理文件中的图像信息的。在每一个TIFF文件中第一个数据结构称为图像文件头或IFH，它是图像文件体系结构的最高层。这个结构在一个TIFF文件中是惟一的，有固定的位置。它位于文件的开始部分，包含了正确解释TIFF文件的其他部分所需的必要信息。IFD是TIFF文件中第2个数据结构，它是一个名为标记(tag)的用于区分一个或多个可变长度数据块的表，标记中包含了有关于图像的所有信息。IFD提供了一系列的指针(索引)，这些指针告诉我们各种有关的数据字段在文件中的开始位置，并给出每个字段的数据类型及长度。这种方法允许数据字段定位在文件的任何地方，且可以是任意长度，因此文件格式十分灵活。根据IFD所指向的地址，相关的图像信息存储在图像数据区域。

### SVG

SVG（Scalable Vector Graphics）图像使用XML来定义图形。这种方式定义的图像，在放大缩小，或者改变尺寸以后图片质量都不会有损失。此外，SVG图像可以被很多编辑器编辑，甚至你可以用普通的文本编辑器来编辑SVG图像文件。因此，SVG图像中的文本都是可选的，易搜索的，所以很适合来做地图。一般前端网页DOM都用SVG来添加图片。不过因为SVG实际上是文本描述文件，在表示动图的时候需要频繁的改动，因此SVG动画一般性能较低。
