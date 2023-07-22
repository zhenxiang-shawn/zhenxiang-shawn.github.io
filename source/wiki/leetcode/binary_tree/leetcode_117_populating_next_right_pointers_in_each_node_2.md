---
layout: wiki
wiki: LeetCode
title:  "LeetCode 117. 填充每个节点的下一个右侧节点指针 II"
order: 119
tags: 
    - LeetCode
references:
  - title: '117. 填充每个节点的下一个右侧节点指针 II'
    url: https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/description/?envType=study-plan-v2&envId=top-interview-150

---

虽然这道题被标为中等难度, 但是也是一个 bfs 就可以解决的. 只是需要存一下深度信息然后作比较就好了. 代码如下:

```python
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if root is None:
            return
        def bfs():
            level = 0
            node_index = 0
            level_index = 1
            queue = [(root, level)]
            while queue:
                node, current_level = queue.pop(0)
                if queue and queue[0][level_index] == current_level:
                    node.next = queue[0][node_index]
                if node.left:
                    queue.append((node.left, current_level+1))
                if node.right:
                    queue.append((node.right, current_level+1))
        bfs()
        return root
```