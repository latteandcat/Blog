---
title: 白银-链表高频面试算法题
date: 2023-07-16
---

## 没有思路时该怎么解题

将常用数据结构和常用算法思想都想一遍，看看哪些能解决问题  
常用的**数据结构**有：数组、链表、队列、栈、Hash、集合、树、堆  
常用的**算法思想**有：查找、排序、双指针、递归、迭代、分治、贪心、回溯和动态规划等等

## 1. 两个链表的第一个公共节点

题目来源：剑指 offer 52  
输入两个链表，找出它们的第一个公共节点

### 1.1 哈希和集合

解题方法：先将其中一个链表的元素全部存到 Map 里，然后一边遍历第二个链表，一边检测 Hash 中是否存在当前节点，第一个存在的节点就是第一个公共节点  
本题使用集合更加合适，代码也更简洁

```python
def get_first_common_node_solution1(self, headA, headB):
    s = set()
    p, q = headA, headB
    while p:
        s.add(p)
        p = p.next
    while q:
        if q in s:
            return q
        q = q.next
    return None
```

### 1.2 使用栈

解题方法：分别将两个链表的节点存入两个栈，然后分别出栈，如果相等就继续出栈，一直找到最晚出栈的那一组

```python
def get_first_common_node_solution2(self, headA, headB):
    s1, s2 = [], []
    p, q = headA, headB
    while p:
        s1.append(p)
        p = p.next
    while q:
        s2.append(q)
        q = q.next
    ans = None
    i, j = len(s1) - 1, len(s2) - 1
    while i >= 0 and j >= 0 and s1[i] == s2[j]:
        ans = s1[i]
        i -= 1
        j -= 1
    return ans
```

### 1.3 双指针遍历

解题方法：一个指针从第一个链表的头节点开始遍历，遍历完从第二个链表的头节点开始遍历；另一个指针第二个链表的头节点开始遍历，遍历完从第一个链表的头节点开始遍历。两个指针遍历到相同节点时停止，指针指向的节点即为第一个公共节点。

```python
def get_first_common_node_solution3(self, headA, headB):
    p, q = headA, headB
    while p is not q:
        p = p.next if p else headB
        q = q.next if q else headA
    return p
```

### 1.4 差和双指针

解题方法：第一轮遍历分别求出两个链表的长度；第二轮遍历，第一个指针从长链表的头节点开始遍历，第一个指针遍历两个链表的长度差个节点后，第二个指针才从短链表的头节点开始遍历，第二个指针开始遍历后两个指针指向的第一个相同节点即为第一个公共节点。

```python
def get_first_common_node_solution4_1(self, headA, headB):
    la, lb = 0, 0
    p, q = headA, headB
    while p:
        la += 1
        p = p.next
    while q:
        lb += 1
        q = q.next

    dif = abs(la - lb)
    ls = lb if la > lb else la
    long = headA if la > lb else headB
    short = headB if la > lb else headA

    while dif > 0:
        dif -= 1
        long = long.next
    while ls > 0:
        if long == short:
            return long
        ls -= 1
        long = long.next
        short = short.next
    return None

def get_first_common_node_solution4_2(self, headA, headB):
    s1, s2 = 0, 0
    p, q = headA, headB
    while p:
        p = p.next
        s1 += 1
    while q:
        q = q.next
        s2 += 1
    # 长链表先走，但不确定AB谁长，所以有两个循环，但实际上有至少一个循环不会执行
    p, q = headA, headB
    for i in range(s1 - s2):
        p = p.next
    for i in range(s2 - s1):
        q = q.next
    while p and q and p != q:
        p = p.next
        q = q.next
    return p
```

## 2. 判断链表是否存在回文序列

题目来源：LeetCode234  
回文（Palindrome）指的是从头读到尾与从尾读到头一模一样的字符串  
回文序列的特点是元素是对称的

### 2.1 入栈后遍历

第一遍遍历一边入栈的同时计算长度  
第二遍只比较一半的元素，链表从头遍历与出栈的元素比较  
如果遍历到不相同的元素则不是回文链表  
不计算长度的话直接一边出栈一边从头遍历也可以

