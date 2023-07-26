---
title: 黄金-K个一组反转
date: 2023-07-25
---

题目来源：LeetCode25  
给你一个链表，每 k 个节点一组进行反转，请你返回翻转后的链表。  
k 是一个正整数，它的值小于等于链表的长度。  
如果节点总数不是 k 的整数倍，请将最后剩余的节点保持原有顺序。  
进阶：你可以设计一个只使用常数额外空间的算法来解决此问题吗？  
注意：不能知识单纯的改变节点内部的值，而是需要实际进行节点交换。

## 头插法

将链表分为已经反转、正在反转和未反转三个部分  
pre 指向已经反转的最后一个节点  
tail 每轮反转开始时也指向已经反转的最后一个节点，每轮反转前向后移动 k 次以确定未反转部分是否够 k 个节点，如果不够 k 个就终止反转，如果够 k 个就开始下一轮反转  
grouphead 指向正在反转的第一个节点，反转后为最后一个节点  
cur 用来遍历正在反转的节点，从第二个节点开始，每遍历到一个节点，就用头插法将其插入到 pre 后面


```python
def reverseKGroup(self, head, k):
    dummy = ListNode(0)
    dummy.next = head
    pre = tail = dummy
    while True:
        # tail 后移k次 如果未反转节点够一组会指向组内最后一个节点
        count = k
        while count and tail:
            count -= 1
            tail = tail.next
        # tail 为空说明未反转节点不够一组则终止
        if not tail:
            break
        # 反转节点
        grouphead = pre.next
        # 每次将 cur 插入到 pre 后面
        while pre.next != tail:
            cur = grouphead.next
            # 断开cur
            grouphead.next = cur.next
            # 头插
            cur.next = pre.next
            pre.next = cur
        pre = grouphead
        tail = grouphead
    return dummy.next
```

## 穿针引线法

将链表分为已经反转、正在反转和未反转三个部分  
pre 指向已经反转的最后一个节点  
start 指向正在反转的组内第一个节点  
end 指向正在反转的组内最后一个节点  
next 指向未反转的第一个节点

先取出待反转的节点  
然后将要反转的 k 个节点从原链表断开  
反转后接回原链表  
最后处理指针为下一组反转做准备

```python
def reverseKGroup(self, head, k):
    def reverseList(head):
        pre = None
        cur = head
        while cur:
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next
    dummy = ListNode(0)
    dummy.next = head
    pre = end = dummy
    while end.next:
        count = k
        while count and end:
            count -= 1
            end = end.next
        if not end:
            break
        # 断开链表
        start = pre.next
        next = end.next
        end.next = None
        # 反转链表
        reverseList(start)
        pre.next = end
        start.next = next
        # 下一组
        pre = start
        end = pre
    return dummy.next
```