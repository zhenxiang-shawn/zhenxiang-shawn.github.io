---
date: 2022-04-04
updated: 2022-04-10
title: 稳定婚姻算法
tags: [Algorithm]
references: 
    - title: GeeksForGeeks
      url: https://www.geeksforgeeks.org/stable-marriage-problem/
    - title: 百度知道
      url: https://baike.baidu.com/item/%E7%A8%B3%E5%AE%9A%E5%A9%9A%E5%A7%BB%E9%97%AE%E9%A2%98/12760040
---

“稳定婚姻问题”在生活中是一个典型的问题,通俗地可叙述为：当前有N位男生和N位女生最后要组成稳定的婚姻家庭，过程开始之前男生和女生在各自的心目中都按照喜爱程度对N位异性有了各自的排序，男生和女生结婚后，对于每一对男生女生，不会出现比起当前匹配的伴侣互相更喜爱的一对男生女生，即可认为婚姻是稳定的。

<!-- more -->

1962 年，美国数学家 David Gale 和 Lloyd Shapley 发明了一种寻找稳定婚姻的策略。不管男女各有多少人，不管他们各自的偏好如何，应用这种策略后总能得到一个稳定的婚姻搭配。换句话说，他们证明了稳定的婚姻搭配总是存在的。

## 解决算法

先对所有男士进行落选标记，称其为自由男。当存在自由男时，进行以下操作：

1. 每一位自由男在所有尚未拒绝她的女士中选择一位被他排名最优先的女士
2. 每一位女士将正在追求她的自由男与其当前男友进行比较，选择其中排名优先的男士作为其男友，即若自由男优于当前男友，则抛弃前男友；否则保留其男友，拒绝自由男。
3. 若某男士被其女友抛弃，重新变成自由男。

在算法执行期间，自由男们主动出击，依次对最喜欢和次喜欢的女人求爱，一旦被接受，即失去自由身，进入订婚状态；而女人们则采取“守株待兔”和“喜新厌旧”策略，对前来求爱的男士进行选择：若该男子比未婚夫强，则悔婚，选择新的未婚夫；否则拒绝该男子的求婚。被女友抛弃的男人重获自由身，重新拥有了追求女人的权利——当然，新的追求对象比不过前女友。

这样，在算法执行期间，每个人都有可能订婚多次——也有可能一开始就找到了自己的最爱，从一而终——每订一次婚，女人们的选择就会更有利，而男人们的品味则越来越差。只要男女生的数量相等，则经过多轮求婚，订婚，悔婚和再订婚之后，每位男女最终都会找到合适的伴侣——虽然不一定是自己的最爱（男人没能追到自己的最爱，或女人没有等到自己的最爱来追求），但绝对不会出现“虽然彼此相爱，却不能在一起”的悲剧，所有人都会组成稳定的婚姻。

### 示例代码

```python
# Python3 program for stable marriage problem

# Number of Men or Women
N = 4

# This function returns true if
# woman 'w' prefers man 'm1' over man 'm'
def wPrefersM1OverM(prefer, w, m, m1):
    
    # Check if w prefers m over her
    # current engagement m1
    for i in range(N):
        
        # If m1 comes before m in list of w,
        # then w prefers her current engagement,
        # don't do anything
        if (prefer[w][i] == m1):
            return True

        # If m comes before m1 in w's list,
        # then free her current engagement
        # and engage her with m
        if (prefer[w][i] == m):
            return False

# Prints stable matching for N boys and N girls.
# Boys are numbered as 0 to N-1.
# Girls are numbered as N to 2N-1.
def stableMarriage(prefer):
    
    # Stores partner of women. This is our output
    # array that stores passing information.
    # The value of wPartner[i] indicates the partner
    # assigned to woman N+i. Note that the woman numbers
    # between N and 2*N-1. The value -1 indicates
    # that (N+i)'th woman is free
    wPartner = [-1 for i in range(N)]

    # An array to store availability of men.
    # If mFree[i] is false, then man 'i' is free,
    # otherwise engaged.
    mFree = [False for i in range(N)]

    freeCount = N

    # While there are free men
    while (freeCount > 0):
        
        # Pick the first free man (we could pick any)
        m = 0
        while (m < N):
            if (mFree[m] == False):
                break
            m += 1

        # One by one go to all women according to
        # m's preferences. Here m is the picked free man
        i = 0
        while i < N and mFree[m] == False:
            w = prefer[m][i]

            # The woman of preference is free,
            # w and m become partners (Note that
            # the partnership maybe changed later).
            # So we can say they are engaged not married
            if (wPartner[w - N] == -1):
                wPartner[w - N] = m
                mFree[m] = True
                freeCount -= 1

            else:
                
                # If w is not free
                # Find current engagement of w
                m1 = wPartner[w - N]

                # If w prefers m over her current engagement m1,
                # then break the engagement between w and m1 and
                # engage m with w.
                if (wPrefersM1OverM(prefer, w, m, m1) == False):
                    wPartner[w - N] = m
                    mFree[m] = True
                    mFree[m1] = False
            i += 1

            # End of Else
        # End of the for loop that goes
        # to all women in m's list
    # End of main while loop

    # Print solution
    print("Woman ", " Man")
    for i in range(N):
        print(i + N, "\t", wPartner[i])

# Driver Code
prefer = [[7, 5, 6, 4], [5, 4, 6, 7],
        [4, 5, 6, 7], [4, 5, 6, 7],
        [0, 1, 2, 3], [0, 1, 2, 3],
        [0, 1, 2, 3], [0, 1, 2, 3]]

stableMarriage(prefer)

# This code is contributed by Mohit Kumar

```

## 数学问题的现实应用价值

现实中的婚姻问题比这个模型要复杂的多, 不过这个模型的思想可以用来在实际社会中的匹配任务. 比如医学生毕业时的工作分配.
