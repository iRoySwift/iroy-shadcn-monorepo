# 项目指南（中文版）

## 1. 项目概述

- pnpm+Turborepo 管理的 Monorepo，根目录配置包含 `package.json`、`pnpm-workspace.yaml`、`turbo.json`、`tsconfig.json`。
- 前端应用：`apps/web`（Next.js App Router，启用 Turbopack），路由与 UI 组件位于 `apps/web/src`，静态资源在 `apps/web/public`。
- 共享包：`packages/common` 内含 `ui`(shadcn)、`hooks`、`i18n`、`network`、`stores`、`theme`、`utils`，以及共享 `eslint`、`typescript` 配置。

## 2. 安装与运行（含环境变量）

- 环境要求：Node >= 20，pnpm 9.x（仓库指定 `pnpm@9.12.3`）。
- 环境变量：在 `apps/web/.env` 配置 `NEXTAUTH_SECRET`、`NEXTAUTH_URL`（NextAuth 必需），根据需要补充其他 API 相关变量。
- 安装依赖（根目录）：`pnpm install`
- 本地开发（仅 web 应用）：`pnpm --filter @iroy/web dev`；或在根运行所有 dev 任务：`pnpm dev`
- 全量构建：`pnpm -w build`；仅构建 web：`pnpm --filter @iroy/web build`
- 启动生产服务（web）：`pnpm --filter @iroy/web start`
- 质量检查：`pnpm -w lint`，格式化：`pnpm format`，若缺少 husky 钩子：`pnpm prepare`

## 3. 目录结构、页面路由与 API

- 前端目录
  - `apps/web/src/app/[locale]/(root)/page.tsx`：主页，展示主题卡片与主题定制器
  - `apps/web/src/app/[locale]/(root)/demo/page.tsx`：Demo 页面
  - `apps/web/src/app/[locale]/login/page.tsx`：登录页，使用 NextAuth Credentials 登录
  - `apps/web/src/app/layout.tsx`：全局布局与多语言配置（`[locale]` 动态段）
- API 接口（Next.js Route Handlers，充当前端内置后端）
  - `apps/web/src/app/api/auth/[...nextauth]/route.ts`：NextAuth 认证入口，配置见 `apps/web/src/auth.ts`（Credentials，JWT Session）
  - `apps/web/src/app/api/i18n/route.ts`：回显查询参数的示例接口
- 共享包（后端逻辑集中在前端 API 内，无独立后端服务）
  - `packages/common/network`：axios 封装
  - 其他包提供 UI、主题、i18n、hooks、状态（zustand）、工具函数等

# 项目指南（中文版）

## 1. 项目概述

- pnpm+Turborepo 管理的 Monorepo，根目录配置包含 `package.json`、`pnpm-workspace.yaml`、`turbo.json`、`tsconfig.json`。
- 前端应用：`apps/web`（Next.js App Router，启用 Turbopack），路由与 UI 组件位于 `apps/web/src`，静态资源在 `apps/web/public`。
- 共享包：`packages/common` 内含 `ui`(shadcn)、`hooks`、`i18n`、`network`、`stores`、`theme`、`utils`，以及共享 `eslint`、`typescript` 配置。

## 2. 安装与运行（含环境变量）

- 环境要求：Node >= 20，pnpm 9.x（仓库指定 `pnpm@9.12.3`）。
- 环境变量：在 `apps/web/.env` 配置 `NEXTAUTH_SECRET`、`NEXTAUTH_URL`（NextAuth 必需），根据需要补充其他 API 相关变量。
- 安装依赖（根目录）：`pnpm install`
- 本地开发（仅 web 应用）：`pnpm --filter @iroy/web dev`；或在根运行所有 dev 任务：`pnpm dev`
- 全量构建：`pnpm -w build`；仅构建 web：`pnpm --filter @iroy/web build`
- 启动生产服务（web）：`pnpm --filter @iroy/web start`
- 质量检查：`pnpm -w lint`，格式化：`pnpm format`，若缺少 husky 钩子：`pnpm prepare`

## 3. 目录结构、页面路由与 API

- 前端目录
  - `apps/web/src/app/[locale]/(root)/page.tsx`：主页，展示主题卡片与主题定制器
  - `apps/web/src/app/[locale]/(root)/demo/page.tsx`：Demo 页面
  - `apps/web/src/app/[locale]/login/page.tsx`：登录页，使用 NextAuth Credentials 登录
  - `apps/web/src/app/layout.tsx`：全局布局与多语言配置（`[locale]` 动态段）
- API 接口（Next.js Route Handlers，充当前端内置后端）
  - `apps/web/src/app/api/auth/[...nextauth]/route.ts`：NextAuth 认证入口，配置见 `apps/web/src/auth.ts`（Credentials，JWT Session）
  - `apps/web/src/app/api/i18n/route.ts`：回显查询参数的示例接口
- 共享包（后端逻辑集中在前端 API 内，无独立后端服务）
  - `packages/common/network`：axios 封装
  - 其他包提供 UI、主题、i18n、hooks、状态（zustand）、工具函数等

## 4. 重要技术栈与依赖

- 核心框架：Next.js（App Router + Turbopack）、React、TypeScript
- UI 与样式：shadcn/ui（Radix UI + Tailwind），自定义主题与组件复用在 `packages/common/ui`、`packages/common/theme`
- 状态与数据：zustand（根依赖）；`@tanstack/react-table` 用于表格
- 国际化与认证：next-intl（多语言）、next-auth（Credentials Provider + JWT Session）
- 工具链：pnpm、Turborepo、ESLint（来自 `@iroy/eslint`）、Prettier（含 tailwind 插件）、Husky + lint-staged
- 其他：`@vercel/analytics`、`clsx`、`@formatjs/intl-localematcher`、`negotiator`

## 5. 说明

- 所有命令均已用 pnpm 表述；如需新增命令请保持 pnpm 形式。
