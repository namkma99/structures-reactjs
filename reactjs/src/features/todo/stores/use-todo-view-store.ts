import { create } from 'zustand';

interface TodoViewState {
  filter: 'all' | 'completed' | 'pending';
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTodoViewStore = create<TodoViewState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
