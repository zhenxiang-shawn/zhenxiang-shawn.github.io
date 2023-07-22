---
layout: wiki
wiki: LeetCode
title:  "LeetCode 112. 路径总和"
order: 120
tags: 
    - LeetCode
references:
  - title: 'LeetCode 112. 路径总和'
    url: https://leetcode.cn/problems/path-sum/description/?envType=study-plan-v2&envId=top-interview-150
---
思路很简单 dfs 然后检查是否有一条路径返回`找到`了就ok. 代码如下:

```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if root is None:
            return False            
        if root.left is None and root.right is None and targetSum - root.val == 0:
            return True
        return self.hasPathSum(root.left, targetSum - root.val) or  \
            self.hasPathSum(root.right, targetSum - root.val)
        
```