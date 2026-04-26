import Link from "next/link";
import { AppShell } from "@/components/shared/AppShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-md flex-col gap-6 py-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to continue to your workspace.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Use any valid email for the local demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-center text-sm">
          New here?{" "}
          <Link
            className="text-foreground font-medium underline-offset-4 hover:underline"
            href="/"
          >
            View the workspace
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
