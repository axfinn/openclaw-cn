# 🦞 OpenClaw — 个人 AI 助手

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI 状态"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub 发布"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT 许可证"></a>
</p>

**OpenClaw** 是一个在你自己设备上运行的*个人 AI 助手*。
它可以在你已经使用的各种通讯渠道上回复你（WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat），以及 BlueBubbles、Matrix、Zalo 等扩展渠道。它可以在 macOS/iOS/Android 上说话和听话，并且可以渲染你控制的实时 Canvas。Gateway 只是控制平面——真正的产品是助手本身。

如果你想要一个本地化、快速且始终在线的个人单用户助手，这就是你要找的。

[官网](https://openclaw.ai) · [文档](https://docs.openclaw.ai) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [快速开始](https://docs.openclaw.ai/start/getting-started) · [更新指南](https://docs.openclaw.ai/install/updating) · [展示](https://docs.openclaw.ai/start/showcase) · [常见问题](https://docs.openclaw.ai/start/faq) · [向导](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-clawdbot) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

推荐设置：运行引导向导（`openclaw onboard`）。它会引导你完成网关、工作区、渠道和技能的设置。CLI 向导是推荐的路径，可在 **macOS、Linux 和 Windows（通过 WSL2；强烈推荐）** 上使用。
支持 npm、pnpm 或 bun。
首次安装？从这里开始：[快速开始](https://docs.openclaw.ai/start/getting-started)

**订阅（OAuth）：**
- **[Anthropic](https://www.anthropic.com/)**（Claude Pro/Max）
- **[OpenAI](https://openai.com/)**（ChatGPT/Codex）

模型说明：虽然支持任何模型，但我强烈推荐 **Anthropic Pro/Max (100/200) + Opus 4.5**，因为它具有强大的长上下文能力和更好的提示注入防御。详见[引导文档](https://docs.openclaw.ai/start/onboarding)。

## 模型（选择和认证）

- 模型配置 + CLI：[模型](https://docs.openclaw.ai/concepts/models)
- 认证配置文件轮换（OAuth vs API 密钥）+ 故障转移：[模型故障转移](https://docs.openclaw.ai/concepts/model-failover)

## 安装（推荐）

运行时环境：**Node ≥22**。

```bash
npm install -g openclaw@latest
# 或者：pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

向导会安装 Gateway 守护进程（launchd/systemd 用户服务），使其保持运行。

## 快速开始（TL;DR）

运行时环境：**Node ≥22**。

完整的新手指南（认证、配对、渠道）：[快速开始](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# 发送消息
openclaw message send --to +1234567890 --message "来自 OpenClaw 的问候"

# 与助手对话（可选择发送回任何已连接的渠道：WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat）
openclaw agent --message "发货清单" --thinking high
```

升级中？[更新指南](https://docs.openclaw.ai/install/updating)（并运行 `openclaw doctor`）。

## 开发渠道

- **stable（稳定版）**：标签发布（`vYYYY.M.D` 或 `vYYYY.M.D-<patch>`），npm dist-tag `latest`。
- **beta（测试版）**：预发布标签（`vYYYY.M.D-beta.N`），npm dist-tag `beta`（macOS 应用可能缺失）。
- **dev（开发版）**：`main` 分支的移动头部，npm dist-tag `dev`（发布时）。

切换渠道（git + npm）：`openclaw update --channel stable|beta|dev`。
详情：[开发渠道](https://docs.openclaw.ai/install/development-channels)。

## 从源代码构建（开发）

推荐使用 `pnpm` 从源代码构建。Bun 可选用于直接运行 TypeScript。

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # 首次运行时自动安装 UI 依赖
pnpm build

pnpm openclaw onboard --install-daemon

# 开发循环（TS 更改时自动重载）
pnpm gateway:watch
```

注意：`pnpm openclaw ...` 直接运行 TypeScript（通过 `tsx`）。`pnpm build` 生成 `dist/` 用于通过 Node 或打包的 `openclaw` 二进制文件运行。

## 安全默认值（DM 访问）

OpenClaw 连接到真实的消息平台。将入站私信视为**不可信输入**。

完整的安全指南：[安全](https://docs.openclaw.ai/gateway/security)

在 Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack 上的默认行为：
- **DM 配对**（`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`）：未知发送者会收到一个简短的配对代码，机器人不会处理他们的消息。
- 批准方式：`openclaw pairing approve <channel> <code>`（然后发送者被添加到本地白名单存储）。
- 公开入站私信需要明确选择加入：设置 `dmPolicy="open"` 并在渠道白名单中包含 `"*"`（`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`）。

运行 `openclaw doctor` 以发现有风险或配置错误的 DM 策略。

## 亮点

- **[本地优先 Gateway](https://docs.openclaw.ai/gateway)** — 用于会话、渠道、工具和事件的单一控制平面。
- **[多渠道收件箱](https://docs.openclaw.ai/channels)** — WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、BlueBubbles、Microsoft Teams、Matrix、Zalo、Zalo Personal、WebChat、macOS、iOS/Android。
- **[多代理路由](https://docs.openclaw.ai/gateway/configuration)** — 将入站渠道/账户/对等方路由到隔离的代理（工作区 + 每个代理的会话）。
- **[语音唤醒](https://docs.openclaw.ai/nodes/voicewake) + [对话模式](https://docs.openclaw.ai/nodes/talk)** — macOS/iOS/Android 的永久在线语音，使用 ElevenLabs。
- **[实时 Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — 代理驱动的可视化工作区，带有 [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- **[一流工具](https://docs.openclaw.ai/tools)** — 浏览器、canvas、节点、cron、会话和 Discord/Slack 操作。
- **[配套应用](https://docs.openclaw.ai/platforms/macos)** — macOS 菜单栏应用 + iOS/Android [节点](https://docs.openclaw.ai/nodes)。
- **[引导](https://docs.openclaw.ai/start/wizard) + [技能](https://docs.openclaw.ai/tools/skills)** — 向导驱动的设置，带有捆绑/管理/工作区技能。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## 到目前为止我们构建的一切

### 核心平台
- [Gateway WS 控制平面](https://docs.openclaw.ai/gateway)，包含会话、在线状态、配置、cron、webhooks、[控制界面](https://docs.openclaw.ai/web) 和 [Canvas 主机](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- [CLI 界面](https://docs.openclaw.ai/tools/agent-send)：gateway、agent、send、[向导](https://docs.openclaw.ai/start/wizard) 和 [doctor](https://docs.openclaw.ai/gateway/doctor)。
- [Pi 代理运行时](https://docs.openclaw.ai/concepts/agent) RPC 模式，具有工具流和块流。
- [会话模型](https://docs.openclaw.ai/concepts/session)：用于直接聊天的 `main`、群组隔离、激活模式、队列模式、回复。群组规则：[群组](https://docs.openclaw.ai/concepts/groups)。
- [媒体管道](https://docs.openclaw.ai/nodes/images)：图像/音频/视频、转录钩子、大小上限、临时文件生命周期。音频详情：[音频](https://docs.openclaw.ai/nodes/audio)。

### 渠道
- [渠道](https://docs.openclaw.ai/channels)：[WhatsApp](https://docs.openclaw.ai/channels/whatsapp)（Baileys）、[Telegram](https://docs.openclaw.ai/channels/telegram)（grammY）、[Slack](https://docs.openclaw.ai/channels/slack)（Bolt）、[Discord](https://docs.openclaw.ai/channels/discord)（discord.js）、[Google Chat](https://docs.openclaw.ai/channels/googlechat)（Chat API）、[Signal](https://docs.openclaw.ai/channels/signal)（signal-cli）、[iMessage](https://docs.openclaw.ai/channels/imessage)（imsg）、[BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles)（扩展）、[Microsoft Teams](https://docs.openclaw.ai/channels/msteams)（扩展）、[Matrix](https://docs.openclaw.ai/channels/matrix)（扩展）、[Zalo](https://docs.openclaw.ai/channels/zalo)（扩展）、[Zalo Personal](https://docs.openclaw.ai/channels/zalouser)（扩展）、[WebChat](https://docs.openclaw.ai/web/webchat)。
- [群组路由](https://docs.openclaw.ai/concepts/group-messages)：提及门控、回复标签、每个渠道的分块和路由。渠道规则：[渠道](https://docs.openclaw.ai/channels)。

### 应用 + 节点
- [macOS 应用](https://docs.openclaw.ai/platforms/macos)：菜单栏控制平面、[语音唤醒](https://docs.openclaw.ai/nodes/voicewake)/PTT、[对话模式](https://docs.openclaw.ai/nodes/talk) 覆盖层、[WebChat](https://docs.openclaw.ai/web/webchat)、调试工具、[远程网关](https://docs.openclaw.ai/gateway/remote) 控制。
- [iOS 节点](https://docs.openclaw.ai/platforms/ios)：[Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、[语音唤醒](https://docs.openclaw.ai/nodes/voicewake)、[对话模式](https://docs.openclaw.ai/nodes/talk)、相机、屏幕录制、Bonjour 配对。
- [Android 节点](https://docs.openclaw.ai/platforms/android)：[Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、[对话模式](https://docs.openclaw.ai/nodes/talk)、相机、屏幕录制、可选短信。
- [macOS 节点模式](https://docs.openclaw.ai/nodes)：system.run/notify + canvas/camera 暴露。

### 工具 + 自动化
- [浏览器控制](https://docs.openclaw.ai/tools/browser)：专用的 openclaw Chrome/Chromium、快照、操作、上传、配置文件。
- [Canvas](https://docs.openclaw.ai/platforms/mac/canvas)：[A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) 推送/重置、评估、快照。
- [节点](https://docs.openclaw.ai/nodes)：相机抓拍/剪辑、屏幕录制、[location.get](https://docs.openclaw.ai/nodes/location-command)、通知。
- [Cron + 唤醒](https://docs.openclaw.ai/automation/cron-jobs)；[webhooks](https://docs.openclaw.ai/automation/webhook)；[Gmail Pub/Sub](https://docs.openclaw.ai/automation/gmail-pubsub)。
- [技能平台](https://docs.openclaw.ai/tools/skills)：捆绑、管理和工作区技能，具有安装门控 + UI。

### 运行时 + 安全
- [渠道路由](https://docs.openclaw.ai/concepts/channel-routing)、[重试策略](https://docs.openclaw.ai/concepts/retry) 和 [流式/分块](https://docs.openclaw.ai/concepts/streaming)。
- [在线状态](https://docs.openclaw.ai/concepts/presence)、[输入指示器](https://docs.openclaw.ai/concepts/typing-indicators) 和 [使用情况跟踪](https://docs.openclaw.ai/concepts/usage-tracking)。
- [模型](https://docs.openclaw.ai/concepts/models)、[模型故障转移](https://docs.openclaw.ai/concepts/model-failover) 和 [会话修剪](https://docs.openclaw.ai/concepts/session-pruning)。
- [安全](https://docs.openclaw.ai/gateway/security) 和 [故障排除](https://docs.openclaw.ai/channels/troubleshooting)。

### 运维 + 打包
- [控制界面](https://docs.openclaw.ai/web) + [WebChat](https://docs.openclaw.ai/web/webchat) 直接从 Gateway 提供服务。
- [Tailscale Serve/Funnel](https://docs.openclaw.ai/gateway/tailscale) 或 [SSH 隧道](https://docs.openclaw.ai/gateway/remote)，带令牌/密码认证。
- [Nix 模式](https://docs.openclaw.ai/install/nix) 用于声明式配置；基于 [Docker](https://docs.openclaw.ai/install/docker) 的安装。
- [Doctor](https://docs.openclaw.ai/gateway/doctor) 迁移、[日志记录](https://docs.openclaw.ai/logging)。

## 工作原理（简述）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       （控制平面）             │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi 代理（RPC）
               ├─ CLI（openclaw …）
               ├─ WebChat UI
               ├─ macOS 应用
               └─ iOS / Android 节点
```

## 关键子系统

- **[Gateway WebSocket 网络](https://docs.openclaw.ai/concepts/architecture)** — 用于客户端、工具和事件的单一 WS 控制平面（以及运维：[Gateway 运行手册](https://docs.openclaw.ai/gateway)）。
- **[Tailscale 暴露](https://docs.openclaw.ai/gateway/tailscale)** — Gateway 仪表板 + WS 的 Serve/Funnel（远程访问：[远程](https://docs.openclaw.ai/gateway/remote)）。
- **[浏览器控制](https://docs.openclaw.ai/tools/browser)** — openclaw 管理的 Chrome/Chromium，具有 CDP 控制。
- **[Canvas + A2UI](https://docs.openclaw.ai/platforms/mac/canvas)** — 代理驱动的可视化工作区（A2UI 主机：[Canvas/A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)）。
- **[语音唤醒](https://docs.openclaw.ai/nodes/voicewake) + [对话模式](https://docs.openclaw.ai/nodes/talk)** — 永久在线语音和连续对话。
- **[节点](https://docs.openclaw.ai/nodes)** — Canvas、相机抓拍/剪辑、屏幕录制、`location.get`、通知，以及 macOS 专用的 `system.run`/`system.notify`。

## Tailscale 访问（Gateway 仪表板）

OpenClaw 可以自动配置 Tailscale **Serve**（仅 tailnet）或 **Funnel**（公开），同时 Gateway 保持绑定到本地环回。配置 `gateway.tailscale.mode`：

- `off`：无 Tailscale 自动化（默认）。
- `serve`：仅 tailnet 的 HTTPS，通过 `tailscale serve`（默认使用 Tailscale 身份标头）。
- `funnel`：公开 HTTPS，通过 `tailscale funnel`（需要共享密码认证）。

注意：
- 启用 Serve/Funnel 时，`gateway.bind` 必须保持为 `loopback`（OpenClaw 强制执行此操作）。
- 可以通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制 Serve 需要密码。
- 除非设置了 `gateway.auth.mode: "password"`，否则 Funnel 拒绝启动。
- 可选：`gateway.tailscale.resetOnExit` 在关闭时撤消 Serve/Funnel。

详情：[Tailscale 指南](https://docs.openclaw.ai/gateway/tailscale) · [Web 界面](https://docs.openclaw.ai/web)

## 远程 Gateway（Linux 很棒）

在小型 Linux 实例上运行 Gateway 是完全可以的。客户端（macOS 应用、CLI、WebChat）可以通过 **Tailscale Serve/Funnel** 或 **SSH 隧道** 连接，你仍然可以配对设备节点（macOS/iOS/Android）在需要时执行设备本地操作。

- **Gateway 主机** 默认运行 exec 工具和渠道连接。
- **设备节点** 通过 `node.invoke` 运行设备本地操作（`system.run`、相机、屏幕录制、通知）。
简而言之：exec 在 Gateway 所在的位置运行；设备操作在设备所在的位置运行。

详情：[远程访问](https://docs.openclaw.ai/gateway/remote) · [节点](https://docs.openclaw.ai/nodes) · [安全](https://docs.openclaw.ai/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以在**节点模式**下运行，并通过 Gateway WebSocket 公告其功能 + 权限映射（`node.list` / `node.describe`）。然后客户端可以通过 `node.invoke` 执行本地操作：

- `system.run` 运行本地命令并返回 stdout/stderr/退出代码；设置 `needsScreenRecording: true` 以需要屏幕录制权限（否则你将得到 `PERMISSION_MISSING`）。
- `system.notify` 发布用户通知，如果通知被拒绝则失败。
- `canvas.*`、`camera.*`、`screen.record` 和 `location.get` 也通过 `node.invoke` 路由，并遵循 TCC 权限状态。

提升的 bash（主机权限）与 macOS TCC 分开：

- 使用 `/elevated on|off` 在启用 + 白名单时切换每个会话的提升访问。
- Gateway 通过 `sessions.patch`（WS 方法）持久化每个会话的切换，与 `thinkingLevel`、`verboseLevel`、`model`、`sendPolicy` 和 `groupActivation` 一起。

详情：[节点](https://docs.openclaw.ai/nodes) · [macOS 应用](https://docs.openclaw.ai/platforms/macos) · [Gateway 协议](https://docs.openclaw.ai/concepts/architecture)

## 代理对代理（sessions_* 工具）

- 使用这些工具在会话之间协调工作，而无需在聊天界面之间跳转。
- `sessions_list` — 发现活动会话（代理）及其元数据。
- `sessions_history` — 获取会话的转录日志。
- `sessions_send` — 向另一个会话发送消息；可选的回复乒乓 + 公告步骤（`REPLY_SKIP`、`ANNOUNCE_SKIP`）。

详情：[会话工具](https://docs.openclaw.ai/concepts/session-tool)

## 技能注册表（ClawdHub）

ClawdHub 是一个最小的技能注册表。启用 ClawdHub 后，代理可以自动搜索技能并根据需要拉取新技能。

[ClawdHub](https://ClawdHub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送这些命令（群组命令仅所有者可用）：

- `/status` — 紧凑的会话状态（模型 + token、可用时的成本）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文（摘要）
- `/think <level>` — off|minimal|low|medium|high|xhigh（仅限 GPT-5.2 + Codex 模型）
- `/verbose on|off`
- `/usage off|tokens|full` — 每个响应的使用情况页脚
- `/restart` — 重启网关（仅群组所有者）
- `/activation mention|always` — 群组激活切换（仅限群组）

## 应用（可选）

仅 Gateway 就能提供出色的体验。所有应用都是可选的，并添加额外功能。

如果你计划构建/运行配套应用，请遵循下面的平台运行手册。

### macOS（OpenClaw.app）（可选）

- Gateway 和健康状况的菜单栏控制。
- 语音唤醒 + 按键对讲覆盖层。
- WebChat + 调试工具。
- 通过 SSH 的远程网关控制。

注意：签名构建需要 macOS 权限在重建中保持（参见 `docs/mac/permissions.md`）。

### iOS 节点（可选）

- 通过 Bridge 作为节点配对。
- 语音触发转发 + Canvas 界面。
- 通过 `openclaw nodes …` 控制。

运行手册：[iOS 连接](https://docs.openclaw.ai/platforms/ios)。

### Android 节点（可选）

- 通过与 iOS 相同的 Bridge + 配对流程配对。
- 公开 Canvas、相机和屏幕捕获命令。
- 运行手册：[Android 连接](https://docs.openclaw.ai/platforms/android)。

## 代理工作区 + 技能

- 工作区根目录：`~/.openclaw/workspace`（可通过 `agents.defaults.workspace` 配置）。
- 技能在 `workspace/skills/` 中，具有自动加载 + 隔离。
- 使用 `openclaw skills …` 管理技能。

详情：[技能](https://docs.openclaw.ai/tools/skills) · [工作区](https://docs.openclaw.ai/concepts/workspace)

## 贡献

感谢所有 clawtributors！

<a href="https://github.com/openclaw/openclaw/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=openclaw/openclaw" />
</a>

查看我们的[贡献指南](CONTRIBUTING.md)。

## 许可证

MIT — 详见 [LICENSE](LICENSE)。

---

构建时附带 ❤️（和 🦞）
