---
layout: wiki
wiki: LeetCode
title:  "LeetCode 200. 岛屿数量"
order: 210
tags: 
    - LeetCode
references:
  - title: 'LeetCode 200. 岛屿数量'
    url: https://leetcode.cn/problems/number-of-islands/

---
这道题可以用暴力解法: 直接全部按照顺序遍历,然后打上标记,然后遍历的时候根据标记来计算是否是同一个岛屿,然后再更改标记. 这个解法逻辑太复杂, 不推荐. 可以想想成一个雷达在扫描这张地图,然后雷达扫描的线经过的地方可以根据之前的'记录'来看是否是岛屿. 这里最简单的是用 BFS, 搜过的点都标记为 0 或者`visited`, 然后 BFS 的时候只搜同一个岛屿,而且把同一个岛屿`击沉`.这样的话只需要两个 for 循环, 一个递归就可以解决. 代码如下:

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        count = 0
        def dfs(grid, row, column):
            grid[row][column] = '0'
            # top
            if row - 1 >= 0 and grid[row-1][column] == '1':
                dfs(grid, row-1, column)
            # left
            if column - 1 >= 0 and grid[row][column-1] == '1':
                dfs(grid, row, column-1)
            # bottom
            if row + 1 < len(grid) and grid[row+1][column] == '1':
                dfs(grid, row+1, column)
            # right
            if column + 1 < len(grid[0]) and grid[row][column+1] == '1':
                dfs(grid, row, column+1)
        for i, row in enumerate(grid):
            for j, num in enumerate(row):
                if num == '1':
                    count += 1                    
                    dfs(grid, i, j)
        return count
```
