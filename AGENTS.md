# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by pnpm workspaces + Turborepo; root config lives in `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.json`.
- `apps/web` is the Next.js app (App Router, Turbopack). Routes, layouts, middleware, and UI live under `apps/web/src`; static assets under `apps/web/public`.
- Shared code sits in `packages/common`: `ui` (shadcn), `hooks`, `i18n`, `network` (axios helpers), `stores`, `theme`, `utils`, with shared configs in `eslint` and `typescript`.

## Build, Test, and Development Commands
- Install deps (Node ≥20, pnpm 9.x expected): `pnpm install`.
- Dev server: `pnpm --filter @iroy/web dev` (or `pnpm dev` to run all turbo dev tasks).
- Build all workspaces: `pnpm -w build`; build only the app: `pnpm --filter @iroy/web build`; start prod server: `pnpm --filter @iroy/web start`.
- Lint: `pnpm -w lint`; type-check the web app: `pnpm check`. Format repo files: `pnpm format`.
- Husky + lint-staged run on commits; use `pnpm prepare` after cloning if hooks are missing.

## Coding Style & Naming Conventions
- TypeScript-first; prefer functional React components and file-scoped hooks.
- Prettier (with Tailwind plugin) enforces formatting; use camelCase for functions/vars, PascalCase for React components, kebab-case for files unless Next.js route conventions differ.
- ESLint config comes from `@iroy/eslint`; fix warnings locally (`pnpm -w exec eslint --max-warnings=0 <paths>`).
- Keep shared utilities in `packages/common/*` rather than duplicating code inside `apps/web`.

## Testing Guidelines
- No automated test suite is present; add targeted tests alongside features (e.g., `apps/web/src/.../*.test.tsx` or `packages/common/<pkg>/__tests__`).
- Prefer React Testing Library for components and light integration smoke tests for Next routes. Ensure new utilities include unit coverage before sharing across packages.

## Commit & Pull Request Guidelines
- Recent history mixes plain messages and `chore:`-style prefixes; prefer Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) with optional scope (`feat(web): ...`) for clarity.
- Before opening a PR: run `pnpm -w lint`, `pnpm check`, and build the affected packages. Include what changed, why, screenshots for UI tweaks, and any env vars required.
- Link issues or tickets when available; keep PRs scoped to a single feature/fix. Note any follow-ups or shortcuts in the description.

## Environment & Security Notes
- Copy `.env.example` (if present) into local `.env` files per package; NextAuth needs `NEXTAUTH_SECRET` and `NEXTAUTH_URL` to silence warnings.
- Do not commit secrets; prefer `.env` with workspace-level `.gitignore`. Validate third-party calls inside shared `network` helpers to keep API usage consistent.
