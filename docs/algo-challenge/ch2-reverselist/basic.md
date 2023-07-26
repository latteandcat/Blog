---
title: 青铜-手写链表反转
date: 2023-07-24
---

## 链表反转

链表反转是一个频率极高的面试算法题

- 反转链表涉及节点的增加删除等多种操作，可以有效考察思维能力和代码能力
- 反转链表是很多题目的基础，例如指定区间反转、链表K个一组反转
- 反转链表是链表中最重要的问题，没有之一

题目来源：LeetCode206  
给你一个单链表的头节点head，请你反转链表，并返回反转后的链表

## 建立虚拟头节点辅助反转

1. 建立虚拟头节点 ans
3. 遍历旧链表，每遍历到一个节点就将其从旧链表拆下来用头插法接到虚拟头节点 ans 后面
4. 遍历结束以后返回 ans.next

实现代码

```python
def reverseList(self, head):
    if not head or not head.next:
        return head
    # 定义虚拟头节点
    ans = ListNode(-1)
    # cur初始为第一个节点
    cur = head
    # 从第一个节点开始遍历
    while cur:
        # 记录后继节点
        next = cur.next
        # 头插法插入cur
        cur.next = ans.next
        ans.next = cur
        # 转移cur到后继节点
        cur = next
    return ans.next
```

## 直接操作链表实现反转

使用虚拟头节点辅助链表反转虽然比较好理解，但是可能会被面试官禁止，因为不借助虚拟节点的方式更难，更能考察面试者的能力

实现思路与用虚拟头节点的实现思路相同，只不过要对头节点做单独处理

实现代码

单指针的写法

```python
def reverseList(self, head):
    if not head or not head.next:
        return head
    # cur初始为第二个节点
    cur = head.next
    # 断开第一个节点和第二个节点
    head.next = None
    # 从第二个节点开始遍历
    while cur:
        # 记录后继节点
        next = cur.next
        # 头插法插入cur
        cur.next = head
        head = cur
        # 转移cur到后继节点
        cur = next
    return head
```

双指针的写法

```python
def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if not head or not head.next:
            return head
        pre = None
        cur = head
        while cur:
            # 记录后继节点
            next = cur.next
            # 逆转指针指向
            cur.next = pre
            # 同步后移双指针
            pre = cur
            cur = next
        return pre
```

## 拓展：通过递归来实现反转

链表反转还有第三种常见的方式，使用递归来实现

实现代码

```python
def reverseList(self, head):
    if not head or not head.next:
        return head

    p = self.reverseList(head.next)
    head.next.next = head
    head.next = None
    return p
```