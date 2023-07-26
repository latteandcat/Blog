---
title: 黄金-链表中环的问题
date: 2023-07-23
---

## 判断链表中是否有环

题目来源：LeetCode141  
给定一个链表，判断链表中是否有环

### 哈希和集合

判断是否有环，最容易的方法是使用 Hash，遍历的时候将元素放入到 map  
如果有环一定会发生碰撞，发生碰撞的位置也就是入口的位置

```python
def hasCycle(self, head):
    seen = set()
    while head:
        if head in seen:
            return true
        seen.add(head)
        head = head.next
    return false
```

如果只用O(1)的空间该怎么做呢

### 双指针

确定是否有环，最有效的办法就是双指针  
一个快指针（每次走两步）  
一个慢指针（每次走一步）  
如果快指针能到达表尾就不会有环  
否则慢指针一定会在某个位置与快指针相遇

**为什么快慢指针一定会相遇**
当快指针快要追上慢指针的时候，快指针一定距离慢指针还有一个空格或者两个空格  
假如有一个空格：快指针在1，慢指针在2，快慢指针会在3相遇  
假如有两个空格：快指针在1，慢指针在3，快慢指针会在5相遇  
所以说只要有环，快慢指针一定会相遇

实现代码

```python
def hasCycle(self, head):
    if head is None or head.next is None:
        return False
    fast = slow = head
    while fast and fast.next:
        fast = fast.next.next
        slow = slow.next
        if fast is slow:
            return True
    return False
```

## 确定环的入口

题目来源：LeetCode141  
给定一个链表，判断链表中是否有环，假如有环那环的位置在哪里

1. 先按照快慢指针方式寻找到相遇的位置
2. 将两指针分别放在链表表头和相遇位置
3. 将两指针改为相同速度推进
4. 两指针会在环的开始位置相遇

① 假如快指针转一圈就遇到慢指针  
设环入口之前的长度为 a  
慢指针在环上走了 b  
快指针走了一圈的长度（设为 b + c）加上 b  
所以快指针总共走了 a + b + c + b 步  
慢指针走了 a + b 步  
所以 2 * (a + b) = a + b + c + b  
则可得 a = c  
所以此时将快指针从表头开始与慢指针同步推进  
快慢指针就会在环的入口相遇

② 假如快指针走了 n 圈遇到慢指针  
同①的计算方式  
快指针总共走了 a + n * (b + c) + b  
慢指针走了 a + b 步  
所以 a + n * (b + c) + b = 2 (a + b)  
则可得 a = c + (n - 1)(b + c)  
此时将快指针从表头开始与慢指针同步推进  
快慢指针也会在环的入口相遇  
只不过慢指针会在环里转 n-1 圈

实现代码

```python
def detectCycle(self, head):
    if head is None or head.next is None:
        return None
    fast = slow = head
    while fast and fast.next:
        fast = fast.next.next
        slow = slow.next
        if fast is slow:
            break
    fast = head
    while fast is not slow:
        fast = fast.next
        slow = slow.next
    return fast
```

## 确定环入口的拓展方法

三次双指针的思想是：如果我们确定了环的大小和末尾链表的末尾节点，那么该问题就退化成了找倒数第 K 个节点的问题。

第一次使用快慢指针判断是否存在环，如果最终相遇说明链表存在环

第二次使用双指针判断环的大小，一个固定在相遇位置不动，另一个从相遇位置开始遍历，当两者再次相遇时就找到了环的大小 K

第三次使用找倒数第 K 个节点的方法来找环的入口位置