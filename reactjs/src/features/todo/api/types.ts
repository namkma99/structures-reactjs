/**
 * Todo domain types.
 * Keep types separated from API functions for clean imports.
 */
export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
