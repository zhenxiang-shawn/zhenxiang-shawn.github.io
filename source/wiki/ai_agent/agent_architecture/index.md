---
layout: wiki
wiki: AiAgent
title: Agent 架构模式
tags:
    - AI Agent
    - 架构设计
---

<!-- more -->

## 概述

Agent 架构模式决定了智能体如何感知、推理和行动。选择正确的架构模式是 Agent 中台设计的首要决策。本文介绍几种主流模式及其适用场景。

## 1. ReAct (Reasoning + Acting)

ReAct 是当前最广泛使用的 Agent 基础模式，由 Shunyu Yao 等人于 2022 年提出。其核心思想是让 LLM 交替进行**推理**和**行动**，形成思考-行动-观察的循环。

```
循环: Thought → Action → Observation → Thought → ...
```

**工作流程：**

```
用户问题: "纽约天气怎么样？"

Thought: 用户想知道纽约的天气，我需要查询天气API。
Action: call weather_api(city="New York")
Observation: {"temp": 22, "condition": "sunny", "humidity": 65%}

Thought: 已获取到纽约天气数据，温度为22°C，晴，湿度65%。
Action: 输出最终答案
```

**优点：**
- 推理过程透明，可追溯
- 适合需要多步推理的任务
- 实现简单，框架支持广泛

**缺点：**
- 串行执行，延迟较高
- Token 消耗大
- 缺乏长程规划能力

**适用场景：**
- 问答系统、知识检索
- 简单工具调用链
- 代码生成与执行

## 2. Plan-and-Execute

先规划后执行，将复杂任务分解为子任务 DAG（有向无环图），再并行或串行执行子任务。

```
输入 → Planner(规划器) → [子任务1, 子任务2, ...] → Executor(执行器) → 合并结果
```

**工作流程：**

```
用户问题: "分析这份财报并生成一份PPT简报"

Plan:
  1. 读取财报PDF (依赖: 无)
  2. 提取关键财务指标 (依赖: 1)
  3. 分析趋势和异常 (依赖: 2)
  4. 生成PPT草稿 (依赖: 3)
  5. 美化PPT模板 (依赖: 4)

Execute: 按依赖关系依次执行 1→2→3→4→5
```

**优点：**
- 全局规划，避免局部最优
- 可并行执行无依赖的子任务
- 执行过程可中断、可恢复

**缺点：**
- 规划器可能规划错误
- 对动态变化的环境适应性差
- 规划本身消耗 Token

**适用场景：**
- 长流程任务（报告生成、数据处理）
- 工作流自动化
- 多步骤业务流程

## 3. Multi-Agent 协作

多个 Agent 各自扮演不同角色，通过协作完成任务。每个 Agent 有独立的角色定义、工具集和记忆。

```
 Orchestrator(协调器)
    ├── Researcher(研究员) — 信息检索
    ├── Analyst(分析师) — 数据分析
    ├── Writer(写手) — 内容生成
    └── Reviewer(审核员) — 质量检查
```

**协作模式对比：**

| 模式 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| **Orchestrator** | 中央协调器调度子 Agent | 控制力强，逻辑清晰 | 单点瓶颈 |
| **Debate** | 多 Agent 辩论达成共识 | 质量高，减少幻觉 | Token 成本高 |
| **Peer-to-Peer** | Agent 间自由通信 | 灵活，去中心化 | 难以调试 |

**设计要点：**

- **角色定义**：每个 Agent 的 system prompt 要明确职责边界
- **通信协议**：定义 Agent 间的消息格式和传递方式
- **冲突解决**：多个 Agent 意见不一致时的仲裁机制
- **资源隔离**：每个 Agent 的上下文窗口和 Token 预算

**适用场景：**
- 复杂文档生成（研究→撰写→审核）
- 代码审查与质量保证
- 模拟仿真（角色扮演、市场模拟）

## 4. Reflection 模式

Agent 在执行过程中不断反思自己的输出，进行自我修正。这是提升 Agent 输出质量的重要模式。

```
生成 → 自我评估 → 发现缺陷 → 修正 → 再评估 → 最终输出
```

**实现方式：**

```python
# 伪代码示例
def agent_with_reflection(task):
    output = generate_initial(task)
    for i in range(max_rounds):
        evaluation = evaluate_output(output, task)
        if evaluation.is_satisfactory():
            return output
        output = revise_output(output, evaluation.feedback)
    return output
```

**关键设计：**
- **评估标准**：定义明确的评估维度（完整性、准确性、格式）
- **反馈粒度**：逐句反馈 vs 整体反馈
- **终止条件**：最大轮次、时间预算、质量阈值

**适用场景：**
- 代码生成（自动修复编译错误）
- 内容创作（文章、报告的多轮润色）
- 数学推理（验证和修正计算步骤）

## 5. Tool-Augmented 模式

Agent 通过工具调用扩展自身能力边界。工具是 Agent 与外部世界交互的桥梁。

**工具分类：**

| 类别 | 示例 | 用途 |
|------|------|------|
| 信息检索 | Web Search, Vector DB, SQL | 获取外部知识 |
| 代码执行 | Python REPL, Sandbox | 运行代码验证逻辑 |
| API 调用 | Slack, Email, CRM | 操作外部系统 |
| 文件操作 | 读写文件, 图片处理 | 处理本地资源 |
| 数据转换 | JSON 解析, 格式转换 | 数据处理 |

**工具定义规范：**

一个好的工具定义需要包含：
- **名称**：清晰、唯一
- **描述**：说明工具功能和适用场景（LLM 据此选择工具）
- **参数**：JSON Schema 定义参数类型和约束
- **返回值**：定义返回格式
- **错误处理**：超时、限流、异常时的 fallback

## 架构模式选型指南

```
任务类型 → 推荐模式
  ├── 简单问答 → ReAct
  ├── 多步流程 → Plan-and-Execute
  ├── 协作创作 → Multi-Agent
  ├── 质量敏感 → ReAct + Reflection
  └── 复杂综合 → Plan-and-Execute + Multi-Agent
```

**实际生产建议：**
1. 从 **ReAct** 开始，这是最成熟、社区支持最完善的基础模式
2. 当任务复杂度增加时，逐步引入 **Plan-and-Execute** 和 **Reflection**
3. 只有在需要明确角色分工时才使用 **Multi-Agent**
4. 所有模式都应支持 **Human-in-the-Loop**（人工审核节点）

## 参考

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Building Effective Agents - Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- [Agentic Design Patterns - DeepLearning.AI](https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-1/)
- [Language Agent Tree Search](https://arxiv.org/abs/2310.04406)