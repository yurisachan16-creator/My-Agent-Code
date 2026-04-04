# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a locally runnable fork of the leaked Claude Code source code, patched to support any Anthropic-compatible API endpoint instead of requiring official Anthropic credentials.

## Commands

```bash
# Install dependencies (Node.js >= 18 required)
npm install

# Interactive TUI mode
bun run start

# Single-shot headless mode
bun run start -- -p "your prompt"

# Recovery CLI (fallback/degraded mode)
bun run start:recovery
```

**No build step** — Bun runs TypeScript directly. The entry point is `src/entrypoints/cli.tsx`.

## Configuration

Copy `.env.example` to `.env` and fill in at minimum:

```env
ANTHROPIC_AUTH_TOKEN=sk-xxx          # Bearer token auth
ANTHROPIC_BASE_URL=https://...       # Anthropic-compatible endpoint
ANTHROPIC_MODEL=your-model
ANTHROPIC_DEFAULT_OPUS_MODEL=your-model
ANTHROPIC_DEFAULT_SONNET_MODEL=your-model
ANTHROPIC_DEFAULT_HAIKU_MODEL=your-model
CLAUDE_CODE_SUBAGENT_MODEL=your-model
ENABLE_TOOL_SEARCH=false
```

Use `ANTHROPIC_AUTH_TOKEN` for `Authorization: Bearer` auth, or `ANTHROPIC_API_KEY` for `x-api-key` auth — not both at once. See [docs/provider-config.md](docs/provider-config.md) for provider-specific templates.

## Architecture

### Entry Points (`src/entrypoints/`)
- `cli.tsx` — main CLI entry point; bootstraps the TUI or headless mode
- `mcp.ts` — MCP server mode
- `init.ts` / `sandboxTypes.ts` / `agentSdkTypes.ts` — secondary entrypoints

### `preload.ts` + `bunfig.toml`
Bun's preload runs `preload.ts` before any module, which injects `MACRO` globals (version, build time, etc.) into `globalThis`. This replaces build-time macros from the original compiled package.

### Commands (`src/commands/`)
Each slash command lives in its own subdirectory with an `index.ts` (registration) and a main implementation file (`.ts` or `.tsx`). Commands are discovered and registered at startup.

### Tools (`src/tools/`)
Each tool (e.g. `BashTool`, `FileReadTool`, `AgentTool`) is a directory containing:
- The tool class itself
- A `prompt.ts` (system prompt fragment for this tool)
- A `UI.tsx` (Ink component for rendering tool output)

The `AgentTool` supports built-in sub-agents (`src/tools/AgentTool/built-in/`) and custom agents loaded from a directory.

### Bridge (`src/bridge/`)
Handles remote sessions, cloud bridge connectivity, OAuth tokens, and polling. Not needed for local-only operation — the local setup bypasses bridge auth.

### Utilities (`src/utils/`)
Large collection of shared utilities. Notable subdirectories:
- `bash/` — shell parsing, AST, command semantics
- `computerUse/` — computer use / GUI automation support
- `claudeInChrome/` — Chrome integration via native messaging

### UI Layer
Built on [Ink](https://github.com/vadimdemedes/ink) (React for terminals). Components are `.tsx` files co-located with their features. The main loop renders the TUI via React/Ink.
