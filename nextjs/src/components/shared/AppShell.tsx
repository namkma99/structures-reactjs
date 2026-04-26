import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <Link className="font-semibold tracking-tight" href="/">
            Workspace
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              href="/login"
            >
              Sign in
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