```python
def is_palindrome_solution1(self, head):
    s = []
    length = 0
    p = head
    while p:
        length += 1
        s.append(p.val)
        p = p.next
    p = head
    q = length - 1
    while q >= length / 2:
        if p.val is not s[q]: # 或者 s.pop()
            return False
        q -= 1
        p = p.next
    return True
```

### 2.2 快慢指针加链表逆序

边界条件如果链表长度小于等于1则存在回文

```python
if not (head and head.next):
			return True
```

快指针 fast 一次走两步  
满指针 slow 一次走一步  
当 fast.next 或 fast.next.next 其中一个为空时终止遍历   
长度为奇数时 fast 指向尾节点 slow 指向中间节点  
长度为偶数时 fast 指向倒数第二个节点 slow 指向第 L/2 个节点

```python
fast = slow = head
while fast.next and fast.next.next:
    fast = fast.next.next
    slow = slow.next
```

此时令 cur=slow.next slow.next=None 就可以将链表分成前后两段  
然后将后半段列表逆序

```python
cur = slow.next
slow.next = None
# 将后半段逆序
pre = None
while cur:
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
```

最后同时遍历前半段链表和后半段链表的逆序链表  
如果出现不相等的值说明不是回文序列

完整代码

```python
def is_palindrome_solution2(self, head):
    if not (head and head.next):
        return True
    # 快慢指针找到中间节点
    fast = slow = head
    while fast.next and fast.next.next:
        fast = fast.next.next
        slow = slow.next
    # 从中间节点分成前后两段，并将后半段逆序
    cur = slow.next
    slow.next = None
    pre = None
    while cur:
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    # 同步比较前后半段
    while pre:
        if head.val != pre.val:
            return False
        head = head.next
        pre = pre.next
    return True
```

## 3. 合并有序列表

### 3.1 合并两个升序列表

题目来源：LeetCode21  
一般有两种思路  
思路一：新建一个链表，分别遍历两个链表，每次都选最小的节点接到新链表上  
思路二：将一个链表的节点逐个合并到另外一个链表中的对应位置上去

思路一的实现

```python
def merge_two_lists_solution1(list1, list2):
    phead = ListNode(0)
    p = phead
    while list1 and list2:
        if list1.val <= list2.val:
            p.next = list1
            list1 = list1.next
        else:
            p.next = list2
            list2 = list2.next
        p = p.next

    p.next = list1 if list1 else list2
    return phead.next
```

### 3.2 合并K个升序链表

题目来源：LeetCode23  
合并多个链表有多种方式，例如堆、归并等等  
但面试中倾向于先将前两个合并，之后再将后面的逐步合并  
这样做的好处是只要两个合并能写清楚，K个就容易的多

```python
def merge_k_lists_solution1(lists):
    def merge_two_lists(list1, list2):
        phead = ListNode(0)
        p = phead
        while list1 and list2:
            if list1.val <= list2.val:
                p.next = list1
                list1 = list1.next
            else:
                p.next = list2
                list2 = list2.next
            p = p.next

        p.next = list1 if list1 else list2
        return phead.next

    if len(lists) == 0:
        return None
    res = None
    for i in range(len(lists)):
        res = merge_two_lists(res, lists[i])
    return res
```

### 3.3 将一个链表拼到另一个链表的指定区间

题目来源：LeetCode1669  
将 list1的 [a, b] 区间中的节点删除，然后接上 list2

```python
def merge_in_between_solution1(list1, a, b, list2):
    phead = ListNode(0)
    phead.next = list1
    # node1 -> list1[a-1]
    l1 = a
    node1 = phead
    while l1:
        l1 -= 1
        node1 = node1.next
    # node2 -> list1[b+1]
    l2 = b + 2
    node2 = phead
    while l2:
        l2 -= 1
        node2 = node2.next
    # 从a-1接上list2, 然后找到list2的尾节点接上b+1
    node1.next = list2
    while list2:
        list2 = list2.next
    list2.next = node2
    return phead.next
```

## 4. 双指针专题

