---
title: ROS初级教程
date: 2021-05-19
sidebar: auto
tags: 
 - ROS
categories:
 - ROS
---

## ROS文件系统

- 软件包  
  包是ROS代码的软件组织单元，每个软件包都可以包含程序库、可执行文件、脚本或其他构件。
- Manifests  
  清单（Manifest）是对软件包的描述。它用于定义软件包之间的依赖关系，并记录有关软件包的元信息，如版本、维护者、许可证等。
- 内置命令工具
  - rospack
  获取软件包的所在路径 `rospack find [package_name]`
  - roscd
    - 切换目录到软件包或者软件包集 `roscd [locationname[/subdir]]`  
    - 进入日志文件目录 `roscd log`
  ::: tip  
  就像ROS中的其它工具一样，roscd只能切换到那些路径已经包含在ROS_PACKAGE_PATH环境变量中的软件包，可以通过 `$ echo $ROS_PACKAGE_PATH` 查看ROS_PACKAGE_PATH环境变量中包含的路径
  :::
  - rosls
    直接按软件包的名称执行ls命令 `rosls [locationname[/subdir]]`
  - TAB补全
    - 使用TAB键可以补全较长的软件包名称
    - 查看当前安装的所有软件包 `rosls 双击TAB`

## 创建ROS软件包

- catkin软件包的组成
  - 一个符合catkin规范的package.xml文件
  - 一个catkin版本的CMakeLists.txt文件
  - 每个包必须有自己的目录
- 开发方法：推荐使用catkin工作空间
- 创建catkin软件包  
  ``` bash
  1、创建一个新的catkin软件包
  catkin_create_pkg <package_name> [depend1] [depend2] [depend3]
  2、在catkin工作区中构建软件包
  cd ~/catkin_ws
  catkin_make
  3、要将这个工作空间添加到ROS环境中，你需要source一下生成的配置文件
  source ~/catkin_ws/devel/setup.bash
  ```
- 软件包的依赖关系
  ``` bash
  cd ~/catkin_ws/src
  // std_msgs rospy roscpp 即为beginner_tutorials的一级依赖
  catkin_create_pkg beginner_tutorials std_msgs rospy roscpp
  // 查看一级依赖
  rospack depends1 beginner_tutorials
  // 查看间接依赖
  rospack depends1 rospy
  // 查看所有依赖
  rospack depends beginner_tutorials
  ```

## 构建ROS软件包

```bash
cd ~/catkin_ws
// 构建src目录下的所有catkin项目
catkin_make
// 构建my_src目录下的所有catkin项目
catkin_make --source my_src
```

## 理解ROS节点
 
计算图（Computation Graph）是一个由ROS进程组成的点对点网络，它们能够共同处理数据。ROS的基本计算图概念有节点（Nodes）、主节点（Master）、参数服务器（Parameter Server）、消息（Messages）、服务（Services）、话题（Topics）和袋（Bags），它们都以不同的方式向图（Graph）提供数据。
- 节点（Nodes）
  - 节点是一个ROS软件包中的可执行文件
  - 节点使用ROS客户端库与其他节点通信
  - 节点可以发布或订阅话题
  - 节点可以提供或使用服务
- 消息（Messages）：订阅或发布话题时所使用的ROS数据类型
- 话题（Topics）：节点可以将消息发布到话题，或通过订阅话题来接收消息
- 主节点（Master）：ROS的命名服务，例如帮助节点发现彼此
- 客户端库
  - ROS客户端库可以让用不同编程语言编写的节点进行相互通信
  - rospy = Python客户端库
  - roscpp = C++客户端库 
- rosout：在ROS中相当于stdout/stderr（标准输出/标准错误）
- roscore
  - 主节点 + rosout + 参数服务器
  - `roscore` 在运行所有ROS程序前首先要运行的命令
- rosnode
  - `rosnode list` 列出当前活动的节点
  - `rosnode info` 返回某个指定节点的信息
  - `rosnode ping [node_name]` 测试某个节点是否正常
- rosrun
  - `rosrun [package_name] [node_name]` 可以直接用包名运行软件包内的节点
  - `rosrun [package_name] [node_name] __name:=my_name` 使用重映射参数来改变节点名称
  ``` bash
  rosrun turtlesim turtlesim_node
  rosnode list
    /rosout
    /turtlesim   
  rosrun turtlesim turtlesim_node __name:=my_turtle
  rosnode list
    /rosout
    /my_turtle 
  rosnode ping my_turtle
  ```

## 理解ROS话题

节点之间是通过ROS话题来相互通信的

