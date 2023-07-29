---
layout: wiki
wiki: LeetCode
title:  "LeetCode 230. 二叉搜索树中第K小的元素"
order: 130
tags: 
    - LeetCode
references:
  - title: 'LeetCode 230. 二叉搜索树中第K小的元素'
    url: https://leetcode.cn/problems/kth-smallest-element-in-a-bst/

---

一个 BST 的前序遍历就是一个有序数组. 因此这道题其实只需要返回前序遍历的第 K 个值. 代码如下:

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = [root]
        curr = root.left
        while True:
            if curr:
                stack.append(curr)
                curr = curr.left
            elif stack:
                curr = stack.pop()
                k -= 1
                if k == 0:
                    return curr.val
                curr = curr.right
            else:
                break
        return 0
```