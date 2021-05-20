---
title: ROS安装避雷
date: 2021-05-18
sidebar: auto
tags: 
 - ROS
categories:
 - ROS
---

### 💣1、`sudo apt update` 无法获得锁无法对目录加锁

[解决办法](https://www.cnblogs.com/liuyang1995/p/8919986.html)

### 💣2、`sudo apt install ros-melodic-desktop-full` 提示通过 `apt-get update`和`fix-missing`来修复

解决办法`sudo apt-get -f install ros-melodic-desktop-full`

### 💣3、`sudo rosdep init` 时出现 `sudo: rosdep：找不到命令`

解决办法`sudo apt install python-rosdep`

### 💣4、`sudo rosdep init` 或 `rosdep update` 时因为网络问题报错

[解决办法](https://blog.csdn.net/sinat_25923849/article/details/107976434?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-12.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-12.control)