- 用动态的图显示系统中相互通信的节点 `rosrun rqt_graph rqt_graph`
- 在滚动时间图上显示发布到某个话题上的数据 `rosrun rqt_plot rqt_plot`
- `rostopic` 命令工具
  - 显示发布在某个话题上的数据 `rostopic echo [topic]`
  - 列出当前已被订阅和发布的所有话题 `rostopic list -b/-v/-p/-s/-h`
  - 话题的通信是通过节点间发送ROS消息实现的
    - 查看所发布话题的消息类型 `rostopic type [topic]`
    - 查看消息的详细消息 `rosmsg show [msg_type]`
    - 结合 `rostopic type [topic] | rosmsg show`
  - `rostopic pub` 可以把数据发布到当前某个正在广播的话题上
    - `rostopic pub [topic] [msg_type] [args]`
    - 使用 `rostopic pub -r` 可以发布源源不断的命令
    ``` bash
    // -1代表只发布一条消息然后退出 --用来告诉选项解析器之后的参数都不是选项
    rostopic pub -1 /turtle1/cmd_vel geometry_msgs/Twist -- '[2.0, 0.0, 0.0]' '[0.0, 0.0, 1.8]'
    // 1代表发布的频率为1HZ
    rostopic pub /turtle1/cmd_vel geometry_msgs/Twist -r 1 -- '[2.0, 0.0, 0.0]' '[0.0, 0.0, -1.8]'
    ```
  - 报告数据发布的速率 `rostopic hz [topic]`

## 理解ROS服务和参数

ROS服务是节点之间通讯的另一种方式，服务允许节点发送一个请求（request）并获得一个响应（response）

- rosservice
  - `rosservice list` 输出活跃服务的信息
  - `rosservice type [service]` 输出服务的类型
  - `rosservice call [service] [args]` 调用指定服务
    ``` bash
    // 无参数的调用
    rosservice call /clear
    // 有参数的调用
    rosservice type /spawn | rossrv show
      float32 x
      float32 y
      float32 theta
      string name
      ---
      string name
    rosservice call /spawn 2 2 0.2 ""
      name: turtle2
    ```
  - `rosservice find` 按服务的类型查找服务
  - `rosservice uri` 输出服务的ROSRPC uri
- rosparam
  - rosparam可以在ROS参数服务器（Parameter Server）上存储和操作数据
  - 参数服务器能够存储整型（integer）、浮点（float）、布尔（boolean）、字典（dictionaries）和列表（list）等数据类型
  - rosparam使用YAML标记语言的语法
  - `rosparam list` 列出参数名
  - `rosparam set [param_name] [arg]` 设置参数
  - `rosparam get [param_name]` 获取参数
  - `rosparam get /` 显示参数服务器上的所有内容
  - `rosparam delete` 删除参数
  - `rosparam dump [file_name] [namespace]` 向文件中转储参数
  - `rosparam load [file_name] [namespace]` 从文件中加载参数

## 使用rqt_console和roslaunch

- rqt_console连接到了ROS的日志框架，以显示节点的输出信息
  `rosrun rqt_console rqt_console`
- rqt_logger_level允许我们在节点运行时改变输出信息的详细级别，包括Debug、Info、Warn和Error
  `rosrun rqt_logger_level rqt_logger_level`
  ::: tip
  日志记录器级别从高到低为Fatal Error Warn Info Debug  
  通过设置日志级别可以获得所有优先级级别，或只是更高级别的消息
  :::
- roslaunch可以用来启动定义在launch（启动）文件中的节点
  - `roslaunch [package] [filename.launch]`
  - Example
  ```bash
  cd ~/catkin_ws
  source devel/setup.bash
  roscd beginner_tutorials
  mkdir launch
  cd launch
  // 创建launch文件
  touch turtlemimic.launch
  ```
  turtlemimic.launch
  ``` xml
  <launch>
    <!-- 创建了两个分组，并以命名空间（namespace）标签来区分 -->
    <!-- 两个分组中都有相同的名为sim的turtlesim节点。这样可以让我们同时启动两个turtlesim模拟器，而不会产生命名冲突 -->
    <!-- turtulesim1 -->
    <group ns="turtlesim1">
      <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
    </group>
    <!-- turtulesim2 -->
    <group ns="turtlesim2">
      <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
    </group>
    <!-- 模仿节点 -->
    <node pkg="turtlesim" name="mimic" type="mimic">
      <remap from="input" to="turtlesim1/turtle1"/>
      <remap from="output" to="turtlesim2/turtle1"/>
    </node>
  </launch>
  ```
  然后通过roslaunch来运行lanunch文件
  ``` bash
  // 运行launch文件
  roslaunch beginner_tutorials turtlemimic.launch
  // 发布命令给turtlesim1
  rostopic pub /turtlesim1/turtle1/cmd_vel geometry_msgs/Twist -r 1 -- '[2.0, 0.0, 0.0]' '[0.0, 0.0, -1.8]'
  // /turtlesim1/sim => mimic =>  /turtlesim2/sim
  ```
