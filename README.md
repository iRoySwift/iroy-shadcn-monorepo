# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

or

```bash
cd ./packages/common/ui
pnpm dlx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu table dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```

This will place the ui components in the `packages/ui/src/components` directory.

## update shadcn ui

```bash
cd ./packages/common/ui
pnpm up "@radix-ui/*" cmdk lucide-react recharts tailwind-merge clsx --latest
```

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@iroy/ui/components/ui/button";
```

## pnpm search dependencies

```zsh
pnpm list --recursive  --only-projects --depth=2
```

## add other common module to devDependencies

```zsh
pnpm add -D @iroy/eslint @iroy/typescript --filter @iroy/network --workspace
```

## add dependencies

```zsh
pnpm add axios qs js-cookie --filter @iroy/network
```

## add other common module to workspace root devDependencies

```zsh
pnpm add -wD @iroy/eslint @iroy/typescript --filter @iroy/network --workspace
```

## remove dev

```zsh
pnpm remove -D @iroy/eslint @iroy/typescript --filter @iroy/network
```

## Project Structure

下面使用 `tree` 风格（简化）展示仓库中主要目录与文件，帮助快速定位：

```text
iroy-shadcn-monorepo/
├─ package.json
├─ pnpm-workspace.yaml
├─ pnpm-lock.yaml
├─ turbo.json
├─ tsconfig.json
├─ README.md
├─ apps/
│  └─ web/
│     ├─ package.json
│     ├─ next.config.ts
│     ├─ tailwind.config.ts
│     ├─ postcss.config.mjs
│     ├─ tsconfig.json
│     ├─ public/
│     │  └─ avatars/
│     └─ src/
│        ├─ app/                 # Next.js App Router: routes, layouts, pages, api
│        ├─ components/          # UI components used in the app
│        ├─ i18n/                # next-intl request provider and helpers
│        ├─ middleware.ts        # edge/middleware logic
│        └─ styles/
├─ packages/
│  └─ common/
│     ├─ i18n/                  # shared locale JSON files, exposed via package exports
│     ├─ ui/                    # shadcn/ui generated components
│     ├─ hooks/                 # shared react hooks
│     ├─ network/               # axios wrappers, api clients
│     ├─ stores/                # zustand / state stores
│     ├─ theme/                 # theme provider, mode toggle
│     └─ utils/                 # shared utilities
└─
```

上面是一个简化视图，展示了仓库的主要关注点：

- `apps/web` 是可运行的前端项目（Next.js），包含路由、布局、组件和 i18n 的运行时提供者。
- `packages/common` 放置可复用的共享代码（UI、i18n、hooks、network 等），供 `apps/web` 通过 workspace 依赖复用。

如需，我可以运行真实的 `tree` 命令并把完整输出写回 README（包含所有文件/子目录），或者生成中英双语版本。告诉我你想要完整树还是保留此简化视图。

## 主要工作流与常用命令

- 安装依赖（在仓库根）：

```bash
pnpm install
```

- 本地开发（运行 web 应用）：

```bash
cd apps/web
pnpm dev --filter @iroy/web
```

- 生产构建（根工作区，构建所有包/应用）：

```bash
pnpm -w build
```

- 仅为 `apps/web` 运行构建或启动：

```bash
cd apps/web
pnpm build
pnpm start
```

## 注意事项与建议

- i18n：共享消息放在 `packages/common/i18n`，在构建时使用预合并脚本把共享消息和应用消息合并，运行时通过 `@iroy/i18n/<locale>.json` 或合并后的 `apps/web/messages/merged` 读取，避免每次请求都做深度合并。
- SSG 友好：避免在 server layout 或 generateMetadata 中直接调用 `cookies()`、`headers()`、或未缓存的 `fetch()`（这些会导致 Next.js 放弃静态生成）。把用户偏好（例如侧边栏开合）放到 client-side hydrator 或通过 API 处理 HttpOnly cookie。
- Auth：`apps/web` 使用 `next-auth`，请确保在 `.env` 中配置 `NEXTAUTH_SECRET` 与 `NEXTAUTH_URL` 以消除开发环境警告并确保会话安全。
- 日志：开发阶段可用 `console.log` 调试，但尽量移除或替换为结构化日志，避免在 middleware 或 auth 中输出敏感信息（token、session）。
