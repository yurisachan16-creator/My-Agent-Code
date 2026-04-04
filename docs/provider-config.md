# 模型接口配置指南

本项目当前通过以下环境变量接入模型服务：

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

核心前提是：目标服务需要提供 Anthropic 兼容接口。

## 鉴权方式

### 使用 `ANTHROPIC_AUTH_TOKEN`

适合服务端要求：

- `Authorization: Bearer <token>`

本项目会把 `ANTHROPIC_AUTH_TOKEN` 作为 Bearer Token 发送。

### 使用 `ANTHROPIC_API_KEY`

适合服务端要求：

- `x-api-key: <key>`

如果供应商明确要求 `x-api-key`，优先使用这个变量。

### 不要同时混用

虽然项目支持两种变量，但建议单次配置只保留一种主鉴权方式，避免排障时混淆。

## 默认示例：Kimi 国区

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

说明：

- 国区 Key 配国区端点
- 如果端点写成国际站 `.ai`，常见结果就是 `401 Invalid Authentication`

## Kimi 国际站

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

## 通用 Anthropic 兼容接口模板

适合自建网关、第三方代理、聚合平台，前提是对方确实提供 Anthropic 兼容层。

### Bearer Token 模式

```env
ANTHROPIC_AUTH_TOKEN=sk-xxx
ANTHROPIC_BASE_URL=https://your-provider.example.com/anthropic
ANTHROPIC_MODEL=your-model-name
ANTHROPIC_DEFAULT_OPUS_MODEL=your-model-name
ANTHROPIC_DEFAULT_SONNET_MODEL=your-model-name
ANTHROPIC_DEFAULT_HAIKU_MODEL=your-model-name
CLAUDE_CODE_SUBAGENT_MODEL=your-model-name
```

### `x-api-key` 模式

```env
ANTHROPIC_API_KEY=sk-xxx
ANTHROPIC_BASE_URL=https://your-provider.example.com/anthropic
ANTHROPIC_MODEL=your-model-name
ANTHROPIC_DEFAULT_OPUS_MODEL=your-model-name
ANTHROPIC_DEFAULT_SONNET_MODEL=your-model-name
ANTHROPIC_DEFAULT_HAIKU_MODEL=your-model-name
CLAUDE_CODE_SUBAGENT_MODEL=your-model-name
```

## 高级配置

### `CLAUDE_CODE_SUBAGENT_MODEL`

控制子 Agent 使用的模型。默认建议和 `ANTHROPIC_MODEL` 保持一致，避免主从模型能力差异过大。

### `ENABLE_TOOL_SEARCH`

控制 Tool Search 行为。

- 对 Kimi，建议设为 `false`
- 对某些兼容代理，如果确认支持相关能力，也可以设为 `true`、`auto` 或 `auto:N`

### `ANTHROPIC_CUSTOM_HEADERS`

用于补充供应商要求的额外请求头，格式是多行 `Header: Value`：

```env
ANTHROPIC_CUSTOM_HEADERS=X-Workspace-Id: demo
X-Feature-Flag: enabled
```

如果供应商要求额外组织 ID、租户 ID、网关标识等信息，可以通过这个变量补充。

## 边界说明

- 本文档面向 Anthropic 兼容接口，不把纯 OpenAI 风格接口当作本项目的直接主路径。
- 如果供应商只有 `/v1/chat/completions` 这类 OpenAI 原生接口，而没有 Anthropic 兼容层，就不能直接按本文配置。
- 排障时，优先检查三件事：
  - 端点域名是否和密钥来源一致
  - 鉴权头是否选对
  - 模型名是否是供应商真实支持的名称
