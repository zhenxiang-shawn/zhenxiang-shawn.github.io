---
layout: wiki
wiki: LeetCode
title:  "LeetCode 236. 二叉树的最近公共祖先"
order: 123
tags: 
    - LeetCode
references:
  - title: 'LeetCode 236. 二叉树的最近公共祖先'
    url: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/

---

找最近的公共祖先其实就是用后序遍历. 虽然是从上往下遍历,但是需要从下往上处理数据. 这里可以把找到的 node 返回,然后对于一个 node 看是否左子树和右子树都有返回值. 如果是的话,则该 node 就是两个 node 的最近的公共祖先.(因为是后续遍历所以是最近的.) 如果没有找到目标 node 则返回空即可. 代码如下:


```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if root is None:
            return
        if root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        if left is None and right is None:
            return
        return left if left else right     

```