双指针的思想可以简单有效地解决很多问题  
而所谓的双指针就是指两个变量  
在链表中，双指针的使用可以轻松解决一部分算法问题  
这类题目的整体难度不大，但是面试出现的频率很高

### 4.1 寻找中间节点

题目来源：LeetCode876  
给定一个头节点为 head 的非空单链表，返回链表的中间节点，如果有两个中间节点，则返回第二个中间节点  
快指针每次走两步，慢指针每次走一步  
循环条件为 `fast and fast.next` 返回的就是第二个中间节点  
循环条件为 `fast.next and fast.next.next` 返回的就是第一个中间节点

```python
def middleNode(self, head):
    if not head:
        return None
    fast = slow = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### 4.2 寻找倒K

题目来源：剑指offer22  
输入一个链表，输出该链表中倒数第K个节点，K从1开始  
快指针先走K步，遍历到第K+1个节点，然后快慢指针一起走  
快指针为空时，慢指针指向的就是倒数第K个节点  
注意：链表的长度可能小于K，第一轮遍历必须判断快指针是否为空

```python
def getKthFromEnd(self, head, k):
    fast = slow = head
    while k:
        if not fast:
            return None
        k -= 1
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    return slow
```

### 4.3 旋转链表

题目来源：LeetCode61  
给定一个链表的头节点head，旋转链表，将链表每个节点向右移动k个位置

**快慢指针法**

k有可能大于链表长度，所以先计算链表长度  
然后 `k = k % len`，如果 `k=0` 则不用旋转直接返回头节点  
快指针先走K步，遍历到第K+1个节点，然后快慢指针一起走  
快指针指向尾节点的时候，慢指针指向的是要断开的位置（倒K+1）  
断开之后将后半部分（后K个节点）接到前面即可

```python
def rotateRight(self, head, k):
    if head is None or head.next is None:
        return head
    p = head
    length = 0
    while p:
        length += 1
        p = p.next
    k = k % length
    if k == 0:
        return head
    else:
        fast = slow = head
        while k:
            k -= 1
            fast = fast.next
        while fast.next:
            slow = slow.next
            fast = fast.next
        ans = slow.next
        slow.next = None
        fast.next = head
        return ans
```

**链表逆序法**

还有一个思路是先反转整个链表，然后将前K和N-K两个部分分别反转

## 5. 删除链表元素专题

删除操作的进一步拓展  
- LeetCode237：删除某个链表中给定的（非末尾）节点
- LeetCode203：删除值为特定值的节点，返回新的头节点
- LeetCode19：删除链表的倒数第N个节点
- LeetCode1474：删除链表M个节点之后的N个节点
- LeetCode83：存在一个按升序排列的链表，请你删除所有重复的元素，使每个元素只出现一次
- LeetCode82：存在一个按升序排列的链表，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中没有重复出现的数字

### 虚拟头节点

删除某个节点时，必须知道其前驱节点 prev 和 后继节点 next  
然后使 prev.next = next 这样就可以使节点脱离链表被 gc 回收  
对于删除来说， 头节点的处理方式与后面节点的处理方式不一样  
删除头节点：`head = head.next`  
删除非头节点：`prev.next = next`  
所以我们可以创建一个虚拟头节点 dummyHead，使其指向 head  
这样就不用对头节点进行单独处理了

完整的步骤是

```python
# 创建虚拟头节点
dummyHead = ListNode(0)
# 使其指向原头节点
dummyHead.next = head
# cur 找到要删除的节点的前驱节点
cur.next = cur.next.next
# 最后返回的时候要用 dummyHead.next
return dummyHead.next
```

### 5.1 删除特定节点

题目来源：LeetCode203  
给定一个链表的头节点 head 和一个整数 val  
删除链表中所有值为 val 的节点，并返回新的头节点

不用虚拟头节点的写法

```python
def removeElements(self, head, val):
    while head and head.val == val:
        head = head.next
    if not head:
        return head
    node = head
    while node.next:
        if node.next.val == val:
            node.next = node.next.next
        else:
            node = node.next
    return head
