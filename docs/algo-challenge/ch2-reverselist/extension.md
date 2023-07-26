---
title: 白银-链表反转的拓展问题
date: 2023-07-24
---

## 1. 指定区间反转

题目来源：LeetCode92  
给你单链表的头指针 head 和两个整数 left 和 right，其中 left <= right  
请你反转从位置 left 到位置 right 的链表节点，返回反转后的链表

穿针引线本质上就是不带有虚拟头节点的方式来实现反转，而头插法本质上就是带有虚拟头节点的反转

### 1.1 头插法

反转的整体思想是，在需要反转的区间里，每遍历到一个节点，就让这个新节点插入到反转部分的起始位置

实现代码

```python
def reverseBetween(self, head, left, right):
    dummy = ListNode(-1)
    dummy.next = head
    # 找到第left-1个节点
    pre = dummy
    for _ in range(left-1):
        pre = pre.next
    cur = pre.next
    # 每次遍历都会将cur的后继节点插入到第left个节点前面
    for _ in range(right-left):
        # 记录后继节点
        next = cur.next
        # 断开后继节点
        cur.next = next.next
        # 头插法将后继节点插入到pre后面
        next.next = pre.next
        pre.next = next
    return dummy.next
```

### 1.2 穿针引线法

1. 先将待反转的区域反转
2. 把 pre（left-1）的 next 指向反转以后的反转区域的第一个节点
3. 然后把反转以后的反转区域的最后一个节点的next 指向 succ (right+1)

实现代码

```python
def reverseBetween(self, head, left, right):
    def reverseList(head):
        pre = None
        cur = head
        while cur:
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next

    dummy = ListNode(-1)
    dummy.next = head
    # 找到第left-1个节点
    pre = dummy
    for _ in range(left-1):
        pre = pre.next
    # 找到第right个节点
    right_node = pre
    for _ in range(right-left+1):
        right_node = right_node.next
    # 切掉后半段
    succ = right_node.next
    right_node.next = None
    # 切掉前半段
    left_node = pre.next
    pre.next = None
    # 逆转left到right
    reverseList(left_node)
    # 将left到right反向接回原链表
    pre.next = right_node
    left_node.next = succ
    return dummy.next
```

## 2. 两两交换链表中的节点

题目来源：LeetCode24  
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

实现代码

```python
def swapPairs(self, head):
    dummy = ListNode(-1)
    dummy.next = head
    cur = dummy
    while cur.next and cur.next.next:
        node1 = cur.next
        node2 = cur.next.next
        cur.next = node2
        node1.next = node2.next
        node2.next = node1
        cur = node1
    return dummy.next
```

## 3. 单链表加1

题目来源：LeetCode369  
用一个非空单链表来表示一个非负整数，然后将这个整数加一  
你可以假设这个整数除了0本身，没有任何前导的0  
这个整数的各个位数按照高位在链表头部、低位在链表尾部的顺序排列

**用栈实现**：先将链表遍历入栈，然后从栈出弹出最后一位数进行加一和进位处理

**用链表反转实现**：先将链表反转，完成加一和进位处理后再次反转

链表反转的实现代码

```python
def plusOne(self, head):
    def reverseList(head):
        pre = None
        cur = head
        while cur:
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        return pre
    if not head:
        return None
    # 先反转链表
    pre = reverseList(head)
    # 加一和进位处理
    pre.val += 1
    cur = pre
    while cur:
        if cur.val <= 9:
            break
        else:
            cur.val = 0
            if cur.next:
                cur.next.val += 1
            else:
                node = ListNode(1)
                cur.next = node
            cur = cur.next
    # 再次反转链表
    head = reverseList(pre)
    return head
```

## 4. 链表加法

链表相加是基于链表构造的一种特殊题，反转只是其中的一部分。

题目来源：LeetCode445  
给你两个非空链表来代表两个非负整数。数字最高位位于链表开始位置。  
它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。  
你可以假设除了数字 0 以外，这两个数字都不会以零开头。

这个题目的难点在于存放的位数是从高到低的，但是因为低位会产生进位问题  
计算的时候必须从最低为开始，所以必须将链表节点的元素反转过来计算

**使用栈实现**  
思路是先将两个链表的元素分别压栈，然后再一起出栈，将两个元素的值相加  
然后对相加的结果取模，模数保存到新的链表中，进位保存到下一轮  
完成之后再进行一次反转就行了  
如果用头插法建立新链表则不需要反转

```python
def addTwoNumbers(self, l1, l2):
    # 遍历入栈
    st1 = []
    st2 = []
    while l1:
        st1.append(l1.val)
        l1 = l1.next
    while l2:
        st2.append(l2.val)
        l2 = l2.next
    # 进位
    carry = 0
    dummy = ListNode(0)
    while st1 or st2 or carry:
        adder1 = st1.pop() if st1 else 0
        adder2 = st2.pop() if st2 else 0
        # 计算总和
        sum = adder1 + adder2 + carry
        # 计算进位
        carry = 1 if sum >= 10 else 0
        # 计算余数
        sum = sum - 10 if sum >= 10 else sum
        # 创建节点
        cur = ListNode(sum)
        # 用头插法插入新节点
        cur.next = dummy.next
        dummy.next = cur
    return dummy.next
```

**使用链表反转实现**  
如果使用链表反转，则先将两个链表反转，最后计算完之后再将结果反转  
或者用头插法就不需要最后一次反转

```python
def addTwoNumbers(self, l1, l2):
    def reverseList(head):
        pre = None
        cur = head
        while cur:
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        return pre
    def addTwoReverseNumbers(l1, l2)
        dummy = ListNode(0)
        carry = 0
        p1, p2 = l1, l2
        while p1 or p2 or carry:
            adder1 = p1.val if p1 else 0
            adder2 = p2.val if p2 else 0
            # 计算总和
            sum = adder1 + adder2 + carry
            # 计算进位
            carry = 1 if sum >= 10 else 0
            # 计算余数
            sum = sum - 10 if sum >= 10 else sum
            # 创建节点
            cur = ListNode(sum)
            # 用头插法插入新节点
            cur.next = dummy.next
            dummy.next = cur
            # 移动指针
            p1 = p1.next if p1 else p1
            p2 = p2.next if p2 else p2
        return dummy.next
    return addTwoReverseNumbers(reverseList(l1), reverseList(l2))
```