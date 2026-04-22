# React Base — Modern React Boilerplate

A production-ready React base project for building scalable web applications.

## Tech Stack

| Category          | Technology                        |
| ----------------- | --------------------------------- |
| **Framework**     | React 19 + TypeScript 6           |
| **Bundler**       | Vite 8                            |
| **Styling**       | Tailwind CSS v4 + shadcn/ui       |
| **State**         | Zustand v5 (with persistence)     |
| **Data Fetching** | TanStack Query v5 + Axios         |
| **Routing**       | React Router v7                   |
| **Testing**       | Vitest + React Testing Library    |
| **Linting**       | ESLint 9 (flat config) + Prettier |
| **Git Hooks**     | Husky + lint-staged + CommitLint  |
| **Font**          | Geist Variable                    |

## Project Structure

```
src/
├── app/                  # App-level setup
│   ├── AppProvider.tsx   # Root providers (QueryClient, Router, ErrorBoundary)
│   └── router.tsx        # Route definitions
├── components/
│   ├── ui/               # shadcn/ui primitives (auto-generated, do not edit)
│   └── shared/           # Custom shared components
│       ├── ErrorBoundary.tsx
│       ├── Layout.tsx
│       ├── NotFound.tsx
│       └── Spinner.tsx
├── config/
│   └── env.ts            # Centralized env variable access
├── features/             # Feature modules (self-contained)
│   └── [feature]/
│       ├── api/          # API functions + domain types
│       ├── components/   # Feature UI
│       ├── hooks/        # React Query hooks
│       ├── stores/       # Zustand UI state
│       └── index.ts      # Barrel export
├── hooks/                # Global reusable hooks
├── lib/                  # Core libraries (axios, react-query, utils)
├── pages/                # Page-level components (thin, compose features)
├── stores/               # Global Zustand stores
├── test/                 # Test setup
└── types/                # Global TypeScript types
    ├── api.ts            # ApiResponse, PaginatedResponse
    └── common.ts         # ID, User, ThemeMode, utility types
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy env template
cp .env.example .env

# Start dev server
pnpm dev
```

## Scripts

```bash
pnpm dev              # Start dev server (http://localhost:5173)
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm lint             # ESLint
pnpm format           # Prettier (write)
pnpm format:check     # Prettier (check only — used in CI)
pnpm type-check       # TypeScript compiler check
pnpm validate         # format:check + lint + type-check
pnpm test             # Run tests (watch mode)
pnpm test:ui          # Tests with visual UI
pnpm test:coverage    # Coverage report
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <description>

Types: feat, fix, chore, docs, style, refactor, test, build, ci
Scopes: auth, ui, api, feat, infra, config, deps, hooks, store, styles, types, test, docs
```

Examples:

```
feat(auth): add login page
fix(api): handle 401 token refresh
chore(deps): update react-query to v5
```

## Adding a New Feature

1. Create the feature directory: `src/features/[feature-name]/`
2. Add sub-directories: `api/`, `components/`, `hooks/`, `stores/`
3. Create `api/types.ts` for domain types
4. Create `api/[action].ts` for API functions
5. Create `hooks/use-[name].ts` for React Query hooks
6. Export everything from `index.ts`
7. Add routes in `src/app/router.tsx`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=https://your-api.example.com
```

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add [component-name]
```
