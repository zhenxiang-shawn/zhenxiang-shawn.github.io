---
layout: wiki
wiki: LeetCode
title:  "LeetCode 面试题 04.12. 二叉树的最短求和路径"
order: 101
tags: 
    - LeetCode
---

看完题目的第一反应就是用剪枝的思想来穷举. 如果只考虑到所有 Node 都是正数的情况的话,其实可以快很多. 不过考虑到有一些 node 是负数,因此每次都要遍历完整个树. 

一般的剪枝思想其实不会动 root. 但是这个题目是要列出来所有的可能, 这样的话就是用每个 node 都为根来进行穷举. 代码如下:

```python
class Solution:
    def pathSum(self, root: TreeNode, sum_: int) -> int:
        if not root:
            return 0
        ans = []
        current_vals = []
        def travel(node, target_num, current_vals, ans):
            if node is None: 
                return            
            current_vals.append(node.val)            
            if sum(current_vals) == target_num:
                ans.append(current_vals.copy())
            travel(node.left, target_num, current_vals, ans)
            if node.left: 
                current_vals.pop()
            travel(node.right, target_num, current_vals, ans) 
            if node.right: 
                current_vals.pop()            
        queue = [root]
        while queue:
            node = queue.pop(-1)
            travel(node, sum_, [], ans)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return len(ans)
```


考虑到树的很多枝其实是经过多次计算的, 因此可以用动态规划在继续优化

