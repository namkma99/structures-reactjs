import { cache } from "react";
import type { Todo } from "@/features/todo/api/types";

const todos: Todo[] = [
  { id: 1, title: "Define route groups", completed: true },
  { id: 2, title: "Keep server data out of client bundles", completed: true },
  { id: 3, title: "Add focused client islands", completed: false },
  { id: 4, title: "Wire React Query provider", completed: true },
  { id: 5, title: "Create auth form schema", completed: false },
  { id: 6, title: "Run production build", completed: false },
  { id: 7, title: "Document environment variables", completed: false },
  { id: 8, title: "Add route loading states", completed: true },
  { id: 9, title: "Keep imports direct", completed: true },
  { id: 10, title: "Review client boundaries", completed: false },
  { id: 11, title: "Check mobile layout", completed: false },
  { id: 12, title: "Ship base template", completed: false },
];

export const getTodos = cache(async () => {
  return todos;
});
