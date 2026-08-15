---
title: Presenton 本地部署测试
date: 2026-08-15
categories:
 - AI
---

# Presenton 本地部署测试

[AI Presentation Maker & Open-Source API | Presenton](https://presenton.ai/)

[repo](https://github.com/presenton/presenton)

## 下载镜像

```bash
docker pull ghcr.io/presenton/presenton:v0.9.3-beta 
```

## 数据与配置

创建数据目录

```bash
# 创建数据目录
mkdir presenton
cd presenton
mkdir app_data
```

创建配置文件`.env`并配置模型为deepseek

```bash
# 创建配置文件
touch .env
chmod 600 .env
nano .env
```

环境变量具体配置见 [Environment variables](https://docs.presenton.ai/hosting/environment-variables)

暂不配置图片模型因此设置 `DISABLE_IMAGE_GENERATION=true`

```
LLM=deepseek
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_API_KEY=xxx
DEEPSEEK_MODEL=deepseek-v4-pro
CAN_CHANGE_KEYS=false
DISABLE_IMAGE_GENERATION=true
```

## 启动镜像

```bash
# 启动presenton
docker run -d \
  --name presenton \
  --restart unless-stopped \
  -p 127.0.0.1:5000:80 \
  --env-file /home/xxx/presenton/.env \
  -v /home/xxx/presenton/app_data:/app_data \
  ghcr.io/presenton/presenton:v0.9.3-beta
```

## 查看日志

```
docker logs -f presenton
```

## 删除镜像

```bash
docker rm -f presenton
```

## 异常问题

1. Exception: IMAGE_PROVIDER must be provided 

   解决方法：配置图片提供商或增加环境变量`DISABLE_IMAGE_GENERATION=true`

2. 模型连接超时：

   解决方法：调整`.env`为deepseek专有配置

3. Presentation memory 使用的 fastembed 模型在局域网环境无法从 hugging face 下载

   解决方法：暂无有效方法，可设置`MEM0_ENABLED=false`禁用记忆

## 测试提示词

```
请生成一份主题为《AI Agent：从大语言模型到自主智能体》的中文演示文稿。

受众：对人工智能有基础了解的产品经理、开发者和企业管理人员  
页数：10页  
演讲时长：约15分钟  
整体风格：专业、现代、科技感，逻辑清晰，避免堆砌文字
排版要求：每页突出一个核心观点，每页正文不超过5个要点，尽量使用图示、流程图、对比表和时间线  
语言要求：简体中文，专业但通俗易懂，避免过多英文术语；首次出现 Agent 时标注“智能体”

请按照以下结构生成：

第1页：封面  
标题：AI Agent：从大语言模型到自主智能体  
副标题：理解智能体的原理、架构、应用与未来  
画面建议：一个连接模型、工具、数据和现实任务的智能中枢

第2页：什么是 AI Agent  
解释 AI Agent 的定义，以及它与普通聊天机器人的区别  
强调四个关键词：感知、推理、行动、反馈  
使用简洁对比图展示“聊天机器人”和“AI Agent”

第3页：为什么 Agent 正在兴起  
介绍大语言模型、工具调用、长上下文、多模态和工作流技术的发展  
说明 AI 从“回答问题”走向“完成任务”的趋势  
使用技术演进时间线展示发展过程

第4页：Agent 的核心工作循环  
展示完整流程：接收目标 → 理解环境 → 制定计划 → 调用工具 → 执行动作 → 检查结果 → 调整策略  
用闭环流程图呈现，并解释每个阶段的作用

第5页：典型 Agent 系统架构  
包括用户目标、大语言模型、规划模块、记忆系统、工具集合、知识库、执行环境和安全控制  
使用分层架构图，明确各模块之间的信息流向

第6页：单 Agent 与多 Agent  
对比单智能体和多智能体系统  
多 Agent 示例角色：规划者、研究员、执行者、审查者  
用表格比较复杂度、协作能力、成本、可靠性和适用场景

第7页：典型应用场景  
介绍软件开发、数据分析、客户服务、知识检索、办公自动化和科研辅助  
每个场景说明 Agent 能完成的具体任务  
采用六宫格卡片布局，并配合简洁图标

第8页：一个真实任务示例  
案例：市场研究 Agent 自动生成新能源汽车行业分析报告  
展示步骤：拆解问题 → 搜集资料 → 验证来源 → 分析数据 → 生成图表 → 撰写报告 → 人工审核  
用横向工作流展示整个过程

第9页：风险与治理  
涵盖幻觉、错误工具调用、数据泄露、提示词注入、权限失控、成本不可控和责任边界  
给出对应措施：最小权限、沙箱隔离、人工审批、日志审计、结果验证和预算限制  
使用“风险—对策”双栏表格

第10页：总结与展望  
总结三个观点：  
1. Agent 的核心价值是完成任务，而不仅是生成内容  
2. 可靠的 Agent 需要模型、工具、记忆、流程和治理共同配合  
3. 未来将形成由人类监督、多智能体协作的数字工作团队  
结尾加入一句有记忆点的话：“大模型提供智能，Agent 让智能真正开始行动。”

请为每页生成准确的标题、精炼的正文和合适的视觉内容。不要编造具体市场规模、增长率或未经证实的统计数字。
```