```

用虚拟头节点的写法

```python
def removeElements(self, head, val):
    dummyHead = ListNode(-1)
    dummyHead.next = head
    node = dummyHead
    while node.next:
        if node.next.val == val:
            node.next = node.next.next
        else:
            node = node.next
    return dummyHead.next
```

### 5.2 删除倒数第N个节点

题目来源：LeetCode19  
删除给定链表的倒数第N个节点，并且返回链表的头节点  
题目来源：LeetCode1474  
删除链表M个节点之后的N个节点

**思路1：计算链表长度**

先遍历计算链表长度，得到链表的长度 L  
然后从头节点开始遍历找到第 L-N+1 个节点即为倒数第 N 个节点  
倒数删除第 N 个节点

```python
# 不使用虚拟头节点
def removeNthFromEnd(self, head, n):
    length = 0
    p = head
    while p:
        p = p.next
        length += 1
    if length < n:
        # 没有倒数第N个节点
        return None
    elif length == n:
        # 头节点即为倒数第N个节点
        head = head.next
    else:
        # 找到倒数第N+1个节点
        p = head
        for _ in range(length-n-1):
            p = p.next
        # 删除第N个节点
        p.next = p.next.next
    return head
# 使用虚拟头节点
def removeNthFromEnd(self, head, n):
    length = 0
    p = head
    while p:
        p = p.next
        length += 1
    if length < n:
        return None
    else:
        dummyHead = ListNode(0)
        dummyHead.next = head
        # 找到倒数第N+1个节点
        p = dummyHead
        for _ in range(length-n):
            p = p.next
        # 删除第N个节点
        p.next = p.next.next
        return dummyHead.next
```

**思路2：快慢指针**

与 4.2 和 4.3 的思想相似  
快指针先走 N 步，遍历到第 N+1 个节点，然后快慢指针一起走  
快指针指向尾节点的时候，慢指针指向的就是倒数第 N 个节点的前驱节点

```python
def removeNthFromEnd(self, head, n):
    dummyHead = ListNode(0)
    dummyHead.next = head
    fast = slow = dummyHead
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummyHead.next
```

### 5.3 删除重复元素

题目来源：LeetCode83  
存在一个按升序排列的链表，请你删除所有重复的元素，使每个元素只出现一次  
题目来源：LeetCode82  
存在一个按升序排列的链表，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中没有重复出现的数字

两个题目其实是一样的，区别是 83 将出现重复的保留一个，82 则将出现重复的都不要了  
升序链表中重复的元素在链表中出现的位置是连续的  
所以只需要一轮遍历就可以删除重复的元素

**83：保留一个的情况**

注意：头节点为空时直接返回空节点

```python
def deleteDuplicates(self, head):
    cur = head
    while cur and cur.next:
        if cur.val == cur.next.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head
```

**82：全部删除的情况**

用单指针解：  
遍历到重复元素之后，记着重复元素的值，一个一个删除

```python
def deleteDuplicates(self, head):
    if not head:
        return head
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next and cur.next.next:
        if cur.next.val == cur.next.next.val:
            x = cur.next.val
            while cur.next and cur.next.val == x:
                cur.next = cur.next.next
        else:
            cur = cur.next
    return dummy.next
```

用双指针解：  
未遍历到重复元素的时候 pre 指针和 cur 指针同步后移  
遍历到重复元素的时候 pre 指针不动而 cur 指针移动到重复的最后一个节点  
然后删除 pre 节点和 cur 节点的后继节点中间的节点

```python
def deleteDuplicates(self, head):
    dummy = ListNode(0, head)
    pre = dummy
    cur = head
    while cur:
        # cur.next为空时后面没有节点了不需要比较值
        if cur.next and cur.val == cur.next.val:
            # 遇到重复节点只移动cur指针
            # cur会移动到重复的最后一个节点
            cur = cur.next
        else:
            if pre.next == cur:
                # pre和cur中间没有其他节点则同步后移
                cur = cur.next
                pre = pre.next
            else:
                # pre和cur中间有其他节点
                # 则删除pre和cur.next之间的所有元素
                cur = cur.next
                pre.next = cur
    return dummy.next
```

