---
layout: wiki
wiki: AiAgent
title: 工具调用设计
tags:
    - AI Agent
    - 工具调用
references:
    - title: 'Tool Use - OpenAI API'
      url: https://platform.openai.com/docs/guides/function-calling
    - title: 'Building Effective Agents - Anthropic'
      url: https://www.anthropic.com/engineering/building-effective-agents
---

<!-- more -->

## 概述

工具（Tool）是 Agent 与外部世界交互的桥梁。没有工具，Agent 只能生成文本；有了工具，Agent 才能查询数据、执行代码、操作业务系统。工具调用设计的质量直接决定了 Agent 中台的能力上限与可靠性。本文系统性地介绍工具定义、协议、调度与错误处理。

## 1. 工具的本质

一个工具封装了三类信息：

| 维度 | 说明 | 设计要点 |
|------|------|---------|
| **能力** | 工具能做什么 | 单一职责，一个工具只做一件事 |
| **描述** | 何时使用该工具 | 描述决定了 LLM 的选择准确性 |
| **契约** | 如何调用（入参/出参） | 结构化的 Schema，可被校验 |

设计原则：**工具是给 LLM 看的 API 文档**。描述写得好不好，直接决定 LLM 能否在正确的时候选中它。

## 2. 工具定义规范

一个生产级的工具定义通常包含：

```json
{
  "name": "search_documents",
  "description": "在知识库中检索文档。当用户询问内部资料、政策或过去决策时使用。",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "检索关键词" },
      "limit": { "type": "integer", "minimum": 1, "maximum": 20, "default": 5 }
    },
    "required": ["query"]
  },
  "timeout_ms": 5000,
  "rate_limit": "10/min"
}
```

### 良好描述的要素

- **做什么**：动词开头，清晰说明功能
- **何时用**：推荐「when to use / 别用」的信号词
- **参数语义**：每个参数说明其含义与可能的取值范围
- **边界**：明确返回值与错误场景

## 3. 函数调用（Function Calling）协议

主流 LLM 平台均原生支持函数调用，其交互遵循「声明 → 触发 → 填充 → 执行」流程：

```
1. 系统声明工具列表（Tool Schema）
2. LLM 决定调用哪个工具，输出结构化 JSON（工具名 + 参数）
3. 应用校验参数、执行实际函数
4. 将执行结果回填给 LLM
5. LLM 基于结果继续推理或生成最终答案
```

```python
# 伪代码：工具执行与结果回填
def dispatcher(agent_message):
    if agent_message.tool_calls:
        results = []
        for call in agent_message.tool_calls:
            tool = registry.get(call.name)
            # 校验参数、执行、捕获异常
            result = tool.execute(**call.arguments)
            results.append({"tool_call_id": call.id, "result": result})
        return results  # 回填给 LLM
    return None
```

### 协议要点

- **并行调用**：一次多轮可同时返回多个工具调用，减少往返延迟
- **参数严格校验**：执行前用 Schema 校验，防止 LLM 输出畸形 JSON
- **结果截断**：长期结果需截断/摘要，避免撑爆上下文窗口

## 4. 工具选择与路由

当工具数量增长，需要设计工具选择策略，避免把几百个工具全部塞进 Prompt：

| 策略 | 原理 | 适用场景 |
|------|------|---------|
| **全员声明** | 所有工具入上下文 | 工具 < 20 个 |
| **语义路由** | 先用 embedding 检索相关工具子集 | 工具数量大 |
| **分组命名空间** | 按域分层，先选域再选工具 | 多业务域中台 |
| **动态注册** | 按会话类型加载对应工具集 | 差异化租户/角色 |

## 5. 错误处理与可靠性

工具调用是最容易产生运行时错误的环节，必须覆盖以下场景：

- **超时**：设置超时上限，超时返回「工具无响应」而非挂起
- **限流/配额**：对高频工具内置熔断与降级
- **依赖不可用**：上游服务故障时返回可理解的错误信息
- **参数非法**：LLM 重复出错时可让 Agent 重新表述诉求
- **重试策略**：临时性错误（网络抖动）指数退避重试
- **幂等性**：写操作工具尽量设计成幂等，防止重复执行造成副作用

```python
# 伪代码：带熔断的工具执行
def safe_execute(tool, **kwargs):
    if circuit_breaker.is_open(tool.name):
        return ToolResult(status="UNAVAILABLE", msg="工具暂不可用，请稍后重试")
    try:
        result = asyncio.wait_for(tool.execute(**kwargs), timeout=tool.timeout_ms)
        circuit_breaker.on_success(tool.name)
        return result
    except asyncio.TimeoutError:
        circuit_breaker.on_failure(tool.name)
        return ToolResult(status="TIMEOUT", msg="工具执行超时")
    except Exception as e:
        return ToolResult(status="ERROR", detail=str(e))
```

## 6. 工具网关（Tool Gateway）

在 Agent 中台里，工具通常不能直接暴露内部系统，需要一层**工具网关**做统一治理：

- **身份与鉴权**：统一签发凭证，限制每个 Agent 的权限范围
- **审计日志**：记录谁在何时调用了哪个工具、参数与结果摘要
- **参数脱敏**：拦截敏感字段（密钥、身份证、手机号）
- **配额管理**：按 Agent/租户分配调用额度
- **协议适配**：将内部 RPC/HTTP 接口统一包装为 Tool Schema

## 7. 最佳实践小结

1. 从**少量高质量工具**开始，工具过多会稀释 LLM 的选择准确率
2. 描述里写清「何时用、何时别用」，最能提升命中率
3. 为写操作提供**确认节点**（Human-in-the-loop）
4. 所有工具返回**结构化结果**，便于 Agent 判断下一步
5. 建立工具**测试集**，用真实场景回归验证工具描述质量