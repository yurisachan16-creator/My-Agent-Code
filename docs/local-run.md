# 本地运行指南

本项目推荐统一使用 `package.json` 中的脚本启动：

```bash
bun run start
```

当前可用脚本见 [package.json](../package.json)：

- `bun run start`
- `bun run start -- -p "prompt"`
- `bun run start:recovery`

## 前置条件

- Node.js >= 18
- Bun 1.3+
- 已执行 `npm install`
- 已配置 `.env`

## Windows

推荐使用 PowerShell。

### 安装依赖

```powershell
cd "D:\社团练习\claude-code-haha-main"
npm install
Copy-Item .env.example .env
```

编辑 `.env`，填入你的 API Key 和接口配置。

### 启动

```powershell
bun run start
```

### 单次问答

```powershell
bun run start -- -p "你好"
```

### Recovery CLI

```powershell
bun run start:recovery
```

## macOS

### 安装依赖

```bash
cd /path/to/claude-code-haha-main
npm install
cp .env.example .env
```

### 启动

```bash
bun run start
```

### 单次问答

```bash
bun run start -- -p "hello"
```

### Recovery CLI

```bash
bun run start:recovery
```

## Linux

### 安装依赖

```bash
cd /path/to/claude-code-haha-main
npm install
cp .env.example .env
```

### 启动

```bash
bun run start
```

### 单次问答

```bash
bun run start -- -p "hello"
```

### Recovery CLI

```bash
bun run start:recovery
```

## 推荐的 `.env` 使用方式

1. 从 `.env.example` 复制
2. 只在 `.env` 中填写真实密钥
3. 不要把真实密钥写回 `.env.example`
4. 修改 `.env` 后，重新打开终端再启动，避免旧环境变量残留

## 常见问题

### `bun` 未安装

先确认：

```bash
bun -v
```

如果提示找不到命令，先安装 Bun。Windows 下如果刚装完，通常需要新开终端让 PATH 生效。

### Bun 已安装，但当前终端找不到

这通常是 PATH 还没刷新，不一定是安装失败。

处理方式：

- 关闭当前终端窗口
- 重新打开终端
- 再执行 `bun -v`

### `401 Invalid Authentication`

优先检查：

- `.env` 里的 Key 是否真实可用
- 是不是把国区 Key 配到了国际站端点
- 是不是应该用 `ANTHROPIC_API_KEY`，却填到了 `ANTHROPIC_AUTH_TOKEN`
- 模型平台是否真的支持当前端点和模型名

### 端点错配

典型情况：

- 国区 Kimi Key 应配 `https://api.moonshot.cn/anthropic`
- 国际站 Kimi Key 应配 `https://api.moonshot.ai/anthropic`

Key 和端点不匹配时，最常见症状就是 401。

### `.env` 未生效

优先检查：

- 文件名是否真的是 `.env`
- 是否在仓库根目录启动
- 是否改完 `.env` 后仍在复用旧终端
- 是否误把值写进了 `.env.example` 而不是 `.env`

## 不推荐的主启动方式

在 Windows 下，不建议把 `./bin/claude-haha` 当作主入口，因为它是 bash 脚本，PowerShell 环境下不如 `bun run start` 稳定。