## 使用rosed在ROS中编辑文件

rosed是rosbash套件的一部分。利用它可以直接通过软件包名编辑包中的文件，而无需键入完整路径。
- 用法：`rosed [package_name] [filename]`
- 示例：`rosed roscpp Logger.msg`
- 查看包中所有文件 `rosed [package_name] <tab><tab>`

## 创建ROS消息和服务

### msg和srv介绍
- msg（消息）
  - msg文件就是文本文件，用于描述ROS消息的字段
  - msg文件用于为不同编程语言编写的消息生成源代码
  - msg文件存放在软件包的msg目录下
  - msg文件每行都有一个字段类型和字段名称
  - msg可使用的类型有
    - int8, int16, int32, int64 (以及 uint*)
    - float32, float64
    - string
    - time, duration
    - 其他msg文件
    - variable-length array[] 和 fixed-length array[C]
    - 特殊的数据类型：Header (含有时间戳和ROS中广泛使用的坐标帧信息)
  - Example
    ```
    Header header
    string child_frame_id
    geometry_msgs/PoseWithCovariance pose
    geometry_msgs/TwistWithCovariance twist
    ```
- srv（服务）
  - 一个srv文件描述一个服务
  - srv文件由请求（request）和响应（response）组成，这两部分用一条---线隔开
  - srv文件存放在srv目录下
  - Example (A和B是请求, Sum是响应)
    ```
    int64 A
    int64 B
    ---
    int64 Sum
    ```
### msg和srv的创建和使用

- 创建msg
  ``` bash
  roscd beginner_tutorials
  mkdir msg
  echo "int64 num" > msg/Num.msg
  ```
  添加依赖到package.xml
  ``` xml
  <build_depend>message_generation</build_depend>
  <exec_depend>message_runtime</exec_depend>
  ```
  修改CMakeLists.txt
  ```
  // 1.为已经存在里面的find_package调用添加message_generation依赖项
  find_package(catkin REQUIRED COMPONENTS
    roscpp
    rospy
    std_msgs
    message_generation
  )
  // 2.确保导出消息的运行时依赖关系
  catkin_package(
    ...
    CATKIN_DEPENDS message_runtime
    ...
  )
  // 3.手动添加.msg文件
  add_message_files(
    FILES
    Num.msg
  )
  // 4.确保generate_messages()函数被调用
  generate_messages(
    DEPENDENCIES
    std_msgs
  )
  ```
- 使用rosmsg
  - 用法 `rosmsg show [message type]`
  - Example
    ``` bash
    // 带包名
    rosmsg show beginner_tutorials/Num
    // 不带报名
    rosmsg show Num
    ```
- 创建srv  
  ``` bash
  roscd beginner_tutorials
  mkdir srv
  roscp rospy_tutorials AddTwoInts.srv srv/AddTwoInts.srv
  ```
  注：roscp用于将文件从一个包复制到另一个包 `roscp [package_name] [file_to_copy_path] [copy_path]`  
  添加依赖到package.xml
  ``` xml
  <build_depend>message_generation</build_depend>
  <exec_depend>message_runtime</exec_depend>
  ```
  修改CMakeLists.txt
  ```
  // 1.为已经存在里面的find_package调用添加message_generation依赖项
  find_package(catkin REQUIRED COMPONENTS
    roscpp
    rospy
    std_msgs
    message_generation
  )
  // 2.确保导出消息的运行时依赖关系
  catkin_package(
    ...
    CATKIN_DEPENDS message_runtime
    ...
  )
  // 3.手动添加.srv文件
  add_service_files(
    FILES
    AddTwoInts.srv
  )
  // 4.确保generate_messages()函数被调用
  generate_messages(
    DEPENDENCIES
    std_msgs
  )
  ```
- 使用rossrv
  - 用法：`rossrv show <service type>`
  - Example
    ``` bash
    // 带包名
    rossrv show beginner_tutorials/AddTwoInts
    // 不带报名
    rossrv show AddTwoInts
    ```
### msg和srv的一般步骤

修改CMakeLists.txt
```
generate_messages(
  DEPENDENCIES
  # 取消注释，然后添加任意你的消息用到的包含.msg文件的软件包（本例中为std_msgs）
  std_msgs
)
```
重新make软件包
``` bash
roscd beginner_tutorials
cd ../..
catkin_make
cd -
```
::: tip
msg目录中的任何.msg文件都将生成所有支持语言的代码。C++消息的头文件将生成在~/catkin_ws/devel/include/beginner_tutorials/。Python脚本将创建在~/catkin_ws/devel/lib/python2.7/dist-packages/beginner_tutorials/msg。而Lisp文件则出现在~/catkin_ws/devel/share/common-lisp/ros/beginner_tutorials/msg/。

