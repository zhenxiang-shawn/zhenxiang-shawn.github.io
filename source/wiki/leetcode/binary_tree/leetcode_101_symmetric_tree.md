---
layout: wiki
wiki: LeetCode
title:  "LeetCode 101. 对称二叉树"
order: 105
tags: 
    - LeetCode
references:
  - title: 'LeetCode 101. 对称二叉树'
    url: https://leetcode.cn/problems/symmetric-tree/?envType=study-plan-v2&envId=top-interview-150
---
可以把树看成两个树. 根节点不用管. 直接同时遍历根节点的左子树和右子树,然后看左子树的左边等不等于右子树的右边, 以此类推. 其实就是简单的后续遍历,在遍历的时候看看左子树是否等于右子树. 代码如下:

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if root is None:
            return True
        def travel(node1, node2):
            if node1 is None and node2 is None:
                return True
            if node1 is None and node2 is not None:
                return False
            if node1 is not None and node2 is None:
                return False
            if node1.val != node2.val:
                return False
            return travel(node1.left, node2.right) and travel(node1.right, node2.left)
        return travel(root.left, root.right)
```
