import api from '@/lib/axios';
import type { Todo } from './types';

export const getTodos = (): Promise<Todo[]> => {
  return api.get<Todo[]>('/todos');
};
