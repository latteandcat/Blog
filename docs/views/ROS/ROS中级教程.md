---
title: ROS中级教程
date: 2021-05-21
sidebar: auto
tags: 
 - ROS
categories:
 - ROS
---

## 手动创建ROS package

1.创建目录
``` bash
cd ~/catkin_ws
mkdir -p src/foobar
cd src/foobar 
```
2.添加package.xml
``` xml
<package>
  <name>foobar</name>
  <version>1.2.4</version>
  <description>
  This package provides foo capability.
  </description>
  <maintainer email="foobar@foo.bar.willowgarage.com">PR-foobar</maintainer>
  <license>BSD</license>

  <buildtool_depend>catkin</buildtool_depend>

  <build_depend>roscpp</build_depend>
  <build_depend>std_msgs</build_depend>

  <run_depend>roscpp</run_depend>
  <run_depend>std_msgs</run_depend>
</package>
```
3.添加CMakeLists.txt
```
cmake_minimum_required(VERSION 2.8.3)
project(foobar)
find_package(catkin REQUIRED roscpp std_msgs)
catkin_package()
```

## 管理系统依赖项

`rosdep` 是一个能够下载并安装ROS packages所需要的系统依赖项的小工具
- 用法：`rosdep install [package]`
- 第一次使用需初始化
  ```
  sudo rosdep init
  rosdep update
  ```
- 示例
  ```
  roscd turtlesim
  rosdep install turtlesim
    output: All required rosdeps installed successfully
  ```

## 自定义消息

- 自定义消息类型只需将 `.msg` 文件放到一个package的msg文件夹下即可
- 引用和输出消息类型
  - 消息类型都被归属到与package相对应的域名空间下
  - C++
    ``` cpp
    #include <std_msgs/String.h>

    std_msgs::String msg;
    ```
  - Python
    ``` py
    from std_msgs.msg import String

    msg = String()
    ```
- 依赖项
  如果你要使用在其他package里定义的消息类型，不要忘记添加以下语句到 `package.xml`
  ``` xml
  <build_depend>name_of_package_containing_custom_msg</build_depend>
  <exec_depend>name_of_package_containing_custom_msg</exec_depend>
  ```