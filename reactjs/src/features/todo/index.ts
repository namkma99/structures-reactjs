/**
 * Todo feature compatibility barrel.
 * Prefer direct imports in app code to keep route chunks smaller.
 *
 * Example:
 *   import { TodoList } from '@/features/todo/components/TodoList';
 */
export { TodoList } from './components/TodoList';
export { useTodos, todoKeys } from './hooks/use-todos';
export type { Todo } from './api/types';
