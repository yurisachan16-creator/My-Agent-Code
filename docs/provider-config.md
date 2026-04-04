# 模型接口配置指南

本项目通过以下环境变量接入模型服务：

- `ANTHROPIC_BASE_URL`
- `ANTHROPIC_AUTH_TOKEN`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`
- `ANTHROPIC_DEFAULT_OPUS_MODEL`
- `ANTHROPIC_DEFAULT_SONNET_MODEL`
- `ANTHROPIC_DEFAULT_HAIKU_MODEL`
- `CLAUDE_CODE_SUBAGENT_MODEL`
- `ENABLE_TOOL_SEARCH`
- `ANTHROPIC_CUSTOM_HEADERS`

核心前提：目标服务需要提供 Anthropic 兼容接口。

---

## 鉴权方式

两种鉴权变量对应不同的请求头，按供应商要求二选一，不要同时混用：

| 变量 | 发送的请求头 |
| --- | --- |
| `ANTHROPIC_AUTH_TOKEN` | `Authorization: Bearer <token>` |
| `ANTHROPIC_API_KEY` | `x-api-key: <key>` |

---

## Kimi 国区（platform.moonshot.cn）

适用于 `platform.kimi.com` / `platform.moonshot.cn` 体系的 API Key。

```env
ANTHROPIC_AUTH_TOKEN=sk-xxx
ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
ANTHROPIC_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_OPUS_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_SONNET_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_HAIKU_MODEL=kimi-k2.5
CLAUDE_CODE_SUBAGENT_MODEL=kimi-k2.5
ENABLE_TOOL_SEARCH=false
```

> 国区 Key 必须配国区端点（`.cn`）。端点写成 `.ai` 最常见的结果是 `401 Invalid Authentication`。

---

## Kimi 国际站（api.moonshot.ai）

适用于国际站 API Key。

```env
ANTHROPIC_AUTH_TOKEN=sk-xxx
ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic
ANTHROPIC_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_OPUS_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_SONNET_MODEL=kimi-k2.5
ANTHROPIC_DEFAULT_HAIKU_MODEL=kimi-k2.5
CLAUDE_CODE_SUBAGENT_MODEL=kimi-k2.5
ENABLE_TOOL_SEARCH=false
```

---

## 通用 Anthropic 兼容接口

适合自建网关、第三方代理、聚合平台，前提是对方提供 Anthropic 兼容层。

Bearer Token 模式：

```env
ANTHROPIC_AUTH_TOKEN=sk-xxx
ANTHROPIC_BASE_URL=https://your-provider.example.com/anthropic
ANTHROPIC_MODEL=your-model-name
ANTHROPIC_DEFAULT_OPUS_MODEL=your-model-name
ANTHROPIC_DEFAULT_SONNET_MODEL=your-model-name
ANTHROPIC_DEFAULT_HAIKU_MODEL=your-model-name
CLAUDE_CODE_SUBAGENT_MODEL=your-model-name
```

`x-api-key` 模式：

```env
ANTHROPIC_API_KEY=sk-xxx
ANTHROPIC_BASE_URL=https://your-provider.example.com/anthropic
ANTHROPIC_MODEL=your-model-name
ANTHROPIC_DEFAULT_OPUS_MODEL=your-model-name
ANTHROPIC_DEFAULT_SONNET_MODEL=your-model-name
ANTHROPIC_DEFAULT_HAIKU_MODEL=your-model-name
CLAUDE_CODE_SUBAGENT_MODEL=your-model-name
```

---

## 高级配置

### `CLAUDE_CODE_SUBAGENT_MODEL`

控制子 Agent 使用的模型。建议和 `ANTHROPIC_MODEL` 保持一致，避免主从模型能力差异过大。

### `ENABLE_TOOL_SEARCH`

控制 Tool Search 行为。

- 对 Kimi，建议设为 `false`；
- 对确认支持相关能力的代理，可设为 `true`、`auto` 或 `auto:N`。

### `ANTHROPIC_CUSTOM_HEADERS`

补充供应商要求的额外请求头，格式为多行 `Header: Value`：

```env
ANTHROPIC_CUSTOM_HEADERS=X-Workspace-Id: demo
X-Feature-Flag: enabled
```

---

## 边界说明

本文档面向 Anthropic 兼容接口，不把纯 OpenAI 风格接口（`/v1/chat/completions`）当作直接主路径说明。

排障时优先检查三点：

1. 端点域名是否和密钥来源一致；
2. 鉴权头是否选对（`Bearer` vs `x-api-key`）；
3. 模型名是否是供应商真实支持的名称。