类似地，srv目录中的任何.srv文件都将生成支持语言的代码。对于C++，头文件将生成在消息的头文件的同一目录中。对于Python和Lisp，会在msg目录旁边的srv目录中。
:::

## 录制和回放数据

- 录制数据
  - 录制所有话题 `rosbag record -a`
  - 仅录制感兴趣的话题即数据子集 `rosbag record -O <bagfile_name> <topic1> <topic2>`
- 查看bag文件
  - 查看所有话题的信息 `rosbag info <your bagfile>`
  - 查看指定话题的信息 `rosbag info mybag.bag | grep -E "(topic1|topic2|topic3)"`
- 回放bag文件
  - `rosbag play <your bagfile>`
  - rosbag play命令在公告每条消息后会等待一小段时间（0.2秒）才真正开始发布bag文件中的内容，等待时间可以通过`-d`选项来指定
  - `-s` 参数选项让rosbag play不从bag文件的开头开始，而是从某个指定的时间开始
  - `-r` 选项允许通过设定一个参数来改变消息发布速率 如 `rosbag play -r 2 <your bagfile>`
  - `--immediate` 尽可能快地回放bag文件
  - `--topics topic1 topic2 ... topicN` 只回放感兴趣的话题
- 局限性  
  rosbag受制于其本身的性能无法完全复制录制时的系统运行行为，rosplay也一样。对于像turtlesim这样的节点，当处理消息的过程中系统定时发生极小变化时也会使其行为发生微妙变化，用户不应该期望能够完美地模仿系统行为。
- 从bag文件中读取所需话题的消息的两种方法
  - 方法1：立即回放消息并在多个终端中查看输出
    ``` bash
    roscore
    // 订阅topic1并复读该话题上发布的所有内容，同时用tee命令转储到一个yaml格式的文件中以便之后查看
    rostopic echo /topic1 | tee topic1.yaml
    // 对其他你感兴趣的话题重复这一步骤，每个话题必须有自己的终端
    rostopic echo /topic2 | tee topic2.yaml
    // 回放bag文件
    rosbag play --immediate demo.bag --topics /topic1 /topic2
    // 在topic1.yaml和topic2.yaml中查看文件中的消息
    ```
  - 方法2：使用ros_readbagfile脚本  
    1.下载并安装ros_readbag.py
    ``` bash
    #下载脚本文件
    wget https://raw.githubusercontent.com/ElectricRCAircraftGuy/eRCaGuy_dotfiles/master/useful_scripts/ros_readbagfile.py
    # 赋予执行权限
    chmod +x ros_readbagfile.py
    # 创建bin路径
    mkdir -p ~/bin
    # 将脚本放入bin文件夹中 并更改成ros_readbagfile的脚本名
    mv ros_readbagfile.py ~/bin/ros_readbagfile
    # resource环境脚本
    . ~/.bashrc
    ```
    2.通过rosbag_info命令确定要从bag文件中读取的准确话题名  
    3.使用ros_readbagfile
    - 默认Python版本为Python3
      `ros_readbagfile <mybagfile.bag> [topic1] [topic2] [topic3] [...]`
    - 默认Python版本为Python2
      `python ros_readbagfile.py <mybagfile.bag> [topic1] [topic2] [topic3] [...]`
    - Example
      ``` bash
      # python3
      ros_readbagfile ~/bagfiles/subset.bag /turtle1/cmd_vel | tee subset.yaml
      # python2
      wget https://raw.githubusercontent.com/ElectricRCAircraftGuy/eRCaGuy_dotfiles/master/useful_scripts/ros_readbagfile.py
      python ros_readbagfile.py ~/bagfiles/subset.bag /turtle1/cmd_vel | tee subset.yaml
      ```
  - 对比
    - rostopic极慢，ros_readbagfile脚本较快
    - rostopic一次只能读取单个话题，而ros_readbagfile脚本可以同时读取任意多的话题

## roswtf入门

- 用法：`roswtf` 可以检查你的系统并尝试发现问题
- 输出信息
  - package or stack in context
  - Static checks summary  
    报告任何关于文件系统或非运行时（比如无需roscore的场景）的问题
  - Online graph checks
    - roscore未运行时不会进行
    - roscore在运行时会进行ROS图的在线检查，检查过程的长短取决于正在运行的ROS节点数量
- `roswtf` 会对一些系统中看起来异常但可能是正常的运行情况发出警告，也会对确实有问题的情况报告错误  
  Example
  ```
  roscd
  ROS_PACKAGE_PATH=bad:$ROS_PACKAGE_PATH
  roswtf
  ```
  检查信息
  ```
  Stack: ros
  ================================================================================
  Static checks summary:

  Found 1 error(s).

  ERROR Not all paths in ROS_PACKAGE_PATH [bad] point to an existing directory: 
   * bad

  ================================================================================

  Cannot communicate with master, ignoring graph checks
  ```

