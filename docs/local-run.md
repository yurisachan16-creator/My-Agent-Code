# 本地运行指南

本项目推荐统一使用 `package.json` 中的脚本启动：

```bash
bun run start
```

当前可用脚本（见 [package.json](../package.json)）：

- `bun run start` — 交互模式
- `bun run start -- -p "prompt"` — 单次问答
- `bun run start:recovery` — Recovery CLI 降级模式

---

## 前置条件

Node.js >= 18，Bun 1.3+。

各平台安装 Bun 的推荐方式：

| 平台 | 命令 |
| --- | --- |
| Windows | `winget install Oven-sh.Bun`，或从 [bun.sh](https://bun.sh) 下载 installer |
| macOS | `brew install oven-sh/bun/bun` |
| Linux | `curl -fsSL https://bun.sh/install \| bash` |

安装后新开终端，执行 `bun -v` 确认版本。

---

## Windows

推荐使用 **PowerShell**（不是 CMD，不是 Git Bash）。

```powershell
# 1. 进入项目目录并安装依赖
cd <项目目录>
npm install

# 2. 复制并编辑配置文件
Copy-Item .env.example .env
# 用文本编辑器打开 .env，填入 API Key 和接口配置

# 3. 启动（交互模式）
bun run start

# 单次问答
bun run start -- -p "你好"

# Recovery CLI
bun run start:recovery
```

接口配置方式参考 [provider-config.md](provider-config.md)。

---

## macOS

```bash
# 1. 进入项目目录并安装依赖
cd /path/to/claude-code-haha-main
npm install

# 2. 复制并编辑配置文件
cp .env.example .env
# 用编辑器打开 .env，填入 API Key 和接口配置

# 3. 启动（交互模式）
bun run start

# 单次问答
bun run start -- -p "hello"

# Recovery CLI
bun run start:recovery
```

---

## Linux

```bash
# 1. 进入项目目录并安装依赖
cd /path/to/claude-code-haha-main
npm install

# 2. 复制并编辑配置文件
cp .env.example .env

# 3. 启动（交互模式）
bun run start

# 单次问答
bun run start -- -p "hello"

# Recovery CLI
bun run start:recovery
```

---

## `.env` 使用规范

1. 从 `.env.example` 复制，只在 `.env` 中填写真实密钥；
2. 不要把真实密钥写回 `.env.example`；
3. 修改 `.env` 后，重新打开终端再启动，避免旧环境变量残留。

---

## 常见问题

### `bun` 未安装 / 当前终端找不到

执行 `bun -v` 确认。刚安装完通常需要新开终端让 PATH 生效。

### `401 Invalid Authentication`

优先检查：

- `.env` 里的 Key 是否真实可用；
- Key 来源与端点是否匹配（国区 Key 必须配国区端点）：
  - Kimi 国区 Key → `https://api.moonshot.cn/anthropic`
  - Kimi 国际站 Key → `https://api.moonshot.ai/anthropic`
- 鉴权变量是否选对：供应商要求 `x-api-key` 时应使用 `ANTHROPIC_API_KEY`，而不是 `ANTHROPIC_AUTH_TOKEN`；
- 模型名是否是供应商真实支持的名称。

### `.env` 未生效

优先检查：

- 文件名是否真的是 `.env`（不是 `.env.txt`）；
- 是否在仓库根目录启动；
- 是否改完 `.env` 后仍在复用旧终端；
- 是否误把值写进了 `.env.example` 而不是 `.env`。

---

## 说明

`bin/claude-haha` 是 bash 脚本，在 Windows PowerShell 环境下不如 `bun run start` 稳定，不建议作为主启动方式。
