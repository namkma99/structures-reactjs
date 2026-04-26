import { describe, expect, it } from "vitest";
import { filterTodos } from "@/features/todo/lib/filter-todos";
import type { Todo } from "@/features/todo/api/types";

const todos: Todo[] = [
  { id: 1, title: "Define route groups", completed: true },
  { id: 2, title: "Wire client islands", completed: false },
  { id: 3, title: "Run production build", completed: false },
];

describe("filterTodos", () => {
  it("returns all todos up to the limit", () => {
    expect(filterTodos(todos, "all", "", 2)).toHaveLength(2);
  });

  it("filters by completion state", () => {
    expect(filterTodos(todos, "completed", "")).toEqual([todos[0]]);
    expect(filterTodos(todos, "pending", "")).toEqual([todos[1], todos[2]]);
  });

  it("matches search query case-insensitively", () => {
    expect(filterTodos(todos, "all", "BUILD")).toEqual([todos[2]]);
  });
});
