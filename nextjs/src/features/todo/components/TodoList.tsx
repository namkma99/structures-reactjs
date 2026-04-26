"use client";

import { useDeferredValue, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { filterTodos, type TodoFilter } from "@/features/todo/lib/filter-todos";
import type { Todo } from "@/features/todo/api/types";

const filters: TodoFilter[] = ["all", "completed", "pending"];

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const visibleTodos = filterTodos(
    initialTodos,
    filter,
    deferredSearchQuery,
    10
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>
          Client-side filtering over server-rendered seed data.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            aria-label="Search tasks"
            className="sm:max-w-xs"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search tasks..."
            value={searchQuery}
          />
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Button
                key={item}
                onClick={() => setFilter(item)}
                size="sm"
                type="button"
                variant={filter === item ? "default" : "outline"}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <ul className="grid gap-2">
          {visibleTodos.map((todo) => (
            <li
              className="bg-card flex items-center justify-between gap-4 rounded-lg border px-3 py-2"
              key={todo.id}
            >
              <span
                className={
                  todo.completed ? "text-muted-foreground line-through" : ""
                }
              >
                {todo.title}
              </span>
              <Badge variant={todo.completed ? "secondary" : "outline"}>
                {todo.completed ? "Done" : "ToDo"}
              </Badge>
            </li>
          ))}
          {visibleTodos.length === 0 ? (
            <li className="text-muted-foreground rounded-lg border border-dashed py-8 text-center text-sm">
              No tasks matched your search.
            </li>
          ) : null}
        </ul>
      </CardContent>
    </Card>
  );
}
