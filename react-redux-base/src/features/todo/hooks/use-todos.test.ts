import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, type ReactNode } from 'react';
import { useTodos } from './use-todos';
import * as getTodosModule from '../api/get-todos';
import type { Todo } from '../api/types';

/**
 * Creates a fresh QueryClient wrapper for each test.
 * Using a new instance per test prevents shared cache state between tests.
 *
 * Alternative: use `msw` (Mock Service Worker) to intercept real HTTP requests.
 * See https://mswjs.io/docs/integrations/react for setup.
 */
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Buy groceries', completed: false },
  { id: 2, userId: 1, title: 'Write tests', completed: true },
];

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns todos on successful fetch', async () => {
    vi.spyOn(getTodosModule, 'getTodos').mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos(), { wrapper: createWrapper() });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockTodos);
    expect(result.current.data).toHaveLength(2);
    expect(getTodosModule.getTodos).toHaveBeenCalledOnce();
  });

  it('enters error state when fetch fails', async () => {
    vi.spyOn(getTodosModule, 'getTodos').mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useTodos(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
