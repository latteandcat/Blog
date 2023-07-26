---
title: 青铜-链表基础笔记
date: 2023-07-17
---

## 认识链表

链表是一种经典的数据结构，在很多🐂🍺的软件里都有大量使用（操作系统、JVM）  
链表是一种最基本的结构，普通的单链表只有一个指向链表头的 head 指针，访问其他元素必须从 head 开始一个个往后找，遍历链表到尾节点之后继续访问就会返回 null  
**面试情况**：题目较少，类型固定，但考察频率较高  
**学习要求**：熟练掌握常见题目  

工程中应用较多的有
- 带头结点的单链表
- 双向循环链表
- 多个链表的组合使用

> 算法的基础是数据结构，任何数据结构的基础都是创建+增删改查

## 单链表

### 内部结构

单链表的每个节点都有一个指向后继元素的 next 指针，表中最后一个元素的 next 指向 null

**链表节点的规范节点定义**

```python
class SNode(object):
    def __init__(self, value):
        self.value = value
        self.next = None

    def get_value(self):
        return self.value
    
    def set_value(self, value):
        self.value = value
    
    def get_next(self):
        return self.next
    
    def set_next(self, next):
        self.next = next
```

**算法题中常用节点定义**

虽然违背了面向对象的设计要求  
但代码更为精简，因此在算法题目中应用广泛

```python
class SNode(object):
    def __init__(self, data):
        self.data = data
        self.next = None
```

**单链表定义**

```python
class SingleLinkList(object):
    def __init__(self):
        self._head = None
        
    def is_empty(self):
        return self._head is None
```

### 遍历链表

对于单链表，不管进行什么操作，一定是从头开始逐个向后访问，所以操作之后是否还能找到表头非常重要

```python
def length(self):
    cur = self._head
    count = 0
    while cur is not None:
        count += 1
        cur = cur.next
    return count

def travel(self):
    cur = self._head
    while cur is not None:
        print(cur.data)
        cur = cur.next
```

### 链表插入

- 在链表的表头插入
  1. 创建一个新节点
  2. 使新节点的 next 指向 head
  3. 使 head 指向新节点

```python
def add(self, data):
    node = SNode(data)
    node.next = self._head
    self._head = node
```

- 在链表尾部插入
  1. 创建一个新节点
  2. 若为空链表，则将头指针指向新节点  
     若不为空，则遍历找到尾节点，将尾节点的 next 指向新节点  
     注意：链表非空的情况下next指针为空的节点即为尾节点

```python
def append(self, data):
    node = SNode(data)
    if self.is_empty():
        self._head = node
    else:
        cur = self._head
        while cur.next is not None:
            cur = cur.next
        cur.next = node
```

- 在链表中间插入
  1. 创建一个新节点
  2. 遍历找到要插入的位置的前驱节点
  3. 使新节点的 next 指向前驱节点的 next
  4. 使前驱节点的 next 指向新节点

```python
def insert(self, pos, data):
    # 若为空链表或指定位置在第一个元素之前则为头部插入
    if self.is_empty() or pos <= 0:
        self.add(data)
    # 若指定位置超过链表尾部，则执行尾部插入
    elif pos >= self.length():
        self.append(data)
    # 否则找到指定位置后插入
    else:
        node = SNode(data)
        count = 0
        pre = self._head
        while count < pos - 1:
            count += 1
            pre = pre.next
        node.next = pre.next
        pre.next = node
```

### 链表删除

- 删除表头节点  
  只需要将头指针指向头节点的后一个节点
- 删除最后一个节点（删除中间节点的特殊情况）
  1. 找到要删除的节点的前驱节点
  2. 使前驱节点的 next 为空
- 删除中间节点
  1. 找到要删除的节点的前驱节点
  2. 使前驱节点的 next 指向其 next 的 next

```python
def remove(self, data):
    cur = self._head
    pre = None
    # 遍历寻找要删除的节点
    while cur is not None:
        # 找到要删除的节点
        if cur.data == data:
            # 要删除的节点是第一个节点
            if not pre:
                # 将头指针指向头节点的后一个节点
                self._head = cur.next
            else:
                # 将删除节点的前一个节点的next指向删除节点的后一个节点
                pre.next = cur.next
            break
        # 没找到就继续遍历
        else:
            pre = cur
            cur = cur.next
```

### 链表查找

单链表的查找只需要遍历比较节点

```python
def search(self, data):
    cur = self._head
    while cur is not None:
        if cur.data == data:
            return True
        cur = cur.next
    return False
```

## 双向链表

### 内部结构

双向链表中每个节点中都有两个指针，既可以向前也可以向后  
有两个指针的好处是移动元素更加方便

**节点定义**

```python
class DNode(object):
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None
```

**链表定义**

```python
class DoubleLinkList(object):
    def __init__(self):
        self._head = None

    def is_empty(self):
        return self._head is None
```

### 遍历链表

双向链表在遍历时从头节点开始逐个往后访问，与单链表的操作相同

```python
def length(self):
    if self.is_empty():
        return 0
    cur = self._head
    count = 0
    while cur is not None:
        count += 1
        cur = cur.next
    return count

def travel(self):
    if self.is_empty():
        return
    cur = self._head
    while cur is not None:
        print(cur.data)
        cur = cur.next
```

### 链表插入

- 头部插入
  - 创建新节点
  - 若链表为空则直接将头指针指向新节点  
    若链表不为空  
    1. 新节点 next 指向头指针所指的节点
    2. 头指针所指的节点的 prev 指向新节点
    3. 最后修改头指针指向新节点

```python
def add(self, data):
    node = DNode(data)
    if self.is_empty():
        self._head = node
    else:
        node.next = self._head
        self._head.prev = node
        self._head = node
```

- 尾部插入
  - 创建新节点
  - 若链表为空则直接将头指针指向新节点  
    若链表不为空  
    1. 遍历找到尾节点
    2. 将尾节点的 next 指向新节点
    3. 将新节点的 prev 指向尾节点

```python
def append(self, data):
    node = DNode(data)
    if self.is_empty():
        self._head = node
    else:
        cur = self._head
        while cur.next is not None:
            cur = cur.next
        cur.next = node
        node.prev = cur
```

- 中间位置插入
  1. 创建新节点
  2. 遍历找到要插入的位置的前驱节点
  3. 将前驱节点的next的prev指向新节点
  4. 将新节点的next指向前驱节点的next
  5. 将前驱节点的next指向新节点
  6. 将新节点的prev指向前驱节点

```python
def insert(self, pos, data):
    if self.is_empty() or pos <= 0:
        self.add(data)
    elif pos >= self.length():
        self.append(data)
    else:
        node = DNode(data)
        count = 0
        pre = self._head
        while count < pos - 1:
            count += 1
            pre = pre.next
        pre.next.prev = node
        node.next = pre.next
        pre.next = node
        node.prev = pre
```

### 链表删除

- 首尾元素的删除比较简单
- 中间元素的删除
    1. 遍历找到要删除的元素 cur
    2. cur.next.prev = cur.prev
    3. cur.prev.next = cur.next

```python
def remove(self, data):
    """删除节点"""
    cur = self._head
    while cur is not None:
        if cur.data == data:
            if cur == self._head:
                self._head = cur.next
                cur.next.prev = cur.prev
            elif cur.next is None:
                cur.prev.next = cur.next
            else:
                cur.next.prev = cur.prev
                cur.prev.next = cur.next
            break
        else:
            cur = cur.next
```

### 链表查找

```python
def search(self, data):
    """查找节点"""
    cur = self._head
    while cur is not None:
        if cur.data == data:
            return True
        cur = cur.next
    return False
```
