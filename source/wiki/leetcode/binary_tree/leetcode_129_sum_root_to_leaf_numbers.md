---
layout: wiki
wiki: LeetCode
title:  "LeetCode 129. 求根节点到叶节点数字之和"
order: 124
tags: 
    - LeetCode
references:
  - title: 'LeetCode 129. 求根节点到叶节点数字之和'
    url: https://leetcode.cn/problems/sum-root-to-leaf-numbers/description/?envType=study-plan-v2&envId=top-interview-150

---
该数据结构相当于每一层深度代表一个位. 比如深度为 1 的时候代表最高位最深的时候代表个位. 以此类推.
总得思路可以是直接 DFS 到叶子节点然后吧存的数字添加到一个地方. 然后进行计算, 也可以在到叶子节点的时候不储存直接计算. 代码如下:

```python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        self.total = 0
        if root is None:
            return ans

        def travel(node, current):
            # pre-condition: node is not None
            current_update = f"{current}{node.val}"

            # if is leaf node, add current to total
            if node.left is None and node.right is None:
                self.total += int(current_update)
            if node.left:
                travel(node.left, current_update)
            if node.right:
                travel(node.right, current_update)
        travel(root, "")
        return self.total
```