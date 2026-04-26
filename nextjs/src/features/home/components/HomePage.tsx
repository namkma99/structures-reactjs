import { Suspense } from "react";
import { AppShell } from "@/components/shared/AppShell";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SystemStatusCard } from "@/features/system/components/SystemStatusCard";
import { TodoList } from "@/features/todo/components/TodoList";
import type { Todo } from "@/features/todo/api/types";

export function HomePage({ todos }: { todos: Todo[] }) {
  const completed = todos.reduce(
    (count, todo) => count + Number(todo.completed),
    0
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Workspace</CardTitle>
              <CardDescription>
                A Next.js App Router template with server-first data and focused
                client islands.
              </CardDescription>
              <CardAction>
                <Badge variant="secondary">Next 16</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric label="Tasks" value={String(todos.length)} />
                <Metric label="Completed" value={String(completed)} />
                <Metric
                  label="Pending"
                  value={String(todos.length - completed)}
                />
              </div>
            </CardContent>
          </Card>

          <Suspense fallback={<SystemStatusSkeleton />}>
            <SystemStatusCard />
          </Suspense>
        </section>

        <TodoList initialTodos={todos} />
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/30 rounded-lg border p-3">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}

function SystemStatusSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}
