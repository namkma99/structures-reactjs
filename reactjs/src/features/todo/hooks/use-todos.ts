import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/get-todos';
import type { Todo } from '../api/types';

/**
 * Query key factory for todos.
 * Export these for use in cache invalidation: queryClient.invalidateQueries({ queryKey: todoKeys.all })
 */
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  detail: (id: number) => [...todoKeys.all, 'detail', id] as const,
};

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: todoKeys.lists(),
    queryFn: getTodos,
  });
};
