---
layout: wiki
wiki: LeetCode
title:  "LeetCode 226. 翻转二叉树"
order: 104
tags: 
    - LeetCode
references:
  - title: 'LeetCode 226. 翻转二叉树'
    url: https://leetcode.cn/problems/invert-binary-tree/?envType=study-plan-v2&envId=top-interview-150
---

思路也很简单,就是后续遍历的同时把所有的左右节点换一下位置就 ok. 代码如下:
```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return
        left = self.invertTree(root.left)
        right = self.invertTree(root.right)
        root.left = right
        root.right = left
        return root
```