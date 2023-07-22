---
layout: wiki
wiki: LeetCode
title:  "LeetCode 104. 二叉树的最大深度"
order: 102
tags: 
    - LeetCode
references:
  - title: 'LeetCode 104. 二叉树的最大深度'
    url: https://leetcode.cn/problems/maximum-depth-of-binary-tree/?envType=study-plan-v2&envId=top-interview-150

---

废话不多说,二叉树概念的基础. 直接用后序遍历,两行代码搞定. 代码如下:


```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        return max(self.maxDepth(root.left),
                    self.maxDepth(root.right)) + 1


```