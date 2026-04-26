# Next.js Workspace Template

Performance-ready Next.js App Router template using TypeScript, Tailwind CSS v4, shadcn/ui base components, TanStack Query, Zustand, React Hook Form, and Zod.

## Scripts

```bash
pnpm dev
pnpm validate
pnpm test -- --run
pnpm build
```

## Structure

```txt
src/app                 App Router routes, layouts, loading and error boundaries
src/components/shared   App shell, providers, theme controls
src/components/ui       shadcn/ui source components
src/features            Feature-first modules
src/hooks               Shared client hooks
src/lib                 Framework and utility helpers
src/stores              Client state stores
src/types               Shared TypeScript types
```

## Notes

- Pages and layouts stay Server Components by default.
- Client code is isolated behind small `"use client"` boundaries.
- App code uses direct imports instead of feature barrels.
- Zustand persistence uses a server-safe storage guard for static generation.
- `zod` is pinned to `4.0.x` for compatibility with `@hookform/resolvers@5.2.x`.
