---
layout: wiki
wiki: LeetCode
title:  "LeetCode 114. 二叉树展开为链表"
order: 122
tags: 
    - LeetCode
references:
  - title: '114. 二叉树展开为链表'
    url: https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-interview-150

---

总得思路就是把左子树的尾巴返回出来接到右子树的头,然后再把左子树的头赋值给父节点的右子树.
难点在于怎么取出来左子树的尾巴.

这里和最短求和路径相似,都是从上往下遍历,但是从下往上处理.这里还少了判断求和路径的值,只是把该分路径下的尾巴节点返回. 代码如下:

```python
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if root is None:
            return
        def find_tail(node):
            if node is None:
                return
            left_tail = find_tail(node.left)
            right_tail = find_tail(node.right)            
            if left_tail:
                if right_tail:
                    left_tail.right = node.right
                    node.right = node.left
                    node.left = None
                    return right_tail
                else:
                    node.right = node.left
                    node.left = None
                    return left_tail
            if right_tail:
                return right_tail
            return node
        # don't need this return value, unless we need to link two trees.  
        find_tail(root)
         
```

