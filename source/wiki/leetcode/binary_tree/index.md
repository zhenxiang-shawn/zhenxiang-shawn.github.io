---
layout: wiki
wiki: LeetCode
title: 二叉树intro
order: 100
tags: 
    - LeetCode
---

二叉树特点是每个节点最多只能有两棵子树，且有左右之分。二叉树是n个有限元素的集合，该集合或者为空、或者由一个称为根（root）的元素及两个不相交的、被分别称为左子树和右子树的二叉树组成，是有序树。

<!-- more -->

二叉树的遍历方式无非就是(1)前序遍历, (2)中序遍历和(3)后序遍历. 总的来说打印一个二叉树有两种方式.一种是(1)横向打印,一种是(2)纵向打印.

## 遍历方式

二叉树的遍历方式无非就是(1)前序遍历, (2)中序遍历,(3)后序遍历和(4)层序遍历. 

### 前序,中序,后序遍历

二叉树的遍历方式很简单,只是递归途中的二级入口位置不同而已. 

def travel(node):
if node is None:
return
print(node.val) # 前序遍历位置
travel(node.left)
print(node.val) # 中序遍历位置
travel(node.right)
print(node.val) # 后序遍历位置

### 层遍历

层序遍历
二叉树的结构导致他并不能存储他的一些信息,比如深度. 当一层一层遍历一个二叉树的时候, 递归方法也很难找到清晰的运行层级关系.换句话说,我们虽然可以按层来打印每个 node 但是不知道每一层的结尾在哪里. 因此当有层级关系的处理的时候,我们需要手动来储存层的数据.

```python
def travel(root):
“”“
这个方法没有传递层级信息因此在处理 node 的时候根本不知道是哪一层.
”“”
queue = [root]
while queue:
node = queue.pop(-1)
print(node.val) # 层级遍历
if node.left:
queue.append(node.left)
if node.right:
queue.append(node.right)


```

## 按层打印二叉树

要想按层来打印二叉树,需要知道二叉树在哪一层. 我们可以把整个树都遍历一遍把每个 node 的层级信息都存起来.

```python
def bfs(node, level, queue):
if not node:
return
queue.append((level, node.val))
if node.left:
bfs(node.left, level + 1, queue)
if node.right:
bfs(node.right, level + 1, queue)

depth = 0
queue = []
bfs(root, level=0, queue=queue)
while queue:
pop_node = queue.pop(0)
if pop_node[0] > depth:
print()
depth += 1
print(pop_node[1], end=' ')
```

