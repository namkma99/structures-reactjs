import type { Todo } from "@/features/todo/api/types";

export type TodoFilter = "all" | "completed" | "pending";

export function filterTodos(
  todos: Todo[],
  filter: TodoFilter,
  searchQuery: string,
  limit = 10
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleTodos: Todo[] = [];

  for (const todo of todos) {
    if (filter === "completed" && !todo.completed) continue;
    if (filter === "pending" && todo.completed) continue;
    if (normalizedQuery && !todo.title.toLowerCase().includes(normalizedQuery))
      continue;

    visibleTodos.push(todo);
    if (visibleTodos.length === limit) break;
  }

  return visibleTodos;
}
