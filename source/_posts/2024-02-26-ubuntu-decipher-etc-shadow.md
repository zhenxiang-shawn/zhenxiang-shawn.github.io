---
date: 2024-02-26
updated: 2024-02-26
mathjax: false
title: 'Ubuntu破解 /etc/shadow 密码'
# 设计开发, 动手实践, 解决方案, 技术加油站, 开源库, 实用脚本
categories: [技术加油站]
tags: [Ubuntu]
references:
  - '[Cosine Similarity](https://www.geeksforgeeks.org/cosine-similarity/)'
---

有时忘记 Ubuntu 系统中一些用户密码的话,可以在`/etc/passwd` 中找到相关信息. 但是密码信息一般是以加密的形式放在`/etc/shadow`中. 要拿到明文密码还需要解密一下.



<!--more-->



Linux 用户系统创建/修改新用户时，将修改以下文件:

1. 	`/etc/passwd`： 用户账户的详细信息在此文件中更新。
1. 	`/etc/shadow`： 用户账户密码在此文件中更新。
1. 	`/etc/group`： 新用户群组的详细信息在此文件中更新。
1. 	`/etc/gshadow`： 新用户群组密码在此文件中更新。

## **TL;DR** 直接安装 John 然后使用 John 暴力破解

### 安装 John

```
sudo apt install john
```

### 使用 John 暴力破解

```bash
# sudo john /etc/shadow
Loaded 4 password hashes with 4 different salts (crypt, generic crypt(3) [?/64])
Warning: OpenMP is disabled; a non-OpenMP build may be faster
Press 'q' or Ctrl-C to abort, almost any other key for status
0g 0:00:00:48 20% 1/3 0g/s 43.65p/s 43.65c/s 43.65C/s Shawn99999/..99999nwahs!
yifan123         (yifan)
```



## 查看 passwd 信息

使用命令`cat /etc/passwd`就可以列出所有的用户信息.

**例子**

```bash
# 比如:
# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
```

7 个字段的详细信息如下:

- **用户名** （`magesh`）： 已创建用户的用户名，字符长度 1 个到 12 个字符。
- **密码**（`x`）：代表加密密码保存在 `/etc/shadow` 文件中。
- **用户 ID**（`506`）：代表用户的 ID 号，每个用户都要有一个唯一的 ID 。UID 号为 0 的是为 `root` 用户保留的，UID 号 1 到 99 是为系统用户保留的，UID 号 100-999 是为系统账户和群组保留的。
- **群组 ID **（`507`）：代表群组的 ID 号，每个群组都要有一个唯一的 GID ，保存在 `/etc/group` 文件中。
- **用户信息**（`2g Admin - Magesh M`）：代表描述字段，可以用来描述用户的信息（LCTT 译注：此处原文疑有误）。
- **家目录**（`/home/mageshm`）：代表用户的家目录。
- **Shell**（`/bin/bash`）：代表用户使用的 shell 类型。

## 查看 shadow 信息

使用命令`cat /etc/shadow`就可以列出所有的用户信息. 一般其中的信息都是加密的. 

**例子**

```bash
# cat /etc/shadow
root:$6$Mv12D1VT$maznMnrEBDMmry7A6YhW6lRD2MhdOuPXTQXs9XoIxy1h05B.oOj3hvlw9.9FDs2q/Mcll/I7TX.U.vAY3c0ld1:19585:0:99999:7:::
daemon:*:19213:0:99999:7:::
bin:*:19213:0:99999:7:::
```

文件中每行代表一个用户，同样使用 ":" 作为分隔符，不同之处在于，每行用户信息被划分为 9 个字段。每个字段的含义如下：

```
用户名：加密密码：最后一次修改时间：最小修改时间间隔：密码有效期：密码需要变更前的警告天数：密码过期后的宽限时间：账号失效时间：保留字段
```

>- 用户名。就是一串代表用户身份的字符串。
>
>- 加密密码。这里保存的是真正加密的密码。所有伪用户的密码都是 "!!" 或 "*"，代表没有密码是不能登录的
>- 最后一次修改时间。此字段表示最后一次修改密码的时间
>- 最小修改时间间隔。也就是说，该字段规定了从第 3 字段（最后一次修改密码的日期）起，多长时间之内不能修改密码。如果是 0，则密码可以随时修改；如果是 10，则代表密码修改后 10 天之内不能再次修改密码。
>- 密码有效期。为了强制要求用户变更密码，这个字段可以指定距离第 3 字段（最后一次更改密码）多长时间内需要再次变更密码，否则该账户密码进行过期阶段。该字段的默认值为 99999，也就是 273 年，可认为是永久生效。如果改为 90，则表示密码被修改 90 天之后必须再次修改，否则该用户即将过期。管理服务器时，通过这个字段强制用户定期修改密码。
>- 密码需要变更前的警告天数。与第 5 字段相比较，当账户密码有效期快到时，系统会发出警告信息给此账户，提醒用户 "再过 n 天你的密码就要过期了，请尽快重新设置你的密码！"。该字段的默认值是 7，也就是说，距离密码有效期的第 7 天开始，每次登录系统都会向该账户发出 "修改密码" 的警告信息。
>- 密码过期后的宽限天数。也称为“口令失效日”，简单理解就是，在密码过期后，用户如果还是没有修改密码，则在此字段规定的宽限天数内，用户还是可以登录系统的；如果过了宽限天数，系统将不再让此账户登陆，也不会提示账户过期，是完全禁用。
>- 账号失效时间。同第 3 个字段一样，使用自 1970 年 1 月 1 日以来的总天数作为账户的失效时间。该字段表示，账号在此字段规定的时间之外，不论你的密码是否过期，都将无法使用！
>- 保留。这个字段目前没有使用，等待新功能的加入。

## 解密 shadow 信息

由于shadow文件加密的密码具有固定格式: 

```bash
$id$salt$encrypted
```

- id：表示加密算法，1 代表 MD5，5 代表 SHA-256，6 代表 SHA-512。
- salt：表示密码学中的 Salt，由系统随机生成 。
- encrypted：表示密码的 hash。
  冒号后面的数值是一些日期和密码修改间隔天数的信息，可以不用管，以上述示例中 root 账号为例

```
root:$6$Mv12D1VT$maznMnrEBDMmry7A6YhW6lRD2MhdOuPXTQXs9XoIxy1h05B.oOj3hvlw9.9FDs2q/Mcll/I7TX.U.vAY3c0ld1:19585:0:99999:7:::
```

> id=6，即使用SHA-512哈希算法
>
> salt=Mv12D1VT
>
> encrypted=maznMnrEBDMmry7A6YhW6lRD2MhdOuPXTQXs9XoIxy1h05B.oOj3hvlw9.9FDs2q/Mcll/I7TX.U.vAY3c0ld1

我们可以直接使用 john 去破解 shadow 文件：

