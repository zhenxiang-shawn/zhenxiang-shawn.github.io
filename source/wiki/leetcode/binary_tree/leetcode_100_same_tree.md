---
layout: wiki
wiki: LeetCode
title:  "LeetCode 100. 相同的树"
order: 103
tags: 
    - LeetCode
references:
  - title: 'LeetCode 100. 相同的树'
    url: https://leetcode.cn/problems/same-tree/?envType=study-plan-v2&envId=top-interview-150
---
这个只要会遍历二叉树就行了,不管用什么遍历方式,直接在遍历的时候比较两个 node 就行了. 代码如下:

```python
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        def travel(node1, node2):
            if node1 is None and node2 is None:
                return True
            if node1 is None and node2 is not None:
                return False
            if node1 is not None and node2 is None:
                return False
            if node1.val != node2.val:
                return False
            return travel(node1.left, node2.left) \
                and travel(node1.right, node2.right)
        return travel(p, q)

```